const express = require('express');
const app = express();
app.use(express.static(`${__dirname}/app`));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(4200, () => {
    console.log('Server on localhost:4200');
});