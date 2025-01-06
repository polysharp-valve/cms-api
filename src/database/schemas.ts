import { folder } from "./schemas/folder";
import { media } from "./schemas/media";
import { meta } from "./schemas/meta";
import { product } from "./schemas/product";
import { productCategory } from "./schemas/product-category";
import { productCollection } from "./schemas/product-collection";
import { productOption } from "./schemas/product-option";
import { productOptionValue } from "./schemas/product-option-value";
import { productTag } from "./schemas/product-tag";
import { productType } from "./schemas/product-type";
import { productVariant } from "./schemas/product-variant";
import { productVariantsOptionValues } from "./schemas/product-variants-option-values";
import { productsCategories } from "./schemas/products-categories";
import { productsCollections } from "./schemas/products-collections";

export default {
  folder,
  media,
  meta,
  productCategory,
  productCollection,
  productOptionValue,
  productOption,
  productTag,
  productType,
  productVariant,
  productVariantsOptionValues,
  product,
  productsCategories,
  productsCollections,
} as const;
