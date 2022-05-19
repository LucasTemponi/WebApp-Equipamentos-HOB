function loadTables(){
  if (equipamentos==""){
    equipamentos = SpreadsheetApp.openById("1-Wy4CjSjyZb609koN8ayWnrLIYbmqjCVrUOdpOfSNvM").getSheetByName('Equipamentos').getDataRange().getValues();
  }
  if (patrimonios==""){
    patrimonios = SpreadsheetApp.openById("1vtjst1jKqqR2IPj2rbeaicaQicPsR_EDk5tQ_PEbr3w").getSheetByName('Patrimônios').getDataRange().getValues();
  }
  if (registros==""){
    registros = SpreadsheetApp.openById("1vtjst1jKqqR2IPj2rbeaicaQicPsR_EDk5tQ_PEbr3w").getSheetByName('Respostas ao formulário 2').getDataRange().
      getValues();
  }
}

function passTableItems(table){
  if (table == 'equipTable'){
    if (equipamentos==""){
      equipamentos = SpreadsheetApp.openById("1-Wy4CjSjyZb609koN8ayWnrLIYbmqjCVrUOdpOfSNvM").getSheetByName('Equipamentos').getDataRange().getValues();
    }
    return equipamentos.slice(1);
  }
  else if(table == 'registrosTable'){
   if(registros=="")   {
     registros = SpreadsheetApp.openById("1vtjst1jKqqR2IPj2rbeaicaQicPsR_EDk5tQ_PEbr3w").getSheetByName('Respostas ao formulário 2').getDataRange().getValues();
   }
   return registros;
  }  
}

function queryData(table,sendvalue='') {  
  var alasql = AlaSQLGS.load();
  let resultado = []
  console.log('queryData Chamada')

  if (table == 'equipTable'){
    if (equipamentos ==""){
      equipamentos = SpreadsheetApp.openById("1-Wy4CjSjyZb609koN8ayWnrLIYbmqjCVrUOdpOfSNvM").getSheetByName('Equipamentos').getDataRange().getValues();
    }
    console.log('Fazendo a busca...')
    resultado = alasql(AlaSQLGS.transformQueryColsNotation(`select * from ? where Col3 LIKE '%${sendvalue}%' OR Col4 LIKE '%${sendvalue}%'`),[equipamentos])
    console.log(resultado)
    return alasql(AlaSQLGS.transformQueryColsNotation(`select * from ? where Col3 LIKE '%${sendvalue}%' OR Col4 LIKE '%${sendvalue}%'`),[equipamentos]);
  }
  else if (table == 'registrosTable'){
    if (patrimonios==""){
      patrimonios = SpreadsheetApp.openById("1vtjst1jKqqR2IPj2rbeaicaQicPsR_EDk5tQ_PEbr3w").getSheetByName('Patrimônios').getDataRange().getValues();
    }
    if (registros==""){
      registros = SpreadsheetApp.openById("1vtjst1jKqqR2IPj2rbeaicaQicPsR_EDk5tQ_PEbr3w").getSheetByName('Respostas ao formulário 2').getDataRange().getValues();
    }
    if (sendvalue){
      query = `SELECT reg.Col6 AS tipo,reg.Col4 as data,reg.Col5 as arquivo,pat.Col4 as unidade,pat.Col3 as equipamento,pat.Col1 as patrimonio\
                FROM ? as reg JOIN ? as pat ON reg.Col7=pat.Col2\
                WHERE pat.Col1 LIKE '%${sendvalue}%'`
    }
    else{
      query = "SELECT reg.Col6 AS tipo,reg.Col4 as data,reg.Col5 as arquivo,pat.Col4 as unidade,pat.Col3 as equipamento,pat.Col1 as patrimonio\
                FROM ? as reg JOIN ? as pat ON reg.Col3=pat.Col1"
    }
    res = alasql(AlaSQLGS.transformQueryColsNotation(query),[registros,patrimonios])
    console.log(res)
    return res;
  }  
}

function getPaginatedRegisters(pageNumber,pageItems=15){
  if (registros == ""){
    registros = SpreadsheetApp.openById("1vtjst1jKqqR2IPj2rbeaicaQicPsR_EDk5tQ_PEbr3w").getSheetByName('Respostas ao formulário 2').getDataRange().getValues();
  }
  let firstItem = pageNumber === 1 ? 1 : (pageNumber - 1)*pageItems
  return (registros.slice(firstItem,(pageNumber*pageItems)-1))
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}