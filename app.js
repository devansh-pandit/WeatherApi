require("dotenv").config()
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const indexRouter = require('./routes/weather');

app.use(
    cors({
        origin: "*",
        exposedHeaders: 'Authorization'
    })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);



app.listen(process.env.PORT || '5000', () => {
    console.log(`Server started at port ${process.env.PORT || '5000'}`);
});