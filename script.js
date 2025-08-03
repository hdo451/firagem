const cards = [
  { front: 'Cirrus fibratus', back: 'Thin, fibrous streaks high in the sky.' },
  { front: 'Cirrus uncinus', back: 'Tufted cirrus with hooks or comma shapes.' },
  { front: 'Cirrus spissatus', back: 'Dense cirrus forming patches or layers.' },
  { front: 'Cirrostratus fibratus', back: 'Thin fibrous sheet that may show halos.' },
  { front: 'Cirrostratus nebulosus', back: 'Uniform high-level veil producing halos.' },
  { front: 'Cirrocumulus stratiformis', back: 'Small rippled rows of high clouds.' },
  { front: 'Cirrocumulus lenticularis', back: 'Lens-shaped high-level clouds.' },
  { front: 'Altostratus translucidus', back: 'Mid-level gray sheet letting the sun shine through.' },
  { front: 'Altostratus opacus', back: 'Dense mid-level layer hiding the sun.' },
  { front: 'Altocumulus floccus', back: 'Tufted mid-level masses with trailing bases.' },
  { front: 'Altocumulus lenticularis', back: 'Lens-shaped clouds in the mid levels.' },
  { front: 'Nimbostratus', back: 'Thick, dark, rain-bearing layer.' },
  { front: 'Stratocumulus stratiformis', back: 'Low, layered rolls covering the sky.' },
  { front: 'Stratocumulus cumulogenitus', back: 'Stratocumulus formed from spreading cumulus.' },
  { front: 'Stratus nebulosus', back: 'Low uniform layer resembling fog.' },
  { front: 'Stratus fractus', back: 'Ragged shreds beneath other clouds.' },
  { front: 'Cumulus humilis', back: 'Small fair-weather heaps.' },
  { front: 'Cumulus mediocris', back: 'Moderate heaps with rounded tops.' },
  { front: 'Cumulus congestus', back: 'Towering heaps with cauliflower tops.' },
  { front: 'Towering Cumulus', back: 'Large cumulus with strong vertical growth.' },
  { front: 'Cumulonimbus calvus', back: 'Thundercloud with a smooth top.' },
  { front: 'Cumulonimbus capillatus', back: 'Thundercloud with a fibrous top.' },
  { front: 'Cumulonimbus incus', back: 'Anvil-shaped thundercloud.' },
  { front: 'Cirrus aviaticus', back: 'Line-shaped cloud formed by aircraft.' },
  { front: 'Kelvin-Helmholtz wave', back: 'Clouds shaped like breaking waves due to wind shear.' },
  { front: 'Mammatus', back: 'Pouch-like projections hanging beneath a cloud.' },
  { front: 'Fog', back: 'Stratus cloud at ground level.' }
];

let current = 0;
const card = document.getElementById('card');
const front = card.querySelector('.front');
const back = card.querySelector('.back');

function showCard(index) {
  const data = cards[index];
  front.textContent = data.front;
  back.textContent = data.back;
  card.classList.remove('flipped');
}

function nextCard() {
  if (current < cards.length - 1) {
    current++;
    showCard(current);
  } else {
    front.textContent = 'End of deck';
    back.textContent = '';
    card.classList.remove('flipped');
  }
}

showCard(current);

document.getElementById('flip-btn').addEventListener('click', () => {
  card.classList.toggle('flipped');
});

document.getElementById('next-btn').addEventListener('click', nextCard);

const scores = [0, 0, 0];

function updateScore(team, points) {
  scores[team] += points;
  const teamDiv = document.querySelector(`.team[data-team="${team}"]`);
  teamDiv.querySelector('.score').textContent = scores[team];
}

const buttons = document.querySelectorAll('.score-btn');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const team = parseInt(btn.getAttribute('data-team'), 10);
    const points = parseInt(btn.getAttribute('data-points'), 10);
    updateScore(team, points);
  });
});
