function passTableItems(index){
  if (index != undefined){
    var dict = []
    dict.push(equipTable[index]);
    return dict;
  }//end if
  return equipTable;
}

function queryData(sendvalue) {
  //table = readData()
  return alasql("select * from ? where Categoria LIKE '%"+sendvalue+"%' OR Equipamento LIKE '%"+sendvalue+"%' ",[equipTable]);
};

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

