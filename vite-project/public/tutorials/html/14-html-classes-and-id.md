# Chapter 14: HTML Classes & Id

### The HTML class Attribute
The HTML `class` attribute specifies one or more class names for an HTML element. Classes are used by CSS and JavaScript to select and access specific elements.

```html
<p class="city">London</p>
<p class="city">Paris</p>
```

> **Key Note:** The `class` attribute can be used on any HTML element, and it is often used to point to a class name in a style sheet, or to select elements with JavaScript.

### Using the class Attribute
To style all elements with the same class name, use CSS and a period (`.`) character to select the class name:

```css
.city {
  background-color: tomato;
  color: white;
}
```

### Multiple Classes
HTML elements can have more than one class, separated by spaces:

```html
<p class="city main">London</p>
```

### Different Elements Can Share the Same Class
Multiple HTML elements can share the same class:

```html
<h2 class="city">Paris</h2>
<p class="city">Paris is the capital of France.</p>
```

### The HTML id Attribute
The `id` attribute specifies a **unique** id for an HTML element. The value must be unique within the HTML document:

```html
<h1 id="myHeader">My Header</h1>
```

> **Key Note:** The `id` attribute value must be unique within the HTML document — you cannot have more than one element with the same `id` in the same page.

### Using the id Attribute
To style an element with a specific `id`, use CSS and a hash (`#`) character to select the id:

```css
#myHeader {
  background-color: lightblue;
  color: black;
}
```

### Difference Between Class and Id
A `class` name can be used by multiple HTML elements, while an `id` name must only be used by one HTML element within the page:

```html
<style>
#myHeader {
  background-color: lightblue;
}
.city {
  color: white;
}
</style>
```

### Bookmark With HTML id
HTML bookmarks are used to jump to a specific part of a page, using the `id` attribute together with a link (`<a>`) that points to the `#id`:

```html
<h2 id="C4">Chapter 4</h2>
<a href="#C4">Jump to Chapter 4</a>
```

### JavaScript Can Use the id Attribute
JavaScript can access an element with a specific `id` by using the `getElementById()` method:

```html
<script>
function displayResult() {
  document.getElementById("myHeader").innerHTML = "Have a nice day!";
}
</script>
```

This text is loaded dynamically from an external `.md` Markdown file!
