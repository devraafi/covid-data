const cheerio = require('cheerio');
const { BASE_URL, BASE_URL_JABAR } = require('./const');
const { getHtml } = require('./html');

const getData = async () => {
    const html = await getHtml(BASE_URL);
    const $ = cheerio.load(html);

    const global = {};
    global.country = parseNumber($('#case > div > div > div > div > div:nth-child(1) > div:nth-child(3) > strong').text());
    global.confirmed = parseNumber($(`#case > div > div > div > div > div:nth-child(1) > div:nth-child(4) > strong`).text());
    global.died = parseNumber($(`#case > div > div > div > div > div:nth-child(1) > div:nth-child(5) > strong`).text());
    const lastUpdateGl = $(`#case > div > div > div > div > div:nth-child(1) > div.pt-4.text-color-grey.text-1`).text();

    if (lastUpdateGl) {
        const prefix = `Update Terakhir: `;
        const suffix = ` | Sumber`;
        const match = lastUpdateGl.match(new RegExp(`${prefix}(.*?)${suffix}`, 'i'));
        if (match && match.length > 1) {
            global.lastUpdate = match[1];
        }
    }

    const id = {};
    id.positive = parseNumber($('#case > div > div > div > div > div:nth-child(2) > div:nth-child(3) > strong').text());
    id.recovered = parseNumber($('#case > div > div > div > div > div:nth-child(2) > div:nth-child(4) > strong').text());
    id.died = parseNumber($('#case > div > div > div > div > div:nth-child(2) > div:nth-child(5) > strong').text());
    const lastUpdateId = parseNumber($('#case > div > div > div > div > div:nth-child(2) > div.pt-4.text-color-black.text-1').text());

    if (lastUpdateId) {
        id.lastUpdate = lastUpdateId
            .split('Update Terakhir: ')
            .join('')
            .split('\n')
            .join('');
    }

    return { global, id };
}

const parseNumber = (value) => {
    const raw = value.split('.').join('');
    return parseInt(raw);
};

// getData().then(console.log).catch(console.log);

module.exports = {
    getData
}