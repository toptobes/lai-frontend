/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClassifierResponse } from '../models/ClassifierResponse';
import type { ClassifyText } from '../models/ClassifyText';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TeacherAPI {

  /**
   * Classify if a message is Gyro written.
   * Classify if a message is Gyro written. This is only available to teachers and institutions (institutions through API keys).
   * @param authorization User's ID token. Always required.
   * @param requestBody
   * @returns ClassifierResponse Text classified successfully.
   * @throws ApiError
   */
  public static postGyroTeacherClassifier(
    authorization: string,
    requestBody?: ClassifyText,
  ): CancelablePromise<ClassifierResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/gyro/teacher/classifier/',
      headers: {
        'Authorization': authorization,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Missing a passed parameter or body variable.`,
        403: `User does not have appropriate credentials (is not a teacher).`,
        500: `Internal server error.`,
      },
    });
  }

}
