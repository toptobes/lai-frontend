/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Document } from './Document';

export type Message = {
  /**
   * Unique identifier of the message
   */
  id: string;
  /**
   * Message text
   */
  body: string;
  /**
   * Who sent the message ("ai", "human")
   */
  role: string;
  /**
   * Date and time when the message was created. ISO 8601 format.
   */
  created: string;
  /**
   * Category of the message ("humanities", "natural_sciences", "social_sciences", "mathematics", "professional", "other")
   */
  category: string;
  /**
   * Indicates if the message is related to cheating (0 or 1, binary classifier)
   */
  cheat_guess: number;
  /**
   * List of sources (name and corresponding excerpt text)
   */
  sources: Array<Document>;
};

