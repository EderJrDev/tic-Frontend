import React from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import Excel from '../../assets/svg/excel';

const ExportTable = ({ tableData, exportColumns, tabelaKey, globalFilterValue, onGlobalFilterChange }) => {

  const exportPdf = () => {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default(0, 0);
        let startY = 10;

        doc.text(`Tabela: `, 10, startY); // Adiciona um título para identificar a tabela no PDF
        startY += 10; // Aumenta o valor da coordenada Y após adicionar o título

        doc.autoTable(exportColumns, tableData, { startY, didDrawPage: (data) => { startY = data.cursor.y + 10; } });
        doc.save(`Download.pdf`);
      });
    });
  };

  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      const table = 'Download';

      const worksheet = xlsx.utils.json_to_sheet(tableData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

      saveAsExcelFile(excelBuffer, table);
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };

  return (
    <div className="row">
      <div className="d-flex justify-content-end pb-3 flex-grow-1">
        <div className="d-flex align-items-center justify-content-end gap-2">
          <div className='col-md-8'>
            <span className="p-input-icon-left">
              <i className="bi bi-search" />
              <InputText
                placeholder="Pesquisar"
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                style={{ maxWidth: '200px', width: '200px' }}
              />
            </span>
          </div>
          <Button
            type="button"
            severity="success"
            aria-label="Bookmark"
            data-pr-tooltip="XLS"
            icon={< Excel />}
            onClick={() => exportExcel(tabelaKey)}
          />
          <Button
            type="button"
            severity="secondary"
            icon="bi bi-file-pdf"
            aria-label="Bookmark"
            data-pr-tooltip="PDF"
            onClick={() => exportPdf(tabelaKey)} // Passa o nome da tabela como parâmetro
          />
        </div>
      </div>
    </div>
  );
};

export default ExportTable;