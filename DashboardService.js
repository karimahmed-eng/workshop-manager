/*************************************************
 * DashboardService.js
 * Workshop Manager Dashboard Data
 *************************************************/


function getDashboardData() {


  Logger.log("========== getDashboardData START ==========");


  try {


    Logger.log("[STEP 1] Loading summary");


    const summary = getJobSummary();



    Logger.log("[STEP 2] Loading jobs");


    const jobs = getJobs();



    Logger.log(
      "[STEP 3] Jobs loaded: " + jobs.length
    );



    const recentJobs = jobs
      .sort((a, b) => {


        return new Date(b["Entry Date"])
          -
        new Date(a["Entry Date"]);


      })
      .slice(0,10);



    Logger.log(
      "[RESULT] Recent jobs: " +
      recentJobs.length
    );



    const result = {


      summary: summary,

      recentJobs: recentJobs


    };



    Logger.log(
      "[RETURN] " + JSON.stringify(result)
    );



    Logger.log("========== getDashboardData END ==========");



    return result;



  } catch(error) {



    Logger.log("[ERROR] Dashboard failed");

    Logger.log(error.stack);

    throw error;


  }


}