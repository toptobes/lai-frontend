/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Message indicating success.
 */
export type JobFine = {
  /**
   * Job ID.
   */
  job_id: number;
  /**
   * Shortened job title.
   */
  title_short: string;
  /**
   * Full job title.
   */
  title_long: string;
  /**
   * Job location.
   */
  location: string;
  /**
   * Job description.
   */
  description: string;
  /**
   * Job responsibilities.
   */
  responsibilities: Array<string>;
  /**
   * Job qualifications.
   */
  qualifications: Array<string>;
};

