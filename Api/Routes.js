// This is the routes.js file!

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var cors = require('cors');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'byebyeblind',
});

// We're still in routes.js! Right below everything else.

// Starting our app.
const app = express();

app.use(cors());

// Creating a GET route that returns data from the 'users' table.
app.get('/ticker_name', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT TICKER FROM ticker_name', function (
      error,
      result,
      fields,
    ) {
      // If some error occurs, we throw an error.
      if (error) {
        throw error;
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(result);
    });
  });
});

app.get('/7up', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM 7UP', function (error, result, fields) {
      // If some error occurs, we throw an error.
      if (error) {
        throw error;
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(result);
    });
  });
});

app.get('/7upmore', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM 7UP', function (error, result, fields) {
      // If some error occurs, we throw an error.
      if (error) {
        throw error;
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(result);
    });
  });
});

// app.get('/checkstock/:key', function (req, res) {
//   // Connecting to the database.
//   connection.getConnection(function (err, connection) {

//     // Executing the MySQL query (select all data from the 'users' table).
//     connection.query('SELECT COUNT(TICKER) AS "CHECK" FROM ticker_name WHERE TICKER = ' + key, function (error, result, fields) {
//       // If some error occurs, we throw an error.
//       console.log('SELECT COUNT(TICKER) AS "CHECK" FROM ticker_name WHERE TICKER = ' + key);
//       if (error) throw error;

//       // Getting the 'response' from the database and sending it to our route. This is were the data is.
//       res.send(result)
//     });
//   });
// });

// Starting our server.
app.listen(3000, () => {
  console.log(
    'Go to http://localhost:3000/ticker_name so you can see the data.',
  );
});
