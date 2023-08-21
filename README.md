# Cesium.js 如何来写一个水波圈（扩撒圈）特效？

> Cesium.js 提供了许多功能来绘制可视化地球表面上的各种几何图形。其中之一是 Ellipse，它用于绘制椭圆形。
>
> 以下是我绘制的一个水波圈案例，它虽然是通过 Ellipse 来绘制的，但是还需要额外自定义 GLSL 效果。
>
> - [查看地址](https://cesium-circle-ripple.vercel.app/)
> - [仓库地址](https://github.com/WaterSeeding/CesiumCircleRipple)

<br />

## 介绍

![后期处理](<./md/Cesium.js如何来写一个水波圈(扩撒圈)特效？/1.gif>)

如图所示，以一地点为中心，绘制一个水波圈，随着时间不断往外扩撒、动画。

<br />

## 设置

1. 我将这个水波圈（扩撒圈）特效封装成了一个CircleRipple组件，并使用该组件的add绘制了一个定点水波圈。

```tsx
let circleWave = new CircleRipple(viewer, 'circleRipple');
circleWave.add(
  [114.04821657959855, 22.508607376269367, 10],
  'green',
  1000,
  3000,
);
```

2. 这个CircleRipple组件里的核心是，创建EllipseGraphics图形，并设置相关属性：

```tsx
this.viewer.entities.add({
  id: _this.id,
  position: Cesium.Cartesian3.fromDegrees(
    position[0],
    position[1],
    position[2],
  ),
  ellipse: {
    semiMinorAxis: new Cesium.CallbackProperty(function (n) {
      return _this.maxRadius;
    }, false),
    semiMajorAxis: new Cesium.CallbackProperty(function (n) {
      return _this.maxRadius;
    }, false),
    // @ts-ignore;
    material: new CircleRippleMaterialProperty({
      duration: duration,
      gradient: 0.5,
      color: Cesium.Color.fromCssColorString(color),
      count: count,
    }),
  },
});
```

CircleRippleMaterialProperty是我另外封装类似MaterialProperty的材质属性类，通过该类来实现水波圈，随着时间不断往外扩撒、动画。

<br />

## 相关资料

- [Cesium](https://cesium.com/)
- [Cesium Documentation](https://cesium.com/docs/)
