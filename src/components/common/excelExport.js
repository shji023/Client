export const excelExport = (column, listData) => {
    const Excel = require('exceljs');

    try {
        const workbook = new Excel.Workbook();
        
        // 생성자
        workbook.creator = '작성자';
        
        // 최종 수정자
        workbook.lastModifiedBy = '최종 수정자';
        
        // 생성일(현재 일자로 처리)
        workbook.created = new Date();
        
        // 수정일(현재 일자로 처리)
        workbook.modified = new Date();

        workbook.addWorksheet('Sheet One');

        const sheetOne = workbook.getWorksheet('Sheet One');
        sheetOne.columns = column;
       
        listData.map((item, index) => {
            sheetOne.addRow(item);
        });

        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `테스트.xlsx`;
            anchor.click();
            window.URL.revokeObjectURL(url);
        })
    } catch(error) {
        console.error(error);
    }
}

export default excelExport;
