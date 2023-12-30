/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JobSimple } from '../models/JobSimple';
import type { Model } from '../models/Model';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InternalSiteAPI {

  /**
   * Get all career info for frontend.
   * Does not require any parameters or authentication. Will be rate-limited by IP.
   * @returns any Careers fetched successfully.
   * @throws ApiError
   */
  public static getInternalCareers(): CancelablePromise<{
    /**
     * Job objects. See bottom for details.
     */
    jobs?: JobSimple;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/internal/careers/',
      errors: {
        403: `User is rate-limited`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Get a job's info.
   * Uses the serial ID as a lookup to get job posting information.
   * @param jobId Job ID.
   * @returns any Career fetched successfully.
   * @throws ApiError
   */
  public static getInternalCareers1(
    jobId: number,
  ): CancelablePromise<{
    /**
     * Job ID.
     */
    job_id?: number;
    /**
     * Shortened job title.
     */
    title_short?: string;
    /**
     * Full job title.
     */
    title_long?: string;
    /**
     * Job location.
     */
    location?: string;
    /**
     * Job description.
     */
    description?: string;
    /**
     * Job responsibilities.
     */
    responsibilities?: Array<string>;
    /**
     * Job qualifications.
     */
    qualifications?: Array<string>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/internal/careers/{job_id}/',
      path: {
        'job_id': jobId,
      },
      errors: {
        403: `User is rate-limited`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Get current AI models.
   * Gets a list of AI model names, descriptions, capabilities, and tips for the frontend.
   * @returns any AI models fetched successfully.
   * @throws ApiError
   */
  public static getInternalSalesInfo(): CancelablePromise<{
    /**
     * Array of AI model names.
     */
    models?: Array<Model>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/internal/sales-info/',
      errors: {
        403: `User is rate-limited`,
        500: `Internal server error.`,
      },
    });
  }

}
