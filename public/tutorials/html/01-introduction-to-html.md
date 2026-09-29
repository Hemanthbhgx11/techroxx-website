# Chapter 1: Introduction to HTML

### What is HTML?
HTML stands for **Hyper Text Markup Language**. It is the standard markup language for creating Web pages. It describes the structure of a Web page and consists of a series of elements that tell the browser how to display the content.

> **Key Note:** HTML elements label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc.

### A Simple HTML Document
Below is a basic HTML document. You can click the "Try it Yourself" button below to modify the code and see the live visual output instantly!

```html
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>
```

This text is loaded dynamically from an external `.md` Markdown file!

### Example Explained
- The **`<!DOCTYPE html>`** declaration defines that this document is an HTML5 document.
- The **`<html>`** element is the root element of an HTML page.
- The **`<head>`** element contains meta information about the document, like its `<title>`.
- The **`<title>`** element specifies a title for the document, shown in the browser's title bar or tab.
- The **`<body>`** element defines the document's body and is a container for all visible content.
- The **`<h1>`** element defines a large heading.
- The **`<p>`** element defines a paragraph.

> **Key Note:** By using `<h1>` to `<h6>` tags, you can define headings for your content in order of importance.

### What is an HTML Element?
An HTML element is defined by a **start tag**, some **content**, and an **end tag**:

```html
<tagname>Content goes here...</tagname>
```

The HTML **element** is everything from the start tag to the end tag:

```html
<h1>My First Heading</h1>
<p>My first paragraph.</p>
```

> **Key Note:** Some HTML elements have no content (like the `<br>` element). These are called **empty elements**. Empty elements do not have an end tag.

### Web Browsers
The purpose of a web browser (Chrome, Edge, Firefox, Safari) is to read HTML documents and display them correctly. A browser does not display the HTML tags, but uses them to determine how to display the document.

### HTML Page Structure
Below is a visualization of an HTML page structure:

```html
<html>
  <head>
    <title>Document title</title>
  </head>
  <body>
    <h1>This is a heading</h1>
    <p>This is a paragraph.</p>
    <p>This is another paragraph.</p>
  </body>
</html>
```

> **Key Note:** Only the content inside the `<body>` section (the white area above) is displayed in a browser.

### History Note
HTML was created by **Tim Berners-Lee** in 1991 and has since evolved through several versions, with **HTML5** being the current standard, offering support for multimedia, semantic elements, and modern web applications without relying on external plugins.
