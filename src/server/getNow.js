/**
 * Get the time value in milliseconds
 */
const getNow = () => {
  const now = new Date();
  return {
    year: now.getFullYear,
    month: now.getMonth + 1,
    date: now.getDate,
    hour: now.getHours,
    min: now.getMinutes,
    sec: now.getSeconds,
    msec: now.getMilliseconds,
  };
};

module.exports = getNow;
