/*************************************************
 * JobsService.js
 * Workshop Manager
 * Milestone 1
 *************************************************/

const JobsService = (() => {

  function getJobs() {
    return DataRepository.getJobs();
  }

  function buildSummary(jobs) {

    jobs = jobs || getJobs();

    const summary = {
      total: jobs.length,
      statuses: {}
    };

    WORKSHOP_CONFIG.Statuses.forEach(status => {
      summary.statuses[status] = 0;
    });

    jobs.forEach(job => {

      WORKSHOP_CONFIG.Statuses.forEach(status => {

        if (Utils.hasStatus(job.status, status)) {
          summary.statuses[status]++;
        }

      });

    });

    return summary;

  }

  function getRecentJobs(jobs, limit) {

    jobs = jobs || getJobs();

    limit = limit || WORKSHOP_CONFIG.Dashboard.RECENT_JOBS_LIMIT;

    return jobs
      .slice()
      .sort((a, b) => {

        const da = new Date(a.entryDate || 0).getTime();
        const db = new Date(b.entryDate || 0).getTime();

        return db - da;

      })
      .slice(0, limit);

  }

  function searchJobs(jobs, keyword) {

    jobs = jobs || getJobs();

    keyword = Utils.normalizeText(keyword);

    if (!keyword) return jobs;

    return jobs.filter(job => {

      return [

        job.jobNumber,
        job.clientName,
        job.mobile,
        job.chassis,
        job.plate,
        job.model,
        job.status,
        job.center,
        job.technician

      ].some(field =>
        Utils.normalizeText(field).includes(keyword)
      );

    });

  }

  function filterJobs(jobs, filters) {

    jobs = jobs || getJobs();
    filters = filters || {};

    return jobs.filter(job => {

      if (filters.status &&
          !Utils.hasStatus(job.status, filters.status))
        return false;

      if (filters.center &&
          Utils.normalizeText(job.center) !== Utils.normalizeText(filters.center))
        return false;

      if (filters.technician &&
          Utils.normalizeText(job.technician) !== Utils.normalizeText(filters.technician))
        return false;

      return true;

    });

  }

  function getJob(jobNumber) {

    return getJobs().find(job =>
      String(job.jobNumber) === String(jobNumber)
    ) || null;

  }

  return {

    getJobs,
    buildSummary,
    getRecentJobs,
    searchJobs,
    filterJobs,
    getJob

  };

})();