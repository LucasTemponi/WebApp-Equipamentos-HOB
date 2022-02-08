function passTableItems(table){
  if (table == 'equipTable'){
    return equipTable;
  }
  else if(table == 'registrosTable'){
   return registrosTable;
  }  
}

function queryData(sendvalue,table) {
  if (table == 'equipTable'){
    return alasql("select * from ? where Categoria LIKE '%"+sendvalue+"%' OR Equipamento LIKE '%"+sendvalue+"%' ",[equipTable]);
  }
  else if (table == 'registrosTable'){
    return alasql("SELECT * FROM ? WHERE [Código do equipamento] = (SELECT id_propriedade FROM ? WHERE [Patrimônio] LIKE 'DM3572')",
      [registrosTable,patrimoniosTable]);
  }
  
};

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

