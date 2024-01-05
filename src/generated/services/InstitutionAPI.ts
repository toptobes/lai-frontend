/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiKeys } from '../models/ApiKeys';
import type { CreateKey } from '../models/CreateKey';
import type { GetDashboardMetrics } from '../models/GetDashboardMetrics';
import type { Stats } from '../models/Stats';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InstitutionAPI {

  /**
   * Create an API key.
   * Create an API key for an institution account. This will allow the institution to make requests to the external API.
   * @param authorization User's ID token. Always required.
   * @param requestBody
   * @returns any Key generated successfully
   * @throws ApiError
   */
  public static postGyroInstitutionKeys(
    authorization: string,
    requestBody?: CreateKey,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/gyro/institution/keys/',
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
  public static deleteGyroInstitutionKeys(
    authorization: string,
    keyId: string,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/gyro/institution/keys/',
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
   * @returns ApiKeys API keys fetched successfully.
   * @throws ApiError
   */
  public static getGyroInstitutionKeys(
    authorization: string,
  ): CancelablePromise<ApiKeys> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/gyro/institution/keys/',
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
   * @returns Stats Returns a list of metrics to display on the institution dashboard.
   * @throws ApiError
   */
  public static getGyroInstitutionMetrics(
    authorization: string,
    requestBody?: GetDashboardMetrics,
  ): CancelablePromise<Stats> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/gyro/institution/metrics/',
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
