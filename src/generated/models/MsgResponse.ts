/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Document } from './Document';

export type MsgResponse = {
  /**
   * Gyro's response to the message provided.
   */
  response: string;
  /**
   * List of sources that the response was generated from.
   */
  sources: Array<Document>;
};

