# Chapter 7: HTML Colors

### HTML Colors
Colors are specified using predefined color names, or RGB, HEX, HSL, RGBA, or HSLA values.

> **Key Note:** The `background-color` property can be used to set a background color for HTML elements, while the `color` property sets the color of the text.

```html
<h1 style="background-color:DodgerBlue;">Hello World</h1>
<p style="background-color:Tomato;">Lorem ipsum...</p>
```

### Color Names
HTML supports 140 standard color names, such as `Tomato`, `Orange`, `DodgerBlue`, `MediumSeaGreen`, `Gray`, `SlateBlue`, and `Violet`.

### HTML Background Color
You can set the background color for HTML elements using the CSS `background-color` property:

```html
<body style="background-color:powderblue;">
```

### HTML Text Color
You can set the color of text using the CSS `color` property:

```html
<h1 style="color:Tomato;">Hello World</h1>
```

### HTML Border Color
You can set the color of borders using the CSS `border` property:

```html
<h1 style="border:2px solid Tomato;">Hello World</h1>
```

### HTML Color Values
In HTML, colors can also be specified using RGB values, HEX values, HSL values, RGBA values, and HSLA values.

```html
<h1 style="background-color:rgb(255, 99, 71);">...</h1>
<h1 style="background-color:#ff6347;">...</h1>
<h1 style="background-color:hsl(9, 100%, 64%);">...</h1>
```

### RGB Value
In HTML, a color can be specified as an RGB value, using this formula: `rgb(red, green, blue)`. Each parameter defines the intensity of the color between 0 and 255:

```html
rgb(255, 0, 0)   /* red */
rgb(0, 255, 0)   /* green */
rgb(0, 0, 255)   /* blue */
```

### RGBA Value
RGBA color values are an extension of RGB color values with an **alpha channel** — which specifies the opacity of a color:

```html
rgba(255, 99, 71, 0.5)
```

> **Key Note:** The alpha parameter is a number between 0.0 (fully transparent) and 1.0 (not transparent at all).

### HEX Value
In HTML, a color can be specified using a hexadecimal value in the form: `#rrggbb`, where `rr` (red), `gg` (green) and `bb` (blue) are hexadecimal integers between `00` and `ff`:

```html
#ff0000  /* red */
#00ff00  /* green */
#0000ff  /* blue */
```

### HSL Value
HSL stands for hue, saturation, and lightness — specified with: `hsl(hue, saturation, lightness)`:

```html
hsl(0, 100%, 50%)   /* red */
hsl(120, 100%, 50%) /* green */
hsl(240, 100%, 50%) /* blue */
```

This text is loaded dynamically from an external `.md` Markdown file!
