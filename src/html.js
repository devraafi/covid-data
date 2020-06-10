const axios = require('axios').default;

const getHtml = async (url) => {
    const res = await axios.get(url);
    return res.data;
}

module.exports = {
    getHtml
}