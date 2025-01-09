import * as folder from "./schemas/folder";
import * as media from "./schemas/media";
import * as product from "./schemas/product";
import * as productCategory from "./schemas/product-category";
import * as productCollection from "./schemas/product-collection";
import * as productOption from "./schemas/product-option";
import * as productOptionValue from "./schemas/product-option-value";
import * as productTag from "./schemas/product-tag";
import * as productType from "./schemas/product-type";
import * as productVariant from "./schemas/product-variant";
import * as productVariantsOptionValues from "./schemas/product-variants-option-values";
import * as productsCategories from "./schemas/products-categories";
import * as productsCollections from "./schemas/products-collections";

export default {
  ...folder,
  ...media,
  ...product,
  ...productCategory,
  ...productCollection,
  ...productOption,
  ...productOptionValue,
  ...productTag,
  ...productType,
  ...productVariant,
  ...productVariantsOptionValues,
  ...productsCategories,
  ...productsCollections,
} as const;
