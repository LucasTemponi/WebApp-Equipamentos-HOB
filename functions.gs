function passTableItems(table) {
  if (table == 'equipTable') {
    if (equipamentos == "") {
      equipamentos = SpreadsheetApp.openById("1-Wy4CjSjyZb609koN8ayWnrLIYbmqjCVrUOdpOfSNvM").getSheetByName('Equipamentos').getDataRange().getValues();
    }
    return equipamentos.slice(1);
  }
  else if (table == 'registrosTable') {
    if (registros == "") {
      registros = SpreadsheetApp.openById("1vtjst1jKqqR2IPj2rbeaicaQicPsR_EDk5tQ_PEbr3w").getSheetByName('Respostas ao formulário 2').getDataRange().getValues();
    }
    return registros;
  }
}

function getAllRegisters() {
  
  let registros = SpreadsheetApp.openById("1vtjst1jKqqR2IPj2rbeaicaQicPsR_EDk5tQ_PEbr3w").getSheetByName('Respostas ao formulário 2').getDataRange().getValues();
  return(registros)
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}