const chapters = [...document.querySelectorAll('.chapter')];
const dots = [...document.querySelectorAll('.chapter-dot')];
const number = document.querySelector('#chapterNumber');
const pageCurrent = document.querySelector('#pageCurrent');
const pageTotal = document.querySelector('#pageTotal');
const loader = document.querySelector('.loader');

if (pageTotal) pageTotal.textContent = String(chapters.length).padStart(2, '0');

window.addEventListener('load', () => setTimeout(() => loader.classList.add('is-gone'), 650));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const index = chapters.indexOf(entry.target);
    entry.target.classList.add('visible');
    dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
    const pageNumber = String(index + 1).padStart(2, '0');
    if (number) number.textContent = pageNumber;
    if (pageCurrent) pageCurrent.textContent = pageNumber;
  });
}, { threshold: 0.52 });
chapters.forEach((chapter) => observer.observe(chapter));

document.querySelectorAll('[data-next]').forEach((button) => {
  button.addEventListener('click', () => document.querySelector(button.dataset.next)?.scrollIntoView({ behavior: 'smooth' }));
});

const confettiBurst = () => {
  if (typeof confetti !== 'function') return;
  confetti({ particleCount: 90, spread: 80, origin: { y: .58 }, colors: ['#e8a28e', '#f4d29b', '#ffffff', '#a9445a'] });
  setTimeout(() => confetti({ particleCount: 45, angle: 60, spread: 55, origin: { x: 0, y: .65 }, colors: ['#e8a28e', '#f4d29b'] }), 180);
  setTimeout(() => confetti({ particleCount: 45, angle: 120, spread: 55, origin: { x: 1, y: .65 }, colors: ['#e8a28e', '#f4d29b'] }), 180);
};

document.querySelector('.open-surprise').addEventListener('click', () => setTimeout(confettiBurst, 500));

const blowButton = document.querySelector('#blowButton');
const flame = document.querySelector('#flame');
const cakeMessage = document.querySelector('#cakeMessage');
blowButton.addEventListener('click', () => {
  if (flame.classList.contains('out')) return;
  flame.classList.add('out');
  cakeMessage.textContent = 'wish sent into the universe ✦';
  cakeMessage.classList.add('done');
  confettiBurst();
});

const envelope = document.querySelector('#envelope');
const fullLetter = document.querySelector('#fullLetter');
envelope.addEventListener('click', () => {
  envelope.classList.add('open');
  setTimeout(() => fullLetter.classList.add('visible'), 850);
});

const cards = [...document.querySelectorAll('.reason-card')];
let cardIndex = 0;
const reasonIndex = document.querySelector('#reasonIndex');
const renderCard = (nextIndex) => {
  cardIndex = (nextIndex + cards.length) % cards.length;
  cards.forEach((card, index) => {
    card.style.display = index === cardIndex ? 'flex' : '';
    card.classList.toggle('active-card', index === cardIndex);
  });
  reasonIndex.textContent = String(cardIndex + 1).padStart(2, '0');
};
document.querySelector('#nextReason').addEventListener('click', () => renderCard(cardIndex + 1));
document.querySelector('#prevReason').addEventListener('click', () => renderCard(cardIndex - 1));

const teddyBear = document.querySelector('#teddyBear');
const hugMessage = document.querySelector('#hugMessage');
let playBoyHug = () => {};
document.querySelector('#hugButton').addEventListener('click', (event) => {
  event.stopPropagation();
  teddyBear.classList.add('hug');
  hugMessage.textContent = 'hug delivered ♥';
  playBoyHug();
  setTimeout(() => teddyBear.classList.remove('hug'), 1600);
});
teddyBear.addEventListener('click', (event) => {
  if (event.target.closest('#hugButton')) return;
  const isHugging = teddyBear.classList.toggle('hug');
  hugMessage.textContent = isHugging ? 'the biggest hug ♥' : 'tap the teddy';
  if (isHugging) playBoyHug();
});

const answerResponse = document.querySelector('#answerResponse');
document.querySelector('#yesButton').addEventListener('click', () => {
  answerResponse.textContent = 'I knew it. I love you more. ♥';
  confettiBurst();
});
document.querySelector('#yesBiggerButton').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.textContent = 'YES! ♥';
  button.style.transform = 'scale(1.12)';
  answerResponse.textContent = 'That is the answer I was hoping for ✦';
  confettiBurst();
});

