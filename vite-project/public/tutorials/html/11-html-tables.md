# Chapter 11: HTML Tables

### HTML Tables
HTML tables allow web developers to arrange data into rows and columns.

```html
<table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
</table>
```

> **Key Note:** Each table row is defined with the `<tr>` tag, each table header is defined with `<th>`, and each table data/cell is defined with `<td>`.

### HTML Table Borders
HTML tables can have borders of different styles and shapes, added using the CSS `border` property:

```html
<style>
table, th, td {
  border: 1px solid black;
}
</style>
```

### Collapsed Table Borders
To avoid double borders, set the CSS `border-collapse` property to `collapse`:

```html
<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
```

### Table Cell Padding
Cell padding specifies the space between the cell content and its borders, set with the CSS `padding` property:

```html
th, td {
  padding: 15px;
}
```

### Table Headers
Table headers are given more importance than table data — browsers, by default, bold and center-align text in `<th>` elements. To left-align table headers, use the CSS `text-align` property:

```html
th {
  text-align: left;
}
```

### Table Sizes
The width and height of a table are defined by the `width` and `height` properties in CSS:

```html
table {
  width: 100%;
}
th {
  height: 70px;
}
```

### Horizontal Table Headers
Table headers can also be set for each row, with the first `<td>` element in a row defined as a `<th>` element:

```html
<table>
  <tr>
    <th>Firstname</th>
    <td>Bill</td>
  </tr>
  <tr>
    <th>Age</th>
    <td>50</td>
  </tr>
</table>
```

### Colspan and Rowspan
To make a cell span more than one column, use the `colspan` attribute. To make a cell span more than one row, use the `rowspan` attribute:

```html
<table>
  <tr>
    <th>Name</th>
    <th colspan="2">Telephone</th>
  </tr>
  <tr>
    <td>Bill Gates</td>
    <td>55577854</td>
    <td>55577855</td>
  </tr>
</table>
```

### Table Caption
To add a caption to a table, use the `<caption>` tag, which must be inserted immediately after the `<table>` tag:

```html
<table>
  <caption>Monthly savings</caption>
  <tr>
    <th>Month</th>
    <th>Savings</th>
  </tr>
</table>
```

### A Special Style for One Table
To define a special style for a special table, add an `id` attribute to the table, then define a style for the table with the specified id:

```html
<table id="t01">
```

```css
#t01 {
  width: 100%;
  background-color: #f1f1c1;
}
```

This text is loaded dynamically from an external `.md` Markdown file!
