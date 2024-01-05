/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UploadDocument = {
  /**
   * Upload a file (.txt, .docx, or .pdf).
   */
  primary_file: Blob;
  /**
   * Filename of the document.
   */
  source_name: string;
  /**
   * Optional advanced feature to control how the RecursiveTextSplitter chunks each document by changing the size of each subdoc.
   */
  'chunk_size?'?: number;
  /**
   * Optional advanced feature to control how the RecursiveTextSplitter chunks each document by changing the overlap between subdocs.
   */
  'chunk_overlap?'?: number;
};

