
/**
 * 전달받은 숫자를 3자리 단위로 콤마로 구분해서 String 형태로 반환한다.
 * @param {*} value 
 * @returns 
 */
 export const getNumberFormat = (value) => value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
