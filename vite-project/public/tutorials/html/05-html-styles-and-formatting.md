# Chapter 5: HTML Styles & Formatting

### The HTML style Attribute
Setting the style of an HTML element can be done with the `style` attribute, which can be used to set properties like color, font, size, and more.

```html
<tagname style="property:value;">
```

> **Key Note:** The property is a CSS property and the value is a valid CSS property value. Multiple properties are separated by semicolons.

### Background Color
The CSS `background-color` property defines the background color for an HTML element:

```html
<body style="background-color:powderblue;">
<h1>This is a heading</h1>
<p>This is a paragraph.</p>
</body>
```

### Text Color
The CSS `color` property defines the text color for an HTML element:

```html
<h1 style="color:blue;">This is a heading</h1>
<p style="color:red;">This is a paragraph.</p>
```

### Fonts
The CSS `font-family` property defines the font to be used for an HTML element:

```html
<h1 style="font-family:verdana;">This is a heading</h1>
<p style="font-family:courier;">This is a paragraph.</p>
```

### Text Size
The CSS `font-size` property defines the text size for an HTML element:

```html
<h1 style="font-size:300%;">This is a heading</h1>
<p style="font-size:160%;">This is a paragraph.</p>
```

### Text Alignment
The CSS `text-align` property defines the horizontal text alignment for an HTML element:

```html
<h1 style="text-align:center;">Centered Heading</h1>
<p style="text-align:center;">Centered paragraph.</p>
```

### HTML Text Formatting Elements
HTML also contains several elements for defining text with a special meaning:

```html
<b>Bold text</b>
<strong>Important text</strong>
<i>Italic text</i>
<em>Emphasized text</em>
<mark>Marked text</mark>
<small>Smaller text</small>
<del>Deleted text</del>
<ins>Inserted text</ins>
<sub>Subscript text</sub>
<sup>Superscript text</sup>
```

> **Key Note:** `<strong>` and `<em>` carry semantic meaning (importance/emphasis), while `<b>` and `<i>` are purely presentational.

### HTML `<mark>` Element
The `<mark>` element defines text that should be **highlighted**:

```html
<p>Do not forget to buy <mark>milk</mark> today.</p>
```

This text is loaded dynamically from an external `.md` Markdown file!
