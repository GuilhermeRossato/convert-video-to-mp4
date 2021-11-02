const fs = require("fs");
const path = require("path");
const lib = require("../index.js");

const resultingFilePath = path.resolve(__dirname, "input.mp4");
if (fs.existsSync(resultingFilePath)) {
    fs.unlinkSync(resultingFilePath);
}

lib.convertVideoFileToMp4(path.resolve(__dirname, "input.avi"));

if (fs.existsSync(resultingFilePath)) {
    fs.unlinkSync(resultingFilePath);
} else {
    throw new Error("Output file was not generated")
}