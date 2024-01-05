/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EntityCreationResult = {
  /**
   * Name of the user.
   */
  name: string;
  /**
   * Role of the user, either `user-none`, `user-basic`, `user-pro`, `teacher`, `institution`, `admin`. Admin is for Lindauer AI employees only.
   */
  role: 'user-none' | 'user-basic' | 'user-pro' | 'teacher' | 'institution' | 'admin';
  /**
   * Name of the institution (if applicable, i.e. is a user/teacher).
   */
  institution_name: string;
};

