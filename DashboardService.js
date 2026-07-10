/*************************************************

* DashboardService.js
* Workshop Manager Dashboard Data
  *************************************************/

function getDashboardData() {

const summary = getJobSummary();

const jobs = getJobs();

return {


summary: summary,

recentJobs: jobs
  .sort((a, b) => {
    return new Date(b["Entry Date"]) - new Date(a["Entry Date"]);
  })
  .slice(0, 10)


};

}
