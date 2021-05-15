const express = require('express');
const cors = require('cors');
const router = require('./router.const');
require('dotenv').config()
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(router);

app.listen(PORT, HOST, () => {
    console.log('Server is listening at http://localhost:4000');
})