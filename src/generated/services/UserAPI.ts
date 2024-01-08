/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConversationName } from '../models/ConversationName';
import type { ConversationReturn } from '../models/ConversationReturn';
import type { CreatedEntity } from '../models/CreatedEntity';
import type { EntityCreationResult } from '../models/EntityCreationResult';
import type { FetchConvos } from '../models/FetchConvos';
import type { FetchDocs } from '../models/FetchDocs';
import type { FetchProfile } from '../models/FetchProfile';
import type { GenderSchema } from '../models/GenderSchema';
import type { GetToKnowYouMsg } from '../models/GetToKnowYouMsg';
import type { GtkyStatus } from '../models/GtkyStatus';
import type { ListGtkyMessages } from '../models/ListGtkyMessages';
import type { ListMessages } from '../models/ListMessages';
import type { NewConversationName } from '../models/NewConversationName';
import type { SendMessage } from '../models/SendMessage';
import type { UploadDocument } from '../models/UploadDocument';
import type { UploadDocumentReturn } from '../models/UploadDocumentReturn';
import type { UserProfileEdit } from '../models/UserProfileEdit';
import type { VerifySet } from '../models/VerifySet';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserAPI {

  /**
   * Create a user.
   * Creates a user with the given authentication information pulled from the identity provider and a gender variable.
   * @param authorization User's ID token. Always required.
   * @param requestBody
   * @returns CreatedEntity Entity created successfully.
   * @throws ApiError
   */
  public static postUser(
    authorization: string,
    requestBody?: GenderSchema,
  ): CancelablePromise<CreatedEntity> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/user/',
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
   * @returns EntityCreationResult Entity fetched successfully.
   * @throws ApiError
   */
  public static getUser(
    authorization: string,
  ): CancelablePromise<EntityCreationResult> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user/',
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
   * @returns FetchProfile User profile fetched successfully.
   * @throws ApiError
   */
  public static getUserProfile(
    authorization: string,
  ): CancelablePromise<FetchProfile> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user/profile/',
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
  public static putUserProfile(
    authorization: string,
    requestBody?: UserProfileEdit,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/user/profile/',
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
   * @returns ConversationReturn Conversation created successfully.
   * @throws ApiError
   */
  public static postGyroConversationsNew(
    authorization: string,
    requestBody?: ConversationName,
  ): CancelablePromise<ConversationReturn> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/gyro/conversations/new/',
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
  public static putGyroConversations(
    authorization: string,
    conversationId: string,
    requestBody?: NewConversationName,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/gyro/conversations/{conversation_id}/',
      path: {
        'conversation_id': conversationId,
      },
      headers: {
        'Authorization': authorization,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `User oauth credentials are incorrect.`,
        403: `User does not have a gyro plan or is an institution.`,
        404: `Conversation does not exist.`,
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
  public static deleteGyroConversations(
    authorization: string,
    conversationId: string,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/gyro/conversations/{conversation_id}/',
      path: {
        'conversation_id': conversationId,
      },
      headers: {
        'Authorization': authorization,
      },
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `User oauth credentials are incorrect.`,
        403: `User does not have a gyro plan or is an institution.`,
        404: `Conversation does not exist.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Get conversations.
   * Get a list of conversations for a user, sorted by last used timestamp. This is used to populate the conversation list on the frontend.
   * @param authorization User's ID token. Always required.
   * @returns FetchConvos Conversations fetched successfully.
   * @throws ApiError
   */
  public static getGyroConversations(
    authorization: string,
  ): CancelablePromise<FetchConvos> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/gyro/conversations/',
      headers: {
        'Authorization': authorization,
      },
      errors: {
        400: `Missing a passed parameter or body variable.`,
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
   * @returns UploadDocumentReturn Document uploaded successfully.
   * @throws ApiError
   */
  public static postGyroDocuments(
    authorization: string,
    conversationId: string,
    formData?: UploadDocument,
  ): CancelablePromise<UploadDocumentReturn> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/gyro/documents/{conversation_id}/',
      path: {
        'conversation_id': conversationId,
      },
      headers: {
        'Authorization': authorization,
      },
      formData: formData,
      mediaType: 'multipart/form-data',
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `User oauth credentials are incorrect.`,
        403: `User does not have a Gyro plan or is an institution.`,
        404: `Conversation does not exist.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * List documents.
   * Get a list of documents for a user. This is used to populate the document list on the frontend and allow users to see what documents are being referred to in a conversation.
   * @param authorization User's ID token. Always required.
   * @param conversationId Conversation ID to list documents from.
   * @returns FetchDocs Documents fetched successfully.
   * @throws ApiError
   */
  public static getGyroDocuments(
    authorization: string,
    conversationId: string,
  ): CancelablePromise<FetchDocs> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/gyro/documents/{conversation_id}/',
      path: {
        'conversation_id': conversationId,
      },
      headers: {
        'Authorization': authorization,
      },
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `User oauth credentials are incorrect.`,
        403: `User does not have appropriate credentials.`,
        404: `Conversation does not exist.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Delete a document.
   * Delete a document from a conversation and vectorstore.
   * @param authorization User's ID token. Always required.
   * @param conversationId UUID of the conversation to ask the message in.
   * @param sourceId ID of the source to delete.
   * @returns any Document deleted successfully.
   * @throws ApiError
   */
  public static deleteUserDocuments(
    authorization: string,
    conversationId: string,
    sourceId: string,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/user/documents/{conversation_id}/{source_id}/',
      path: {
        'conversation_id': conversationId,
        'source_id': sourceId,
      },
      headers: {
        'Authorization': authorization,
      },
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `User oauth credentials are incorrect.`,
        403: `User does not have appropriate credentials (i.e. institution).`,
        404: `Conversation does not exist.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Delete a message.
   * Delete a message from the message history.
   * @param authorization User's ID token. Always required.
   * @param conversationId UUID of the conversation to delete a message in.
   * @param messageId Message UUID.
   * @returns any Message deleted successfully.
   * @throws ApiError
   */
  public static deleteGyroConversationsMessages(
    authorization: string,
    conversationId: string,
    messageId: string,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/gyro/conversations/{conversation_id}/messages/{message_id}/',
      path: {
        'conversation_id': conversationId,
        'message_id': messageId,
      },
      headers: {
        'Authorization': authorization,
      },
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `User oauth credentials are incorrect.`,
        403: `User is not a regular user (i.e. institution).`,
        404: `Conversation does not exist.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Get messages.
   * Get a list of messages and their metadata for a user. This is used to populate the message list on the frontend and allow users to see what messages are in a conversation.
   * @param authorization User's ID token. Always required.
   * @param conversationId Conversation ID to list documents from.
   * @returns ListMessages List of messages
   * @throws ApiError
   */
  public static getGyroConversationsMessages(
    authorization: string,
    conversationId: string,
  ): CancelablePromise<ListMessages> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/gyro/conversations/{conversation_id}/messages/',
      path: {
        'conversation_id': conversationId,
      },
      headers: {
        'Authorization': authorization,
      },
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `User oauth credentials are incorrect.`,
        403: `User does not have appropriate credentials.`,
        404: `Conversation does not exist.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Send a message.
   * Sends a message. The stream SSE will be returned. The first response will be a string of the list of sources (ex. `["source1.pdf", "source2.pdf"]`). The second response will be a string of the list of what's in the sources (ex. `["source 1 text blah blah", "source 2 text blah"]`. All subsequent responses is the stream for Gyro's response.)
   * @param authorization User's ID token. Always required.
   * @param conversationId UUID of the conversation to ask the message in.
   * @param requestBody
   * @returns string Stream created successfully.
   * @throws ApiError
   */
  public static postGyroConversationsMessagesStream(
    authorization: string,
    conversationId: string,
    requestBody?: SendMessage,
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/gyro/conversations/{conversation_id}/messages/stream/',
      path: {
        'conversation_id': conversationId,
      },
      headers: {
        'Authorization': authorization,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `User oauth credentials are incorrect.`,
        403: `User does not have a Gyro plan or is an institution.`,
        404: `Conversation does not exist.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Edit a message.
   * Deletes a message, and sends a new one. The stream SSE will be returned.
   * @param authorization User's ID token. Always required.
   * @param conversationId UUID of the conversation to ask the message in.
   * @param messageId UUID of the message to edit.
   * @param requestBody
   * @returns string Stream created successfully.
   * @throws ApiError
   */
  public static putGyroConversationsMessagesStream(
    authorization: string,
    conversationId: string,
    messageId: string,
    requestBody?: SendMessage,
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/gyro/conversations/{conversation_id}/messages/{message_id}/stream/',
      path: {
        'conversation_id': conversationId,
        'message_id': messageId,
      },
      headers: {
        'Authorization': authorization,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `User oauth credentials are incorrect.`,
        403: `User does not have a Gyro plan or is an institution.`,
        404: `Conversation does not exist.`,
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
  public static postGyroUserPlanVerify(
    authorization: string,
    paymentToken: string,
    requestBody?: VerifySet,
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/gyro/user/plan/verify/',
      headers: {
        'Authorization': authorization,
        'Payment-Token': paymentToken,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `User oauth credentials are incorrect.`,
        403: `User has incorrect permissions (i.e. institution account type) or an invalid payment token.`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Get-to-know-you chat.
   * Sends a message to the get-to-know-you bot. The stream SSE will be returned. Gyro will first ask the user something, so you should send an empty message first to get the streamed response. When a blank message is sent and it is at least a day later than the last get-to-know-you session, a new get-to-know-you conversation will occur.
   * @param authorization User's ID token. Always required.
   * @param requestBody
   * @returns string Stream created successfully.
   * @throws ApiError
   */
  public static postGyroGtkyChatStream(
    authorization: string,
    requestBody?: GetToKnowYouMsg,
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/gyro/gtky/chat/stream/',
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
   * Get get-to-know-you chat.
   * Get a list of messages for a user for the get-to-know-you chat. This is used to populate the message list on the frontend and allow users to see what messages are in a conversation.
   * @param authorization User's ID token. Always required.
   * @returns ListGtkyMessages List of messages
   * @throws ApiError
   */
  public static getGyroGtkyChat(
    authorization: string,
  ): CancelablePromise<ListGtkyMessages> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/gyro/gtky/chat/',
      headers: {
        'Authorization': authorization,
      },
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `User oauth credentials are incorrect.`,
        403: `User does not have appropriate credentials (i.e. institution).`,
        500: `Internal server error.`,
      },
    });
  }

  /**
   * Get the get-to-know-you chat completion status.
   * Get the status of the get-to-know-you chat for a user. If false, you are not allowed to use Gyro. If true, the GTKY has finished, so you can use the other non-summary endpoints.
   * @param authorization User's ID token. Always required.
   * @returns GtkyStatus GTKY status
   * @throws ApiError
   */
  public static getGyroGtkyChatDone(
    authorization: string,
  ): CancelablePromise<GtkyStatus> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/gyro/gtky/chat/done/',
      headers: {
        'Authorization': authorization,
      },
      errors: {
        400: `Missing a passed parameter or body variable.`,
        401: `User oauth credentials are incorrect.`,
        403: `User does not have appropriate credentials (i.e. is institution).`,
        500: `Internal server error.`,
      },
    });
  }

}
