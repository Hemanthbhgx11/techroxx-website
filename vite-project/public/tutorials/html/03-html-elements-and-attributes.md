# Chapter 3: HTML Elements & Attributes

### HTML Elements
An HTML element is defined by a start tag, some content, and an end tag:

```html
<tagname>Content goes here...</tagname>
```

> **Key Note:** Nested elements means elements can contain other elements. All HTML documents consist of nested HTML elements.

### Nested HTML Elements
The example below contains four HTML elements (`<html>`, `<body>`, `<h1>`, and `<p>`):

```html
<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>
```

### Never Skip the End Tag
Some HTML elements will display correctly even if you forget the end tag, but do not rely on this — unexpected results and errors may occur if you forget the end tag.

### Empty HTML Elements
HTML elements with no content are called **empty elements**. The `<br>` tag defines a line break and is an empty element without a closing tag:

```html
<p>This is a <br> paragraph with a line break.</p>
```

### HTML is Not Case Sensitive
HTML tags are not case sensitive: `<P>` means the same as `<p>`. However, the World Wide Web Consortium (W3C) recommends **lowercase** tags in HTML.

### HTML Attributes
Attributes provide **additional information** about HTML elements.

> **Key Note:** All HTML elements can have attributes, and attributes are always specified in the start tag, usually as name/value pairs like `name="value"`.

### The href Attribute
The `<a>` tag defines a hyperlink. The `href` attribute specifies the URL of the page the link goes to:

```html
<a href="https://www.example.com">Visit our site</a>
```

### The src Attribute
The `<img>` tag is used to embed an image. The `src` attribute specifies the path to the image to be displayed:

```html
<img src="img_girl.jpg">
```

### The width and height Attributes
The `<img>` tag should also contain the `width` and `height` attributes, which specify the width and height of the image (in pixels):

```html
<img src="img_girl.jpg" width="500" height="600">
```

### The alt Attribute
The `alt` attribute specifies an alternative text to be used when an image cannot be displayed:

```html
<img src="img_girl.jpg" alt="Girl with a jacket">
```

### The style Attribute
The `style` attribute is used to add styles to an element, such as color, font, size, and more:

```html
<p style="color:red;">This is a red paragraph.</p>
```

### The lang Attribute
You should always include the `lang` attribute inside the `<html>` tag to declare the language of the Web page, intended for accessibility and search engines:

```html
<html lang="en-US">
```

### The title Attribute
The `title` attribute defines some extra information about an element, displayed as a tooltip when the mouse moves over the element:

```html
<p title="I'm a tooltip">This is a paragraph.</p>
```

> **Key Note:** Always use lowercase attribute names, and always quote attribute values with double quotes for consistency.

This text is loaded dynamically from an external `.md` Markdown file!
