import * as Cesium from "cesium";
import setMaterial from './setMaterial';

const addRoad = (viewer: Cesium.Viewer, url: string) => {
  const resource = Cesium.Resource.fetch({ url: url });
  resource?.then((resJson: any) => {
    let res = JSON.parse(resJson);
    const { features } = res;
    const instance: any = [];
    if (features?.length) {
      features.forEach((item: any) => {
        const coordinates = item.geometry.coordinates;
        coordinates.forEach((subCoordinates: number[][]) => {
          let posCoordinates: number[] = [];
          subCoordinates.forEach((coordinate: number[]) => {
            posCoordinates = posCoordinates.concat(coordinate);
          });
          const polyline = new Cesium.PolylineGeometry({
            positions: Cesium.Cartesian3.fromDegreesArray(posCoordinates),
            width: 1.7,
            vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
          });
          const geometry = Cesium.PolylineGeometry.createGeometry(polyline);
          instance.push(
            new Cesium.GeometryInstance({
              geometry: geometry!,
            }),
          );
        });
      });

      const material = setMaterial('./static/img/image.png');
      const appearance = new Cesium.PolylineMaterialAppearance({
        material: material,
      });
      const primitive = new Cesium.Primitive({
        geometryInstances: instance,
        appearance,
        asynchronous: false,
      });

      viewer.scene.primitives.add(primitive);
    }
  });
};

export default addRoad;
