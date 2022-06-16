export const getKoreanNumber=(number)=>{
  const koreanNumber = ['', '일','이','삼','사','오','육','칠','팔','구'];
  const tenThousandUnit = ['', '만', '억', '조'];
  const tenUnit = ['', '십', '백', '천'];
  let answer = '';
  let unit = 10000;
  let index = 0;
  let division = Math.pow(unit, index);

  while (Math.floor(number / division) > 0) {
    const mod = Math.floor(number % (division * unit) / division);
    if(mod) {
      const modToArray = mod.toString().split('');
      const modLength = modToArray.length - 1;
      const toKorean = modToArray.reduce((a, v, i) => {
        a+= `${koreanNumber[v*1]}${tenUnit[modLength - i]}`;
        return a;
      }, '');
      answer = `${toKorean}${tenThousandUnit[index]} `+ answer;
    }
    division = Math.pow(unit, ++index);
  }
  return answer;
}