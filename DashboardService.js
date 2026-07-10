/*************************************************
 * DashboardService.js
 * Workshop Manager
 * Milestone 1
 *************************************************/

const DashboardService = (() => {

  function getDashboardData() {

    const start = Date.now();

    const executionId = Utils.executionId();

    let cacheState = "MISS";

    const cache = CacheService.getScriptCache();
    if (cache.get(WORKSHOP_CONFIG.Cache.KEY)) {
      cacheState = "HIT";
    }

    const jobs = DataRepository.getJobs();

    const summary = JobsService.buildSummary(jobs);

    const recentJobs = JobsService.getRecentJobs(
      jobs,
      WORKSHOP_CONFIG.Dashboard.RECENT_JOBS_LIMIT
    );

    writeLog({
      executionId,
      cacheState,
      jobs,
      summary,
      elapsed: Utils.elapsed(start)
    });

    return {
      summary,
      recentJobs,
      jobs
    };

  }

  function writeLog(data) {

    if (!WORKSHOP_CONFIG.Logger.ENABLED) return;

    Log.header(WORKSHOP_CONFIG.Logger.TITLE);

    Log.line("Execution ID : " + data.executionId);
    Log.line("Cache        : " + data.cacheState);

    Log.line(
      "Sources      : " +
      WORKSHOP_CONFIG.Sources.Spreadsheets.length
    );

    const sheetCount =
      WORKSHOP_CONFIG.Sources.Spreadsheets.reduce(
        (count, source) => count + source.sheets.length,
        0
      );

    Log.line("Sheets       : " + sheetCount);

    Log.line("Rows Read    : " + data.jobs.length);
    Log.line("Jobs Loaded  : " + data.jobs.length);

    if (WORKSHOP_CONFIG.Logger.SHOW_STATUS_COUNTS) {
      Log.statusCounts(data.summary.statuses);
    }

    Log.line("");
    Log.line("Execution Time : " + data.elapsed);

    Log.divider();

  }

  return {

    getDashboardData

  };

})();