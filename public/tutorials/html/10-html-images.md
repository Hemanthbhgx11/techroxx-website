# Chapter 10: HTML Images

### HTML Images
In HTML, images are defined with the `<img>` tag. The `<img>` tag is empty, meaning it contains attributes only, and does not have a closing tag.

```html
<img src="url" alt="alternatetext">
```

> **Key Note:** The `src` attribute specifies the path to the image, and the `alt` attribute provides an alternate text for an image if it cannot be displayed for some reason.

### The src Attribute
HTML images have two required attributes: `src` and `alt`. The `src` attribute specifies the path to the image:

```html
<img src="img_girl.jpg">
```

There are two ways to specify the URL in the `src` attribute:
1. **Absolute URL** — links to an external image hosted on another website (e.g., `src="https://www.example.com/images/img_girl.jpg"`)
2. **Relative URL** — links to an image hosted within the website (e.g., `src="img_girl.jpg"`)

### The alt Attribute
The required `alt` attribute specifies an alternate text for an image, if the image for some reason cannot be displayed, due to slow connection, an error in the `src` attribute, or if the user uses a screen reader.

```html
<img src="img_girl.jpg" alt="Girl with a jacket">
```

> **Key Note:** The `alt` attribute is also important if the image cannot be seen, such as for visually impaired users using screen readers.

### Image Size - Width and Height
The `width` and `height` attributes specify the width and height of an image, given in pixels:

```html
<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">
```

> **Key Note:** It is a good practice to specify both the `width` and `height` attributes for an image, as this reserves space for the image and reduces page flickering while it loads.

### Width and Height, or Style?
The `width`, `height`, and `style` attributes are all valid in HTML. However, it is a good idea to use the `style` attribute to prevent styles sheets from changing the size of images:

```html
<img src="img_girl.jpg" alt="Girl in a jacket" style="width:500px;height:600px;">
```

### Images in Another Folder
If you have your images in a sub-folder, you must include the folder name in the `src` attribute:

```html
<img src="/images/html5.gif" alt="HTML5 Icon" style="width:128px;height:128px;">
```

### Images on Another Server/Website
Some websites use an image folder on another server to host their images, and you can specify an image from any web address in the world:

```html
<img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="W3Schools.com">
```

### Animated Images
HTML allows animated GIFs:

```html
<img src="programming.gif" alt="Computer Man" style="width:48px;height:48px;">
```

### Image as a Link
To use an image as a link, put the `<img>` tag inside the `<a>` tag (covered in the previous chapter).

### Image Maps
The `<map>` tag defines an image map, which is an image with clickable areas. The `usemap` attribute in `<img>` is linked with the `name` attribute in `<map>`:

```html
<img src="workplace.jpg" alt="Workplace" usemap="#workmap">

<map name="workmap">
  <area shape="rect" coords="34,44,270,350" alt="Computer" href="computer.htm">
</map>
```

### HTML `<picture>` Element
The `<picture>` element lets you define multiple images for different browser window sizes:

```html
<picture>
  <source media="(min-width: 650px)" srcset="img_food.jpg">
  <source media="(min-width: 465px)" srcset="img_car.jpg">
  <img src="img_girl.jpg" alt="Flowers" style="width:auto;">
</picture>
```

This text is loaded dynamically from an external `.md` Markdown file!
