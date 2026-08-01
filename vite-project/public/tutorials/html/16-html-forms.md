# Chapter 16: HTML Forms

### HTML Forms
An HTML form is used to collect user input, which is most often sent to a server for processing.

```html
<form>
  form elements
</form>
```

> **Key Note:** The HTML `<form>` element can contain one or more of the form elements described in this chapter, such as `<input>`, `<textarea>`, `<button>`, `<select>`, and more.

### The HTML `<input>` Element
The `<input>` element is the most used form element, and can be displayed in several ways depending on the `type` attribute:

```html
<form>
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br>
</form>
```

### The HTML `<label>` Element
The `<label>` tag defines a label for several form elements, and is useful for screen-reader users, because the screen-reader will read out loud the label when the user focuses on the input element.

> **Key Note:** The `for` attribute of the `<label>` tag should be equal to the `id` attribute of the `<input>` element to bind them together — clicking on the label will also toggle/focus the related input.

### The Name Attribute
Each input field must have a `name` attribute to be submitted. If the `name` attribute is omitted, the value of the input field will not be sent at all when the form is submitted:

```html
<input type="text" id="fname" name="fname">
```

### The HTML `<select>` Element
The `<select>` element defines a drop-down list:

```html
<label for="cars">Choose a car:</label>
<select id="cars" name="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="fiat">Fiat</option>
</select>
```

### The HTML `<textarea>` Element
The `<textarea>` element defines a multi-line input field (a text area):

```html
<textarea name="message" rows="10" cols="30">
The cat was playing in the garden.
</textarea>
```

### The HTML `<button>` Element
The `<button>` element defines a clickable button:

```html
<button type="button" onclick="alert('Hello!')">Click Me!</button>
```

### The HTML `<fieldset>` and `<legend>` Elements
The `<fieldset>` element is used to group related data in a form, and the `<legend>` element defines a caption for the `<fieldset>` element:

```html
<fieldset>
  <legend>Personalia:</legend>
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br>
</fieldset>
```

### The Form action Attribute
The `action` attribute defines the action to be performed when the form is submitted, usually the URL of a server-side script that will process the submitted data:

```html
<form action="/action_page.php">
```

### The Form target Attribute
The `target` attribute specifies where to display the response received after submitting the form.

### The Form method Attribute
The `method` attribute specifies the HTTP method (`GET` or `POST`) to be used when submitting the form data:

```html
<form action="/action_page.php" method="post">
```

> **Key Note:** `GET` appends the form data to the URL, visible and limited in length, and is suitable for non-sensitive data. `POST` sends the data as part of the request body, more secure and with no size limitations, suitable for sensitive or large data.

This text is loaded dynamically from an external `.md` Markdown file!
