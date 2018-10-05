import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import gql from "graphql-tag";

export interface AllMessagesQuery {
    allMessages: Message[];
}

export const GET_CHAT_MESSAGES_QUERY = gql`
query GetChatMessagesQuery($chatId: ID!){
  allMessages (
    filter:{
      chat: {
        id: $chatId
      }
    },
    orderBy: createAt_ASC
  ){
    id
    text
    createAt
    sender {
      id
      name
      email
      createdAt
    }
    chat {
      id
    }
  }
}
`;

export const CREATE_MESSAGE_MUTATION = gql`
mutation CreateMessageMutation($text:String!, $chatId: ID!, $senderId:ID!) {
  createMessage (
    text: $text,
    chatId: $chatId,
    senderId: $senderId,
    createAt: "2015-11-22T13:57:31.123Z"
  ){
    id
    text
    createAt
    sender {
      id
      name
      email
      createdAt
    }
    chat {
      id
    }
  }
}
`;