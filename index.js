import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.127.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load('assets/space.jpg');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alfa:true, antialias: true});



renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 0);
document.body.appendChild(renderer.domElement);
camera.position.set(0, 0, 100);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const cubeTexture = new THREE.TextureLoader().load('assets/cube.jpg');
const cube = new THREE.Mesh(
   new THREE.BoxGeometry(),
   new THREE.MeshBasicMaterial({ map: cubeTexture })
);
cube.position.z = -2;
cube.rotation.y = 10;
cube.rotation.x = 10;
scene.add(cube);

const earthTexture = new THREE.TextureLoader().load('assets/planet.jpg');
const earth = new THREE.Mesh(
   new THREE.SphereGeometry(1,64,64),
   new THREE.MeshStandardMaterial({ map: earthTexture })
);
earth.position.z = -5;
scene.add(earth);

function addStar() {
   const geometry = new THREE.SphereGeometry(0.1, 16, 16);
   const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
   const star = new THREE.Mesh(geometry, material);

   const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(90));

   star.position.set(x, y, z);
   scene.add(star);
}
Array(200).fill().forEach(addStar);


// const loader = new GLTFLoader();


function animate() {
   requestAnimationFrame(animate);

   earth.rotation.y += 0.003;
   earth.rotation.x += 0.002;
   earth.rotation.z += 0.002;

   renderer.render(scene,camera);
}
animate();

document.body.onscroll = handlerScroll;
function handlerScroll() {
   const t =  document.body.getBoundingClientRect().top;

   if(cube.rotation.y > 0 && cube.rotation.x > 0) {
      cube.rotation.y += 0.01;
      cube.rotation.x += 0.01;
   }

   if(camera .position.z < -1.4) {
      cube.rotation.y = 0;
      cube.rotation.x = 0;
      if(earth.position.x > -0.8) {
         earth.position.x -= 0.02;
      }
   } else {
      earth.position.x = 0;
   }

   camera.position.z = t * 0.001;

}