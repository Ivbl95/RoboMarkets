const exchangeRates = {
    currencies: [],
    rates: {},
};
let firstDataReceived = false;
function setExchangeRate(firstCurrency, secondCurrency, exchangeRate) {
    firstDataReceived = true;
    exchangeRates.rates[firstCurrency + secondCurrency] = exchangeRate;
    exchangeRates.rates[secondCurrency + firstCurrency] = 1 / exchangeRate;
    [firstCurrency, secondCurrency].forEach((currence) => {
        if (exchangeRates.currencies.indexOf(currence) === -1) {
            exchangeRates.currencies.push(currence);
        }
    });
}
function getExchangeRate(firstCurrency, secondCurrency) {
    if (!firstDataReceived) {
        return 0;
    }
    const pairName = (firstCurrency + secondCurrency);
    let finalRate = 0;
    if (exchangeRates.rates[pairName]) {
        finalRate = exchangeRates.rates[pairName];
    }
    else {
        const firstMatchArr = Object.keys(exchangeRates.rates).filter(item => pairName.startsWith(item.slice(0, 3)));
        const secondMatchArr = Object.keys(exchangeRates.rates).filter(item => pairName.endsWith(item.slice(3, 6)));
        for (let currence of exchangeRates.currencies) {
            if (firstMatchArr.some(pair => pair.endsWith(currence)) && secondMatchArr.some(pair => pair.startsWith(currence))) {
                finalRate = exchangeRates.rates[firstCurrency + currence] * exchangeRates.rates[currence + secondCurrency];
                break;
            }
        }
    }
    return Math.round(finalRate * 100) / 100;
}
setExchangeRate('EUR', 'USD', 0.5);
setExchangeRate('EUR', 'CAD', 2);
module.exports = { getExchangeRate };
//# sourceMappingURL=app.js.map