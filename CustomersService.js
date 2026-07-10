function getJobs() {

  return getAllJobsData();

}



function getJobSummary() {

  const jobs = getJobs();


  const summary = {

    total: jobs.length,
    delivered: 0,
    pending: 0,
    delayed: 0,
    notApproved: 0

  };


  jobs.forEach(job => {

    const status = String(job.Status || "").toLowerCase();


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


  return summary;

}