import format from 'date-fns/format';
import getWeekOfMonth from 'date-fns/getWeekOfMonth';

export function asPeriodFormat(viewMode, date) {
  if (viewMode === 'month') {
    return format(date, 'MMM yyyy');
  } else if (viewMode === 'week') {
    return `W${getWeekOfMonth(date)}, ${format(date, 'MMMM')}`;
  } else {
    return format(date, 'd/MMM/yy');
  }
}
