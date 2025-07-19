// STARS

const background = document.querySelector('.starfield.background');
const foreground = document.querySelector('.starfield.foreground');

// 🌟 Star generator
function createStars(container, count, sizes, colors) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.backgroundColor = color;
    star.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(star);
  }
}

createStars(background, 200, [1], ['#fff', '#ccd', '#ddf']);
createStars(foreground, 100, [1.5, 2], ['#fff', '#ffd', '#aaf', '#fdd']);


// PLANETS


const planetData = {
  etheron: {
    title: 'ETHERON',
    galaxy: 'Andromeda-IV',
    diameter: '16,400 km',
    dayLength: '26 Earth hours',
    temperature: '-20°C to 0°C',
    climate: 'Polar',
    image: 'images/img1.png'
  },
  lumenara: {
    title: 'LUMENARA',
    galaxy: 'Andromeda-IV',
    diameter: '11,540 km',
    dayLength: '20 Earth hours',
    temperature: '10°C to 30°C',
    climate: 'Temperate',
    image: 'images/img2.png'
  },
  theronix: {
    title: 'THERONIX',
    galaxy: 'Helix-9',
    diameter: '9,800 km',
    dayLength: '18 Earth hours',
    temperature: '-90°C to -40°C',
    climate: 'Frozen',
    image: 'images/img3.png'
  },
  orionis: {
    title: 'ORIONIS',
    galaxy: 'Helix-9',
    diameter: '9,800 km',
    dayLength: '18 Earth hours',
    temperature: '-90°C to -40°C',
    climate: 'Frozen',
    image: 'images/img4.png'
  }
};

const planetList = Object.keys(planetData);
let currentIndex = 0;

// DOM Elements
const mainPlanetEl = document.getElementById('mainPlanet');
const thumbLeftEl = document.getElementById('thumbLeft');
const thumbRightEl = document.getElementById('thumbRight');
const uploadInput = document.createElement('input');
uploadInput.type = 'file';
uploadInput.accept = 'image/*';
uploadInput.style.display = 'none';
document.body.appendChild(uploadInput);

// Info
const titleEl = document.getElementById('planetTitle');
const galaxyEl = document.getElementById('galaxy');
const diameterEl = document.getElementById('diameter');
const dayLengthEl = document.getElementById('dayLength');
const temperatureEl = document.getElementById('temperature');
const climateEl = document.getElementById('climate');


function getGlowColor(key) {
  switch (key) {
    case 'etheron': return '#ee2fe0';
    case 'lumenara': return '#f88a2a';
    case 'theronix': return '#3a9578';
    case 'orionis': return '#3f99cb';
    default: return '#ffffff';
  }
}


function switchPlanet(index) {
  currentIndex = index;
  const planetKey = planetList[currentIndex];
  const planet = planetData[planetKey];

  // 🔥 Set neon glow on body based on current planet
  document.body.style.setProperty('--glow-color', getGlowColor(planetKey));

  // Update main planet image and info
  mainPlanetEl.src = planet.image;
  mainPlanetEl.alt = planet.title;

  // 🌟 Add glow to main planet
  mainPlanetEl.className = 'planet-main';
  mainPlanetEl.classList.add(`glow-${planetKey}`);

  // Update text info
  titleEl.textContent = planet.title;
  galaxyEl.textContent = planet.galaxy;
  diameterEl.textContent = planet.diameter;
  dayLengthEl.textContent = planet.dayLength;
  temperatureEl.textContent = planet.temperature;
  climateEl.textContent = planet.climate;

  // Update thumbnails
  const leftIndex = (currentIndex - 1 + planetList.length) % planetList.length;
  const rightIndex = (currentIndex + 1) % planetList.length;

  const leftKey = planetList[leftIndex];
  const rightKey = planetList[rightIndex];

  const leftPlanet = planetData[leftKey];
  const rightPlanet = planetData[rightKey];

  thumbLeftEl.src = leftPlanet.image;
  thumbLeftEl.alt = leftPlanet.title;
  thumbLeftEl.onclick = () => switchPlanet(leftIndex);

  thumbRightEl.src = rightPlanet.image;
  thumbRightEl.alt = rightPlanet.title;
  thumbRightEl.onclick = () => switchPlanet(rightIndex);

  thumbLeftEl.className = 'planet-thumb thumb-left';
  thumbRightEl.className = 'planet-thumb thumb-right';

  thumbLeftEl.classList.add(`glow-${leftKey}`);
  thumbRightEl.classList.add(`glow-${rightKey}`);
}





// Left-click = next
mainPlanetEl.addEventListener('click', () => {
  const nextIndex = (currentIndex + 1) % planetList.length;
  switchPlanet(nextIndex);
});

// Right-click = upload
mainPlanetEl.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  uploadInput.click();
});

uploadInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const uploadedImage = e.target.result;
    const currentKey = planetList[currentIndex];

    planetData[currentKey].image = uploadedImage;
    mainPlanetEl.src = uploadedImage;

    // Also refresh thumbnails
    switchPlanet(currentIndex);
  };
  reader.readAsDataURL(file);
});

// INIT
switchPlanet(currentIndex);



//  SPINNING LOGIC

const thumbnails = document.querySelectorAll('.planet-thumb');
const mainPlanet = document.querySelector('.planet-main');
const orbitingRotators = document.querySelectorAll('.planet-rotator');
const orbitRings = document.querySelectorAll('.orbit');

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    // Main planet spins
    mainPlanet.classList.add('spin');

    // CSS orbiting planets spin smoothly
    orbitingRotators.forEach(rotator => {
      rotator.classList.add('spin');
    });

    // Orbits spin
    orbitRings.forEach(ring => {
      ring.classList.add('spin');
    });

    // Cleanup after animation
    setTimeout(() => {
      mainPlanet.classList.remove('spin');
      orbitingRotators.forEach(rotator => {
        rotator.classList.remove('spin');
      });
      orbitRings.forEach(ring => {
        ring.classList.remove('spin');
      });
    }, 600);
  });
});
