import { v2 as cloudinary } from "cloudinary";

import { BlobStorageAdapter } from "../BlobStorage";

export class CloudinaryAdapter implements BlobStorageAdapter {
  constructor(
    private readonly cloud_name: string,
    private readonly api_key: string,
    private readonly api_secret: string,
  ) {
    cloudinary.config({
      cloud_name: this.cloud_name,
      api_key: this.api_key,
      api_secret: this.api_secret,
    });
  }

  async upload(file: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult?.secure_url || "");
        })
        .end(file);
    });
  }

  async delete(path: string): Promise<void> {
    await cloudinary.uploader.destroy(path);
  }

  getUrl(path: string): string {
    return cloudinary.url(path);
  }
}
