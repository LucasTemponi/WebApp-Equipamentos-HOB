function doGet(e) {
  return HtmlService.createTemplateFromFile('Homepage').evaluate().setTitle('Manuais de equipamentos HOB').addMetaTag( "viewport",'width=device-width, initial-scale=1');
}