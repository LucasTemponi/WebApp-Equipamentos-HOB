var equipamentos = []
var registros = []
var patrimonios = []
//equipTable = readData(equipamentos);
//registrosTable = readData(registros);
//patrimoniosTable = readData(patrimonios);
console.log('Fim importações')

function myFunction() {
  var alasql = AlaSQLGS.load();
  console.log('Funçao principal')
  var categoria = "Arco Cirúrgico"

  //console.log(passTableItems(4))
  //var res = sql('select * from ?',[equipamentos])
  if (patrimonios==""){
    patrimonios = SpreadsheetApp.openById("1vtjst1jKqqR2IPj2rbeaicaQicPsR_EDk5tQ_PEbr3w").getSheetByName('Patrimônios').getDataRange().getValues();
  }
  if (registros==""){
    registros = SpreadsheetApp.openById("1vtjst1jKqqR2IPj2rbeaicaQicPsR_EDk5tQ_PEbr3w").getSheetByName('Respostas ao formulário 2').getDataRange().getValues();
  }

  query = "SELECT reg.Col6 AS tipo,reg.Col4 as data,reg.Col5 as arquivo,pat.Col4 as unidade,pat.Col3 as equipamento,pat.Col1 as patrimonio\
                FROM ? as reg JOIN ? as pat ON reg.Col3=pat.Col1\
                ORDER BY data DESC"
  res = alasql(AlaSQLGS.transformQueryColsNotation(query),[registros,patrimonios])
  console.log(res)
  //console.log(alasql("SELECT * FROM ? as reg JOIN ? as pat ON reg.[Código do equipamento] = pat.[id_propriedade] WHERE pat.[Patrimônio] = 'DM3572'",[registrosTable,patrimoniosTable]));
}

function doGet(e) {
  if(e.parameters.v=='so_details'){
      return HtmlService.createTemplateFromFile('so_details').evaluate().setTitle('Registro de preventivas').addMetaTag( "viewport",'width=device-width, initial-scale=1')
  }
  return HtmlService.createTemplateFromFile('Homepage').evaluate().setTitle('Manuais de equipamentos HOB').addMetaTag( "viewport",'width=device-width, initial-scale=1');
}

function readData(spreadsheet) {
  console.log(spreadsheet.getName())
  var range = spreadsheet.getRange(1,1,spreadsheet.getLastRow(),spreadsheet.getLastColumn()).getValues();
  let headers = range.shift()
  let data = range.map( r => {
    let obj={}
    r.forEach((cell,i) =>{
      obj[headers[i]]=cell;
    })
    return obj;
  })
  console.log('Ok')
  return data;
}