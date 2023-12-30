/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Statistic } from '../models/Statistic';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ExternalInstitutionAPI {

  /**
   * Query user data.
   * Queries user data from a specific institution. Requires an API key with the `inst.gyro.history` scope. Returns a list of users and their data based on the command provided.
   *
   * For proper use, check out these examples. It uses SQL queries to get data from the database.
   *
   * ```postgresql
   * -- Count how many users there are in your institution
   * SELECT COUNT(*) FROM users;
   *
   * -- Just see the first 5 messages from your institution
   * SELECT * FROM messages LIMIT 5;
   *
   * -- Count how many messages have been sent by your institution
   * SELECT COUNT(*) FROM messages;
   *
   * -- See the first 50 messages from a student named "Joe Smith" about mathematics. The preferred method is through email.
   * SELECT * FROM messages WHERE student_name='Joe Smith' AND subject='mathematics' LIMIT 50;
   *
   * -- See the first 50 messages from a student with the email below, and messages that have a high likelihood of cheating.
   * SELECT * FROM messages WHERE student_email='joe.smith@myinst.edu' AND cheating_prob >= 0.7 LIMIT 50;
   *
   * -- See the first 50 messages from a student with the email below, but only from the year 2023.
   * SELECT * FROM messages WHERE student_email='joe.smith@myinst.edu' AND date >= '2023-01-01'::timestamp AND date <= '2024-01-01'::timestamp LIMIT 50;
   * ```
   *
   * TL;DR: SQL statements but with a few things removed so that the institution doesn't have to worry about things that much.
   *
   * @param authorization API key. Always required for external endpoints.
   * @param requestBody
   * @returns any Query successful.
   * @throws ApiError
   */
  public static postExternalGyroInstitutionQuery(
    authorization: string,
    requestBody: {
      /**
       * Command to run. For proper use, see the documentation.
       */
      command: string;
    },
  ): CancelablePromise<{
    /**
     * Rows that match the query command.
     */
    results?: Array<string>;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/external/gyro/institution/query/',
      headers: {
        'Authorization': authorization,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        403: `API key is invalid.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Classify if a message is Gyro written.
   * Determines if a message is Gyro written or not. Requires an API key with the `inst.gyro.classifier` scope.
   * @param authorization API key. Always required for external endpoints.
   * @param requestBody
   * @returns any Text classified successfully.
   * @throws ApiError
   */
  public static postExternalGyroInstitutionClassifier(
    authorization: string,
    requestBody: {
      /**
       * Text to classify
       */
      text?: string;
    },
  ): CancelablePromise<{
    /**
     * Whether the text is written by Gyro or not.
     */
    is_gyro_written?: boolean;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/external/gyro/institution/classifier/',
      headers: {
        'Authorization': authorization,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        403: `API key is invalid.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Get dashboard metrics through the API.
   * Requires an API key with the `inst.gyro.metrics` scope. Returns a list of metrics to display on the institution dashboard.
   * @param authorization API key. Always required for external endpoints.
   * @param requestBody
   * @returns any Returns a list of metrics to display on the institution dashboard.
   * @throws ApiError
   */
  public static getExternalGyroInstitutionMetrics(
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
      url: '/external/gyro/institution/metrics/',
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
