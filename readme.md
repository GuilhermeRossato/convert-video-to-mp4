# Convert Video to MP4

A simple Nodejs library to convert videos to mp4 on Windows 7/10/11.

Only works on the backend on Nodejs context because of an external dependency. To convert on the frontend you must first send the video to the backend, save it on a file, execute the library and send it back to the user when done.

## Dependencies

1. You need to use Windows (Linux version is coming)

2. You need to install [ffmpeg](https://ffmpeg.org) manually

3. You need to have the video in the file system

## Usage

First, install with npm

```
npm i convert-video-to-mp4
```

You can now run it as a nodejs module:

```js
const converter = require("convert-video-to-mp4");
converter.convertVideoFileToMp4("./file.avi");
```

This will take a few seconds depending on the size of the `file.avi` file, but will eventually parse the video file and output a new file on the same folder with the name `file.mp4`.

The function only returns if it was successful, otherwise it just throws an error with a very descriptive error message.

Although almost every video format is supported, some exceptions like raw formats or novel video types might not work with the video converter because the program cannot "demux" (interpret) the video. Check the [demux list](https://ffmpeg.org/ffmpeg-formats.html#Demuxers) to see if something is incompatible. Sometimes you just need to install an additional library ontop of ffmpeg to make it work.

## Testing

You can run automated tests with:

```
npm run test
```

If everything went right you should see:

```
> convert-video-to-mp4@1.0.0 test https://github.com/GuilhermeRossato/convert-video-to-mp4
> node ./test/index.js

Test 1: Success - convert-avi-to-mp4.js
Test 2: Success - convert-mkv-to-mp4.js
Test 3: Success - fails-predictably-when-missing-file.js

Executed 3 tests:
        3 successful tests
        0 failed tests
```

## Credits

I created this Nodejs library as a wrapper for an executable that must be installed before using the library, this code and the external executable provide no warranties.

I am not the creator nor a contributor of FFMPEG, all right belong to the contributors as described in their [website](https://ffmpeg.org).
