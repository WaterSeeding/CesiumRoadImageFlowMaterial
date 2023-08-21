import * as Cesium from "cesium"
import RoadImageFlowMaterialGLSL from './glsl/shader';

let RoadImageFlowMaterialSource = RoadImageFlowMaterialGLSL.replace(
  /#define GLSLIFY 1/g,
  '',
);

const setMaterial = (image: string) => {
  const material = new Cesium.Material({
    fabric: {
      uniforms: {
        image: image,
        speed: 10,
      },
      source: RoadImageFlowMaterialSource,
    },
    translucent: function () {
      return true;
    },
  });

  return material;
}

export default setMaterial