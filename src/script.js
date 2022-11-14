import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as dat from "dat.gui"

const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load("/textures/map.png")

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereGeometry(0.5, 64, 64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 1
material.roughness = 0.3
material.normalMap = normalTexture
material.color = new THREE.Color(0x000000)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights

// const pointLight = new THREE.PointLight(0xffffff, 10)
// pointLight.position.set(1, 1, 2)
// scene.add(pointLight)
const directionLight = new THREE.DirectionalLight(0xffffff, 7)
// directionLight.position.set(0, 0, 0)
scene.add(directionLight)

const redLight = new THREE.PointLight(0xff0000, 20)
redLight.position.set(6, 6, 0)
scene.add(redLight)

const cyanLight = new THREE.PointLight(0x00ffff, 20)
cyanLight.position.set(-4, -4, 0)
scene.add(cyanLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

const onMouseMove = (event) => {
  mouseX = event.clientX - windowHalfX
  mouseY = event.clientY - windowHalfY
}

document.addEventListener("mousemove", onMouseMove)

const clock = new THREE.Clock()

const tick = () => {
  targetX = mouseX * 0.001
  targetY = mouseY * 0.001
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime
  sphere.rotation.x = 0.5 * elapsedTime

  sphere.rotation.x += 0.5 * (targetX - sphere.rotation.x)
  sphere.rotation.y += 0.5 * (targetY - sphere.rotation.y)
  sphere.position.z += -0.01 * (targetY - sphere.position.x)

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
