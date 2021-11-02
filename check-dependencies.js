const fs = require("fs");
const cp = require("child_process");

if (process.platform !== "win32") {
    throw new Error(`Expected windows plaftorm, got "${process.platform}" which is not supported by this library.`);
}
const ffmpegInstallationList = [".", ...process.env.path.split(";")].map(path => path + "\\ffmpeg.exe").filter(ffmpegPath => fs.existsSync(ffmpegPath));
if (ffmpegInstallationList.length === 0) {
    throw new Error("FFMPEG could not be found on PATH variable or current path. This program cannot continue, install ffmpeg manually before running this command.");
}
if (!fs.existsSync(ffmpegInstallationList[0])) {
    throw new Error(`Failed verifying the existance of ffmpeg at "${ffmpegInstallationList[0]}"`);
}
try {
    const versionCheck = cp.execSync(ffmpegInstallationList[0] + " -version");
    const text = versionCheck.toString("utf8");
    if (!text.includes("ffmpeg version")) {
        throw new Error(`Mismatched ffmpeg executable. Verify if instalation is correct at "${ffmpegInstallationList[0]}"`);
    }
} catch (err) {
    err.message = "Could not run ffmpeg due to error: " + err.message;
    throw err;
}
