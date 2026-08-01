# Chapter 18: HTML Semantic Elements & Layout

### What are Semantic Elements?
A semantic element clearly describes its meaning to both the browser and the developer. Examples of non-semantic elements are `<div>` and `<span>` — they tell nothing about their content. Examples of semantic elements are `<form>`, `<table>`, and `<article>` — these clearly define their content.

> **Key Note:** Semantic elements = elements with a meaning, improving both accessibility and SEO (Search Engine Optimization).

### HTML Semantic Elements
Many web sites contain HTML code like `<div id="nav"> <div class="header"> <div id="footer">` to indicate navigation, header, and footer. HTML5 offers new semantic elements to define different parts of a web page:

```html
<article>
<aside>
<details>
<figcaption>
<figure>
<footer>
<header>
<main>
<mark>
<nav>
<section>
<summary>
<time>
```

### HTML `<section>` Element
The `<section>` element defines a section in a document, such as chapters, headers, footers, or any other sections of the document:

```html
<section>
  <h2>WWF History</h2>
  <p>The World Wide Fund for Nature (WWF) is...</p>
</section>
```

### HTML `<article>` Element
The `<article>` element specifies independent, self-contained content — an article should make sense on its own, and it should be possible to distribute it independently from the rest of the website:

```html
<article>
  <h2>What Is WWF?</h2>
  <p>WWF is one of the world's largest organizations...</p>
</article>
```

### HTML `<header>` Element
The `<header>` element represents a container for introductory content or a set of navigational links, and typically contains one or more heading elements, logo, or icon:

```html
<header>
  <h1>Welcome To My Homepage</h1>
</header>
```

### HTML `<footer>` Element
The `<footer>` element defines a footer for a document or section, typically containing authorship, copyright, contact, or related links:

```html
<footer>
  <p>Author: Hege Refsnes</p>
</footer>
```

### HTML `<nav>` Element
The `<nav>` element defines a set of navigation links:

```html
<nav>
  <a href="/html/">HTML</a> |
  <a href="/css/">CSS</a> |
  <a href="/js/">JavaScript</a>
</nav>
```

### HTML `<aside>` Element
The `<aside>` element defines content aside from the content it is placed in (like a sidebar), often related to the surrounding content but not part of the main flow:

```html
<aside>
  <h4>Epcot Center</h4>
  <p>Epcot is a theme park at Walt Disney World Resort.</p>
</aside>
```

### HTML `<figure>` and `<figcaption>` Elements
The `<figure>` tag specifies self-contained content, like illustrations, diagrams, photos, and code listings, and the `<figcaption>` tag defines a caption for the `<figure>` element:

```html
<figure>
  <img src="pic_trulli.jpg" alt="Trulli">
  <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
</figure>
```

### Why Semantic Elements?
According to W3C, a semantic web application makes it possible for search engines and other devices to better understand the content, and it's also easier for developers to read and maintain the code.

This text is loaded dynamically from an external `.md` Markdown file!
