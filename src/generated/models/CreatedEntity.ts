/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreatedEntity = {
  /**
   * Name of the user.
   */
  name: string;
  /**
   * Entity's email.
   */
  email: string;
  /**
   * Entity's gender.
   */
  gender: 'male' | 'female' | 'x';
  /**
   * Name of the institution (if applicable, i.e. is a user/teacher).
   */
  institution_name: string;
  /**
   * ISO 8601 timestamp of when the entity was created.
   */
  created_at: string;
};

