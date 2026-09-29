# Chapter 8: HTML CSS Basics

### What is CSS?
CSS stands for **Cascading Style Sheets**. CSS saves a lot of work, as it can control the layout of multiple web pages all at once, and describes how HTML elements should be displayed.

> **Key Note:** CSS can be added to HTML documents in three ways: inline, internal (embedded), and external.

### Inline CSS
An inline CSS is used to apply a unique style to a single HTML element, specified using the `style` attribute:

```html
<h1 style="color:blue;text-align:center;">This is a heading</h1>
```

### Internal CSS
An internal CSS is used to define a style for a single HTML page, defined in the `<head>` section of an HTML page, within a `<style>` element:

```html
<head>
<style>
body {background-color: powderblue;}
h1   {color: blue;}
p    {color: red;}
</style>
</head>
```

### External CSS
With an external style sheet, you can change the look of an entire website by changing just one file. Each HTML page must include a reference to the external style sheet file inside the `<link>` element:

```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

The external style sheet file (`styles.css`) may look like this:

```css
body {
  background-color: powderblue;
}
h1 {
  color: blue;
}
```

### CSS Colors, Fonts and Sizes
Below is an example of how to style the color, font, and size of text:

```html
<style>
h1 {
  color: green;
  font-family: verdana;
  font-size: 300%;
}
</style>
```

### CSS Border
The CSS `border` property defines a border around an HTML element:

```html
p {
  border: 1px solid Powderblue;
}
```

### CSS Padding
The CSS `padding` property defines a padding (space) between the text and the border:

```html
p {
  border: 1px solid Powderblue;
  padding: 30px;
}
```

### CSS Margin
The CSS `margin` property defines a margin (space) outside the border:

```html
p {
  border: 1px solid Powderblue;
  margin: 50px;
}
```

### External References
Even a link to an external CSS file can be a full URL, or a path relative to the current web page — external references save time and file space, because you can define an HTML tag's style only once, and use it on multiple pages.

This text is loaded dynamically from an external `.md` Markdown file!
