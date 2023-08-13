const express = require('express');
const mongoose = require('mongoose');
const gameRoutes = require('./routes/gameRoutes');
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');



const app = express();
app.use('/api-docs', swaggerUi.serve,   swaggerUi.setup(swaggerDocument));

const dbURI =  "mongodb+srv://nwuser:harry1234@cluster0.qfuae.mongodb.net/game-app?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))

  .catch(err => console.log(err));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  res.redirect('/games');
});

app.use('/games', gameRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});