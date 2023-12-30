/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Message = {
  properties: {
    id: {
      type: 'string',
      description: `Unique identifier of the message`,
    },
    body: {
      type: 'string',
      description: `Message text`,
    },
    role: {
      type: 'string',
      description: `Who sent the message ("ai", "human")`,
    },
    created: {
      type: 'string',
      description: `Date and time when the message was created. ISO 8601 format.`,
    },
    category: {
      type: 'string',
      description: `Category of the message ("humanities", "natural_sciences", "social_sciences", "mathematics", "professional", "other")`,
    },
    cheat_guess: {
      type: 'number',
      description: `Indicates if the message is related to cheating (0 or 1, binary classifier)`,
      maximum: 1,
    },
    sources: {
      type: 'array',
      contains: {
        type: 'Document',
      },
    },
  },
} as const;
