export const generateSlug = (slug) => {
  const lowerSlug = slug.toLowerCase();
  let result = "";

  for (let i = 0; i < lowerSlug.length; i++) {
    if (lowerSlug[i] === " ") {
      if (result.length > 0 && result[result.length - 1] !== "-") {
        result += "-";
      }
    } else {
      result += lowerSlug[i];
    }
  }
  return result;
};
