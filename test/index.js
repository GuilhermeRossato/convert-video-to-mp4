const fs = require("fs");
const cp = require("child_process");
const path = require("path");

async function init() {
    
    const tests = fs.readdirSync(__dirname).filter(script => script.endsWith(".js") && script !== "index.js").sort();
    const results = [];

    let testCount = 0;
    for (let scriptTest of tests) {
        await new Promise((resolve) => {
            testCount++;
            let timeoutTimer = null;
            const startedAt = (new Date()).getTime();
            const scriptTestPath = path.resolve(__dirname, scriptTest);
            const spawn = cp.spawn(process.argv[0], [scriptTestPath], {
                stdio: "pipe"
            });
            const chunks = [];
            spawn.stdout.on("data", data => {
                chunks.push(data);
            });
            spawn.stderr.on("data", data => {
                chunks.push(data);
            });
            
            function concludeChildTest(status, message) {
                if (status === "success") {
                    console.log(`Test ${testCount}: Success - ${scriptTest}`);
                } else {
                    console.log(`Test ${testCount}: Failure - ${scriptTest}`);
                }
                results.push({
                    testFile: scriptTest,
                    testFilePath: scriptTestPath,
                    status,
                    message,
                    duration: ((new Date()).getTime() - startedAt) / 1000,
                    stdio: Buffer.concat(chunks),
                });
                resolve();
            }
            
            timeoutTimer = setTimeout(function() {
                try {
                    spawn.kill();
                } catch (err) {
                    concludeChildTest("fail", "Test script timeout with kill failure: " + err.message);
                    return;
                }
                concludeChildTest("fail", "Test script timeout");
            }, 5000);

            spawn.on("error", function(err) {
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                    timeoutTimer = null;
                    concludeChildTest("fail", "Error executing test script: " + err.message);
                }
            });
            
            spawn.on("close", function(code) {
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                    timeoutTimer = null;
                    
                    if (code === 0) {
                        concludeChildTest("success");
                    } else {
                        concludeChildTest("fail", "Test script failed with error code " + code);
                    }
                }
            });
        });
    }

    console.log("\nExecuted " + results.length + " tests:");
    console.log("\t" + results.filter(test => test.status === "success").length + " successful tests");
    console.log("\t" + results.filter(test => test.status !== "success").length + " failed tests");
    console.log("");

    let errorIndex = 0;
    for (let result of results) {
        if (result.status === "success") {
            continue;
        }
        errorIndex++;
        console.log(`Test ${errorIndex.toString()}: (${result.duration.toFixed(1)}s) ${result.testFile}`);
        console.log("Reason: " + result.message);
        console.log(result.stdio.toString("utf8") + "\n");
    }
}

init().catch(console.log);