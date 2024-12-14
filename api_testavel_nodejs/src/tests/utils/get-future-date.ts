import {setYear,parseISO} from 'date-fns';
export function getFuture(date:string):Date{
  return setYear(parseISO(date), new Date().getFullYear() + 1);

}