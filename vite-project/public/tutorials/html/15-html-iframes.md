# Chapter 15: HTML Iframes

### HTML Iframes
An HTML iframe is used to display a web page within a web page. The HTML `<iframe>` tag specifies an inline frame:

```html
<iframe src="url" title="description"></iframe>
```

> **Key Note:** It is a good practice to always include a `title` attribute for the `<iframe>`, used by screen readers to read out what the content of the iframe is.

### Iframe - Set Height and Width
Use the `height` and `width` attributes to specify the size of the iframe. The values are specified in pixels by default, but can also be in percent (like `"80%"`):

```html
<iframe src="demo_iframe.htm" height="200" width="300" title="Iframe Example"></iframe>
```

### Iframe - Remove the Border
By default, an iframe has a border around it. To remove the border, add the CSS `border` property with a value of `none`:

```html
<iframe src="demo_iframe.htm" style="border:none;" title="Iframe Example"></iframe>
```

### Iframe - Target for a Link
An iframe can be used as the target frame for a link. The `target` attribute of the link must refer to the `name` attribute of the iframe:

```html
<iframe src="demo_iframe.htm" name="iframe_a" title="Iframe Example"></iframe>

<p><a href="https://www.example.com" target="iframe_a">Example.com</a></p>
```

> **Key Note:** If the `target` attribute of the link matches the `name` attribute of the iframe, the link will open in the iframe.

### Why Use Iframes?
Iframes are commonly used to embed content from another source into the current page, such as:
- Embedding YouTube videos
- Embedding Google Maps
- Embedding advertisements
- Embedding external forms (like Google Forms)

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/example" title="YouTube video"></iframe>
```

### Security Considerations
Iframes can be a security risk if not used carefully, since malicious sites could try to embed your page inside an iframe (a technique called **clickjacking**). Use the `sandbox` attribute to restrict what the embedded page can do:

```html
<iframe src="demo_iframe.htm" sandbox title="Sandboxed Iframe"></iframe>
```

This text is loaded dynamically from an external `.md` Markdown file!
