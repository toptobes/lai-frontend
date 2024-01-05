/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminDashboard } from '../models/AdminDashboard';
import type { AdminStats } from '../models/AdminStats';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminAPI {

  /**
   * Get admin dashboard metrics.
   * Does not require an API key, but does require the institution user to be signed in with their Google account.
   * @param authorization User's ID token. Always required.
   * @param requestBody
   * @returns AdminStats Returns a list of metrics to display on the institution dashboard.
   * @throws ApiError
   */
  public static getAdminStats(
    authorization: string,
    requestBody?: AdminDashboard,
  ): CancelablePromise<AdminStats> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin/stats/',
      headers: {
        'Authorization': authorization,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User does not have appropriate credentials.`,
        500: `Internal server error.`,
      },
    });
  }

}