const backgroundMusic = document.querySelector('#backgroundMusic');
const musicToggle = document.querySelector('#musicToggle');
const setMusicState = (isPlaying) => {
  musicToggle.classList.toggle('off', !isPlaying);
  musicToggle.querySelector('span:last-child').textContent = isPlaying ? 'sound on' : 'tap for music';
};
const startMusic = () => backgroundMusic.play()
  .then(() => setMusicState(true))
  .catch(() => setMusicState(false));

startMusic();
const startMusicOnInteraction = (event) => {
  if (event.target.closest?.('#musicToggle')) return;
  document.removeEventListener('pointerdown', startMusicOnInteraction);
  document.removeEventListener('keydown', startMusicOnInteraction);
  startMusic();
};
document.addEventListener('pointerdown', startMusicOnInteraction);
document.addEventListener('keydown', startMusicOnInteraction);

musicToggle.addEventListener('click', () => {
  if (backgroundMusic.paused) {
    startMusic();
    return;
  }
  backgroundMusic.pause();
  setMusicState(false);
});

document.querySelector('.replay-button').addEventListener('click', () => {
  envelope.classList.remove('open');
  fullLetter.classList.remove('visible');
  flame.classList.remove('out');
  cakeMessage.textContent = 'Tap to blow out the candle';
  cakeMessage.classList.remove('done');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const threeMount = document.querySelector('#boy3d');
if (window.THREE && threeMount) {
  try {
    const THREE = window.THREE;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, .1, 50);
    camera.position.set(0, 2.75, 11.5);
    camera.lookAt(0, 2.65, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    threeMount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffeadb, 0x46303a, 2.1));
    const keyLight = new THREE.DirectionalLight(0xfff2e5, 3.2);
    keyLight.position.set(-3, 7, 6);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xd5a1a4, 1.4);
    fillLight.position.set(4, 3, 2);
    scene.add(fillLight);

    const material = (color, roughness = .8) => new THREE.MeshStandardMaterial({ color, roughness });
    const skin = material(0xe8c2a4);
    const hair = material(0xd0b18d);
    const coat = material(0xb8a087);
    const coatLight = material(0xd0baa0);
    const trousers = material(0x685c50);
    const white = material(0xf1efeb, .55);
    const dark = material(0x392d2a, .35);
    const boy = new THREE.Group();
    scene.add(boy);

    const addMesh = (parent, geometry, meshMaterial, position, scale) => {
      const object = new THREE.Mesh(geometry, meshMaterial);
      object.position.set(...position);
      if (scale) object.scale.set(...scale);
      parent.add(object);
      return object;
    };
    const sphere = (parent, position, scale, meshMaterial) => addMesh(parent, new THREE.SphereGeometry(1, 32, 24), meshMaterial, position, scale);
    const capsule = (parent, position, radius, length, meshMaterial, scale = [1, 1, 1]) => addMesh(parent, new THREE.CapsuleGeometry(radius, length, 8, 16), meshMaterial, position, scale);

    sphere(boy, [0, 2.55, 0], [.61, .77, .42], coat);
    capsule(boy, [0, 2.5, .4], .28, .65, white, [1, 1, .3]);
    const hood = addMesh(boy, new THREE.TorusGeometry(.39, .12, 12, 32), coatLight, [0, 3.05, .03]);
    hood.rotation.x = Math.PI / 2;

    sphere(boy, [0, 3.72, 0], [.44, .53, .39], skin);
    sphere(boy, [-.44, 3.7, 0], [.1, .15, .09], skin);
    sphere(boy, [.44, 3.7, 0], [.1, .15, .09], skin);
    sphere(boy, [0, 4.08, -.01], [.47, .26, .41], hair);
    const fringe = sphere(boy, [-.13, 4.03, .31], [.37, .15, .15], hair);
    fringe.rotation.z = -.23;
    sphere(boy, [.32, 3.91, .05], [.12, .28, .35], hair);
    for (const eyeX of [-.16, .16]) {
      sphere(boy, [eyeX, 3.75, .36], [.075, .085, .035], white);
      sphere(boy, [eyeX, 3.75, .392], [.04, .055, .02], dark);
      sphere(boy, [eyeX - .012, 3.77, .41], [.013, .018, .008], white);
    }
    sphere(boy, [0, 3.59, .4], [.045, .055, .045], skin);
    const smileCurve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-.08, 3.48, .37), new THREE.Vector3(0, 3.43, .41), new THREE.Vector3(.08, 3.48, .37));
    addMesh(boy, new THREE.TubeGeometry(smileCurve, 12, .012, 6, false), dark, [0, 0, 0]);

    for (const side of [-1, 1]) {
      const leg = capsule(boy, [side * .23, 1.16, 0], .2, .87, trousers, [1, 1, .92]);
      leg.rotation.z = side * -.025;
      sphere(boy, [side * .25, .3, .13], [.29, .14, .43], white);
      sphere(boy, [side * .25, .22, .16], [.3, .055, .44], material(0xc8c6c2));
    }

    const makeArm = (x, angle) => {
      const arm = new THREE.Group();
      arm.position.set(x, 2.88, .02);
      arm.rotation.z = angle;
      boy.add(arm);
      capsule(arm, [0, -.43, 0], .17, .58, coatLight);
      capsule(arm, [0, -.78, .02], .145, .13, coat);
      sphere(arm, [0, -.91, .04], [.14, .16, .14], skin);
      return arm;
    };
    const leftArm = makeArm(-.5, -.25);
    const rightArm = makeArm(.5, .12);

    rightArm.rotation.z = 2.45;

    const balloon = new THREE.Group();
    balloon.position.set(1.08, 4.18, .55);
    scene.add(balloon);
    const balloonShape = new THREE.Shape();
    balloonShape.moveTo(0, -.18);
    balloonShape.bezierCurveTo(-.12, .02, -.72, .34, -.72, .72);
    balloonShape.bezierCurveTo(-.72, 1.14, -.2, 1.22, 0, .82);
    balloonShape.bezierCurveTo(.2, 1.22, .72, 1.14, .72, .72);
    balloonShape.bezierCurveTo(.72, .34, .12, .02, 0, -.18);
    const balloonMaterial = new THREE.MeshStandardMaterial({ color: 0xd94468, roughness: .28, metalness: .08 });
    const heartBalloon = addMesh(balloon, new THREE.ExtrudeGeometry(balloonShape, { depth: .12, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: .045, bevelThickness: .04 }), balloonMaterial, [0, 0, 0], [.52, .52, 1]);
    heartBalloon.position.z = .04;
    const balloonKnot = addMesh(balloon, new THREE.ConeGeometry(.09, .16, 5), balloonMaterial, [0, -.23, .03]);
    balloonKnot.rotation.z = Math.PI;
    const balloonString = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, -.29, .05), new THREE.Vector3(-.04, -.42, .07), new THREE.Vector3(0, -.55, .05));
    addMesh(balloon, new THREE.TubeGeometry(balloonString, 16, .009, 6, false), material(0xf2c9b3), [0, 0, 0]);
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 256;
    labelCanvas.height = 256;
    const labelContext = labelCanvas.getContext('2d');
    labelContext.fillStyle = '#fff5ed';
    labelContext.font = '700 150px Georgia';
    labelContext.textAlign = 'center';
    labelContext.textBaseline = 'middle';
    labelContext.fillText('F', 128, 133);
    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    labelTexture.colorSpace = THREE.SRGBColorSpace;
    const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture, transparent: true, depthTest: false }));
    label.position.set(0, .27, .18);
    label.scale.set(.34, .34, 1);
    balloon.add(label);

    const resize = () => {
      const width = Math.max(1, threeMount.clientWidth);
      const height = Math.max(1, threeMount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    new ResizeObserver(resize).observe(threeMount);
    resize();
    document.querySelector('#teddyBear').classList.add('has-3d');

    const clock = new THREE.Clock();
    let hugStartedAt = -Infinity;
    playBoyHug = () => { hugStartedAt = clock.getElapsedTime(); };
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      if (!reduceMotion) {
        boy.rotation.z = Math.sin(time * .75) * .018;
        boy.position.y = Math.sin(time * 1.5) * .018;
        balloon.position.y = 4.18 + Math.sin(time * 1.5 + .5) * .035;
        balloon.rotation.z = Math.sin(time * 1.1) * .035;
        const approach = THREE.MathUtils.clamp((time - hugStartedAt) / .4, 0, 1);
        const release = THREE.MathUtils.clamp((time - hugStartedAt - 1.15) / .4, 0, 1);
        const smooth = (value) => value * value * (3 - 2 * value);
        const hug = smooth(approach) * (1 - smooth(release));
        leftArm.rotation.z = THREE.MathUtils.lerp(-.25, 1.02, hug);
        leftArm.rotation.x = THREE.MathUtils.lerp(0, -.85, hug);
        rightArm.rotation.z = THREE.MathUtils.lerp(2.45, -1.02, hug);
        rightArm.rotation.x = THREE.MathUtils.lerp(0, -.85, hug);
      }
      renderer.render(scene, camera);
    };
    animate();
  } catch (error) {
    console.warn('The 3D birthday character could not be started; showing the illustration fallback.', error);
  }
}
