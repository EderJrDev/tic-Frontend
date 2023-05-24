function convertArrayOfObjectsToCSV(array) {
  let result;
  const columnDelimiter = ';';
  const lineDelimiter = '\n';
  const keys = Object.keys(array[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach(item => {
      let ctr = 0;
      keys.forEach(key => {
          if (ctr > 0) result += columnDelimiter;

          let value = item[key];
          if (typeof value === 'string' && value.includes(';')) {
              // se o valor contém ponto-e-vírgula, adiciona aspas duplas ao redor
              value = `"${value}"`;
          }
          result += value;

          ctr++;
      });
      result += lineDelimiter;
  });

  return result;
}

function downloadCSV(array) {
  console.log('array download csv', array);
  const link = document.createElement('a');
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', filename);
  link.click();
}

export {
  convertArrayOfObjectsToCSV,
  downloadCSV
}
