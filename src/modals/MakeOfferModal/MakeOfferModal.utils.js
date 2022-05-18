export const daysSelectArray = ["1 day"]
  .concat(new Array(30).fill(0, 0).map((elem, i) => (elem = `${i + 2} days`)))
  .concat(["None"]);

export const getExpirationDate = (days, time) => {
  let inDays;
  let hours;
  let minutes;

  if (days === "None") {
    inDays = 0;
  } else {
    inDays = Number(days.substring(0, days.indexOf(" ")));
  }

  if (!time || time === "") {
    hours = 0;
    minutes = 0;
  } else {
    hours = Number(time.substring(0, 2));
    minutes = Number(time.substring(3));
  }

  let expirationDate = new Date()
  expirationDate = Date.parse(expirationDate);

  expirationDate += inDays * 1000 * 60 * 60 * 24;

  expirationDate = new Date(expirationDate);

  time !== '' && expirationDate.setHours(hours);
  time !== '' && expirationDate.setMinutes(minutes)

  return expirationDate.toISOString();
};
