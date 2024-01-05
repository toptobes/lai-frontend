/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Document = {
  /**
   * Name of the source
   */
  source_name: string;
  /**
   * Text excerpt from the source
   */
  source_value: string;
  /**
   * Size of the source file, to the nearest kilobyte
   */
  source_size: number;
  /**
   * Link to download the source file. Empty string if the user does not have a pro plan.
   */
  download_uri: string;
};

