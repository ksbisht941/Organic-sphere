import * as THREE from "three";
import Experience from "./Experience";
import vertexShader from "./shaders/sphere/vertex.glsl";
import fragmentShader from "./shaders/sphere/fragment.glsl";

export default class Sphere {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "sphere",
        expanded: true,
      });
    }

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(1, 256, 256);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uDistortionFrequency: { value: 2.0 },
        uDistortionStrength: { value: 1.0 },
        uDisplacementFrequency: { value: 2.0 },
        uDisplacementStrength: { value: 0.2 },
        uTimeFrequency: { value: 0.0001 },
        uTime: { value: 0 },
      },
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });

    if (this.debug) {
      this.debugFolder.addInput(
        this.material.uniforms.uDisplacementFrequency,
        "value",
        {
          label: "uDistortionFrequency",
          min: 0,
          max: 10,
          step: 0.001,
        }
      );
    }
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  update() {
    this.material.uniforms.uTime.value = this.time.elapsed;
  }
}
