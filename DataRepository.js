/*************************************************
 * DataRepository.js
 * Workshop Manager
 * Milestone 1
 *************************************************/

const DataRepository = (() => {

  /**
   * Public
   */
  function getJobs() {
    return loadJobs();
  }

  function refreshCache() {
    return loadJobs();
  }

  function clearCache() {
    // Cache intentionally disabled.
  }

  /**
   * Read all configured sheets
   */
  function loadJobs() {

    const jobs = [];

    WORKSHOP_CONFIG.Sources.Spreadsheets.forEach(source => {

      const ss = SpreadsheetApp.openById(source.id);

      source.sheets.forEach(sheetName => {

        const sheet = ss.getSheetByName(sheetName);

        if (!sheet) return;

        const values = sheet.getDataRange().getValues();

        if (values.length <= 1) return;

        for (let i = 1; i < values.length; i++) {
          jobs.push(normalizeRow(values[i]));
        }

      });

    });

    return jobs;

  }

  /**
   * Normalize a spreadsheet row into
   * a standard job object.
   */
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
      mobile: Utils.formatPhone(
        row[c.CLIENT_PHONE]
      ),

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