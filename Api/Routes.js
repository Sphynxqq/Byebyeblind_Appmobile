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
app.use(express.json());
app.use(cors());

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
      console.log(result[0].OPEN);
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


// --------------------------------------------------------------------------------------------------------

app.get('/checkstock/:name', function (req, res) {

  connection.getConnection(function (err, connection) {
    // console.log(req.params);
    var query = ("SELECT COUNT(TICKER) AS 'CHECK' FROM ticker_name WHERE TICKER = '" + req.params.name + "'");
    console.log("this is name : " + req.params.name);
    console.log("this is SQL : " + query);
    connection.query(query, function (error, result, fields) {
      var check = result[0].CHECK;
      console.log(check);
      if (check == 1)
        check = true;
      else
        check = false;
      if (error) throw error;

      res.send(check)
    });
  });
});

// --------------------------------------------------------------------------------------------------------

app.get('/getStock/day/:name', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    var query = ("SELECT * FROM " + req.params.name + " ORDER BY DATE DESC LIMIT 300");
    // console.log("this is SQL : " + query);
    connection.query(query, function (error, result, fields) {
      // console.log(result);
      // console.log(result[0]);

      if (error) {
        throw error;
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(result);
    });
  });
});

// --------------------------------------------------------------------------------------------------------

app.get('/getStock/week/:name', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    var query = ("SELECT * FROM " + req.params.name + " LIMIT 700");
    // console.log("this is SQL : " + query);
    connection.query(query, function (error, result, fields) {

      console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< START >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      var dateFirst = Number.parseInt(result[0].DATE.slice(6, 8), 10);
      var dayCount = 0;
      var daySum = 0;
      var average = 0;
      const resultWeek = result.map(({ S_ID, OPEN, CLOSE, HIGH, LOW, VOL, DATE }) => {
        const year = Number.parseInt(DATE.slice(0, 4), 10);
        const month = Number.parseInt(DATE.slice(4, 6), 10);
        const date = Number.parseInt(DATE.slice(6, 8), 10);

        if (date - dateFirst >= -6 && date - dateFirst <= 6) {
          console.log("date : " + date + "/" + month + "/" + year);
          console.log("sum++");
          dayCount++;
          daySum += Number.parseFloat(VOL);
          return {
            open: Number.parseFloat(OPEN),
            close: Number.parseFloat(CLOSE),
            high: Number.parseFloat(HIGH),
            low: Number.parseFloat(LOW),
            vol: Number.parseFloat(VOL),
            date: new Date(year, month - 1, date),
          };
        } else {
          average = daySum / dayCount;
          console.log(daySum + " / " + dayCount + " = " + average);
          console.log("average : " + average);

          console.log("END WEEK ")
          console.log("date : " + date + "/" + month + "/" + year);
          dayCount = 1;
          daySum = daySum = Number.parseFloat(VOL);
          dateFirst = date;
          console.log("datefirst : " + dateFirst);
        }

      })
      // console.log(resultWeek);

      if (error) {
        throw error;
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(result);
    });
  });
});

// --------------------------------------------------------------------------------------------------------

app.get('/getStock/month/:name', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    var query = ("SELECT * FROM " + req.params.name + " LIMIT 3100");
    // console.log("this is SQL : " + query);

    connection.query(query, function (error, result, fields) {
      console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< START >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      var monthCurrent = Number.parseInt(result[0].DATE.slice(4, 6), 10);
      var dayCount = 0;
      var daySum = 0;
      var average = 0;

      const resultMonth = result.map(({ S_ID, OPEN, CLOSE, HIGH, LOW, VOL, DATE }) => {
        const year = Number.parseInt(DATE.slice(0, 4), 10);
        const month = Number.parseInt(DATE.slice(4, 6), 10);
        const date = Number.parseInt(DATE.slice(6, 8), 10);

        if (monthCurrent == month) {
          console.log("date : " + date + "/" + month + "/" + year);
          console.log("sum++");
          dayCount++;
          daySum += Number.parseFloat(VOL);
          return {
            open: Number.parseFloat(OPEN),
            close: Number.parseFloat(CLOSE),
            high: Number.parseFloat(HIGH),
            low: Number.parseFloat(LOW),
            vol: Number.parseFloat(VOL),
            date: new Date(year, month - 1, date),
          };
        } else {
          average = daySum / dayCount;
          console.log(daySum + " / " + dayCount + " = " + average);
          console.log("average : " + average);

          console.log("END MONTH ")
          console.log("date : " + date + "/" + month + "/" + year);
          dayCount = 1;
          daySum = daySum = Number.parseFloat(VOL);
          monthCurrent = month;
          console.log("monthCurrent : " + month);
        }

      })
      if (error) {
        throw error;
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(result);
    });
  });
});



// Starting our server.
app.listen(3000, () => {
  console.log(
    'Go to http://localhost:3000/ticker_name so you can see the data.',
  );
});
