import * as THREE from 'three';
import { getResourceName } from './resources';
import { type Object3D } from 'three';
import { getSingleEntity } from '../services/entities';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

export const generateAStickman = (node): THREE.Group => {
  const stickman = new THREE.Group();

  const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const headMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.y = 5;
  stickman.add(head);

  const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 32);
  const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 2.5;
  stickman.add(body);

  const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 32);
  const armMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const rightArm = new THREE.Mesh(armGeometry, armMaterial);
  rightArm.position.x = 1;
  rightArm.position.y = 2.5;
  stickman.add(rightArm);

  const leftArm = new THREE.Mesh(armGeometry, armMaterial);
  leftArm.position.x = -1;
  leftArm.position.y = 2.5;
  stickman.add(leftArm);

  const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
  const legMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
  rightLeg.position.x = 0.5;
  rightLeg.position.y = 0.5;
  stickman.add(rightLeg);

  const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
  leftLeg.position.x = -0.5;
  leftLeg.position.y = 0.5;
  stickman.add(leftLeg);

  const nodeEl = document.createElement('div');
  nodeEl.textContent = node.id;
  nodeEl.style.color = node.color;
  nodeEl.style.fontWeight = 'bold';
  nodeEl.className = 'node-label';
  const textObject = new CSS2DObject(nodeEl);
  textObject.position.x = 0.0;
  textObject.position.y = -1.2;

  stickman.add(textObject);

  return stickman;
};

export const getLoadingImage = (name: string): Object3D => {
  const node = new THREE.Object3D();

  // create loading state mesh
  const loadingGeometry = new THREE.BoxGeometry(0, 0, 0);
  const loadingMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const loadingMesh = new THREE.Mesh(loadingGeometry, loadingMaterial);

  // set loading state mesh as child of node
  node.add(loadingMesh);

  // fetch data
  void getSingleEntity(getResourceName(name)).then((url) => {
    // create texture and material
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');
    // TODO: Might need some proxy or fix using backend
    const imgTexture = textureLoader.load('https://cors-anywhere.herokuapp.com/' + url.image.value);
    const material = new THREE.SpriteMaterial({ map: imgTexture });

    // create sprite and set it as child of node
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(12, 12, 12);
    node.add(sprite);

    // remove loading state mesh
    node.remove(loadingMesh);
  });

  return node;
};
