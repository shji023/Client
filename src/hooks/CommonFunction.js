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

    console.log("fromDate", fromDate, "toDate", toDate);

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