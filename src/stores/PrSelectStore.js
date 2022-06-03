import { action, autorun, computed, makeAutoObservable, makeObservable, observable } from "mobx";

class PrSelectStore {

    // * 참고용
    // energyLevel;
    // obsVal = 10;

    // * 검색 필터
    searchFilter = {
        REQUISITION_NUMBER : "",
        DESCRIPTION        : "용압화파트 실험압연기 메인실린더 누유 수리작업",
        PREPARER_ID        : "",
        ITEM_ID            : "",
        ITEM_DESCRIPTION   : "",
        LINE_STATUS        : "",
        BUYER_ID           : "",
        CATEGORY_ID        : "",
    }
    
    selectResultList = [];

    constructor() {
        // * 참고용
        // this.energyLevel = 100;

        makeAutoObservable(this);

        // #region * 참고용
        // makeObservable(
        //     this,
        //     {
        //         energyLevel: observable,
        //         obsVal: observable,
        //         isHungry: computed,
        //         printObsVal: action,
        //     }
        // );

        // autorun(() => { // -> 구독
        //     console.log('autorun called - printObsVal ');
        //     this.printObsVal();
        // });

        // 사용중인 observable 변수가 바뀔 때마다 호출된다?
        // autorun(() => {
        //     console.log("autorun called");
        //     console.log(this.isHungry);
        // })
        // #endregion

    }

    // #region * 참고용
    // printObsVal() {
    //     console.log("print obsVal Action : " + this.obsVal);
    // }

    // get isHungry() {
    //     console.log("isHungry");
    //     return this.energyLevel < 50;
    // }
    // #endregion

    setSelectResultList(arr) {
        this.selectResultList = arr;
    }
}

const prSelectStore = new PrSelectStore();
export default prSelectStore;