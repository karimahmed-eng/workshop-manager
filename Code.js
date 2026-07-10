/*************************************************
 * Code.js
 * Workshop Manager
 * Application Entry Points
 * Milestone 1
 *************************************************/


function doGet() {

  return HtmlService
    .createTemplateFromFile("Index")
    .evaluate()
    .setTitle("Workshop Manager")
    .setXFrameOptionsMode(
      HtmlService.XFrameOptionsMode.ALLOWALL
    );

}


/**
 * Load HTML partials
 */
function getPage(page) {

  return HtmlService
    .createHtmlOutputFromFile(page)
    .getContent();

}


/**
 * Dashboard API
 */
function getDashboardData() {

  return DashboardService.getDashboardData();

}


function refreshDashboardData() {

  DataRepository.refreshCache();

  return DashboardService.getDashboardData();

}


/**
 * Jobs API
 */

function getJobs() {

  return DataRepository.getJobs();

}


function searchJobs(keyword) {

  const jobs = DataRepository.getJobs();

  return JobsService.searchJobs(
    jobs,
    keyword
  );

}


function filterJobs(filters) {

  const jobs = DataRepository.getJobs();

  return JobsService.filterJobs(
    jobs,
    filters
  );

}


function getJob(jobNumber) {

  return JobsService.getJob(
    jobNumber
  );

}