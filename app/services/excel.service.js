const ExcelJS = require('exceljs');

class ExcelService {
    constructor() {
        this.workbook = new ExcelJS.Workbook();
        this.worksheet = this.workbook.addWorksheet('Reporte_Personas');

        
    }

    async excelCreado(rows) {
        this.worksheet.columns = [
            { header: 'Id', key: 'id', width: 15 },
            { header: 'Nombre', key: 'name', width: 30 },
            { header: 'Email', key: 'email', width: 30 }
        ];

        

        this.worksheet.columns.forEach((col) => {
            col.alignment = { vertical: 'middle', horizontal: 'center' };
        });

        this.worksheet.getRow(1).font = { size: 12, bold: true, color: { argb: "#D6EAF8" }};
        this.worksheet.addRows(rows);
        var path = "./report/Reporte.xlsx";
        await this.workbook.xlsx.writeFile(path);
        
    }

    
}

module.exports = ExcelService;