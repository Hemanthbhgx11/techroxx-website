# Chapter 20: HTML Graphics & Responsive Design

### The HTML `<canvas>` Element
The HTML `<canvas>` element is used to draw graphics on a web page via JavaScript. The `<canvas>` element is only a container for graphics — you must use a script to actually draw the graphics:

```html
<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>

<script>
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);
</script>
```

> **Key Note:** Canvas draws graphics on the fly using JavaScript, and is rendered pixel by pixel, making it ideal for game graphics and dynamic charts.

### HTML `<svg>` Element
SVG stands for **Scalable Vector Graphics**, and is used to define vector-based graphics for the web:

```html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
</svg>
```

> **Key Note:** Unlike canvas, SVG graphics are defined in XML format, and each element is part of the DOM, so JavaScript event handlers can be attached to individual shapes.

### SVG vs. Canvas
| Feature | SVG | Canvas |
|---|---|---|
| Format | XML-based, vector | Pixel-based |
| Scaling | Scales without quality loss | Can become pixelated |
| Performance | Better for fewer, larger objects | Better for many small objects |
| Interactivity | Supports event listeners on shapes | Requires manual hit detection |

### HTML Responsive Web Design
Responsive Web Design makes your web page look good on all devices, using only HTML and CSS, by resizing, hiding, shrinking, enlarging, or moving the content to make it look good on any screen.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

> **Key Note:** The `viewport` meta tag gives the browser instructions on how to control the page's dimensions and scaling, and is essential for responsive design on mobile devices.

### Responsive Images
Responsive images automatically adjust to fit the size of the screen, using CSS:

```css
img {
  max-width: 100%;
  height: auto;
}
```

### Responsive Text Size
The text size can be set with a "vw" unit, which means "viewport width", so the text size will follow the size of the browser window:

```html
<h1 style="font-size:10vw">Hello World</h1>
```

### Media Queries
On top of what responsive images and text can do, you can use media queries to add breakpoints where certain parts of the design will behave differently on each side of the breakpoint:

```css
@media screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
```

### Wrapping Up
Congratulations on completing this HTML chapter series! From basic document structure to semantic layout, forms, media, and responsive graphics, you now have a solid foundation to continue building real-world web pages — the natural next step is learning **CSS** and **JavaScript** in depth to bring your HTML pages to life.

This text is loaded dynamically from an external `.md` Markdown file!
