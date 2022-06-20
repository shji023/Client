import { action, autorun, makeAutoObservable, makeObservable, observable } from "mobx";

class PageData {

    // 참고용
    // obsVal = 10;

    prNumList = [];

    constructor() {
        makeAutoObservable(this);

        // 참고용 코드
        // autorun(() => {
        //     this.printObsVal();  
        // });
    }

    // 참고용 코드
    // printObsVal() {
    //     console.log("print obsVal : " + this.obsVal);
    // }

    getPrNumList() {
        console.log("prNumList", this.prNumList);
        return this.prNumList;
    }
    
    setPrNumList(prNumList) {
        this.prNumList = prNumList;
    }
}

// 전역 변수
const pageData = new PageData();

export default pageData;