# Chapter 17: HTML Form Elements & Input Types

### HTML Input Types
Here are the different input types you can use in HTML:

```html
<input type="text">
<input type="radio">
<input type="checkbox">
<input type="submit">
<input type="button">
```

### Input Type Text
`<input type="text">` defines a single-line text input field:

```html
<label for="fname">First name:</label><br>
<input type="text" id="fname" name="fname">
```

### Input Type Password
`<input type="password">` defines a password field, where the characters are masked (shown as asterisks or dots):

```html
<label for="pwd">Password:</label><br>
<input type="password" id="pwd" name="pwd">
```

### Input Type Submit
`<input type="submit">` defines a button for submitting form data to a form-handler, typically a server page with a script for processing input data:

```html
<input type="submit" value="Submit">
```

### Input Type Radio
`<input type="radio">` defines a radio button, used when you want the user to select one option from a limited number of choices:

```html
<p>Choose your favorite Web language:</p>
<input type="radio" id="html" name="fav_language" value="HTML">
<label for="html">HTML</label><br>
<input type="radio" id="css" name="fav_language" value="CSS">
<label for="css">CSS</label>
```

> **Key Note:** Radio buttons that share the same `name` value are grouped together, so only one option in the group can be selected at a time.

### Input Type Checkbox
`<input type="checkbox">` defines a checkbox, letting a user select zero or more options of a limited number of choices:

```html
<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
<label for="vehicle1"> I have a bike</label>
```

### Input Type Button
`<input type="button">` defines a button, most often used together with JavaScript to activate a script:

```html
<input type="button" onclick="alert('Hello world!')" value="Click Me!">
```

### Other Common Input Types
HTML5 also introduced several new input types for richer data collection:

```html
<input type="date">
<input type="email">
<input type="number">
<input type="range">
<input type="color">
<input type="file">
<input type="tel">
<input type="url">
<input type="search">
```

> **Key Note:** Newer input types like `date`, `email`, and `number` provide built-in validation, so the browser can check for correct formatting before the form is submitted.

### Input Restrictions
HTML also offers several input attributes to restrict input, such as `checked`, `disabled`, `readonly`, `size`, `maxlength`, `min`, `max`, `multiple`, `pattern`, `required`, and `step`:

```html
<input type="text" id="fname" name="fname" required>
<input type="number" id="quantity" name="quantity" min="1" max="5">
```

This text is loaded dynamically from an external `.md` Markdown file!
