export function assert(bool, msg) {
    if (!bool)
        throw "Assertion failed: " + msg;
}

export function runTest(testFn, resultElement) {
    try {
        testFn();
        resultElement.innerHTML = "<p style=\"color:#03c800;\">PASSED</p>"
    } catch(error) {
        console.error(error);
        resultElement.innerHTML = "<p style=\"color:#e33a3a;\">FAILED</p>";
    }
}
