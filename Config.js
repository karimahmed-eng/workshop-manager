/*************************************************
 * Config.js
 * Workshop Manager Configuration
 * Milestone 1
 *************************************************/

const WORKSHOP_CONFIG = Object.freeze({

  Sources: Object.freeze({
    Spreadsheets: [
      {
        id: "121RzbHqdu2tkKzlPO20nIsFTsDmETdKg2hPnDoxOfQ8",
        sheets: [
          "July 2026",
          "2026 Archive"
        ]
      }
    ]
  }),

  Sheets: Object.freeze({

    Headers: Object.freeze([
      "Job",
      "Entry Date",
      "Exit Date",
      "Manufacturer",
      "Car Model",
      "Chassis No.",
      "License",
      "Car Color",
      "Requested Services",
      "Client Name",
      "Client Phone",
      "Sales Name",
      "Screen",
      "Package Type",
      "Status",
      "OP Center",
      "OP Technician",
      "Warranty SN.",
      "Months"
    ]),

    Columns: Object.freeze({
      JOB_NUMBER: 0,
      ENTRY_DATE: 1,
      EXIT_DATE: 2,
      MANUFACTURER: 3,
      MODEL: 4,
      CHASSIS: 5,
      PLATE: 6,
      COLOR: 7,
      REQUESTED_SERVICES: 8,
      CLIENT_NAME: 9,
      CLIENT_PHONE: 10,
      SALES_NAME: 11,
      SCREEN: 12,
      PACKAGE_TYPE: 13,
      STATUS: 14,
      CENTER: 15,
      TECHNICIAN: 16,
      WARRANTY_SN: 17,
      MONTHS: 18
    })

  }),

  Cache: Object.freeze({
    KEY: "WORKSHOP_JOBS_CACHE",
    TTL_SECONDS: 300
  }),

  Statuses: Object.freeze([
    "Received",
    "Under Processing",
    "Done OP",
    "Done QC",
    "Delivered",
    "Returned To Cust",
    "Returned To OP",
    "Jeans Car",
    "Dipping Shop",
    "Triple Fix",
    "Delayed",
    "Out",
    "Not Yet Received",
    "Not Approved"
  ]),

  Dashboard: Object.freeze({
    RECENT_JOBS_LIMIT: 10
  }),

  Logger: Object.freeze({
    ENABLED: true,
    TITLE: "Dashboard",
    SHOW_STATUS_COUNTS: true
  })

});