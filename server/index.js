import _ from 'lodash'
const path = require('path');
const cors = require('cors');
import chalk  from 'chalk';
const logger = require('morgan');
const helmet = require('helmet');
const express = require('express');
const errorHandler = require('errorhandler');
const cookieParser = require('cookie-parser');

// const lodash = require('lodash');
const apiRouter = require('./src/routes');
const CustomResponses = require('./src/models/helpers/CustomResponses');
require('./src/config/DbConnection');
const app = express();
require('dotenv').config();
// global._ = lodash;
const { PORT, NODE_ENV } = process.env;

app.set('env', NODE_ENV);
app.use(logger('dev'));
app.use(CustomResponses);
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());

app.set('view engine','ejs')
app.set('views',path.resolve("./views"));


app.use(
  '/',
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);
app.use('/images', express.static(path.join(__dirname, 'assets')));

app.use(cors('*'));
// app.use('/', apiRouter);
if (NODE_ENV !== 'production') {
  app.use(logger('dev'));
}



app.set('port', PORT || 3000);

const server = app.listen(app.get('port'), () => {
  console.log(
  
    '%s App is running at http://localhost:%d in %s mode',
    chalk.green('✓'),
    app.get('port'),
    app.get('env')
  );
  console.log('Press CTRL-C to stop\n');
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}
