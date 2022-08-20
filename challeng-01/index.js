const http = require('http');
const url = require('url');
const fs = require('fs')
const replaceTemplate = require('./modules/replaceTemplate')



const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/./templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/./templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const objectData = JSON.parse(data);
const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true);


    if (pathname === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardHtml = objectData.map((element) => replaceTemplate(tempCard, element)).join('');
        const outputResult = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml)
        res.end(outputResult)

    } else if (pathname === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const product = objectData[query.id];
        const outputResult = replaceTemplate(tempProduct, product);
        res.end(outputResult);

    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>page not found</h1>')
    }

})


server.listen(5000, '127.0.0.1', () => {
    console.log('Server on this port 5000')
})