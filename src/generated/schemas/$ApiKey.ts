/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ApiKey = {
  properties: {
    key_hint: {
      type: 'string',
      description: `Hint of the API key`,
    },
    name: {
      type: 'string',
      description: `Name of the API key`,
    },
    uuid: {
      type: 'string',
      description: `Unique identifier of the API key`,
    },
    created_at: {
      type: 'string',
      description: `Date and time when the API key was created. ISO 8601 format.`,
    },
    last_used: {
      type: 'string',
      description: `Date and time when the API key was last used. ISO 8601 format.`,
    },
    expires_at: {
      type: 'string',
      description: `Date and time when the API key expires. ISO 8601 format.`,
    },
  },
} as const;
