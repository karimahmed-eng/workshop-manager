function doGet() {
  return HtmlService
    .createTemplateFromFile("Index")
    .evaluate()
    .setTitle("Workshop Manager")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getPage(page) {
  return HtmlService
    .createHtmlOutputFromFile(page)
    .getContent();
}