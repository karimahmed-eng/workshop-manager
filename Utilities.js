/*************************************************
 * Utilities.js
 * Workshop Manager Utilities
 * Milestone 1
 *************************************************/

const Utils = (() => {

  function normalizeText(value) {
    return String(value || "")
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
  }

  function normalizeStatusList(value) {

    if (!value) return [];

    return String(value)
      .replace(/\r/g, "\n")
      .replace(/[\/\\|;,]+/g, "\n")
      .split("\n")
      .map(normalizeText)
      .filter(Boolean);

  }

  function hasStatus(value, status) {

    const statuses = normalizeStatusList(value);

    return statuses.includes(
      normalizeText(status)
    );

  }

  function formatPhone(value) {

    return String(value || "")
      .replace(/\D/g, "");

  }

  function executionId() {

    return Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "yyyyMMdd-HHmmss"
    );

  }

  function elapsed(start) {

    return (
      ((Date.now() - start) / 1000).toFixed(2) +
      " sec"
    );

  }

  return {

    normalizeText,
    normalizeStatusList,
    hasStatus,
    formatPhone,
    executionId,
    elapsed

  };

})();



const Log = (() => {

  function line(text) {

    if (!WORKSHOP_CONFIG.Logger.ENABLED) return;

    Logger.log(text);

  }

  function divider() {

    line("================================");

  }

  function header(title) {

    line("========== " + title + " ==========");

  }

  function statusCounts(counts) {

    line("");
    line("Status Counts");
    line("-------------");

    WORKSHOP_CONFIG.Statuses.forEach(status => {

      line(
        status.padEnd(20, " ") +
        " : " +
        (counts[status] || 0)
      );

    });

  }

  return {

    line,
    divider,
    header,
    statusCounts

  };

})();