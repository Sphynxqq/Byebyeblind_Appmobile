export async function isSymbolExist(symbolName) {
  try {
    return (await fetch('http://192.168.1.37:3000/checkstock/' + symbolName)).json();
    // return symbolName === '7UP';
    // return true;
  } catch (error) {
    console.error('Request failed.', error);
    return false;
  }
}

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


    let url = 'http://192.168.1.37:3000/getStock/day/' + symbolName;
    let response = await fetch(url);

    let commits = await response.json(); // read response body and parse as JSON
    // const temp = ("http://192.168.1.37:3000/getStock/day/" + symbolName);
    // console.log(temp);
    // const raw = await fetch('http://192.168.1.37:3000/getStock/day/' + symbolName);
    // let raw2 = raw.json();
    // const raw = generateSampleData();
    // console.log(commits);
    return commits
      .map(({ OPEN, CLOSE, HIGH, LOW, VOL, DATE }) => {
        const year = Number.parseInt(DATE.slice(0, 4), 10);
        const month = Number.parseInt(DATE.slice(4, 6), 10);
        const date = Number.parseInt(DATE.slice(6, 8), 10);
        return {
          open: Number.parseFloat(OPEN),
          close: Number.parseFloat(CLOSE),
          high: Number.parseFloat(HIGH),
          low: Number.parseFloat(LOW),
          vol: Number.parseFloat(VOL),
          date: new Date(year, month - 1, date),
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

function generateSampleData() {
  return [
    {
      S_ID: 1,
      TICKER: '7UP',
      DATE: '20190822',
      OPEN: '0.51',
      HIGH: '0.52',
      LOW: '0.48',
      CLOSE: '0.48',
      VOL: '42962100',
    },
    {
      S_ID: 2,
      TICKER: '7UP',
      DATE: '20190102',
      OPEN: '0.43',
      HIGH: '0.44',
      LOW: '0.43',
      CLOSE: '0.43',
      VOL: '502400',
    },
    {
      S_ID: 3,
      TICKER: '7UP',
      DATE: '20190103',
      OPEN: '0.44',
      HIGH: '0.45',
      LOW: '0.43',
      CLOSE: '0.43',
      VOL: '938400',
    },
    {
      S_ID: 4,
      TICKER: '7UP',
      DATE: '20190104',
      OPEN: '0.44',
      HIGH: '0.44',
      LOW: '0.42',
      CLOSE: '0.43',
      VOL: '6898700',
    },
    {
      S_ID: 5,
      TICKER: '7UP',
      DATE: '20190107',
      OPEN: '0.44',
      HIGH: '0.44',
      LOW: '0.4',
      CLOSE: '0.42',
      VOL: '9744700',
    },
    {
      S_ID: 6,
      TICKER: '7UP',
      DATE: '20190108',
      OPEN: '0.42',
      HIGH: '0.42',
      LOW: '0.41',
      CLOSE: '0.42',
      VOL: '937500',
    },
    {
      S_ID: 7,
      TICKER: '7UP',
      DATE: '20190109',
      OPEN: '0.42',
      HIGH: '0.42',
      LOW: '0.41',
      CLOSE: '0.41',
      VOL: '4935400',
    },
    {
      S_ID: 8,
      TICKER: '7UP',
      DATE: '20190110',
      OPEN: '0.42',
      HIGH: '0.42',
      LOW: '0.41',
      CLOSE: '0.41',
      VOL: '723300',
    },
    {
      S_ID: 9,
      TICKER: '7UP',
      DATE: '20190111',
      OPEN: '0.42',
      HIGH: '0.42',
      LOW: '0.4',
      CLOSE: '0.4',
      VOL: '5321400',
    },
    {
      S_ID: 10,
      TICKER: '7UP',
      DATE: '20190801',
      OPEN: '0.38',
      HIGH: '0.38',
      LOW: '0.37',
      CLOSE: '0.38',
      VOL: '1306100',
    },
    {
      S_ID: 11,
      TICKER: '7UP',
      DATE: '20190802',
      OPEN: '0.37',
      HIGH: '0.37',
      LOW: '0.33',
      CLOSE: '0.36',
      VOL: '14050500',
    },
    {
      S_ID: 12,
      TICKER: '7UP',
      DATE: '20190805',
      OPEN: '0.36',
      HIGH: '0.36',
      LOW: '0.33',
      CLOSE: '0.34',
      VOL: '4528200',
    },
    {
      S_ID: 13,
      TICKER: '7UP',
      DATE: '20190806',
      OPEN: '0.34',
      HIGH: '0.35',
      LOW: '0.33',
      CLOSE: '0.35',
      VOL: '849400',
    },
    {
      S_ID: 14,
      TICKER: '7UP',
      DATE: '20190807',
      OPEN: '0.36',
      HIGH: '0.39',
      LOW: '0.35',
      CLOSE: '0.38',
      VOL: '10554600',
    },
    {
      S_ID: 15,
      TICKER: '7UP',
      DATE: '20190808',
      OPEN: '0.38',
      HIGH: '0.38',
      LOW: '0.37',
      CLOSE: '0.37',
      VOL: '2795900',
    },
    {
      S_ID: 16,
      TICKER: '7UP',
      DATE: '20190809',
      OPEN: '0.37',
      HIGH: '0.37',
      LOW: '0.35',
      CLOSE: '0.37',
      VOL: '3633700',
    },
    {
      S_ID: 17,
      TICKER: '7UP',
      DATE: '20190813',
      OPEN: '0.36',
      HIGH: '0.37',
      LOW: '0.33',
      CLOSE: '0.35',
      VOL: '10138900',
    },
    {
      S_ID: 18,
      TICKER: '7UP',
      DATE: '20190814',
      OPEN: '0.35',
      HIGH: '0.35',
      LOW: '0.34',
      CLOSE: '0.34',
      VOL: '1400200',
    },
    {
      S_ID: 19,
      TICKER: '7UP',
      DATE: '20190815',
      OPEN: '0.36',
      HIGH: '0.38',
      LOW: '0.36',
      CLOSE: '0.38',
      VOL: '5857500',
    },
    {
      S_ID: 20,
      TICKER: '7UP',
      DATE: '20190816',
      OPEN: '0.39',
      HIGH: '0.4',
      LOW: '0.38',
      CLOSE: '0.39',
      VOL: '7430600',
    },
    {
      S_ID: 21,
      TICKER: '7UP',
      DATE: '20190819',
      OPEN: '0.41',
      HIGH: '0.5',
      LOW: '0.41',
      CLOSE: '0.48',
      VOL: '92649100',
    },
    {
      S_ID: 22,
      TICKER: '7UP',
      DATE: '20190820',
      OPEN: '0.5',
      HIGH: '0.52',
      LOW: '0.48',
      CLOSE: '0.49',
      VOL: '68451500',
    },
    {
      S_ID: 23,
      TICKER: '7UP',
      DATE: '20190821',
      OPEN: '0.49',
      HIGH: '0.51',
      LOW: '0.45',
      CLOSE: '0.51',
      VOL: '44689100',
    },
    {
      S_ID: 24,
      TICKER: '7UP',
      DATE: '20190822',
      OPEN: '0.51',
      HIGH: '0.52',
      LOW: '0.48',
      CLOSE: '0.48',
      VOL: '42962100',
    },
    {
      S_ID: 25,
      TICKER: '7UP',
      DATE: '20190823',
      OPEN: '0.49',
      HIGH: '0.54',
      LOW: '0.47',
      CLOSE: '0.54',
      VOL: '95075100',
    },
    {
      S_ID: 26,
      TICKER: '7UP',
      DATE: '20190826',
      OPEN: '0.52',
      HIGH: '0.55',
      LOW: '0.51',
      CLOSE: '0.54',
      VOL: '31570800',
    },
    {
      S_ID: 27,
      TICKER: '7UP',
      DATE: '20190827',
      OPEN: '0.55',
      HIGH: '0.63',
      LOW: '0.55',
      CLOSE: '0.6',
      VOL: '134567000',
    },
    {
      S_ID: 28,
      TICKER: '7UP',
      DATE: '20190828',
      OPEN: '0.61',
      HIGH: '0.65',
      LOW: '0.6',
      CLOSE: '0.62',
      VOL: '88702200',
    },
    {
      S_ID: 29,
      TICKER: '7UP',
      DATE: '20190829',
      OPEN: '0.63',
      HIGH: '0.67',
      LOW: '0.61',
      CLOSE: '0.66',
      VOL: '151959200',
    },
    {
      S_ID: 30,
      TICKER: '7UP',
      DATE: '20190830',
      OPEN: '0.66',
      HIGH: '0.66',
      LOW: '0.62',
      CLOSE: '0.65',
      VOL: '73428500',
    },
    {
      S_ID: 31,
      TICKER: '7UP',
      DATE: '20190902',
      OPEN: '0.64',
      HIGH: '0.64',
      LOW: '0.6',
      CLOSE: '0.61',
      VOL: '37800900',
    },
    {
      S_ID: 32,
      TICKER: '7UP',
      DATE: '20190903',
      OPEN: '0.61',
      HIGH: '0.62',
      LOW: '0.59',
      CLOSE: '0.61',
      VOL: '29794300',
    },
    {
      S_ID: 33,
      TICKER: '7UP',
      DATE: '20190904',
      OPEN: '0.6',
      HIGH: '0.61',
      LOW: '0.59',
      CLOSE: '0.61',
      VOL: '21922900',
    },
    {
      S_ID: 34,
      TICKER: '7UP',
      DATE: '20190905',
      OPEN: '0.61',
      HIGH: '0.63',
      LOW: '0.6',
      CLOSE: '0.62',
      VOL: '37090400',
    },
    {
      S_ID: 35,
      TICKER: '7UP',
      DATE: '20190906',
      OPEN: '0.63',
      HIGH: '0.64',
      LOW: '0.61',
      CLOSE: '0.62',
      VOL: '29858600',
    },
    {
      S_ID: 36,
      TICKER: '7UP',
      DATE: '20190909',
      OPEN: '0.61',
      HIGH: '0.62',
      LOW: '0.59',
      CLOSE: '0.6',
      VOL: '25583800',
    },
    {
      S_ID: 37,
      TICKER: '7UP',
      DATE: '20190910',
      OPEN: '0.6',
      HIGH: '0.61',
      LOW: '0.59',
      CLOSE: '0.6',
      VOL: '18279000',
    },
    {
      S_ID: 38,
      TICKER: '7UP',
      DATE: '20190911',
      OPEN: '0.6',
      HIGH: '0.6',
      LOW: '0.56',
      CLOSE: '0.6',
      VOL: '53505400',
    },
    {
      S_ID: 39,
      TICKER: '7UP',
      DATE: '20190912',
      OPEN: '0.6',
      HIGH: '0.64',
      LOW: '0.6',
      CLOSE: '0.61',
      VOL: '88066700',
    },
    {
      S_ID: 40,
      TICKER: '7UP',
      DATE: '20190913',
      OPEN: '0.61',
      HIGH: '0.61',
      LOW: '0.59',
      CLOSE: '0.6',
      VOL: '13034300',
    },
    {
      S_ID: 41,
      TICKER: '7UP',
      DATE: '20190916',
      OPEN: '0.6',
      HIGH: '0.6',
      LOW: '0.58',
      CLOSE: '0.59',
      VOL: '5849800',
    },
    {
      S_ID: 42,
      TICKER: '7UP',
      DATE: '20190917',
      OPEN: '0.6',
      HIGH: '0.61',
      LOW: '0.59',
      CLOSE: '0.6',
      VOL: '10561800',
    },
    {
      S_ID: 43,
      TICKER: '7UP',
      DATE: '20190918',
      OPEN: '0.59',
      HIGH: '0.62',
      LOW: '0.59',
      CLOSE: '0.61',
      VOL: '21912000',
    },
    {
      S_ID: 44,
      TICKER: '7UP',
      DATE: '20190919',
      OPEN: '0.61',
      HIGH: '0.62',
      LOW: '0.59',
      CLOSE: '0.61',
      VOL: '18523700',
    },
    {
      S_ID: 45,
      TICKER: '7UP',
      DATE: '20190920',
      OPEN: '0.6',
      HIGH: '0.61',
      LOW: '0.59',
      CLOSE: '0.6',
      VOL: '7975000',
    },
    {
      S_ID: 46,
      TICKER: '7UP',
      DATE: '20190923',
      OPEN: '0.6',
      HIGH: '0.6',
      LOW: '0.58',
      CLOSE: '0.58',
      VOL: '12609100',
    },
    {
      S_ID: 47,
      TICKER: '7UP',
      DATE: '20190924',
      OPEN: '0.58',
      HIGH: '0.59',
      LOW: '0.56',
      CLOSE: '0.57',
      VOL: '18103300',
    },
    {
      S_ID: 48,
      TICKER: '7UP',
      DATE: '20190925',
      OPEN: '0.57',
      HIGH: '0.58',
      LOW: '0.57',
      CLOSE: '0.57',
      VOL: '1830400',
    },
    {
      S_ID: 49,
      TICKER: '7UP',
      DATE: '20190926',
      OPEN: '0.57',
      HIGH: '0.6',
      LOW: '0.57',
      CLOSE: '0.6',
      VOL: '9895400',
    },
    {
      S_ID: 50,
      TICKER: '7UP',
      DATE: '20190927',
      OPEN: '0.6',
      HIGH: '0.6',
      LOW: '0.58',
      CLOSE: '0.58',
      VOL: '7816100',
    },
    {
      S_ID: 51,
      TICKER: '7UP',
      DATE: '20190930',
      OPEN: '0.59',
      HIGH: '0.59',
      LOW: '0.58',
      CLOSE: '0.59',
      VOL: '6495200',
    },
    {
      S_ID: 52,
      TICKER: '7UP',
      DATE: '20191114',
      OPEN: '0.6',
      HIGH: '0.63',
      LOW: '0.58',
      CLOSE: '0.61',
      VOL: '55196300',
    },
  ];
}
