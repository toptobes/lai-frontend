/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EditMessage = {
  /**
   * Message text to replace the old message.
   */
  new_message: string;
  /**
   * Model to use for the message. Default is `gyro-1000` but a pro user can use `gyro-2000`. Will return 403 if the user does not have a pro plan but does have a basic plan. These will default to the latest models (which start at `gyro-1001` and `gyro-2001`, but will increase over time).
   */
  'model?'?: 'gyro-1000' | 'gyro-2000';
};

