import * as Cesium from "cesium";
import RoadImageFlowMaterialGLSL from "./glsl/shader";

let RoadImageFlowMaterialSource = RoadImageFlowMaterialGLSL.replace(
  /#define GLSLIFY 1/g,
  ""
);

const setMaterial = (image: string) => {
  const material = new Cesium.Material({
    strict: false,
    translucent: function () {
      return true;
    },
    minificationFilter: Cesium.TextureMinificationFilter.LINEAR,
    magnificationFilter: Cesium.TextureMagnificationFilter.LINEAR,
    fabric: {
      uniforms: {
        image: image,
        speed: 10,
      },
      source: RoadImageFlowMaterialSource,
    },
  });

  return material;
};

export default setMaterial;
