const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/check', (req, res) => {
  const { name, bday } = req.body;

  if (!name || !bday) {
    res.redirect('/');
  } else {
    const years = moment().diff(moment(bday, 'YYYY-MM-DD'), 'years');
    res.redirect(years >= 18 ? `major?name=${name}` : `minor?name=${name}`);
  }
});

app.get('/major', (req, res) => {
  const { name } = req.query;
  res.render('major', { name });
});

app.get('/minor', (req, res) => {
  const { name } = req.query;
  res.render('minor', { name });
});

app.listen(3000);
