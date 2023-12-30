/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Document = {
  properties: {
    source_name: {
      type: 'string',
      description: `Name of the source`,
    },
    source_value: {
      type: 'string',
      description: `Text excerpt from the source`,
    },
    source_size: {
      type: 'number',
      description: `Size of the source file, to the nearest kilobyte`,
    },
    download_uri: {
      type: 'string',
      description: `Link to download the source file. Empty string if the user does not have a pro plan.`,
    },
  },
} as const;
