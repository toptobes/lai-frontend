/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AIModels } from '../models/AIModels';
import type { JobFine } from '../models/JobFine';
import type { Jobs } from '../models/Jobs';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SiteAPI {

  /**
   * Get all career info for frontend.
   * Does not require any parameters or authentication. Will be rate-limited by IP.
   * @returns Jobs Careers fetched successfully.
   * @throws ApiError
   */
  public static getCareers(): CancelablePromise<Jobs> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/careers/',
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
   * @returns JobFine Career fetched successfully.
   * @throws ApiError
   */
  public static getCareers1(
    jobId: number,
  ): CancelablePromise<JobFine> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/careers/{job_id}/',
      path: {
        'job_id': jobId,
      },
      errors: {
        400: `Missing a passed parameter or body variable.`,
        403: `User is rate-limited`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Get current AI models.
   * Gets a list of AI model names, descriptions, capabilities, and tips for the frontend.
   * @returns AIModels AI models fetched successfully.
   * @throws ApiError
   */
  public static getSalesInfo(): CancelablePromise<AIModels> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sales-info/',
      errors: {
        403: `User is rate-limited`,
        500: `Internal server error.`,
      },
    });
  }

}
