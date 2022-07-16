
export const gridLoadingMsg = 
    '<span class="ag-overlay-loading-center">'
    + '조회 결과를 불러오는 중입니다...'
    + '</span>'

export const showGridLoading = (gridRef, isShow) => {
    if(isShow) {
        gridRef.current.api.showLoadingOverlay();
    } else {
        gridRef.current.api.hideOverlay();
    }
};