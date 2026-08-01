# Chapter 13: HTML Div & Span

### HTML Block and Inline Elements
Every HTML element has a default display value, depending on what type of element it is. There are two display values: **block** and **inline**.

> **Key Note:** A block-level element always starts on a new line and takes up the full width available. An inline element does not start on a new line and only takes up as much width as necessary.

### Block-level Elements
A block-level element always starts on a new line and takes up the full width available (stretches out to the left and right as far as it can). Examples of block-level elements:

```html
<div> <h1> to <h6> <p> <form> <header> <footer> <section>
```

### Inline Elements
An inline element does not start on a new line and only takes up as much width as necessary. Examples of inline elements:

```html
<span> <a> <img> <strong> <em> <button> <input>
```

### The HTML `<div>` Element
The `<div>` element is often used as a container for other HTML elements, and has no required attributes, but `style`, `class` and `id` are common. When used together with CSS, the `<div>` element can be used to style and layout content:

```html
<div style="background-color:lightblue; text-align:center;">
  <h2>London</h2>
  <p>London is the capital city of England.</p>
</div>
```

> **Key Note:** The `<div>` element is easy to style by using the `class` or `id` attribute, and is commonly used as a block-level container to group sections of a page.

### The HTML `<span>` Element
The `<span>` element is an inline container used to mark up a part of a text, or a part of a document, and has no required attributes, but `style`, `class` and `id` are common:

```html
<p>My mother has <span style="color:blue;font-weight:bold;">blue</span> eyes.</p>
```

> **Key Note:** The `<span>` element is often used to group inline-elements in a document for styling purposes, unlike `<div>` which groups block-level content.

### Grouping Content with `<div>`
The `<div>` element is often used to group larger chunks of HTML together so they can be styled with CSS, or manipulated with JavaScript:

```html
<div class="card">
  <h3>Product Name</h3>
  <p>Product description goes here.</p>
</div>
```

### Grouping Content with `<span>`
The `<span>` element is best used when no other semantic element is appropriate — commonly used to highlight or style a portion of text without breaking the flow of a paragraph.

This text is loaded dynamically from an external `.md` Markdown file!
