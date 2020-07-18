export async function isSymbolExist(symbolName) {
  try {
    return (
      await fetch('http://192.168.1.43:3000/checkstock/' + symbolName)
    ).json();
    // return symbolName === '7UP';
    // return true;
  } catch (error) {
    console.error('Request failed.', error);
    return false;
  }
}

// Test comment

export async function getGraph(symbolName) { // จาก 3 อันนี้ใช่มะ
  /* Data from API format
[
    {"S_ID":1,
    "TICKER":"7UP",
    "DATE":"20190822", // string
    "OPEN":"0.51", // string
    "HIGH":"0.52", // string
    "LOW":"0.48", // string
    "CLOSE":"0.48", // string
    "VOL":"42962100"}, // string
    ...
]
  */
  try {
    let url = 'http://192.168.1.43:3000/getStock/day/' + symbolName;
    let response = await fetch(url);

    let commits = await response.json();
    return commits
      .map(({ OPEN, CLOSE, HIGH, LOW, VOL, DATE , TICKER}) => {
        const year = Number.parseInt(DATE.slice(0, 4), 10);
        const month = Number.parseInt(DATE.slice(4, 6), 10);
        const date = Number.parseInt(DATE.slice(6, 8), 10);
        var posX = -800;
        posX = posX + 300;
        // console.log(posX);
        return {
          open: Number.parseFloat(OPEN),
          close: Number.parseFloat(CLOSE),
          high: Number.parseFloat(HIGH),
          low: Number.parseFloat(LOW),
          vol: Number.parseFloat(VOL),
          date: new Date(year, month - 1, date),
          positionX: posX,
          ticker: TICKER,
        };
        
      })
      .slice(-10);
  } catch (error) {
    console.warn('Request failed.', error);
    return [];
  }
  /*
  Return symbolData format
  [
    {
      open: 1, // float
      close: 1, // float
      high: 1, // float
      low: 1, // float
      vol: 1, // float
      date: Date(2020, 2, 12), // date
    }
  ]
   */
}

export async function getGraphweek(symbolName) {

  try {
    let url = 'http://192.168.1.43:3000/getStock/week/' + symbolName;
    let response = await fetch(url);

    let commits = await response.json();
    return commits.slice(-10);
  } catch (error) {
    console.warn('Request failed.', error);
    return [];
  }

}

export async function getGraphmonth(symbolName) {

  try {
    let url = 'http://192.168.1.43:3000/getStock/month/' + symbolName;
    let response = await fetch(url);

    let commits = await response.json();
    console.log(commits);
    return commits.slice(-10);
  } catch (error) {
    console.warn('Request failed.', error);
    return [];
  }

}

export async function getGraphNextDay(symbolName, startNextday) { 
  try {
    let url = 'http://192.168.1.43:3000/getStock/day/' + symbolName;
    let response = await fetch(url);
    let commits = await response.json();
    
    console.log("symbolName in graph............ " + symbolName);
    console.log("startNextday in graph............. " + startNextday);
    console.log("This is raw ......" + commits);

    // const temp = [];
    // for (let i = startNextday; i < 10 + startNextday; i++) {
    //   temp[i] = raw[i];
    // }
    // for (let i = symbolName; i < 10 + symbolName; i++) {
    //   console.log(temp[i]);
    // }
    return commits
      .map(({OPEN, CLOSE, HIGH, LOW, VOL, DATE, S_ID}) => {
        const year = Number.parseInt(DATE.slice(0, 4), 10);
        const month = Number.parseInt(DATE.slice(4, 6), 10);
        const date = Number.parseInt(DATE.slice(6, 8), 10);
        return {
          open: Number.parseFloat(OPEN),
          close: Number.parseFloat(CLOSE),
          high: Number.parseFloat(HIGH),
          low: Number.parseFloat(LOW),
          vol: Number.parseFloat(VOL),
          s_id: Number.parseFloat(S_ID),
          date: new Date(year, month - 1, date),
        };
      })
      .slice(-10);
  } catch (error) {
    console.warn('Request failed.', error);
    return [];
  }
}

