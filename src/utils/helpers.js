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
