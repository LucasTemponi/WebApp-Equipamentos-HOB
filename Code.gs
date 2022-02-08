var equipamentos = SpreadsheetApp.openById("1-Wy4CjSjyZb609koN8ayWnrLIYbmqjCVrUOdpOfSNvM").getSheetByName('Equipamentos');
//var registros = SpreadsheetApp.openById("1vtjst1jKqqR2IPj2rbeaicaQicPsR_EDk5tQ_PEbr3w").getSheetByName('Respostas ao formulário 2');
//var patrimonios = SpreadsheetApp.openById("1vtjst1jKqqR2IPj2rbeaicaQicPsR_EDk5tQ_PEbr3w").getSheetByName('Patrimônios');
equipTable = readData(equipamentos);
//registrosTable = readData(registros);
//patrimoniosTable = readData(patrimonios);
console.log('Fim importações')

/*function myFunction() {
  console.log('Funçao principal')
  createTable()
  alasql("INSERT INTO cities VALUES ('Paris',2249975),('Berlin',3517424),('Madrid',3041579),('Belo Horizonte',300)");
// execute query 
  var res = alasql("SELECT * FROM cities WHERE pop < 3500000 ORDER BY pop DESC");
  console.log(res)
  var categoria = "Arco Cirúrgico"

  //console.log(passTableItems(4))
 
  console.log(alasql("SELECT * FROM ? WHERE [Código do equipamento] = (SELECT id_propriedade FROM ? WHERE [Patrimônio] LIKE '190740231083A2V')",[registrosTable,patrimoniosTable]));
}*/

function doGet(e) {
  equipTable = alasql("SELECT * FROM ? ORDER BY Categoria DESC",[equipTable])
  if(e.parameters.v=='so_details'){
      return HtmlService.createTemplateFromFile('so_details').evaluate().setTitle('Registro de preventivas');
  }
  return HtmlService.createTemplateFromFile('Homepage').evaluate().setTitle('Manuais de equipamentos HOB');
}

function createTable(){
  alasql("CREATE TABLE cities (city string, pop number)");
  return
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


