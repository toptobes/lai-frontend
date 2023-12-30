/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InternalTeacherAPI {

  /**
   * Classify if a message is Gyro written.
   * Classify if a message is Gyro written. This is only available to teachers and institutions (institutions through API keys).
   * @param authorization User's ID token. Always required.
   * @param requestBody
   * @returns any Text classified successfully.
   * @throws ApiError
   */
  public static postInternalTeacherClassifier(
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
      url: '/internal/teacher/classifier/',
      headers: {
        'Authorization': authorization,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        403: `User does not have appropriate credentials (is not a teacher).`,
        500: `Internal server error.`,
      },
    });
  }

}
