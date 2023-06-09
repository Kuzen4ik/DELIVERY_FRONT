export const urlToObject = (url) => {
  const searchParams = new URLSearchParams(url);
  const obj = {};
  searchParams.forEach((value, key) => {
    if (obj[key]) {
      obj[key] += `, ${value}`;
    } else {
      obj[key] = value;
    }
  });
  return obj;
};

export const toDate = (date) => {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
