/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InternalAdminAPI {

  /**
   * Get admin dashboard metrics.
   * Does not require an API key, but does require the institution user to be signed in with their Google account.
   * @param authorization User's ID token. Always required.
   * @param requestBody
   * @returns any Returns a list of metrics to display on the institution dashboard.
   * @throws ApiError
   */
  public static getInternalAdminStats(
    authorization: string,
    requestBody: {
      /**
       * Start date for metrics. Must be in ISO 8601 format.
       */
      start: string;
      /**
       * End date for metrics. Must be in ISO 8601 format.
       */
      end: string;
    },
  ): CancelablePromise<{
    days?: Array<string>;
    n_messages?: Array<number>;
    n_usermins?: Array<number>;
    n_institutions?: Array<number>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/internal/admin/stats/',
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
