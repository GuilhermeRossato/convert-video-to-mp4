const fs = require("fs");
const lib = require("../index.js");

if (fs.existsSync("./missing.mkv")) {
    throw new Error("The file \"missing.mkv\" cannot exist or this test will behave unexpectedly");
}

try {
    lib.convertVideoFileToMp4("./missing.mkv");
} catch (err) {
    process.exit(0);
}

throw new Error("Expected command to fail because of missing file but it did not fail");
