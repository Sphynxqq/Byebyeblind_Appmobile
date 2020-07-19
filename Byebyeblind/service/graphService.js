/* eslint-disable prettier/prettier */
import setDay from 'date-fns/setDay';
import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks';
import format from 'date-fns/format';

const server = '192.168.1.43:3000';
const asDateString = date => format(date, 'yyyyMMdd');

export async function isSymbolExist(symbolName) {
  try {
    return (await fetch(`http://${server}/checkstock/${symbolName}`)).json();
    // return symbolName === '7UP';
    // return true;
  } catch (error) {
    console.error('Request failed.', error);
    return false;
  }
}

function toDisplayData({ OPEN, CLOSE, HIGH, LOW, VOL, DATE, S_ID }) {
  const y = Number.parseInt(DATE.slice(0, 4), 10);
  const m = Number.parseInt(DATE.slice(4, 6), 10);
  const d = Number.parseInt(DATE.slice(6, 8), 10);
  return {
    open: Number.parseFloat(OPEN),
    close: Number.parseFloat(CLOSE),
    high: Number.parseFloat(HIGH),
    low: Number.parseFloat(LOW),
    vol: Number.parseFloat(VOL),
    s_id: Number.parseFloat(S_ID),
    date: new Date(`${y}/${m}/${d}`),
  };
}
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

export async function getDayGraph(symbolName, end) {
  try {
    end = format(end, 'yyyyMMd')
    
    const url = `http://${server}/getStock/day/${symbolName}/${end}/${20}`;
    const response = await fetch(url);
    console.log(url);
    const raw = await response.json();

    // const raw = getMockData('day', asDateString(end));

    return raw.map(toDisplayData).slice(-10);
  } catch (error) {
    console.warn('Request failed.', error);
    return [];
  }
}

export async function getWeekGraph(symbolName, end) {
  try {
    // const url = `http://${server}/getStock/week/${symbolName}`;
    // const response = await fetch(url);

    // const raw = await response.json();
    const raw = getMockData('week', asDateString(end));

    return raw.map(toDisplayData).slice(-10);
  } catch (error) {
    console.warn('Request failed.', error);
    return [];
  }
}

export async function getMonthGraph(symbolName, end) {
  try {
    // const url = `http://${server}/getStock/month/${symbolName}`;
    // const response = await fetch(url);

    // const raw = await response.json();
    const raw = getMockData('month', asDateString(end));

    return raw.map(toDisplayData).slice(-10);
  } catch (error) {
    console.warn('Request failed.', error);
    return [];
  }
}

/** BELOW IS MOCK DATA, REMOVE WHEN DONE **/

function getMockData(type, end) {
  let endDate = new Date(`${end.slice(0, 4)}/${end.slice(4, 6)}/${end.slice(6, 8)}`);
  let n;
  switch (type) {
    case 'month':
      const day = end.slice(6, 8);
      return rawData
        .filter(d => d.DATE.slice(6, 8) === day);
    case 'week':
      const weeks = [];
      endDate = setDay(endDate, 5);
      n = 50;
      while (n--) {
        weeks.push(asDateString(endDate));
        endDate = addWeeks(endDate, -1);
      }
      return rawData.filter(d => weeks.indexOf(d.DATE) > -1);
    default:
      const days = [];
      n = 50;
      while (n--) {
        days.push(asDateString(endDate));
        endDate = addDays(endDate, -1);
      }
      return rawData.filter(d => days.indexOf(d.DATE) > -1);
  }
}

