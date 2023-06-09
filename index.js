const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const apiRouter = require('./routers/index.js');

dotenv.config();
const app = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use('/files', express.static("./files"));

app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(morgan('tiny'));

app.use('/api/v1', apiRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
