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


        const jobNumber = String(row[0] || "").trim();


        // Skip empty rows and placeholder rows
        if (
          !jobNumber ||
          jobNumber.toLowerCase() === "enter here"
        ) {
          return;
        }


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

function testWorkshopConnection() {

  WORKSHOP_CONFIG.sources.forEach(source => {

    const ss = SpreadsheetApp.openById(source.id);

    Logger.log("SOURCE: " + ss.getName());

    source.sheets.forEach(name => {

      const sheet = ss.getSheetByName(name);

      Logger.log(
        name + " => " + (sheet ? "FOUND" : "MISSING")
      );

      if (sheet) {
        Logger.log(
          "Rows: " + sheet.getLastRow()
        );
      }

    });

  });

}

function testJobsRead() {

  const source = WORKSHOP_CONFIG.sources[0];

  const ss = SpreadsheetApp.openById(source.id);

  const sheet = ss.getSheetByName(source.sheets[0]);

  const data = sheet.getDataRange().getValues();

  Logger.log("Total rows: " + data.length);

  Logger.log("HEADERS:");
  Logger.log(JSON.stringify(data[0]));

  Logger.log("FIRST DATA ROW:");
  Logger.log(JSON.stringify(data[1]));

}