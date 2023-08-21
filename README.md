# Cesium.js 中如何自定义 Material？

> 本文描述了如何在 Cesium.js 自定义一个 Material，并展示效果。
>
> - [查看地址](https://cesium-road-image-flow-material.vercel.app/)
> - [仓库地址](https://github.com/WaterSeeding/CesiumRoadImageFlowMaterial)

<br />

## 介绍

![Material](./md/1.gif)

Cesium.js 中的 Material 对象是一个包含各种属性和方法的 JavaScript 对象，用于描述和定义渲染材质。
可以使用 Material 对象来创建各种效果，如基础颜色、纹理映射、透明度、光照效果等。

Material 的相关属性：

- uniforms：包含材质的各种属性值，例如颜色、纹理、透明度等
- fragmentShaderSource：片段着色器代码，用于控制像素的渲染和着色
- translucent：指示材质是否具有透明度
- renderState：定义渲染状态，如混合模式、深度测试等

<br />

## 开发

1. 加载路线资源链接，获取路线地理数据

```tsx
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
        })
      );
    });
  });
}
```

2. 自定义 Material 材质内容

```tsx
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
```

shader 代码特效：

```tsx
czm_material czm_getMaterial(czm_materialInput materialInput) {
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  vec4 colorImage = texture(image, vec2(fract((st.s - speed * czm_frameNumber * 0.001)), st.t));
  material.alpha = colorImage.a;
  material.diffuse = colorImage.rgb * 1.5 ;
  return material;
}
```

## 相关资料

- [Cesium](https://cesium.com/)
- [Cesium Documentation](https://cesium.com/docs/)
