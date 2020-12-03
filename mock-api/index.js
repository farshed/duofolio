const express = require('express');
const apiMocker = require('connect-api-mocker');

const app = express();

app.use('/api', apiMocker('mock-api/api'));

app.listen(8080);
