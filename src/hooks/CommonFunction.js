import moment from "moment";

/**
 * 전달받은 숫자를 3자리 단위로 콤마로 구분해서 String 형태로 반환한다.
 * @param {*} value 
 * @returns 
 */
 export const getNumberFormat = (value) => value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

 export const getDiffDate = (fromDate, toDate, type) => {
    fromDate = moment(fromDate);
    toDate = moment(toDate);

    switch(type) {
        case "day" : 
        console.log(`Difference is ${fromDate.diff(toDate, 'days')} day(s)`);
        return fromDate.diff(toDate, 'days')
        case "week" :
        console.log(`Difference is ${fromDate.diff(toDate, 'weeks')} week(s)`);
        return fromDate.diff(toDate, 'weeks')
        case "month" :
        console.log(`Difference is ${fromDate.diff(toDate, 'months')} month(s)`);
        return fromDate.diff(toDate, 'months');
    }

    // console.log(`Difference is ${fromDate.diff(toDate)} milliseconds`);

 }

export const reload = () => {
   document.location.reload();
}

export const getReg = (type) => {
   let reg = "";
   switch(type) {
      case "number" : reg = /^\d*?$/; break;
      case "decimal" : reg = /^\d*(\.\d*)?$/; break;
      case "text" : reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/; break;
   }
   return reg;
}