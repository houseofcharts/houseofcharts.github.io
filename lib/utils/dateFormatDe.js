// German date formatting, ex: 15. Juli 2026
const dateFormatDe = (date) =>
  new Date(date).toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export default dateFormatDe;
