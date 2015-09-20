function parseTotalPrice(text) {
    var totalPriceRegex = /^\s*TOTAL:?\s*\$?(\d+[\.\,]\d{2})\s*$/im;
    var match = text.match(totalPriceRegex);
    return match ? match[1] : "None found.";
}

function parseBusinessName(text) {
	return text.split("\r\n")[0].trim();
}

function parseAddress(text) {
    var streetNameRegex = /^.*\d+\s[a-z\s]*\s(street|st|road|rd|boulevard|blvd|crescent|cr|avenue|ave|drive|dr).*$/im;
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

function parseLineItems(text) {
    var lineItems = [];
    lineItems = text.match(/^.*\$?\d+[\.\,]\d{2}.*$/gm);
    lineItems = lineItems.map(function (itemLine) {
        var itemsOnLine = itemLine.split(/\$?\d+[\.\,]\d{2}/gm);
        itemsOnLine = itemsOnLine.map(function (item) {
            return item.trim();
        });
        console.log(itemsOnLine);
        itemsOnLine.splice(itemsOnLine.length-1, 1);
        pricesOnLine = itemLine.match(/\$?\d+[\.\,]\d{2}/gm);
        itemsWithPricesOnLine = [];
        for(var i=0;i<itemsOnLine.length;i++)
            itemsWithPricesOnLine.push({name: itemsOnLine[i], price: pricesOnLine[i]});
        var itemToChoose = itemsWithPricesOnLine.sort(function(a, b){
            return b.name.length - a.name.length;
        })[0];
        return itemToChoose;
    });

    lineItems = lineItems.filter(function (item) {
        if (item.name.match(/(total|ttl|hst|gst|tax|taxes|amount|tendered|change|card|visa|credit)/i))
            return false;
        return true;
    });

    return lineItems;
}

module.exports = {
	parseTotalPrice: parseTotalPrice,
	parseBusinessName: parseBusinessName,
	parsePhoneNumber: parsePhoneNumber,
	parseAddress: parseAddress,
    parseLineItems: parseLineItems
};