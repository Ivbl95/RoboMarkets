declare var module: any;

interface ExchangeRates {
    currencies: string[],
    rates: any,
}

const exchangeRates: ExchangeRates = {
    currencies: [],
    rates: {},
};

let firstDataReceived: boolean = false;

function setExchangeRate(firstCurrency: string, secondCurrency: string, exchangeRate: number): void {
    firstDataReceived = true;

    exchangeRates.rates[firstCurrency + secondCurrency] = exchangeRate;
    exchangeRates.rates[secondCurrency + firstCurrency] = 1 / exchangeRate;

    [firstCurrency, secondCurrency].forEach((currence: string) => {
        if (exchangeRates.currencies.indexOf(currence) === -1) {
            exchangeRates.currencies.push(currence);
        }
    })
}

function getExchangeRate(firstCurrency: string, secondCurrency: string): number {
    if (!firstDataReceived) {
        return 0;
    }

    const pairName: string = (firstCurrency + secondCurrency);
    let finalRate: number = 0;

    if (exchangeRates.rates[pairName]) {
        finalRate = exchangeRates.rates[pairName];
    }
    else {
        const firstMatchArr: string[] = Object.keys(exchangeRates.rates).filter(item => pairName.startsWith(item.slice(0, 3)));
        const secondMatchArr: string[] = Object.keys(exchangeRates.rates).filter(item => pairName.endsWith(item.slice(3, 6)));

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

