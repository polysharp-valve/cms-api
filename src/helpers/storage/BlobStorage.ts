export interface BlobStorageAdapter {
  upload(file: Buffer, path: string): Promise<string>;
  delete(path: string): Promise<void>;
  getUrl(path: string): string;
}

export class BlobStorage {
  private adapter: BlobStorageAdapter;

  constructor(adapter: BlobStorageAdapter) {
    this.adapter = adapter;
  }

  async upload(file: Buffer, path: string): Promise<any> {
    return this.adapter.upload(file, path);
  }

  async delete(path: string): Promise<void> {
    return this.adapter.delete(path);
  }

  getUrl(path: string): string {
    return this.adapter.getUrl(path);
  }
}
