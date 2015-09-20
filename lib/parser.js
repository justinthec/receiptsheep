function parseTotalPrice(text) {
    var totalPriceRegex = /^\s*TOTAL:?\s*\$?(\d+.\d{2})\s*$/im;
    var match = text.match(totalPriceRegex);
    return match ? match[1] : "None found.";
}

function parseBusinessName(text) {
	return text.split("\r\n")[0].trim();
}

function parseAddress(text) {
    var streetNameRegex = /^.*\d+\s[a-z\s]*\s(street|st|road|rd|boulevard|blvd|crescent|cr|avenue|ave).*$/im;
    var streetName = text.match(streetNameRegex);
    streetName = streetName ? streetName[0] : "";
    var postalCodeRegex = /^.*[A-Z]\d[A-Z]\s*\d[A-Z]\d.*$/m;
    var postalCode = text.match(postalCodeRegex);
    postalCode = postalCode ? postalCode[0] : "";
    var address = (streetName.trim() + " " + postalCode.trim()).trim();
    return address.length > 0 ? address : "None found.";
}

function parsePhoneNumber(text) {
    var phoneNumberRegex = /\(?\d{3}[\s\-\)]+\d{3}[\s-]+\d{4}/;
    var match = text.match(phoneNumberRegex);
    return match ? match[0] : "None found.";
}

module.exports = {
	parseTotalPrice: parseTotalPrice,
	parseBusinessName: parseBusinessName,
	parsePhoneNumber: parsePhoneNumber,
	parseAddress: parseAddress
};