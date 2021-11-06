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

if (process.argv.length !== 2) {
    if (process.argv.length !== 3) {
        throw new Error("Expected 3 arguments, got unexpected argument count: " + process.argv.length);
    }
    const inputVideoFilePath = path.resolve(process.argv[2]);
    if (!fs.existsSync(inputVideoFilePath)) {
        throw new Error(`Video file not found at "${inputVideoFilePath}"`);
    }
    convertVideoFileToMp4(inputVideoFilePath);
}

module.exports = {
    convertVideoFileToMp4
}
