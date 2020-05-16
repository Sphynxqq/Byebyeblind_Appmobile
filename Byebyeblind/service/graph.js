export async function getGraph(symbolName) {
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
    const raw = await fetch('http://192.168.1.37:3000/' + symbolName);
    return raw.json().map(({OPEN, CLOSE, HIGH, LOW, VOL, DATE}) => {
      const year = Number.parseInt(DATE.slice(0, 4));
      const month = Number.parseInt(DATE.slice(4, 6));
      const date = Number.parseInt(DATE.slice(6, 8));
      return {
        open: Number.parseFloat(OPEN),
        close: Number.parseFloat(CLOSE),
        high: Number.parseFloat(HIGH),
        low: Number.parseFloat(LOW),
        vol: Number.parseFloat(VOL),
        date: new Date(year, month - 1, date),
      };
    });
  } catch (error) {
    console.error('Request failed.', error);
    throw error;
  }
  /*
  Return data format
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
