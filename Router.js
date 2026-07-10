function loadPage(page) {

  const template = HtmlService
    .createTemplateFromFile(page);

  return template
    .evaluate()
    .getContent();

}