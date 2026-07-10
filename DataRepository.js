/*************************************************
 * DataRepository.js
 * Workshop Manager
 * Milestone 1
 *************************************************/

const DataRepository = (() => {

  function getJobs() {

    const cache = CacheService.getScriptCache();
    const cacheKey = WORKSHOP_CONFIG.Cache.KEY;

    const cached = cache.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const jobs = loadJobs();

    cache.put(
      cacheKey,
      JSON.stringify(jobs),
      WORKSHOP_CONFIG.Cache.TTL_SECONDS
    );

    return jobs;

  }

  function refreshCache() {

    clearCache();
    return getJobs();

  }

  function clearCache() {

    CacheService
      .getScriptCache()
      .remove(WORKSHOP_CONFIG.Cache.KEY);

  }

  function loadJobs() {

    const jobs = [];

    WORKSHOP_CONFIG.Sources.Spreadsheets.forEach(source => {

      const ss = SpreadsheetApp.openById(source.id);

      source.sheets.forEach(sheetName => {

        const sheet = ss.getSheetByName(sheetName);

        if (!sheet) return;

        const values = sheet
          .getDataRange()
          .getValues();

        if (values.length <= 1) return;

        for (let i = 1; i < values.length; i++) {

          jobs.push(normalizeRow(values[i]));

        }

      });

    });

    return jobs;

  }

  function normalizeRow(row) {

    const c = WORKSHOP_CONFIG.Sheets.Columns;

    return {

      jobNumber: row[c.JOB_NUMBER],
      entryDate: row[c.ENTRY_DATE],
      exitDate: row[c.EXIT_DATE],

      manufacturer: row[c.MANUFACTURER],
      model: row[c.MODEL],
      chassis: row[c.CHASSIS],
      plate: row[c.PLATE],
      color: row[c.COLOR],

      requestedServices: row[c.REQUESTED_SERVICES],

      clientName: row[c.CLIENT_NAME],
      mobile: Utils.formatPhone(row[c.CLIENT_PHONE]),

      salesName: row[c.SALES_NAME],

      screen: row[c.SCREEN],
      packageType: row[c.PACKAGE_TYPE],

      status: row[c.STATUS],

      center: row[c.CENTER],
      technician: row[c.TECHNICIAN],

      warrantySN: row[c.WARRANTY_SN],
      months: row[c.MONTHS]

    };

  }

  return {

    getJobs,
    refreshCache,
    clearCache

  };

})();