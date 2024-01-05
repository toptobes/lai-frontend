/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type StreamMessage = {
  /**
   * Message text to send.
   */
  message: string;
  /**
   * Number of sources to use for the response. Default is 3, but can be any number between 0 and 50 (`gyro-1xxx`) and 0 and 25 (`gyro-2xxx`). Will throw a 500 error if out of bounds/
   */
  'n_sources?'?: number;
};

