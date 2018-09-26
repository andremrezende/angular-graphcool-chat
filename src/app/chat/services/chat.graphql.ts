import gql from "graphql-tag";
import { Chat } from "../models/chat.model";

export interface AllChatsQuery {
    allChats: Chat[];
}

export const USER_CHATS_QUERY = gql`
query USerChatsQuery($userID: ID!){
  allChats(filter:{
	users_some:{
    id:$userID
  }    
  }
) {
    id
  	title
  	createdAt
  	isGroup
  	users(first: 1,
    filter:{
      id_not:$userID
    })  	{
    id
    name
    email
  }
  messages (last: 1){
    id
    text
    sender {
      id
      name
    }
  }
  }
}
`;