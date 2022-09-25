const mths = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

exports.formatTimestampNumeral = (num) => {
  if (num < 10) return `0${num}`;
  else return num;
};

exports.parseTimestamp = (timestamp) => {
  let dt = new Date(timestamp);

  return `le ${this.formatTimestampNumeral(dt.getDay())} ${mths[dt.getMonth()]} 
          ${dt.getFullYear()} à ${this.formatTimestampNumeral(
    dt.getHours()
  )}h${this.formatTimestampNumeral(dt.getMinutes())}`;
};