const rawData = [
  { 'DATE': '20191001', 'OPEN': '0.58', 'HIGH': '0.58', 'LOW': '0.57', 'CLOSE': '0.57', 'VOL': '3615000' },
  { 'DATE': '20191002', 'OPEN': '0.58', 'HIGH': '0.58', 'LOW': '0.57', 'CLOSE': '0.57', 'VOL': '4967800' },
  { 'DATE': '20191003', 'OPEN': '0.57', 'HIGH': '0.58', 'LOW': '0.57', 'CLOSE': '0.58', 'VOL': '6118300' },
  { 'DATE': '20191004', 'OPEN': '0.57', 'HIGH': '0.58', 'LOW': '0.52', 'CLOSE': '0.53', 'VOL': '24956900' },
  { 'DATE': '20191007', 'OPEN': '0.54', 'HIGH': '0.55', 'LOW': '0.53', 'CLOSE': '0.54', 'VOL': '8421200' },
  { 'DATE': '20191008', 'OPEN': '0.54', 'HIGH': '0.55', 'LOW': '0.44', 'CLOSE': '0.54', 'VOL': '81755000' },
  { 'DATE': '20191009', 'OPEN': '0.54', 'HIGH': '0.54', 'LOW': '0.52', 'CLOSE': '0.53', 'VOL': '5355200' },
  { 'DATE': '20191010', 'OPEN': '0.52', 'HIGH': '0.54', 'LOW': '0.52', 'CLOSE': '0.53', 'VOL': '4440200' },
  { 'DATE': '20191011', 'OPEN': '0.53', 'HIGH': '0.54', 'LOW': '0.51', 'CLOSE': '0.53', 'VOL': '5329600' },
  { 'DATE': '20191015', 'OPEN': '0.53', 'HIGH': '0.54', 'LOW': '0.52', 'CLOSE': '0.53', 'VOL': '6196700' },
  { 'DATE': '20191016', 'OPEN': '0.53', 'HIGH': '0.53', 'LOW': '0.51', 'CLOSE': '0.52', 'VOL': '5492300' },
  { 'DATE': '20191017', 'OPEN': '0.51', 'HIGH': '0.52', 'LOW': '0.51', 'CLOSE': '0.51', 'VOL': '5510200' },
  { 'DATE': '20191018', 'OPEN': '0.51', 'HIGH': '0.52', 'LOW': '0.51', 'CLOSE': '0.51', 'VOL': '3151200' },
  { 'DATE': '20191021', 'OPEN': '0.51', 'HIGH': '0.52', 'LOW': '0.51', 'CLOSE': '0.51', 'VOL': '1254500' },
  { 'DATE': '20191022', 'OPEN': '0.52', 'HIGH': '0.52', 'LOW': '0.51', 'CLOSE': '0.51', 'VOL': '1210400' },
  { 'DATE': '20191024', 'OPEN': '0.51', 'HIGH': '0.53', 'LOW': '0.51', 'CLOSE': '0.51', 'VOL': '4546600' },
  { 'DATE': '20191025', 'OPEN': '0.52', 'HIGH': '0.52', 'LOW': '0.5', 'CLOSE': '0.51', 'VOL': '2840400' },
  { 'DATE': '20191028', 'OPEN': '0.51', 'HIGH': '0.51', 'LOW': '0.49', 'CLOSE': '0.51', 'VOL': '4147100' },
  { 'DATE': '20191029', 'OPEN': '0.5', 'HIGH': '0.51', 'LOW': '0.5', 'CLOSE': '0.51', 'VOL': '3381000' },
  { 'DATE': '20191030', 'OPEN': '0.5', 'HIGH': '0.51', 'LOW': '0.5', 'CLOSE': '0.51', 'VOL': '1495500' },
  { 'DATE': '20191031', 'OPEN': '0.51', 'HIGH': '0.51', 'LOW': '0.5', 'CLOSE': '0.5', 'VOL': '2310500' },
  { 'DATE': '20191101', 'OPEN': '0.5', 'HIGH': '0.51', 'LOW': '0.5', 'CLOSE': '0.5', 'VOL': '2400700' },
  { 'DATE': '20191104', 'OPEN': '0.5', 'HIGH': '0.5', 'LOW': '0.49', 'CLOSE': '0.5', 'VOL': '497000' },
  { 'DATE': '20191105', 'OPEN': '0.51', 'HIGH': '0.51', 'LOW': '0.49', 'CLOSE': '0.5', 'VOL': '1136700' },
  { 'DATE': '20191106', 'OPEN': '0.51', 'HIGH': '0.54', 'LOW': '0.5', 'CLOSE': '0.53', 'VOL': '30496900' },
  { 'DATE': '20191107', 'OPEN': '0.53', 'HIGH': '0.6', 'LOW': '0.53', 'CLOSE': '0.59', 'VOL': '44252500' },
  { 'DATE': '20191108', 'OPEN': '0.59', 'HIGH': '0.62', 'LOW': '0.58', 'CLOSE': '0.61', 'VOL': '28116600' },
  { 'DATE': '20191111', 'OPEN': '0.61', 'HIGH': '0.61', 'LOW': '0.59', 'CLOSE': '0.6', 'VOL': '7205400' },
  { 'DATE': '20191112', 'OPEN': '0.6', 'HIGH': '0.62', 'LOW': '0.59', 'CLOSE': '0.6', 'VOL': '14369500' },
  { 'DATE': '20191113', 'OPEN': '0.61', 'HIGH': '0.62', 'LOW': '0.58', 'CLOSE': '0.59', 'VOL': '24334200' },
  { 'DATE': '20191114', 'OPEN': '0.6', 'HIGH': '0.63', 'LOW': '0.58', 'CLOSE': '0.61', 'VOL': '55196300' },
  { 'DATE': '20191115', 'OPEN': '0.61', 'HIGH': '0.61', 'LOW': '0.59', 'CLOSE': '0.6', 'VOL': '9598600' },
  { 'DATE': '20191118', 'OPEN': '0.59', 'HIGH': '0.6', 'LOW': '0.58', 'CLOSE': '0.59', 'VOL': '4375800' },
  { 'DATE': '20191119', 'OPEN': '0.59', 'HIGH': '0.6', 'LOW': '0.58', 'CLOSE': '0.58', 'VOL': '5107300' },
  { 'DATE': '20191120', 'OPEN': '0.58', 'HIGH': '0.59', 'LOW': '0.57', 'CLOSE': '0.57', 'VOL': '4896400' },
  { 'DATE': '20191121', 'OPEN': '0.57', 'HIGH': '0.58', 'LOW': '0.56', 'CLOSE': '0.56', 'VOL': '1826800' },
  { 'DATE': '20191122', 'OPEN': '0.56', 'HIGH': '0.58', 'LOW': '0.56', 'CLOSE': '0.57', 'VOL': '2778500' },
  { 'DATE': '20191125', 'OPEN': '0.57', 'HIGH': '0.6', 'LOW': '0.57', 'CLOSE': '0.58', 'VOL': '17419600' },
  { 'DATE': '20191126', 'OPEN': '0.58', 'HIGH': '0.61', 'LOW': '0.58', 'CLOSE': '0.59', 'VOL': '25766700' },
  { 'DATE': '20191127', 'OPEN': '0.6', 'HIGH': '0.6', 'LOW': '0.58', 'CLOSE': '0.59', 'VOL': '3998900' },
  { 'DATE': '20191128', 'OPEN': '0.59', 'HIGH': '0.59', 'LOW': '0.56', 'CLOSE': '0.57', 'VOL': '13287800' },
  { 'DATE': '20191129', 'OPEN': '0.56', 'HIGH': '0.57', 'LOW': '0.53', 'CLOSE': '0.54', 'VOL': '37227600' },
  { 'DATE': '20191202', 'OPEN': '0.54', 'HIGH': '0.56', 'LOW': '0.52', 'CLOSE': '0.54', 'VOL': '16410300' },
  { 'DATE': '20191203', 'OPEN': '0.53', 'HIGH': '0.53', 'LOW': '0.52', 'CLOSE': '0.52', 'VOL': '4984000' },
  { 'DATE': '20191204', 'OPEN': '0.52', 'HIGH': '0.53', 'LOW': '0.51', 'CLOSE': '0.52', 'VOL': '1973000' },
  { 'DATE': '20191206', 'OPEN': '0.52', 'HIGH': '0.53', 'LOW': '0.51', 'CLOSE': '0.51', 'VOL': '3315000' },
  { 'DATE': '20191209', 'OPEN': '0.51', 'HIGH': '0.51', 'LOW': '0.49', 'CLOSE': '0.5', 'VOL': '13361300' },
  { 'DATE': '20191211', 'OPEN': '0.5', 'HIGH': '0.51', 'LOW': '0.48', 'CLOSE': '0.48', 'VOL': '7887300' },
  { 'DATE': '20191212', 'OPEN': '0.49', 'HIGH': '0.54', 'LOW': '0.48', 'CLOSE': '0.53', 'VOL': '21207800' },
  { 'DATE': '20191213', 'OPEN': '0.53', 'HIGH': '0.55', 'LOW': '0.52', 'CLOSE': '0.53', 'VOL': '28349800' },
  { 'DATE': '20191216', 'OPEN': '0.53', 'HIGH': '0.53', 'LOW': '0.49', 'CLOSE': '0.52', 'VOL': '17002700' },
  { 'DATE': '20191217', 'OPEN': '0.51', 'HIGH': '0.52', 'LOW': '0.5', 'CLOSE': '0.52', 'VOL': '2782600' },
  { 'DATE': '20191218', 'OPEN': '0.52', 'HIGH': '0.52', 'LOW': '0.5', 'CLOSE': '0.51', 'VOL': '4611900' },
  { 'DATE': '20191219', 'OPEN': '0.51', 'HIGH': '0.53', 'LOW': '0.51', 'CLOSE': '0.53', 'VOL': '15216500' },
  { 'DATE': '20191220', 'OPEN': '0.53', 'HIGH': '0.53', 'LOW': '0.51', 'CLOSE': '0.52', 'VOL': '5036900' },
  { 'DATE': '20191223', 'OPEN': '0.52', 'HIGH': '0.52', 'LOW': '0.51', 'CLOSE': '0.52', 'VOL': '3870300' },
  { 'DATE': '20191224', 'OPEN': '0.51', 'HIGH': '0.51', 'LOW': '0.49', 'CLOSE': '0.51', 'VOL': '10441400' },
  { 'DATE': '20191225', 'OPEN': '0.5', 'HIGH': '0.51', 'LOW': '0.5', 'CLOSE': '0.5', 'VOL': '361500' },
  { 'DATE': '20191226', 'OPEN': '0.51', 'HIGH': '0.52', 'LOW': '0.5', 'CLOSE': '0.52', 'VOL': '5967200' },
  { 'DATE': '20191227', 'OPEN': '0.52', 'HIGH': '0.52', 'LOW': '0.5', 'CLOSE': '0.52', 'VOL': '4735500' },
  { 'DATE': '20191230', 'OPEN': '0.52', 'HIGH': '0.52', 'LOW': '0.49', 'CLOSE': '0.51', 'VOL': '9129200' },
  { 'DATE': '20200102', 'OPEN': '0.51', 'HIGH': '0.51', 'LOW': '0.5', 'CLOSE': '0.51', 'VOL': '4418000' },
  { 'DATE': '20200103', 'OPEN': '0.5', 'HIGH': '0.51', 'LOW': '0.5', 'CLOSE': '0.51', 'VOL': '4298700' },
  { 'DATE': '20200106', 'OPEN': '0.5', 'HIGH': '0.51', 'LOW': '0.49', 'CLOSE': '0.51', 'VOL': '6595500' },
  { 'DATE': '20200107', 'OPEN': '0.5', 'HIGH': '0.51', 'LOW': '0.5', 'CLOSE': '0.51', 'VOL': '4469200' },
  { 'DATE': '20200108', 'OPEN': '0.5', 'HIGH': '0.5', 'LOW': '0.49', 'CLOSE': '0.5', 'VOL': '3292500' },
  { 'DATE': '20200109', 'OPEN': '0.5', 'HIGH': '0.5', 'LOW': '0.48', 'CLOSE': '0.49', 'VOL': '12963700' },
  { 'DATE': '20200110', 'OPEN': '0.5', 'HIGH': '0.5', 'LOW': '0.49', 'CLOSE': '0.5', 'VOL': '13064100' },
  { 'DATE': '20200113', 'OPEN': '0.5', 'HIGH': '0.5', 'LOW': '0.48', 'CLOSE': '0.49', 'VOL': '10242500' },
  { 'DATE': '20200114', 'OPEN': '0.49', 'HIGH': '0.49', 'LOW': '0.48', 'CLOSE': '0.49', 'VOL': '2755300' },
  { 'DATE': '20200115', 'OPEN': '0.49', 'HIGH': '0.5', 'LOW': '0.48', 'CLOSE': '0.5', 'VOL': '3366400' },
  { 'DATE': '20200116', 'OPEN': '0.5', 'HIGH': '0.5', 'LOW': '0.49', 'CLOSE': '0.5', 'VOL': '115900' },
  { 'DATE': '20200117', 'OPEN': '0.49', 'HIGH': '0.5', 'LOW': '0.49', 'CLOSE': '0.49', 'VOL': '7941200' },
  { 'DATE': '20200120', 'OPEN': '0.49', 'HIGH': '0.49', 'LOW': '0.48', 'CLOSE': '0.49', 'VOL': '2801700' },
  { 'DATE': '20200121', 'OPEN': '0.49', 'HIGH': '0.49', 'LOW': '0.48', 'CLOSE': '0.48', 'VOL': '3924400' },
  { 'DATE': '20200122', 'OPEN': '0.48', 'HIGH': '0.48', 'LOW': '0.46', 'CLOSE': '0.48', 'VOL': '10216200' },
  { 'DATE': '20200123', 'OPEN': '0.48', 'HIGH': '0.48', 'LOW': '0.47', 'CLOSE': '0.48', 'VOL': '4527400' },
  { 'DATE': '20200124', 'OPEN': '0.47', 'HIGH': '0.48', 'LOW': '0.46', 'CLOSE': '0.48', 'VOL': '4611800' },
  { 'DATE': '20200127', 'OPEN': '0.48', 'HIGH': '0.48', 'LOW': '0.45', 'CLOSE': '0.45', 'VOL': '12261300' },
  { 'DATE': '20200128', 'OPEN': '0.45', 'HIGH': '0.45', 'LOW': '0.43', 'CLOSE': '0.44', 'VOL': '6722500' },
  { 'DATE': '20200129', 'OPEN': '0.43', 'HIGH': '0.46', 'LOW': '0.43', 'CLOSE': '0.45', 'VOL': '7451200' },
  { 'DATE': '20200130', 'OPEN': '0.44', 'HIGH': '0.47', 'LOW': '0.44', 'CLOSE': '0.47', 'VOL': '11157700' },
  { 'DATE': '20200131', 'OPEN': '0.47', 'HIGH': '0.47', 'LOW': '0.45', 'CLOSE': '0.47', 'VOL': '3253600' },
  { 'DATE': '20200203', 'OPEN': '0.46', 'HIGH': '0.46', 'LOW': '0.45', 'CLOSE': '0.46', 'VOL': '691300' },
  { 'DATE': '20200204', 'OPEN': '0.46', 'HIGH': '0.46', 'LOW': '0.44', 'CLOSE': '0.46', 'VOL': '4549500' },
  { 'DATE': '20200205', 'OPEN': '0.46', 'HIGH': '0.46', 'LOW': '0.44', 'CLOSE': '0.45', 'VOL': '7819500' },
  { 'DATE': '20200206', 'OPEN': '0.45', 'HIGH': '0.46', 'LOW': '0.44', 'CLOSE': '0.44', 'VOL': '11736000' },
  { 'DATE': '20200207', 'OPEN': '0.44', 'HIGH': '0.45', 'LOW': '0.44', 'CLOSE': '0.45', 'VOL': '4382000' },
  { 'DATE': '20200211', 'OPEN': '0.45', 'HIGH': '0.45', 'LOW': '0.44', 'CLOSE': '0.45', 'VOL': '4916400' },
  { 'DATE': '20200212', 'OPEN': '0.45', 'HIGH': '0.46', 'LOW': '0.44', 'CLOSE': '0.45', 'VOL': '23620700' },
  { 'DATE': '20200213', 'OPEN': '0.45', 'HIGH': '0.45', 'LOW': '0.44', 'CLOSE': '0.44', 'VOL': '6618000' },
  { 'DATE': '20200214', 'OPEN': '0.44', 'HIGH': '0.45', 'LOW': '0.43', 'CLOSE': '0.44', 'VOL': '3279200' },
  { 'DATE': '20200217', 'OPEN': '0.45', 'HIGH': '0.45', 'LOW': '0.44', 'CLOSE': '0.45', 'VOL': '3316100' },
  { 'DATE': '20200218', 'OPEN': '0.45', 'HIGH': '0.45', 'LOW': '0.43', 'CLOSE': '0.44', 'VOL': '1746100' },
  { 'DATE': '20200219', 'OPEN': '0.44', 'HIGH': '0.45', 'LOW': '0.43', 'CLOSE': '0.44', 'VOL': '4951100' },
  { 'DATE': '20200220', 'OPEN': '0.44', 'HIGH': '0.44', 'LOW': '0.42', 'CLOSE': '0.44', 'VOL': '6339900' },
  { 'DATE': '20200221', 'OPEN': '0.44', 'HIGH': '0.44', 'LOW': '0.42', 'CLOSE': '0.44', 'VOL': '1605700' },
  { 'DATE': '20200224', 'OPEN': '0.43', 'HIGH': '0.43', 'LOW': '0.41', 'CLOSE': '0.42', 'VOL': '9455300' },
  { 'DATE': '20200225', 'OPEN': '0.42', 'HIGH': '0.42', 'LOW': '0.4', 'CLOSE': '0.42', 'VOL': '3902400' },
  { 'DATE': '20200226', 'OPEN': '0.41', 'HIGH': '0.41', 'LOW': '0.34', 'CLOSE': '0.34', 'VOL': '15819800' },
  { 'DATE': '20200227', 'OPEN': '0.34', 'HIGH': '0.37', 'LOW': '0.33', 'CLOSE': '0.37', 'VOL': '39976300' },
  { 'DATE': '20200228', 'OPEN': '0.33', 'HIGH': '0.34', 'LOW': '0.31', 'CLOSE': '0.34', 'VOL': '10772700' },
  { 'DATE': '20200302', 'OPEN': '0.34', 'HIGH': '0.34', 'LOW': '0.33', 'CLOSE': '0.34', 'VOL': '7093900' },
  { 'DATE': '20200303', 'OPEN': '0.34', 'HIGH': '0.36', 'LOW': '0.34', 'CLOSE': '0.36', 'VOL': '17273600' },
  { 'DATE': '20200304', 'OPEN': '0.35', 'HIGH': '0.36', 'LOW': '0.34', 'CLOSE': '0.35', 'VOL': '8075500' },
  { 'DATE': '20200305', 'OPEN': '0.35', 'HIGH': '0.37', 'LOW': '0.35', 'CLOSE': '0.37', 'VOL': '10512100' },
  { 'DATE': '20200306', 'OPEN': '0.35', 'HIGH': '0.36', 'LOW': '0.35', 'CLOSE': '0.35', 'VOL': '16178300' },
  { 'DATE': '20200309', 'OPEN': '0.34', 'HIGH': '0.34', 'LOW': '0.32', 'CLOSE': '0.33', 'VOL': '6331800' },
  { 'DATE': '20200310', 'OPEN': '0.33', 'HIGH': '0.34', 'LOW': '0.32', 'CLOSE': '0.34', 'VOL': '10334900' },
  { 'DATE': '20200311', 'OPEN': '0.33', 'HIGH': '0.34', 'LOW': '0.33', 'CLOSE': '0.34', 'VOL': '2420600' },
  { 'DATE': '20200312', 'OPEN': '0.33', 'HIGH': '0.33', 'LOW': '0.27', 'CLOSE': '0.29', 'VOL': '9691900' },
  { 'DATE': '20200313', 'OPEN': '0.28', 'HIGH': '0.34', 'LOW': '0.28', 'CLOSE': '0.34', 'VOL': '18228000' },
  { 'DATE': '20200316', 'OPEN': '0.32', 'HIGH': '0.33', 'LOW': '0.31', 'CLOSE': '0.32', 'VOL': '3857700' },
  { 'DATE': '20200317', 'OPEN': '0.3', 'HIGH': '0.34', 'LOW': '0.3', 'CLOSE': '0.34', 'VOL': '17928900' },
  { 'DATE': '20200318', 'OPEN': '0.34', 'HIGH': '0.34', 'LOW': '0.31', 'CLOSE': '0.34', 'VOL': '11479500' },
  { 'DATE': '20200319', 'OPEN': '0.32', 'HIGH': '0.33', 'LOW': '0.32', 'CLOSE': '0.32', 'VOL': '5848700' },
  { 'DATE': '20200320', 'OPEN': '0.32', 'HIGH': '0.34', 'LOW': '0.32', 'CLOSE': '0.34', 'VOL': '9870600' },
  { 'DATE': '20200323', 'OPEN': '0.33', 'HIGH': '0.33', 'LOW': '0.3', 'CLOSE': '0.31', 'VOL': '5478900' },
  { 'DATE': '20200324', 'OPEN': '0.32', 'HIGH': '0.34', 'LOW': '0.31', 'CLOSE': '0.34', 'VOL': '10316000' },
  { 'DATE': '20200325', 'OPEN': '0.33', 'HIGH': '0.36', 'LOW': '0.32', 'CLOSE': '0.36', 'VOL': '16928500' },
  { 'DATE': '20200326', 'OPEN': '0.36', 'HIGH': '0.36', 'LOW': '0.34', 'CLOSE': '0.34', 'VOL': '13265800' },
  { 'DATE': '20200327', 'OPEN': '0.34', 'HIGH': '0.35', 'LOW': '0.33', 'CLOSE': '0.33', 'VOL': '5154200' },
  { 'DATE': '20200330', 'OPEN': '0.33', 'HIGH': '0.34', 'LOW': '0.32', 'CLOSE': '0.34', 'VOL': '5053300' },
  { 'DATE': '20200331', 'OPEN': '0.34', 'HIGH': '0.34', 'LOW': '0.33', 'CLOSE': '0.33', 'VOL': '7494100' },
  { 'DATE': '20200401', 'OPEN': '0.34', 'HIGH': '0.34', 'LOW': '0.31', 'CLOSE': '0.31', 'VOL': '10695000' },
  { 'DATE': '20200402', 'OPEN': '0.31', 'HIGH': '0.34', 'LOW': '0.31', 'CLOSE': '0.33', 'VOL': '8027100' },
  { 'DATE': '20200403', 'OPEN': '0.32', 'HIGH': '0.33', 'LOW': '0.31', 'CLOSE': '0.32', 'VOL': '3685900' },
  { 'DATE': '20200407', 'OPEN': '0.32', 'HIGH': '0.33', 'LOW': '0.32', 'CLOSE': '0.32', 'VOL': '8928000' },
  { 'DATE': '20200408', 'OPEN': '0.33', 'HIGH': '0.33', 'LOW': '0.32', 'CLOSE': '0.32', 'VOL': '3894700' },
  { 'DATE': '20200409', 'OPEN': '0.33', 'HIGH': '0.35', 'LOW': '0.32', 'CLOSE': '0.33', 'VOL': '44309200' },
  { 'DATE': '20200410', 'OPEN': '0.33', 'HIGH': '0.33', 'LOW': '0.31', 'CLOSE': '0.32', 'VOL': '11457400' },
  { 'DATE': '20200413', 'OPEN': '0.32', 'HIGH': '0.35', 'LOW': '0.31', 'CLOSE': '0.33', 'VOL': '15761100' },
  { 'DATE': '20200414', 'OPEN': '0.34', 'HIGH': '0.36', 'LOW': '0.33', 'CLOSE': '0.35', 'VOL': '25531200' },
  { 'DATE': '20200415', 'OPEN': '0.35', 'HIGH': '0.36', 'LOW': '0.33', 'CLOSE': '0.35', 'VOL': '24516700' },
  { 'DATE': '20200416', 'OPEN': '0.35', 'HIGH': '0.35', 'LOW': '0.34', 'CLOSE': '0.34', 'VOL': '8175400' },
  { 'DATE': '20200417', 'OPEN': '0.34', 'HIGH': '0.39', 'LOW': '0.34', 'CLOSE': '0.38', 'VOL': '61423600' },
  { 'DATE': '20200420', 'OPEN': '0.39', 'HIGH': '0.43', 'LOW': '0.39', 'CLOSE': '0.43', 'VOL': '103020800' },
  { 'DATE': '20200421', 'OPEN': '0.42', 'HIGH': '0.43', 'LOW': '0.41', 'CLOSE': '0.42', 'VOL': '34522200' },
  { 'DATE': '20200422', 'OPEN': '0.42', 'HIGH': '0.44', 'LOW': '0.41', 'CLOSE': '0.43', 'VOL': '43127600' },
  { 'DATE': '20200423', 'OPEN': '0.43', 'HIGH': '0.45', 'LOW': '0.42', 'CLOSE': '0.44', 'VOL': '33388100' },
  { 'DATE': '20200424', 'OPEN': '0.43', 'HIGH': '0.44', 'LOW': '0.42', 'CLOSE': '0.43', 'VOL': '12484500' },
  { 'DATE': '20200427', 'OPEN': '0.43', 'HIGH': '0.44', 'LOW': '0.42', 'CLOSE': '0.42', 'VOL': '4155500' },
  { 'DATE': '20200428', 'OPEN': '0.43', 'HIGH': '0.43', 'LOW': '0.42', 'CLOSE': '0.43', 'VOL': '4400000' },
  { 'DATE': '20200429', 'OPEN': '0.43', 'HIGH': '0.43', 'LOW': '0.41', 'CLOSE': '0.41', 'VOL': '16333500' },
  { 'DATE': '20200430', 'OPEN': '0.41', 'HIGH': '0.42', 'LOW': '0.41', 'CLOSE': '0.42', 'VOL': '12223400' },
  { 'DATE': '20200505', 'OPEN': '0.42', 'HIGH': '0.42', 'LOW': '0.4', 'CLOSE': '0.41', 'VOL': '5517800' },
  { 'DATE': '20200507', 'OPEN': '0.41', 'HIGH': '0.43', 'LOW': '0.41', 'CLOSE': '0.41', 'VOL': '18146900' },
  { 'DATE': '20200508', 'OPEN': '0.41', 'HIGH': '0.42', 'LOW': '0.41', 'CLOSE': '0.41', 'VOL': '10344100' },
  { 'DATE': '20200511', 'OPEN': '0.41', 'HIGH': '0.42', 'LOW': '0.41', 'CLOSE': '0.42', 'VOL': '11307800' },
  { 'DATE': '20200512', 'OPEN': '0.42', 'HIGH': '0.42', 'LOW': '0.41', 'CLOSE': '0.41', 'VOL': '1433700' },
  { 'DATE': '20200513', 'OPEN': '0.41', 'HIGH': '0.42', 'LOW': '0.41', 'CLOSE': '0.42', 'VOL': '11627300' },
  { 'DATE': '20200514', 'OPEN': '0.42', 'HIGH': '0.46', 'LOW': '0.42', 'CLOSE': '0.43', 'VOL': '71736500' },
  { 'DATE': '20200515', 'OPEN': '0.44', 'HIGH': '0.45', 'LOW': '0.42', 'CLOSE': '0.42', 'VOL': '24644600' },
  { 'DATE': '20200518', 'OPEN': '0.42', 'HIGH': '0.43', 'LOW': '0.41', 'CLOSE': '0.42', 'VOL': '14042200' },
  { 'DATE': '20200519', 'OPEN': '0.42', 'HIGH': '0.44', 'LOW': '0.41', 'CLOSE': '0.44', 'VOL': '21421900' },
  { 'DATE': '20200520', 'OPEN': '0.44', 'HIGH': '0.44', 'LOW': '0.42', 'CLOSE': '0.43', 'VOL': '10769600' },
  { 'DATE': '20200521', 'OPEN': '0.43', 'HIGH': '0.44', 'LOW': '0.42', 'CLOSE': '0.43', 'VOL': '5033800' },
  { 'DATE': '20200522', 'OPEN': '0.43', 'HIGH': '0.43', 'LOW': '0.42', 'CLOSE': '0.43', 'VOL': '4338100' },
  { 'DATE': '20200525', 'OPEN': '0.43', 'HIGH': '0.43', 'LOW': '0.42', 'CLOSE': '0.43', 'VOL': '1397300' },
  { 'DATE': '20200526', 'OPEN': '0.43', 'HIGH': '0.44', 'LOW': '0.43', 'CLOSE': '0.44', 'VOL': '12492500' },
  { 'DATE': '20200527', 'OPEN': '0.44', 'HIGH': '0.44', 'LOW': '0.42', 'CLOSE': '0.42', 'VOL': '13553000' },
  { 'DATE': '20200528', 'OPEN': '0.43', 'HIGH': '0.43', 'LOW': '0.42', 'CLOSE': '0.43', 'VOL': '5493400' },
  { 'DATE': '20200529', 'OPEN': '0.43', 'HIGH': '0.45', 'LOW': '0.42', 'CLOSE': '0.43', 'VOL': '30059400' },
  { 'DATE': '20200601', 'OPEN': '0.43', 'HIGH': '0.45', 'LOW': '0.43', 'CLOSE': '0.44', 'VOL': '16047700' },
  { 'DATE': '20200602', 'OPEN': '0.44', 'HIGH': '0.46', 'LOW': '0.43', 'CLOSE': '0.45', 'VOL': '29380700' },
  { 'DATE': '20200604', 'OPEN': '0.45', 'HIGH': '0.46', 'LOW': '0.44', 'CLOSE': '0.45', 'VOL': '11417500' },
  { 'DATE': '20200605', 'OPEN': '0.44', 'HIGH': '0.45', 'LOW': '0.43', 'CLOSE': '0.43', 'VOL': '18738800' },
  { 'DATE': '20200608', 'OPEN': '0.44', 'HIGH': '0.44', 'LOW': '0.43', 'CLOSE': '0.44', 'VOL': '5066000' },
  { 'DATE': '20200609', 'OPEN': '0.43', 'HIGH': '0.45', 'LOW': '0.43', 'CLOSE': '0.43', 'VOL': '19352300' },
  { 'DATE': '20200610', 'OPEN': '0.43', 'HIGH': '0.44', 'LOW': '0.41', 'CLOSE': '0.43', 'VOL': '19798800' },
  { 'DATE': '20200611', 'OPEN': '0.43', 'HIGH': '0.43', 'LOW': '0.42', 'CLOSE': '0.43', 'VOL': '6812300' },
  { 'DATE': '20200612', 'OPEN': '0.41', 'HIGH': '0.43', 'LOW': '0.41', 'CLOSE': '0.42', 'VOL': '3571100' },
  { 'DATE': '20200615', 'OPEN': '0.43', 'HIGH': '0.43', 'LOW': '0.42', 'CLOSE': '0.42', 'VOL': '10393500' },
  { 'DATE': '20200616', 'OPEN': '0.43', 'HIGH': '0.45', 'LOW': '0.41', 'CLOSE': '0.42', 'VOL': '53824700' },
  { 'DATE': '20200617', 'OPEN': '0.43', 'HIGH': '0.44', 'LOW': '0.42', 'CLOSE': '0.43', 'VOL': '18002500' },
  { 'DATE': '20200618', 'OPEN': '0.43', 'HIGH': '0.43', 'LOW': '0.41', 'CLOSE': '0.43', 'VOL': '9339200' },
  { 'DATE': '20200619', 'OPEN': '0.43', 'HIGH': '0.43', 'LOW': '0.42', 'CLOSE': '0.43', 'VOL': '1509900' },
  { 'DATE': '20200622', 'OPEN': '0.43', 'HIGH': '0.43', 'LOW': '0.41', 'CLOSE': '0.41', 'VOL': '4502100' },
  { 'DATE': '20200623', 'OPEN': '0.41', 'HIGH': '0.42', 'LOW': '0.4', 'CLOSE': '0.41', 'VOL': '9781700' },
  { 'DATE': '20200624', 'OPEN': '0.41', 'HIGH': '0.42', 'LOW': '0.4', 'CLOSE': '0.41', 'VOL': '2457300' },
  { 'DATE': '20200625', 'OPEN': '0.4', 'HIGH': '0.41', 'LOW': '0.4', 'CLOSE': '0.4', 'VOL': '5619700' },
  { 'DATE': '20200626', 'OPEN': '0.4', 'HIGH': '0.41', 'LOW': '0.4', 'CLOSE': '0.4', 'VOL': '4530100' },
  { 'DATE': '20200629', 'OPEN': '0.4', 'HIGH': '0.4', 'LOW': '0.39', 'CLOSE': '0.4', 'VOL': '3287100' },
  { 'DATE': '20200630', 'OPEN': '0.4', 'HIGH': '0.4', 'LOW': '0.39', 'CLOSE': '0.39', 'VOL': '2528800' },
  { 'DATE': '20200701', 'OPEN': '0.4', 'HIGH': '0.42', 'LOW': '0.39', 'CLOSE': '0.4', 'VOL': '35758900' },
  { 'DATE': '20200702', 'OPEN': '0.41', 'HIGH': '0.42', 'LOW': '0.4', 'CLOSE': '0.42', 'VOL': '13058300' },
  { 'DATE': '20200703', 'OPEN': '0.41', 'HIGH': '0.42', 'LOW': '0.4', 'CLOSE': '0.41', 'VOL': '13755600' },
  { 'DATE': '20200707', 'OPEN': '0.41', 'HIGH': '0.42', 'LOW': '0.39', 'CLOSE': '0.4', 'VOL': '39318500' },
  { 'DATE': '20200708', 'OPEN': '0.4', 'HIGH': '0.41', 'LOW': '0.39', 'CLOSE': '0.4', 'VOL': '10874000' },
  { 'DATE': '20200709', 'OPEN': '0.4', 'HIGH': '0.4', 'LOW': '0.39', 'CLOSE': '0.4', 'VOL': '1388100' },
  { 'DATE': '20200710', 'OPEN': '0.39', 'HIGH': '0.4', 'LOW': '0.38', 'CLOSE': '0.39', 'VOL': '12675500' },
  { 'DATE': '20200713', 'OPEN': '0.39', 'HIGH': '0.4', 'LOW': '0.38', 'CLOSE': '0.38', 'VOL': '6833800' },
  { 'DATE': '20200714', 'OPEN': '0.38', 'HIGH': '0.39', 'LOW': '0.37', 'CLOSE': '0.39', 'VOL': '13544100' },
  { 'DATE': '20200715', 'OPEN': '0.38', 'HIGH': '0.39', 'LOW': '0.37', 'CLOSE': '0.38', 'VOL': '15977600' },
  { 'DATE': '20200716', 'OPEN': '0.38', 'HIGH': '0.38', 'LOW': '0.37', 'CLOSE': '0.38', 'VOL': '905000' },
  { 'DATE': '20200717', 'OPEN': '0.37', 'HIGH': '0.38', 'LOW': '0.37', 'CLOSE': '0.38', 'VOL': '4515200' },
];
