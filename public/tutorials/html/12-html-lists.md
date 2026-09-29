# Chapter 12: HTML Lists

### HTML Lists
HTML lists allow web developers to group a set of related items in lists.

### Unordered HTML List
An unordered list starts with the `<ul>` tag. Each list item starts with the `<li>` tag, and the list items will be marked with bullet points (small black circles) by default:

```html
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

### Ordered HTML List
An ordered list starts with the `<ol>` tag. Each list item starts with the `<li>` tag, and the list items will be marked with numbers by default:

```html
<ol>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ol>
```

> **Key Note:** You can use the `type` attribute on `<ol>` to change the numbering type: `"1"` (numbers), `"A"` (uppercase letters), `"a"` (lowercase letters), `"I"` (roman numerals), or `"i"` (lowercase roman numerals).

### HTML Description Lists
HTML also supports description lists. A description list is a list of terms, with a description of each term, starting with the `<dl>` tag:

```html
<dl>
  <dt>Coffee</dt>
  <dd>- black hot drink</dd>
  <dt>Milk</dt>
  <dd>- white cold drink</dd>
</dl>
```

> **Key Note:** The `<dl>` tag defines the description list, the `<dt>` tag defines the term (name), and the `<dd>` tag describes each term.

### Nested HTML Lists
Lists can be nested (lists inside lists):

```html
<ul>
  <li>Coffee</li>
  <li>Tea
    <ul>
      <li>Black tea</li>
      <li>Green tea</li>
    </ul>
  </li>
  <li>Milk</li>
</ul>
```

### Horizontal List with CSS
HTML lists can be styled in many ways with CSS. One popular way is to style a list horizontally, to create a navigation menu:

```css
li {
  display: inline;
}
```

### Removing Bullets
To remove the default list markers, use `list-style-type: none;`, along with removing default margin and padding:

```css
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
```

This text is loaded dynamically from an external `.md` Markdown file!
