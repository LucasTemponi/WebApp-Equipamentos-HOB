function passTableItems(table) {
  if (table == 'equipTable') {

    let equipamentos = SpreadsheetApp.openById("1-Wy4CjSjyZb609koN8ayWnrLIYbmqjCVrUOdpOfSNvM").getSheetByName('Equipamentos').getDataRange().getValues();
    return equipamentos.slice(1);
  }
  else if (table == 'registrosTable') {

    registros = SpreadsheetApp.openById("1vtjst1jKqqR2IPj2rbeaicaQicPsR_EDk5tQ_PEbr3w").getSheetByName('Respostas ao formulário 2').getDataRange().getValues();
    return registros;
  }
}

function getAllRegisters() {

  let allValues = SpreadsheetApp.openById("1vtjst1jKqqR2IPj2rbeaicaQicPsR_EDk5tQ_PEbr3w").getSheetByName('Respostas ao formulário 2').getDataRange().getValues()
  allValues.slice(1).reverse().forEach((entry) => {
    entry.forEach((element, index) => {
      if (typeof element === "object") {
        entry[index] = element.toLocaleString('pt-BR').split(" ")[0]
      }
    })
  })
  return (allValues)
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}