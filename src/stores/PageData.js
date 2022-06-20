import { action, autorun, makeAutoObservable, makeObservable, observable } from "mobx";

class PageData {

    // 참고용
    // obsVal = 10;

    prData = {};

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

    get getPrData() {
        console.log("PrData", this.prData);
        return this.prData;
    }
    
    setPrData(prData) {
        this.prData = prData;
    }
}

const pageData = new PageData();

export default pageData;