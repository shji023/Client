import moment from "moment";

/**
 * 전달받은 숫자를 3자리 단위로 콤마로 구분해서 String 형태로 반환한다.
 * @param {*} value 
 * @returns 
 */
export const getNumberFormat = (value) => {
   return value ? value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "0";
};

/**
 * 전달받은 값을 형식화된 날짜 값으로 반환한다.
 * @param {*} date 
 * @returns 
 */
export const getFormattedDate = (date) => {
   return moment(date).format("YYYY-MM-DD");
};

/**
 * 두 날짜 사이의 간격을 반환하는 한다.
 * @param {*} fromDate 
 * @param {*} toDate 
 * @param {*} type      day | week | month
 * @returns 
 */
export const getDiffDate = (fromDate, toDate, type) => {
   fromDate = moment(fromDate);
   toDate = moment(toDate);

   switch(type) {
      case "day" : 
   //   console.log(`Difference is ${fromDate.diff(toDate, 'days')} day(s)`);
      return fromDate.diff(toDate, 'days')
      case "week" :
   //   console.log(`Difference is ${fromDate.diff(toDate, 'weeks')} week(s)`);
      return fromDate.diff(toDate, 'weeks')
      case "month" :
   //   console.log(`Difference is ${fromDate.diff(toDate, 'months')} month(s)`);
      return fromDate.diff(toDate, 'months');
   }

   // console.log(`Difference is ${fromDate.diff(toDate)} milliseconds`);

}

 /**
  * 페이지 새로고침
  */
export const reload = () => {
   document.location.reload();
}

/**
 * 입력값 정규표현식
 * @param {*} type 
 * @returns 
 */
export const getReg = (type) => {
   let reg = "";
   switch(type) {
      case "number" : reg = /^\d*?$/; break;
      case "decimal" : reg = /^\d*(\.\d*)?$/; break;
      case "text" : reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/; break;
   }
   return reg;
}