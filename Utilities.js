/*************************************************
 * Utilities.js
 * Workshop Manager Data Utilities
 *************************************************/


function getAllJobsData() {

  Logger.log("========== getAllJobsData START ==========");

  const jobs = [];


  try {

    WORKSHOP_CONFIG.sources.forEach(source => {


      Logger.log("[SOURCE] Opening: " + source.id);


      const ss = SpreadsheetApp.openById(source.id);


      Logger.log("[SOURCE] Opened: " + ss.getName());


      source.sheets.forEach(sheetName => {


        Logger.log("[SHEET] Reading: " + sheetName);


        const sheet = ss.getSheetByName(sheetName);


        if (!sheet) {

          Logger.log("[WARNING] Sheet missing: " + sheetName);

          return;

        }


        const values = sheet.getDataRange().getValues();


        Logger.log(
          "[SHEET] Rows found: " + values.length
        );


        if (values.length <= 1) {

          Logger.log("[WARNING] No data rows");

          return;

        }


        const headers = values[0];


        values.slice(1).forEach((row, index) => {


          const jobNumber = String(row[0] || "").trim();


          if (
            !jobNumber ||
            jobNumber.toLowerCase() === "enter here"
          ) {

            Logger.log(
              "[SKIP] Row " + (index + 2)
            );

            return;

          }


          jobs.push(
            mapJobRow(headers, row)
          );


        });


      });


    });


    Logger.log(
      "[RESULT] Total jobs loaded: " + jobs.length
    );


    Logger.log("========== getAllJobsData END ==========");


    return jobs;


  } catch (error) {


    Logger.log("[ERROR] getAllJobsData failed");

    Logger.log(error.stack);

    throw error;


  }

}



function mapJobRow(headers, row) {


  const job = {};


  headers.forEach((header, index) => {


    job[header] = row[index];


  });


  return job;


}