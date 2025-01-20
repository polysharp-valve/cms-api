import config from "@/config";

import { CloudinaryAdapter } from "./adapters/CloudinaryAdapter";
import { BlobStorage } from "./BlobStorage";

export const blobStorage = new BlobStorage(
  new CloudinaryAdapter(
    config.CLOUDINARY_CLOUD_NAME,
    config.CLOUDINARY_API_KEY,
    config.CLOUDINARY_API_SECRET,
  ),
);
