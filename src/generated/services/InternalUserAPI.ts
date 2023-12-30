/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Conversation } from '../models/Conversation';
import type { Document } from '../models/Document';
import type { DocumentInfo } from '../models/DocumentInfo';
import type { Message } from '../models/Message';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InternalUserAPI {

  /**
   * Create a user.
   * Creates a user with the given authentication information pulled from the identity provider and a gender variable.
   * @param authorization User's ID token. Always required.
   * @param requestBody
   * @returns any Entity created successfully.
   * @throws ApiError
   */
  public static postInternalUser(
    authorization: string,
    requestBody: {
      gender?: 'male' | 'female' | 'x';
    },
  ): CancelablePromise<{
    /**
     * Name of the user.
     */
    name?: string;
    /**
     * Entity's email.
     */
    email?: string;
    /**
     * Entity's gender.
     */
    gender?: 'male' | 'female' | 'x';
    /**
     * Name of the institution (if applicable, i.e. is a user/teacher).
     */
    institution_name?: string;
    /**
     * ISO 8601 timestamp of when the entity was created.
     */
    created_at?: string;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/internal/user/',
      headers: {
        'Authorization': authorization,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `Entity oauth credentials are incorrect.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Get an entity's basic data.
   * Gets `name` and `role`, the basic informmation of the user/institution (institution role will be `institution`).
   * @param authorization Entity's ID token. Always required.
   * @returns any Entity fetched successfully.
   * @throws ApiError
   */
  public static getInternalUser(
    authorization: string,
  ): CancelablePromise<{
    /**
     * Name of the user.
     */
    name?: string;
    /**
     * Role of the user, either `user-none`, `user-basic`, `user-pro`, `teacher`, `institution`, `admin`. Admin is for Lindauer AI employees only.
     */
    role?: 'user-none' | 'user-basic' | 'user-pro' | 'teacher' | 'institution' | 'admin';
    /**
     * Name of the institution (if applicable, i.e. is a user/teacher).
     */
    institution_name?: string;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/internal/user/',
      headers: {
        'Authorization': authorization,
      },
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `Entity oauth credentials are incorrect.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Get an entity's profile.
   * Gets `name`, `email`, `gender`, and `created_at` date of the user/institution (institution gender will be `x`).
   * @param authorization Entity's ID token. Always required.
   * @returns any User profile fetched successfully.
   * @throws ApiError
   */
  public static getInternalUserProfile(
    authorization: string,
  ): CancelablePromise<{
    /**
     * Name of the user.
     */
    name?: string;
    /**
     * Entity's email.
     */
    email?: string;
    /**
     * Entity's gender.
     */
    gender?: 'male' | 'female' | 'x';
    /**
     * ISO 8601 timestamp of when the entity was created.
     */
    created_at?: string;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/internal/user/profile/',
      headers: {
        'Authorization': authorization,
      },
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `Entity oauth credentials are incorrect.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Edit user profile.
   * Edit a user's profile information. If not changing all the fields, just pass the old values in for the fields that stay the same.
   * @param authorization User's ID token. Always required.
   * @param requestBody
   * @returns any User edited successfully.
   * @throws ApiError
   */
  public static putInternalUserProfile(
    authorization: string,
    requestBody: {
      new_name?: string;
      new_gender?: 'male' | 'female' | 'x';
    },
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/internal/user/profile/',
      headers: {
        'Authorization': authorization,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `User oauth credentials are incorrect.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Create conversation.
   * Create a conversation with Gyro for a specific user.
   * @param authorization User's ID token. Always required.
   * @param requestBody
   * @returns any Conversation created successfully.
   * @throws ApiError
   */
  public static postInternalGyroConversationsNew(
    authorization: string,
    requestBody: {
      conversation_name: string;
    },
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/internal/gyro/conversations/new/',
      headers: {
        'Authorization': authorization,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `User oauth credentials are incorrect.`,
        403: `User does not have a Gyro plan or is an institution.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Rename conversation.
   * Rename an existing conversation to something else.
   * @param authorization User's ID token. Always required.
   * @param conversationId UUID of the conversation to ask the message in.
   * @param requestBody
   * @returns any Conversation renamed successfully.
   * @throws ApiError
   */
  public static putInternalGyroConversations(
    authorization: string,
    conversationId: string,
    requestBody: {
      /**
       * New name for the conversation.
       */
      new_conversation_name: string;
    },
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/internal/gyro/conversations/{conversation_id}/',
      headers: {
        'Authorization': authorization,
        'conversation_id': conversationId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User does not have a gyro plan or is an institution.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Delete conversation.
   * Delete an existing conversation.
   * @param authorization User's ID token. Always required.
   * @param conversationId UUID of the conversation to ask the message in.
   * @returns any Conversation deleted successfully.
   * @throws ApiError
   */
  public static deleteInternalGyroConversations(
    authorization: string,
    conversationId: string,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/internal/gyro/conversations/{conversation_id}/',
      headers: {
        'Authorization': authorization,
        'conversation_id': conversationId,
      },
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User does not have a gyro plan or is an institution.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Get conversations.
   * Get a list of conversations for a user, sorted by last used timestamp. This is used to populate the conversation list on the frontend.
   * @param authorization User's ID token. Always required.
   * @returns any Conversations fetched successfully.
   * @throws ApiError
   */
  public static getInternalGyroConversations(
    authorization: string,
  ): CancelablePromise<{
    /**
     * List of conversations.
     */
    conversations?: Array<Conversation>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/internal/gyro/conversations/',
      headers: {
        'Authorization': authorization,
      },
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User does not have appropriate credentials.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Upload document.
   * Upload text as a document to perform queries on.
   * @param authorization User's ID token. Always required.
   * @param conversationId UUID of the conversation as a string.
   * @param formData
   * @returns any Document uploaded successfully.
   * @throws ApiError
   */
  public static postInternalGyroDocuments(
    authorization: string,
    conversationId: string,
    formData: {
      /**
       * Upload a file (.txt, .docx, or .pdf).
       */
      primary_file: Blob;
      /**
       * Filename of the document.
       */
      source_name: string;
      /**
       * Optional advanced feature to control how the RecursiveTextSplitter chunks each document by changing the size of each subdoc.
       */
      chunk_size?: number;
      /**
       * Optional advanced feature to control how the RecursiveTextSplitter chunks each document by changing the overlap between subdocs.
       */
      chunk_overlap?: number;
    },
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/internal/gyro/documents/{conversation_id}/',
      path: {
        'conversation_id': conversationId,
      },
      headers: {
        'Authorization': authorization,
      },
      formData: formData,
      mediaType: 'multipart/form-data',
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User does not have a Gyro plan or is an institution.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * List documents.
   * Get a list of documents for a user. This is used to populate the document list on the frontend and allow users to see what documents are being referred to in a conversation.
   * @param authorization User's ID token. Always required.
   * @param conversationId Conversation ID to list documents from.
   * @returns any Documents fetched successfully.
   * @throws ApiError
   */
  public static getInternalGyroDocuments(
    authorization: string,
    conversationId: string,
  ): CancelablePromise<{
    /**
     * List of documents.
     */
    documents?: Array<DocumentInfo>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/internal/gyro/documents/{conversation_id}/',
      path: {
        'conversation_id': conversationId,
      },
      headers: {
        'Authorization': authorization,
      },
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User does not have appropriate credentials.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Delete a document.
   * Delete a document from a conversation and vectorstore.
   * @param authorization User's ID token. Always required.
   * @param conversationId UUID of the conversation to ask the message in.
   * @param id ID of the source to delete.
   * @returns any Document deleted successfully.
   * @throws ApiError
   */
  public static deleteInternalUserDocuments(
    authorization: string,
    conversationId: string,
    id: string,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/internal/user/documents/{conversation_id}/{id}/',
      path: {
        'conversation_id': conversationId,
        'id': id,
      },
      headers: {
        'Authorization': authorization,
      },
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User does not have appropriate credentials (i.e. institution).`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Send a message.
   * Send a message to Gyro and receive its response. This is NOT a stream, and is not preferable because the user will have to wait longer before reading.
   * @param authorization User's ID token. Always required.
   * @param conversationId UUID of the conversation to ask the message in.
   * @param requestBody
   * @returns any Message generated successfully.
   * @throws ApiError
   */
  public static postInternalGyroConversationsMessages(
    authorization: string,
    conversationId: string,
    requestBody: {
      /**
       * Message text to send.
       */
      message: string;
      /**
       * Model to use for the message. Default is `gyro-1000` but a pro user can use `gyro-2000`. Will return 403 if the user does not have a pro plan but does have a basic plan. These will default to the latest models (which start at `gyro-1001` and `gyro-2001`, but will increase over time).
       */
      model?: 'gyro-1000' | 'gyro-2000';
      /**
       * Number of sources to use for the response. Default is 3, but can be any number between 0 and 50 (`gyro-1xxx`) and 0 and 25 (`'`gyro-2xxx`). Will throw a 500 error if out of bounds/
       */
      n_sources?: number;
    },
  ): CancelablePromise<{
    /**
     * Gyro's response to the message provided.
     */
    response?: string;
    /**
     * List of sources that the response was generated from.
     */
    sources?: Array<Document>;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/internal/gyro/conversations/{conversation_id}/messages/',
      path: {
        'conversation_id': conversationId,
      },
      headers: {
        'Authorization': authorization,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User does not have a Gyro plan or is an institution.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Edit a message.
   * Edits a message in the conversation history. IMPORTANT: Also removes all subsequent messages and generates/returns a new response, like before.
   * @param authorization User's ID token. Always required.
   * @param messageId UUID of the message to edit.
   * @param conversationId UUID of the conversation to ask the message in.
   * @param requestBody
   * @returns any Message generated successfully.
   * @throws ApiError
   */
  public static putInternalGyroConversationsMessages(
    authorization: string,
    messageId: string,
    conversationId: string,
    requestBody: {
      /**
       * Message text to replace the old message.
       */
      new_message: string;
      /**
       * Model to use for the message. Default is `gyro-1000` but a pro user can use `gyro-2000`. Will return 403 if the user does not have a pro plan but does have a basic plan. These will default to the latest models (which start at `gyro-1001` and `gyro-2001`, but will increase over time).
       */
      model?: 'gyro-1000' | 'gyro-2000';
    },
  ): CancelablePromise<{
    /**
     * Gyro's response to the message provided.
     */
    response?: string;
    /**
     * List of source names that the response was generated from.
     */
    source_names?: Array<string>;
    /**
     * List of text excerpts that the response was generated from.
     */
    source_values?: Array<string>;
  }> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/internal/gyro/conversations/{conversation_id}/messages/',
      path: {
        'conversation_id': conversationId,
      },
      headers: {
        'Authorization': authorization,
        'message_id': messageId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User does not have a Gyro plan or is an institutional account.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Delete a message.
   * Send a message to Gyro and recieve its response.
   * @param authorization User's ID token. Always required.
   * @param conversationId UUID of the conversation to delete a message in.
   * @param messageId Message UUID.
   * @returns any Message deleted successfully.
   * @throws ApiError
   */
  public static deleteInternalGyroConversationsMessages(
    authorization: string,
    conversationId: string,
    messageId: string,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/internal/gyro/conversations/{conversation_id}/messages/',
      path: {
        'conversation_id': conversationId,
      },
      headers: {
        'Authorization': authorization,
        'message_id': messageId,
      },
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User is not a regular user (i.e. institution).`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Get messages.
   * Get a list of messages and their metadata for a user. This is used to populate the message list on the frontend and allow users to see what messages are in a conversation.
   * @param authorization User's ID token. Always required.
   * @param conversationId Conversation ID to list documents from.
   * @returns any List of messages
   * @throws ApiError
   */
  public static getInternalGyroConversationsMessages(
    authorization: string,
    conversationId: string,
  ): CancelablePromise<{
    /**
     * List of messages.
     */
    messages?: Array<Message>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/internal/gyro/conversations/{conversation_id}/messages/',
      path: {
        'conversation_id': conversationId,
      },
      headers: {
        'Authorization': authorization,
      },
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User does not have appropriate credentials.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Send a message for streaming.
   * Sends a message. The stream SSE will be returned.
   * @param authorization User's ID token. Always required.
   * @param conversationId UUID of the conversation to ask the message in.
   * @param requestBody
   * @param model Model name (optional). Use `gyro-1000` or `gyro-2000` for the latest models.
   * @returns string Stream created successfully.
   * @throws ApiError
   */
  public static postInternalGyroConversationsMessagesStream-?model=(
    authorization: string,
    conversationId: string,
    requestBody: {
      /**
       * Message text to send.
       */
      message: string;
      /**
       * Number of sources to use for the response. Default is 3, but can be any number between 0 and 50 (`gyro-1xxx`) and 0 and 25 (`gyro-2xxx`). Will throw a 500 error if out of bounds/
       */
      n_sources?: number;
    },
    model?: string,
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/internal/gyro/conversations/{conversation_id}/messages/stream/?model={model}/',
      path: {
        'conversation_id': conversationId,
      },
      headers: {
        'Authorization': authorization,
      },
      query: {
        'model': model,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User does not have a Gyro plan or is an institution.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Verify plan purchase.
   * Sets a user's account to have access to Gyro after Stripe payment.
   * @param authorization User's ID token. Always required.
   * @param paymentToken Confirmation token from Stripe to validate purchase.
   * @param requestBody
   * @returns any Purchase verified and account variable set.
   * @throws ApiError
   */
  public static postInternalGyroUserPlanVerifySet(
    authorization: string,
    paymentToken: string,
    requestBody: {
      /**
       * Plan name to buy. Can be `basic` or `pro`. This is only used to verify the amount paid, and doesn't actually change the user's plan.
       */
      plan: string;
    },
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/internal/gyro/user/plan/verify_set',
      headers: {
        'Authorization': authorization,
        'Payment-Token': paymentToken,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `User oauth credentials are incorrect.`,
        403: `User has incorrect permissions (i.e. institution account type) or an invalid payment token.`,
        500: `Internal server error.`,
      },
    });
  }

}
