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
  table = 'registrosTable'
    
  if (table == 'equipTable'){
    if (equipamentos ==""){
      equipamentos = SpreadsheetApp.openById("1-Wy4CjSjyZb609koN8ayWnrLIYbmqjCVrUOdpOfSNvM").getSheetByName('Equipamentos').getDataRange().getValues();
    }
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

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

