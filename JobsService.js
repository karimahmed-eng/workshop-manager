/*************************************************
 * JobsService.js
 * Workshop Manager Jobs Logic
 *************************************************/


function getJobs() {


  Logger.log("========== getJobs START ==========");


  try {


    const jobs = getAllJobsData();


    Logger.log(
      "[RESULT] Jobs received: " + jobs.length
    );


    Logger.log("========== getJobs END ==========");


    return jobs;


  } catch(error) {


    Logger.log("[ERROR] getJobs failed");

    Logger.log(error.stack);

    throw error;


  }

}





function getJobSummary() {


  Logger.log("========== getJobSummary START ==========");


  try {


    const jobs = getJobs();


    const summary = {


      total: jobs.length,

      delivered: 0,

      pending: 0,

      delayed: 0,

      notApproved: 0


    };



    jobs.forEach(job => {


      const status =
        String(job.Status || "")
        .toLowerCase()
        .trim();



      Logger.log(
        "[STATUS] " + status
      );



      if (status.includes("delivered")) {


        summary.delivered++;


      } 
      else if (status.includes("delayed")) {


        summary.delayed++;


      } 
      else if (status.includes("not approved")) {


        summary.notApproved++;


      } 
      else {


        summary.pending++;


      }


    });



    Logger.log(
      "[SUMMARY] " + JSON.stringify(summary)
    );


    Logger.log("========== getJobSummary END ==========");


    return summary;



  } catch(error) {


    Logger.log("[ERROR] getJobSummary failed");

    Logger.log(error.stack);

    throw error;


  }


}