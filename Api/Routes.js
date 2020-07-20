// This is the routes.js file!
var getWeekOfMonth = require('date-fns/getWeekOfMonth');
var parseISO = require('date-fns/parseISO');
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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Creating a GET route that returns data from the 'users' table.



// --------------------------------------------------------------------------------------------------------

app.get('/checkstock/:name', function (req, res) {

  connection.getConnection(function (err, connection) {

    // console.log(req.params);
    var query = ("SELECT COUNT(TICKER) AS 'CHECK' FROM ticker_name WHERE TICKER = '" + req.params.name + "'");
    // console.log("this is name : " + req.params.name);
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
// day
app.get('/getStock/day/:name/:end/:n', function (req, res) {
  console.log("getDay");
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    // var date = format(parseISO(req.params.end), 'DMYY')
    // console.log(req.params.end + " : " + date);
    var query = ("SELECT * FROM " + req.params.name + " WHERE DATE < " + req.params.end + " ORDER BY DATE DESC LIMIT " + req.params.n);
    console.log("this is SQL : " + query);
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
//week
app.get('/getStock/week/:name/:end/:n', function (req, res) {
  // Connecting to the database.
  console.log("getWeek");
  connection.getConnection(function (err, connection) {
    var query = ("SELECT * FROM " + req.params.name + " WHERE DATE < " + req.params.end + " ORDER BY DATE DESC LIMIT " + req.params.n);
    console.log("this is SQL : " + query);
    var WeekOfMonthCurrent, WeekOfMonth;
    var resultWeek = [{
      TICKER: null,
      OPEN: null,
      CLOSE: null,
      HIGH: null,
      LOW: null,
      VOL: null,
      DATE: null,
    }]
    connection.query(query, function (error, result, fields) {


      var dateFirst = Number.parseInt(result[0].DATE.slice(6, 8), 10);
      dateFirst = result[0].DATE;
      WeekOfMonthCurrent = getWeekOfMonth(parseISO(result[0].DATE))
      // console.log(result[0].DATE + " : "+ dateFirst + " : " + WeekOfMonthCurrent);

      var i = 0;
      var j = 0;
      var high = Number.parseFloat(result[0].HIGH);
      var low = Number.parseFloat(result[0].LOW);
      var closeAvg = 0, openAvg = 0;
      var volSum = 0;

      var dayCount = 0;
      result.forEach(element => {
        WeekOfMonth = getWeekOfMonth(parseISO(result[i].DATE))
        // console.log(result[i].DATE + " : "+ dateFirst + " : " + WeekOfMonthCurrent + " : " + WeekOfMonth);
        //   const year = Number.parseInt(result[i].DATE.slice(0, 4), 10);
        //   const month = Number.parseInt(result[i].DATE.slice(4, 6), 10);
        //   const date = Number.parseInt(result[i].DATE.slice(6, 8), 10);
        // console.log(dateFirst);
        // รับวันมาก่อน แล้วมาดูว่าเป็นอาทิตที่เท่าไหร่ พอได้มาแล้ว 
        if (WeekOfMonth == WeekOfMonthCurrent) { // เช็ควันในอาทิต
          volSum += Number.parseFloat(result[i].VOL);
          closeAvg += Number.parseFloat(result[i].CLOSE);
          openAvg += Number.parseFloat(result[i].OPEN);
          if (result[i].HIGH >= high) {
            high = result[i].HIGH;
          }
          if (result[i].LOW <= low) {
            low = result[i].LOW;
          }
          dayCount++;
        } else {
          WeekOfMonthCurrent = WeekOfMonth
          // console.log(result[i].DATE + " : " + WeekOfMonthCurrent + " : " + WeekOfMonth);
          openAvg = openAvg / dayCount;
          closeAvg = closeAvg / dayCount;
          // console.log(" open = " + openAvg + " close = " + closeAvg + " volSum = " + volSum);
          resultWeek[j] = {
            TICKER: result[i].TICKER,
            OPEN: Number.parseFloat(openAvg), //เฉลี่ย
            CLOSE: Number.parseFloat(closeAvg),//เฉลี่ย
            HIGH: Number.parseFloat(high),//สูงสุด
            LOW: Number.parseFloat(low),//ต่ำสุด
            VOL: Number.parseFloat(volSum),//sum
            DATE: dateFirst,//วันแรก

          };
          volSum = Number.parseFloat(result[i].VOL);
          closeAvg = Number.parseFloat(result[i].CLOSE);
          openAvg = Number.parseFloat(result[i].OPEN);
          high = Number.parseFloat(result[i].HIGH);
          low = Number.parseFloat(result[i].LOW);
          dayCount = 1;
          dateFirst = result[i].DATE;
          j++;


        }
        i++;
      })


      // console.log(resultWeek);
      if (error) {
        throw error;
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(resultWeek);
    });
  });
});

// --------------------------------------------------------------------------------------------------------
//month 
app.get('/getStock/month/:name/:end/:n', function (req, res) {
  // Connecting to the database.
  console.log("getMonth");
  connection.getConnection(function (err, connection) {

    var query = ("SELECT * FROM " + req.params.name + " WHERE DATE < " + req.params.end + " ORDER BY DATE DESC LIMIT " + req.params.n);
    console.log("this is SQL : " + query);

    var MonthCurrent, month;

    var resultMonth = [{
      TICKER: null,
      OPEN: null,
      CLOSE: null,
      HIGH: null,
      LOW: null,
      VOL: null,
      DATE: null,
    }]

    connection.query(query, function (error, result, fields) {

      var dateFirst = Number.parseInt(result[0].DATE.slice(6, 8), 10);
      dateFirst = result[0].DATE;
      MonthCurrent = Number.parseInt(result[0].DATE.slice(4, 6), 10);
      // console.log(result[0].DATE + " : "+ dateFirst + " : " + WeekOfMonthCurrent);

      var i = 0;
      var j = 0;
      var high = Number.parseFloat(result[0].HIGH);
      var low = Number.parseFloat(result[0].LOW);
      var closeAvg = 0, openAvg = 0;
      var volSum = 0;

      var dayCount = 0;
      result.forEach(element => {
        month = Number.parseInt(result[i].DATE.slice(4, 6), 10);

        if (month == MonthCurrent) { // เช็ควันในอาทิต

          volSum += Number.parseFloat(result[i].VOL);
          closeAvg += Number.parseFloat(result[i].CLOSE);
          openAvg += Number.parseFloat(result[i].OPEN);
          if (result[i].HIGH >= high) {
            high = result[i].HIGH;
          }
          if (result[i].LOW <= low) {
            low = result[i].LOW;
          }

          dayCount++;
        } else {
          MonthCurrent = month
          // console.log(result[i].DATE + " : " + WeekOfMonthCurrent + " : " + WeekOfMonth);
          openAvg = openAvg / dayCount;
          closeAvg = closeAvg / dayCount;
          // console.log(" open = " + openAvg + " close = " + closeAvg + " volSum = " + volSum);
          resultMonth[j] = {
            TICKER: result[i].TICKER,
            OPEN: Number.parseFloat(openAvg), //เฉลี่ย
            CLOSE: Number.parseFloat(closeAvg),//เฉลี่ย
            HIGH: Number.parseFloat(high),//สูงสุด
            LOW: Number.parseFloat(low),//ต่ำสุด
            VOL: Number.parseFloat(volSum),//sum
            DATE: dateFirst,//วันแรก

          };
          volSum = Number.parseFloat(result[i].VOL);
          closeAvg = Number.parseFloat(result[i].CLOSE);
          openAvg = Number.parseFloat(result[i].OPEN);
          high = Number.parseFloat(result[i].HIGH);
          low = Number.parseFloat(result[i].LOW);
          dayCount = 1;
          dateFirst = result[i].DATE;
          j++;


        }
        i++;
      })


      // console.log(resultMonth);
      if (error) {
        throw error;
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(resultMonth);
    });
  });
});

// --------------------------------------------------------------------------------------------------------

app.get('/checkFav/:u_id/:ticker', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    var query = ("SELECT COUNT(TICKER) AS 'CHECK' FROM favorite where U_ID = '" + req.params.u_id + "' AND TICKER = '" + req.params.ticker + "'");
    console.log("this is SQL : " + query);
    connection.query(query, function (error, result, fields) {
      // console.log(result);
      // console.log(result[0]);
      var check = result[0].CHECK;
      console.log(check);
      if (check == 1)
        check = true;
      else
        check = false;

      if (error) {
        throw error;
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(check);
    });
  });
});

// --------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------

app.post('/addFav', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    console.log(req.body.user_id);
    // var today = new Date("d/m/y");


    var query = ("INSERT INTO favorite (U_ID, TICKER) VALUES ('" + req.body.user_id + "', '" + req.body.ticker + "')");

    console.log("this is SQL : " + query);
    connection.query(query, function (error, result, fields) {


      if (error) {
        throw error;
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is
      // console.log("success");
      res.send("success");
    });
  });
});

// --------------------------------------------------------------------------------------------------------

app.post('/delFav', function (req, res) {
  // Connecting to the database.
  console.log("delFav");
  connection.getConnection(function (err, connection) {
    // var today = new Date("d/m/y");

    var query = ("DELETE FROM favorite WHERE U_ID = '" + req.body.user_id + "' AND TICKER = '" + req.body.ticker + "'");

    console.log("this is SQL : " + query);
    connection.query(query, function (error, result, fields) {


      if (error) {
        throw error;
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is
      console.log("success");
      res.send("success");
    });
  });
});

// --------------------------------------------------------------------------------------------------------

app.get('/getFav/:u_id', function (req, res) {
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    // var today = new Date("d/m/y");

    var query = ("SELECT * FROM favorite WHERE U_ID = '" + req.params.u_id + "'");

    console.log("this is SQL : " + query);
    connection.query(query, function (error, result, fields) {


      if (error) {
        throw error;
      }

      // Getting the 'response' from the database and sending it to our route. This is were the data is
      // console.log(result);
      res.send(result);
    });
  });
});


// Starting our server.
app.listen(3000, () => {
  console.log(
    'Server Start.',
  );
});

