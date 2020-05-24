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
    var query = ("SELECT * FROM " + req.params.name + " ORDER BY DATE DESC LIMIT 700");
    // console.log("this is SQL : " + query);
    var resultWeek = [{
      OPEN: null,
      CLOSE: null,
      high: null,
      low: null,
      vol: null,
      date: null,
      avg: null,
      monthCount: null,

    }]
    connection.query(query, function (error, result, fields) {
      var dateFirst = Number.parseInt(result[0].DATE.slice(6, 8), 10);
      var dayCount = 0;
      var daySum = 0;
      var average = 0;
      var weekCount = 0;
      var i = 0;
      var j = 0;
      var posX = 50;
      result.forEach(element => {
        const year = Number.parseInt(result[i].DATE.slice(0, 4), 10);
        const month = Number.parseInt(result[i].DATE.slice(4, 6), 10);
        const date = Number.parseInt(result[i].DATE.slice(6, 8), 10);

        if (date - dateFirst >= -6 && date - dateFirst <= 6) {
          // console.log("date : " + date + "/" + month + "/" + year);
          // console.log("sum++");
          dayCount++;
          daySum += Number.parseFloat(result[i].VOL);

        } else {
          average = daySum / dayCount;
          // console.log(daySum + " / " + dayCount + " = " + average);
          // console.log("average : " + average);

          // console.log("END WEEK ")
          // console.log("date : " + date + "/" + month + "/" + year);
          dayCount = 1;
          weekCount++;
          daySum = daySum = Number.parseFloat(result[i].VOL);
          dateFirst = date;
          // console.log("datefirst : " + dateFirst);

          resultWeek[j] = {
            open: Number.parseFloat(result[i].OPEN),
            close: Number.parseFloat(result[i].CLOSE),
            high: Number.parseFloat(result[i].HIGH),
            low: Number.parseFloat(result[i].LOW),
            vol: Number.parseFloat(average),
            date: new Date(year, month - 1, date),
            avg: average,
            weekCount: weekCount,
            positionX : posX,
          };
          j++;
          posX+=50;
        }
        i++;
      })

      if (error) {
        throw error;
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(resultWeek);
    });
  });
});

// --------------------------------------------------------------------------------------------------------

app.get('/getStock/month/:name', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    var query = ("SELECT * FROM " + req.params.name + " ORDER BY DATE DESC LIMIT 3100");
    // console.log("this is SQL : " + query);
    var resultMonth = [{
      OPEN: null,
      CLOSE: null,
      high: null,
      low: null,
      vol: null,
      date: null,
      avg: null,
      monthCount: null,

    }]

    connection.query(query, function (error, result, fields) {
      console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< START >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      // console.log("DATE : " + result[0].DATE);
      var monthCurrent = Number.parseInt(result[0].DATE.slice(4, 6), 10);
      var dayCount = 0;
      var daySum = 0;
      var average = 0;
      var monthCount = 0;
      var i = 0;
      var j = 0;
      // console.log(result[0]);
      result.forEach(element => {
        const year = Number.parseInt(result[i].DATE.slice(0, 4), 10);
        const month = Number.parseInt(result[i].DATE.slice(4, 6), 10);
        const date = Number.parseInt(result[i].DATE.slice(6, 8), 10);

        if (monthCurrent == month) {
          // console.log("date : " + date + "/" + month + "/" + year);
          // console.log("sum++");
          dayCount++;
          daySum += Number.parseFloat(result[i].VOL);

        } else {
          average = daySum / dayCount;
          // console.log(daySum + " / " + dayCount + " = " + average);
          // console.log("average : " + average);

          // console.log("END MONTH ")
          monthCount++;
          // console.log("date : " + date + "/" + month + "/" + year);
          dayCount = 1;
          daySum = daySum = Number.parseFloat(result[i].VOL);
          monthCurrent = month;
          // console.log("monthCurrent : " + month);

          resultMonth[j] = [{
            open: Number.parseFloat(result[i].OPEN),
            close: Number.parseFloat(result[i].CLOSE),
            high: Number.parseFloat(result[i].HIGH),
            low: Number.parseFloat(result[i].LOW),
            vol: Number.parseFloat(result[i].VOL),
            date: new Date(year, month - 1, date),
            avg: average,
            monthCount: monthCount,
          }];
          j++;
        }
        i++;
      })

      console.log(resultMonth);


      if (error) {
        throw error;
      }
      // console.log(resultMonth);
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




// const resultWeek = result.map(({ S_ID, OPEN, CLOSE, HIGH, LOW, VOL, DATE }) => {
      //   const year = Number.parseInt(DATE.slice(0, 4), 10);
      //   const month = Number.parseInt(DATE.slice(4, 6), 10);
      //   const date = Number.parseInt(DATE.slice(6, 8), 10);

      //   if (date - dateFirst >= -6 && date - dateFirst <= 6) {
      //     console.log("date : " + date + "/" + month + "/" + year);
      //     console.log("sum++");
      //     dayCount++;
      //     daySum += Number.parseFloat(VOL);

      //   } else {
      //     average = daySum / dayCount;
      //     console.log(daySum + " / " + dayCount + " = " + average);
      //     console.log("average : " + average);

      //     console.log("END WEEK ")
      //     console.log("date : " + date + "/" + month + "/" + year);
      //     dayCount = 1;
      //     weekCount++;
      //     daySum = daySum = Number.parseFloat(VOL);
      //     dateFirst = date;
      //     console.log("datefirst : " + dateFirst);
      //     return {
      //       open: Number.parseFloat(OPEN),
      //       close: Number.parseFloat(CLOSE),
      //       high: Number.parseFloat(HIGH),
      //       low: Number.parseFloat(LOW),
      //       vol: Number.parseFloat(VOL),
      //       date: new Date(year, month - 1, date),
      //       avg: average,
      //       weekCount: weekCount,
      //     };
      //   }

      // })
      // resultWeek.map(console.log(resultWeek)); 

      // console.log(resultWeek);


      // const resultMonth = result.map(({ S_ID, OPEN, CLOSE, HIGH, LOW, VOL, DATE }) => {
      //   const year = Number.parseInt(DATE.slice(0, 4), 10);
      //   const month = Number.parseInt(DATE.slice(4, 6), 10);
      //   const date = Number.parseInt(DATE.slice(6, 8), 10);

      //   if (monthCurrent == month) {
      //     // console.log("date : " + date + "/" + month + "/" + year);
      //     // console.log("sum++");
      //     dayCount++;
      //     daySum += Number.parseFloat(VOL);

      //   } else {
      //     average = daySum / dayCount;
      //     // console.log(daySum + " / " + dayCount + " = " + average);
      //     // console.log("average : " + average);

      //     // console.log("END MONTH ")
      //     monthCount++;
      //     // console.log("date : " + date + "/" + month + "/" + year);
      //     dayCount = 1;
      //     daySum = Number.parseFloat(VOL);
      //     monthCurrent = month;
      //     // console.log("monthCurrent : " + month);

      //     return {
      //       open: Number.parseFloat(OPEN),
      //       close: Number.parseFloat(CLOSE),
      //       high: Number.parseFloat(HIGH),
      //       low: Number.parseFloat(LOW),
      //       vol: Number.parseFloat(VOL),
      //       date: new Date(year, month - 1, date),
      //       avg: average,
      //       monthCount: monthCount,
      //     };
      //   }

      // })