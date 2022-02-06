var equipamentos = SpreadsheetApp.openById("1-Wy4CjSjyZb609koN8ayWnrLIYbmqjCVrUOdpOfSNvM").getSheetByName('Equipamentos');
equipTable = readData(equipamentos);

/*function myFunction() {
  alasql("CREATE TABLE cities (city string, pop number)");
  alasql("INSERT INTO cities VALUES ('Paris',2249975),('Berlin',3517424),('Madrid',3041579),('Belo Horizonte',300)");
// execute query 
  var res = alasql("SELECT * FROM cities WHERE pop < 3500000 ORDER BY pop DESC");
  console.log(res)
  var categoria = "Arco Cirúrgico"

  //console.log(passTableItems(4))
  equipTable = alasql("SELECT * FROM ? ORDER BY Categoria DESC",[equipTable])
  console.log(equipTable)
}*/

function doGet(e) {
  equipTable = alasql("SELECT * FROM ? ORDER BY Categoria DESC",[equipTable])
  if(e.parameters.v=='Equipdetails'){
      return HtmlService.createTemplateFromFile('Equipdetails').evaluate().setTitle();
  }
  return HtmlService.createTemplateFromFile('Homepage').evaluate().setTitle('Manuais de equipamentos HOB');
}

function readData(spreadsheet) {
  var range = spreadsheet.getRange(1,1,spreadsheet.getLastRow(),spreadsheet.getLastColumn()).getValues();
  let headers = range.shift()
  let data = range.map( r => {
    let obj={}
    r.forEach((cell,i) =>{
      obj[headers[i]]=cell;
    })
    return obj;
  })
  return data;
}
