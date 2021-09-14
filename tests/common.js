export function assert(bool, msg) {
    if (!bool)
        throw "Assertion failed: " + msg;
}


const resultTable = document.getElementById("test_results_table");
export function runTest(testFn) {
    const resultElement = resultTable.rows[0].cloneNode(true);
    resultElement.cells[0].innerHTML = testFn.name;
    const statusElement = resultElement.cells[1];
    statusElement.className = "testResult";
    statusElement.innerHTML = "...";
    resultTable.appendChild(resultElement);
    try {
        testFn();
        statusElement.innerHTML = "<p style=\"color:#03c800;\">PASSED</p>"
    } catch(error) {
        console.error(error);
        statusElement.innerHTML = "<p style=\"color:#e33a3a;\">FAILED</p>";
    }
}
