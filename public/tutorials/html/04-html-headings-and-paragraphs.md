# Chapter 4: HTML Headings & Paragraphs

### HTML Headings
HTML headings are defined with the `<h1>` to `<h6>` tags, with `<h1>` defining the most important heading and `<h6>` defining the least important:

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

> **Key Note:** Browsers automatically add some white space (margin) before and after a heading.

### Headings Are Important
Search engines use headings to index the structure and content of your web pages. Users skim pages by their headings, so it is important to use headings to show the document structure.

> **Key Note:** Use `<h1>` for main headings, followed by `<h2>` headings, then the less important `<h3>`, and so on. Do not skip heading levels — start with `<h1>`, then use `<h2>` before using `<h3>`.

### Bigger Headings
Each HTML heading has a default size, but sizes can be customized with the `style` attribute, using the CSS `font-size` property:

```html
<h1 style="font-size:60px;">Heading 1</h1>
```

### The HTML `<p>` Element
The `<p>` element defines a paragraph. Paragraphs always start on a new line, and browsers automatically add some space (margin) before and after a paragraph.

```html
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
```

### Display of HTML
You cannot be sure how HTML will be displayed. Large or small screens, and resized windows, will create different results, and with HTML, you cannot change the display by adding extra spaces or extra lines in your HTML code — the browser will automatically remove any extra spaces and lines when the page is displayed.

```html
<p>
This paragraph
contains a lot of lines
in the source code,
but the browser
ignores it.
</p>
```

### HTML Horizontal Rules
The `<hr>` tag defines a thematic break and is used to separate content:

```html
<p>This is paragraph 1.</p>
<hr>
<p>This is paragraph 2.</p>
```

### The HTML `<br>` Element
Use the `<br>` element if you want a line break (a new line) without starting a new paragraph:

```html
<p>This is<br>a paragraph<br>with line breaks.</p>
```

### The HTML `<pre>` Element
The `<pre>` element defines preformatted text and is displayed in a fixed-width font, preserving both spaces and line breaks:

```html
<pre>
  My Bonnie lies over the ocean.

  My Bonnie lies over the sea.
</pre>
```

This text is loaded dynamically from an external `.md` Markdown file!
