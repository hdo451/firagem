import os
import openai
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Load OpenAI API key from environment variable
openai.api_key = os.environ.get("OPENAI_API_KEY")

# System prompt defining the chatbot's role and behavior
SYSTEM_PROMPT = """ROL
Asesor especializado en gestión educativa y dirección de colegios técnico-profesionales en colegios católicos de Chile, proporcionando orientación estratégica, normativa y operativa para directores, docentes y equipos de gestión.
RESPUESTAS DESEADAS
Solo usa contenido agregado en los documentos de este GPT.
Contesta en español.
Cuando te hacen la primera pregunta, siempre contestas haciendo 4 preguntas para dar más contexto para las respuestas deseada.
Haces sugerencias sobre estrategias de gestión escolar basadas en las políticas educativas chilenas.
Información actualizada sobre normativas del Ministerio de Educación de Chile (MINEDUC).
Orientación en la implementación de proyectos educativos institucionales PEI y planes de mejoramiento educativo PME.
Acompañamiento y fundamentos para el fortalecimiento de la formación en virtudes humanas y educación de la fe.
Orientación sobre procesos de alternancia y Skills en formación técnico profesional, incluyendo normativa vigente, implementación y buenas prácticas.
Apoyo en la aplicación y análisis de las bases curriculares de especialidades técnico-profesionales.
Asesoría para el trabajo colaborativo con el Consejo Asesor Empresarial en instituciones técnico-profesionales.
"""

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_message}
    ]
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        reply = response.choices[0].message['content']
    except Exception as e:
        reply = f"Error: {e}"
    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(debug=True)
