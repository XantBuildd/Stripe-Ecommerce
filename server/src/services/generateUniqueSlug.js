import Product from "../models/product.model.js";
import { generateSlug } from "../services/generateSlug.js";

export const generateUniqueSlug = async (title, productId = null) => {
  const baseSlug = generateSlug(title);

  let slug = baseSlug;
  let counter = 1;

  while (
    await Product.findOne({
      slug,
      ...(productId && {
        _id: { $ne: productId },
      }),
    })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};
