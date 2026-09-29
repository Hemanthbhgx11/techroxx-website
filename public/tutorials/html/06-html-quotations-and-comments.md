# Chapter 6: HTML Quotations & Comments

### HTML `<blockquote>` for Quotations
The HTML `<blockquote>` element defines a section that is quoted from another source. Browsers usually indent `<blockquote>` elements:

```html
<blockquote cite="http://www.example.com">
For 50 years, WWF has been protecting the future of nature.
</blockquote>
```

### HTML `<q>` for Short Quotations
The HTML `<q>` tag defines a short inline quotation. Browsers normally insert quotation marks around the quotation:

```html
<p>WWF's goal is to: <q>Build a future where people live in harmony with nature.</q></p>
```

### HTML `<abbr>` for Abbreviations
The `<abbr>` tag defines an abbreviation or an acronym, like "HTML", "CSS", "Mr.", "Dr.", etc. Marking abbreviations can give useful information to browsers, translation systems, and search engines:

```html
<p>The <abbr title="World Health Organization">WHO</abbr> was founded in 1948.</p>
```

> **Key Note:** Use the global `title` attribute to show the description for the abbreviation/acronym when you mouse over the element.

### HTML `<address>` for Contact Information
The `<address>` tag defines the contact information for the author/owner of a document or an article, usually displayed in italic, with a line break added before and after the element:

```html
<address>
Written by John Doe.<br>
Visit us at:<br>
Example.com<br>
Box 564, Disneyland<br>
USA
</address>
```

### HTML `<cite>` for Work Title
The `<cite>` tag defines the title of a creative work (a book, a song, a movie, etc.). The text in the `<cite>` element is usually rendered in italic:

```html
<p><cite>The Scream</cite> by Edvard Munch. Painted in 1893.</p>
```

### HTML `<bdo>` for Bi-Directional Override
The `<bdo>` tag is used to override the current text direction:

```html
<bdo dir="rtl">This text will be written from right to left</bdo>
```

### HTML Comments
Comment tags are used to insert comments in the HTML source code. A comment starts with `<!--` and ends with `-->`. Comments are not displayed by the browser but can help document your HTML source code:

```html
<!-- This is a comment -->
<p>This is a paragraph.</p>

<!-- Remember to add more information here -->
```

> **Key Note:** Comments are also great for debugging HTML, because you can comment out HTML lines of code, one at a time, to search for errors.

```html
<!--
<img src="myphoto.jpg" width="500" height="500">
<img src="myphoto2.jpg" width="500" height="500">
-->
```

This text is loaded dynamically from an external `.md` Markdown file!
