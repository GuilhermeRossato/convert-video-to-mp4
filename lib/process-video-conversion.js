const fs = require("fs");
const cp = require("child_process");

function processVideoConversion(sourceFilePath, targetFilePath) {
    if (process.platform !== "win32") {
        throw new Error(`Expected windows plaftorm, got "${process.platform}" which is not supported by this library.`);
    }
    const ffmpegInstallationList = [".", ...process.env.path.split(";")].map(path => path + "\\ffmpeg.exe").filter(ffmpegPath => fs.existsSync(ffmpegPath));
    if (ffmpegInstallationList.length === 0) {
        throw new Error("FFMPEG could not be found on PATH variable or current path. This program cannot continue, install ffmpeg manually.");
    }
    if (fs.existsSync(targetFilePath)) {
        throw new Error(`Target file already exists at "${targetFilePath}"`);
    }
    if (!fs.existsSync(ffmpegInstallationList[0])) {
        throw new Error(`Failed verifying the existance of ffmpeg at "${ffmpegInstallationList[0]}"`);
    }
    try {
        const versionCheck = cp.execSync(ffmpegInstallationList[0] + " -version");
        const text = versionCheck.toString("utf8");
        if (!text.includes("ffmpeg version")) {
            throw new Error(`Mismatched video converter executable. Verify if instalation is correct at "${ffmpegInstallationList[0]}"`);
        }
    } catch (err) {
        err.message = "Could not run video converter due to error: " + err.message;
        throw err;
    }

    const command = `"${ffmpegInstallationList[0]}" -hide_banner -i "${sourceFilePath}" -y -crf 17 -movflags +faststart "${targetFilePath}"`;

    const childInfo = cp.spawnSync(command, {
        stdio: "ignore",
        shell: true,
        env: process.env
    });

    if (childInfo.status !== 0) {
        throw new Error(`Video converted failed with error code ${childInfo.status}`);
    }

    if (!fs.existsSync(targetFilePath)) {
        throw new Error(`Failed at generating target file due to a silent error on ffmpeg`);
    }
}

module.exports = processVideoConversion;
