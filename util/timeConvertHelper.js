const extractDate = (date) => {
  return new Promise((resolve, reject) => {
    const originalDate = new Date(date);
    const day = originalDate.getUTCDate();
    const month = originalDate.getUTCMonth() + 1;
    const year = originalDate.getUTCFullYear();

    const hours = originalDate.getUTCHours();
    const minutes = originalDate.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedDate = `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year}`;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

    const result = [formattedDate, formattedTime];
    resolve(result);
  });
};

module.exports = { extractDate };
