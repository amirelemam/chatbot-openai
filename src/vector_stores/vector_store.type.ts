export type VectorStoreParams = {
  vectorStoreId: string;
};

export type VectorStoreFileParams = {
  fileId: string;
};

export type VectorStoreDTO = {
  name?: string;
  fileIds?: string[];
};
