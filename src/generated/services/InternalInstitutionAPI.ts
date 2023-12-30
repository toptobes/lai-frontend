/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiKey } from '../models/ApiKey';
import type { Statistic } from '../models/Statistic';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InternalInstitutionAPI {

  /**
   * Create an API key.
   * Create an API key for an institution account. This will allow the institution to make requests to the external API.
   * @param authorization User's ID token. Always required.
   * @param requestBody
   * @returns any Key generated successfully
   * @throws ApiError
   */
  public static postInternalGyroInstitutionKeysNew(
    authorization: string,
    requestBody: {
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
      expires_in?: number;
    },
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/internal/gyro/institution/keys/new/',
      headers: {
        'Authorization': authorization,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User is not an institution.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Revoke an API key.
   * Revoke an API key for an institution account. This will prevent the API key from being used to make requests to the external API. Requires a key ID (UUID) string.
   * @param authorization User's ID token. Always required.
   * @param keyId ID of the key to delete.
   * @returns any Key revoked successfully.
   * @throws ApiError
   */
  public static deleteInternalGyroInstitutionKeysRevoke(
    authorization: string,
    keyId: string,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/internal/gyro/institution/keys/revoke/',
      headers: {
        'Authorization': authorization,
        'key_id': keyId,
      },
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User is not an institution.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Get API keys.
   * Returns key hints, names, uuids, created at dates, last used dates, and expiration dates.
   * @param authorization User's ID token. Always required.
   * @returns any API keys fetched successfully.
   * @throws ApiError
   */
  public static getInternalGyroInstitutionKeys(
    authorization: string,
  ): CancelablePromise<{
    /**
     * List of keys.
     */
    keys?: Array<ApiKey>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/internal/gyro/institution/keys/',
      headers: {
        'Authorization': authorization,
      },
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User does not have appropriate credentials.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Get dashboard metrics
   * Does not require an API key, but does require the institution user to be signed in with their Google account.
   * @param authorization User's ID token. Always required.
   * @param requestBody
   * @returns any Returns a list of metrics to display on the institution dashboard.
   * @throws ApiError
   */
  public static getInternalGyroInstitutionMetrics(
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
    metrics?: Array<Statistic>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/internal/gyro/institution/metrics/',
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
