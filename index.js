const fs = require("fs");
const path = require("path");
const processVideoConversion = require("./lib/process-video-conversion.js");

/**
 * Converts a video file and saves with the same filename to the same folder with the "mp4" extension
 * @param {string} sourceFilePath 
 */
function convertVideoFileToMp4(sourceFilePath) {
    if (typeof sourceFilePath !== "string") {
        throw new Error(`Invalid parameter, expected string, got "${typeof sourceFilePath}"`);
    }
    if (sourceFilePath.endsWith(".mp4")) {
        // Source is already at target type
        return;
    }
    const targetFileName = sourceFilePath.substring(0, sourceFilePath.lastIndexOf(".")) + ".mp4";
    return processVideoConversion(sourceFilePath, targetFileName);
}

// If this script was called with a video file as parameter, such as `node convert-video-to-mp4/index.js path to video.mp4`
// Then this piece of code will detect and run it 
if (typeof module !== 'undefined' && !module.parent && process.argv.length > 2) {
    const inputVideoFilePath = path.resolve(process.argv.slice(2).join(" "));
    if (!fs.existsSync(inputVideoFilePath)) {
        throw new Error(`Input video file not found at "${inputVideoFilePath}"`);
    }
    convertVideoFileToMp4(inputVideoFilePath);
}

module.exports = {
    convertVideoFileToMp4
}
