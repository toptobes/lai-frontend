/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SendMessage = {
  /**
   * Message text to send.
   */
  message: string;
  /**
   * Model to use for the message. Default is `gyro-1000` but a pro user can use `gyro-2000`. Will return 403 if the user does not have a pro plan but does have a basic plan. These will default to the latest models (which start at `gyro-1001` and `gyro-2001`, but will increase over time).
   */
  'model?'?: 'gyro-1000' | 'gyro-2000';
  /**
   * Number of sources to use for the response. Default is 3, but can be any number between 0 and 50 (`gyro-1xxx`) and 0 and 25 (`'`gyro-2xxx`). Will throw a 500 error if out of bounds/
   */
  'n_sources?'?: number;
};

