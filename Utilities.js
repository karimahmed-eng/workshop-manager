/*************************************************
 * Utilities.js
 *************************************************/


function getAllJobsData() {

  const jobs = [];

  WORKSHOP_CONFIG.sources.forEach(source => {

    const ss = SpreadsheetApp.openById(source.id);

    source.sheets.forEach(sheetName => {

      const sheet = ss.getSheetByName(sheetName);

      if (!sheet) return;

      const values = sheet.getDataRange().getValues();

      if (values.length <= 1) return;


      const headers = values[0];

      values.slice(1).forEach(row => {

        if (!row[0]) return;

        jobs.push(
          mapJobRow(headers, row)
        );

      });

    });

  });


  return jobs;

}



function mapJobRow(headers, row) {

  const job = {};

  headers.forEach((header, index) => {

    job[header] = row[index];

  });


  return job;

}