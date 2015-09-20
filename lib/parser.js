function parseTotalPrice(text) {
    var totalPriceRegex = /^\s*TOTAL:?\s*\$?(\d+.\d{2})\s*$/im;
    var match = text.match(totalPriceRegex);
    return match ? match[1] : "None found.";
}

function parseBusinessName(text) {
	return text.split("\r\n")[0].trim();
}

module.exports = {
	parseTotalPrice: parseTotalPrice,
	parseBusinessName: parseBusinessName
};