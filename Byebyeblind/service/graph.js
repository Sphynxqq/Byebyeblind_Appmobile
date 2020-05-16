export async function getGraph(symbolName) {
  /*
[
    {"S_ID":1,
    "TICKER":"7UP",
    "DATE":"20190822",
    "OPEN":"0.51",
    "HIGH":"0.52",
    "LOW":"0.48",
    "CLOSE":"0.48",
    "VOL":"42962100"},
    ...
]
  */
  try {
    const raw = await fetch('http://192.168.1.37:3000/' + symbolName);
    const parsedData = raw.json().map(({OPEN, CLOSE, HIGH, LOW, VOL, DATE}) => {
      const year = Number.parseInt(DATE.slice(0, 4));
      const month = DATE.slice(4, 6);
      const date = DATE.slice(6, 8);
      return {
        open: Number.parseFloat(OPEN),
        close: Number.parseFloat(CLOSE),
        high: Number.parseFloat(HIGH),
        low: Number.parseFloat(LOW),
        vol: Number.parseFloat(VOL),
        date: new Date(year, month, date),
      };
    });

    return parsedData;
  } catch (error) {
    console.error('Request failed.', error);
    throw error;
  }
}
