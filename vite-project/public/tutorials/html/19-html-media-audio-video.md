# Chapter 19: HTML Media (Audio & Video)

### HTML Video
The HTML `<video>` element is used to show a video on a web page:

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  Your browser does not support the video tag.
</video>
```

> **Key Note:** The `controls` attribute adds video controls, like play, pause, and volume. It is also a good idea to always include `width` and `height` attributes to avoid page flickering.

### How It Works
The `<source>` element allows you to specify alternative video files which the browser may choose from, based on its media type or codec support. The text between the `<video>` and `</video>` tags will only be displayed in browsers that do not support the `<video>` element.

### HTML Video - Methods, Properties, and Events
HTML5 `<video>` and `<audio>` elements also have methods, properties, and events, such as `play()`, `pause()`, and `load()` for controlling videos and audio via JavaScript.

### HTML Audio
The HTML `<audio>` element is used to play an audio file on a web page:

```html
<audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
```

### Autoplay
Using `autoplay`, videos and audio will start playing automatically:

```html
<video width="320" height="240" autoplay>
  <source src="movie.mp4" type="video/mp4">
</video>
```

> **Key Note:** Adding `muted` after `autoplay` will let your video start playing automatically (but muted). Many browsers block autoplay with sound to improve user experience.

### YouTube Videos
YouTube provides an easy way for websites to embed YouTube videos, using the `<iframe>` tag:

```html
<iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY" title="YouTube video"></iframe>
```

### HTML `<track>` for Subtitles
The `<track>` element specifies text tracks for the `<video>` element, such as subtitles or captions:

```html
<video width="320" height="240" controls>
  <source src="forrest_gump.mp4" type="video/mp4">
  <track src="fgsubtitles_en.vtt" kind="subtitles" srclang="en" label="English">
</video>
```

### Supported Media Formats
HTML5 supports several video and audio formats. Common video formats include **MP4**, **WebM**, and **Ogg**; common audio formats include **MP3**, **WAV**, and **Ogg**.

This text is loaded dynamically from an external `.md` Markdown file!
