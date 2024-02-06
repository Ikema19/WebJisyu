const http = require('http');
require('dotenv').config();

//EXPRESS
const express = require('express');
const app = express();

// CORS middleware
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // 他の必要なCORSヘッダーも追加できます
  // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//BODYPARSER
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

//POSTGRESQL
const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/", function(req, res){
  pool.query('SELECT * FROM jisyu ORDER BY id', (error, results) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'An error occurred', details: error.message });
    } else {
      jisyu = results.rows;
      console.log(jisyu);
      res.render('jisyu.ejs', {jisyu: jisyu});
    }
  });
});

app.get("/settings", function(req, res){
  pool.query('SELECT * FROM jisyu ORDER BY id', (error, results) => {
  if (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  } else {
    jisyu = results.rows;
    console.log(jisyu);
    res.render('settings.ejs', {jisyu: jisyu});
  }
});
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});