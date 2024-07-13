function analyzeText() {
    const text = document.getElementById('textInput').value;

    const languageCounts = {
        english: 0,
        hindi: 0,
        mathematical: 0,
        others: 0
    };

    let validChars = 0;

    for (let char of text) {
        if (/[a-zA-Z]/.test(char)) {
            languageCounts.english++;
            validChars++;
        } else if (/[\u0900-\u097F]/.test(char)) {  // Unicode range for Devanagari script (Hindi)
            languageCounts.hindi++;
            validChars++;
        } else if (/[\d]/.test(char)) {  // Digits
            languageCounts.mathematical++;
            validChars++;
        } else if (!/[\s.,'"!?;:()\[\]{}<>+\-*/\\&%$#@^_`~]/.test(char)) {  // Ignore spaces and various symbols
            languageCounts.others++;
            validChars++;
        }
    }

    const englishPercentage = ((languageCounts.english / validChars) * 100).toFixed(2);
    const hindiPercentage = ((languageCounts.hindi / validChars) * 100).toFixed(2);
    const mathematicalPercentage = ((languageCounts.mathematical / validChars) * 100).toFixed(2);
    const othersPercentage = ((languageCounts.others / validChars) * 100).toFixed(2);

    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = `
        <div class="progress-bar-container">
            <div class="progress-bar english" style="width: ${englishPercentage}%;">
                ${englishPercentage}% (English: <span style="color: black;font-wight:600       ">${languageCounts.english}</span>)
            </div>
        </div>
        <div class="progress-bar-container">
            <div class="progress-bar hindi" style="width: ${hindiPercentage}%;">
                ${hindiPercentage}% (Hindi: <span style="color: black;">${languageCounts.hindi}</span>)
            </div>
        </div>
        <div class="progress-bar-container">
            <div class="progress-bar mathematical" style="width: ${mathematicalPercentage}%;">
                ${mathematicalPercentage}% (Mathematical: <span style="color: black;">${languageCounts.mathematical}</span>)
            </div>
        </div>
        <div class="progress-bar-container">
            <div class="progress-bar others" style="width: ${othersPercentage}%;">
                ${othersPercentage}% (Others: <span style="color: black;">${languageCounts.others}</span>)
            </div>
        </div>
    `;
}
