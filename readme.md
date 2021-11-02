# Convert Video to MP4 npm module

A Nodejs library to convert videos to mp4 on Windows 7/10/11.

Only works on the backend, that is, on Nodejs context, and this does not support the browser context because of an external dependency.

## Dependencies

1. You need to use Windows

2. You need to install [ffmpeg](https://ffmpeg.org)

3. You need to have the video in the file system

## Usage

First, install with npm

```
npm i convert-video-to-mp4
```

You can now run it as a javascript module:

```js
const converter = require("convert-video-to-mp4");
converter.convertVideoFileToMp4("./file.avi");
```

This will take a few seconds depending on the size of the `file.avi` file, but will eventually parse the video file and output a new file on the same folder with the name `file.mp4`.

The function only resolves if it was successful, otherwise it just fails.

## Testing

You can run automated tests with:

```
npm run test
```

If everything went right you should see:

## Credits

I am not the creator nor a contributor of FFMPEG, all right belong to them
