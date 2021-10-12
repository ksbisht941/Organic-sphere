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
    this.timeFrequency = 0.0001;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: "sphere",
        expanded: true,
      });

      this.debugFolder.addInput(
        this,
        "timeFrequency",
        {
          min: 0,
          max: 0.001,
          step: 0.000001,
        }
      );
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
        uDistortionStrength: { value: 2.175 },
        uDisplacementFrequency: { value: 2.0 },
        uDisplacementStrength: { value: 0.120 },
        uTimeFrequency: { value: 0.0001 },
        uTime: { value: 0 },
      },
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });

    if (this.debug) {
      this.debugFolder.addInput(
        this.material.uniforms.uDistortionFrequency,
        "value",
        {
          label: "uDistortionFrequency",
          min: 0,
          max: 10,
          step: 0.001,
        }
      );
      this.debugFolder.addInput(
        this.material.uniforms.uDistortionStrength,
        "value",
        {
          label: "uDistortionStrength",
          min: 0,
          max: 10,
          step: 0.001,
        }
      );
      this.debugFolder.addInput(
        this.material.uniforms.uDisplacementFrequency,
        "value",
        {
          label: "uDisplacementFrequency",
          min: 0,
          max: 10,
          step: 0.001,
        }
      );
      this.debugFolder.addInput(
        this.material.uniforms.uDisplacementStrength,
        "value",
        {
          label: "uDisplacementStrength",
          min: 0,
          max: 10,
          step: 0.001,
        }
      );
      this.debugFolder.addInput(
        this.material.uniforms.uTimeFrequency,
        "value",
        {
          label: "uTimeFrequency",
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
    this.material.uniforms.uTime.value += this.time.delta * this.timeFrequency;
  }
}
