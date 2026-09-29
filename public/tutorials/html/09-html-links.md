# Chapter 9: HTML Links

### HTML Links - Hyperlinks
HTML links are hyperlinks, and you can click on a link and jump to another document. When you move the mouse over a link, the mouse arrow will turn into a little hand.

> **Key Note:** A link does not have to be text — it can be an image or any other HTML element.

### HTML Links - Syntax
The HTML `<a>` tag defines a hyperlink. It has the following syntax:

```html
<a href="url">link text</a>
```

The most important attribute of the `<a>` element is the `href` attribute, which indicates the link's destination:

```html
<a href="https://www.example.com/">Visit our website</a>
```

### Local Links
The example above used an absolute URL (a full web address). A local link (a link to the same website) is specified with a relative URL (without the `https://www` part):

```html
<a href="html_images.asp">HTML Images</a>
```

### HTML Links - The target Attribute
By default, the linked page will be displayed in the current browser window. To change this, you must specify another target for the link, using the `target` attribute:

```html
<a href="https://www.example.com/" target="_blank">Visit us!</a>
```

| Value     | Description |
|-----------|--------------------------------------------|
| `_self`   | Default. Opens in the same window/tab |
| `_blank`  | Opens in a new window or tab |
| `_parent` | Opens in the parent frame |
| `_top`    | Opens in the full body of the window |

### HTML Links - Image as Link
To use an image as a link, just put the `<img>` tag inside the `<a>` tag:

```html
<a href="default.asp">
  <img src="smiley.gif" alt="HTML tutorial" style="width:42px;height:42px;">
</a>
```

### Link to an Email Address
Use `mailto:` inside the `href` attribute to create a link that opens the user's email program:

```html
<a href="mailto:someone@example.com">Send email</a>
```

### Button as a Link
To use an HTML button as a link, you have to add some JavaScript code:

```html
<button onclick="document.location='default.asp'">HTML Tutorial</button>
```

### Link Titles
The `title` attribute specifies extra information about an element, shown as a tooltip text when the mouse moves over the element:

```html
<a href="https://www.example.com/" title="Go to Example">Visit Example</a>
```

### HTML Bookmark Links
Bookmarks can be useful if a web page is very long, allowing readers to jump to a specific part of the page instead of scrolling. Use the `id` attribute to create a bookmark, then link to it using `#`:

```html
<h2 id="C4">Chapter 4</h2>
...
<a href="#C4">Jump to Chapter 4</a>
```

This text is loaded dynamically from an external `.md` Markdown file!
