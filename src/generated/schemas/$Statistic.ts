/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Statistic = {
  properties: {
    day: {
      type: 'string',
      description: `Date of the statistic. ISO 8601 format.`,
    },
    n_humanities_messages: {
      type: 'number',
      description: `Number of messages sent on that day about humanities.`,
    },
    n_humanities_cheating_messages: {
      type: 'number',
      description: `Number of messages sent on that day about humanities that are cheating.`,
    },
    n_natural_sciences_messages: {
      type: 'number',
      description: `Number of messages sent on that day about natural sciences.`,
    },
    n_natural_sciences_cheating_messages: {
      type: 'number',
      description: `Number of messages sent on that day about natural sciences that are cheating.`,
    },
    n_social_sciences_messages: {
      type: 'number',
      description: `Number of messages sent on that day about social sciences.`,
    },
    n_social_sciences_cheating_messages: {
      type: 'number',
      description: `Number of messages sent on that day about social sciences that are cheating.`,
    },
    n_mathematics_messages: {
      type: 'number',
      description: `Number of messages sent on that day about mathematics.`,
    },
    n_mathematics_cheating_messages: {
      type: 'number',
      description: `Number of messages sent on that day about mathematics that are cheating.`,
    },
    n_professional_messages: {
      type: 'number',
      description: `Number of messages sent on that day about professional.`,
    },
    n_professional_cheating_messages: {
      type: 'number',
      description: `Number of messages sent on that day about professional that are cheating.`,
    },
    n_other_messages: {
      type: 'number',
      description: `Number of messages sent on that day about other.`,
    },
    n_other_cheating_messages: {
      type: 'number',
      description: `Number of messages sent on that day about other that are cheating.`,
    },
  },
} as const;
