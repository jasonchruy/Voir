const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

const routePresenter = require('./routes/api/presenter')
app.use('/api/presenter', routePresenter)

const port = process.env.Port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));