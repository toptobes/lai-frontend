/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateKey = {
  /**
   * Name of the key to create.
   */
  name: string;
  /**
   * List of scopes to give the key. Can be `inst.gyro.metrics`, `inst.gyro.history`, and/or `inst.gyro.classifier`.
   */
  scope: Array<'inst.gyro.metrics' | 'inst.gyro.history' | 'inst.gyro.classifier'>;
  /**
   * Number of days until the key expires. Default is 90, which means the key expires in 90 days.
   */
  'expires_in?'?: number;
};

