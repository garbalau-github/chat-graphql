import { gql } from '@apollo/client';

export const queryLatestMessages = gql`
  query MessagesFetchLatest($channelId: ChannelId!) {
    MessagesFetchLatest(channelId: $channelId) {
      messageId
      text
      datetime
      userId
    }
  }
`;

export const queryMoreMessages = gql`
  query MessagesFetchMore(
    $channelId: ChannelId!
    $messageId: String!
    $old: Boolean!
  ) {
    MessagesFetchMore(channelId: $channelId, messageId: $messageId, old: $old) {
      messageId
      text
      datetime
      userId
    }
  }
`;

export const queryPostMessage = gql`
  mutation PostMessage($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      messageId
      text
      datetime
      userId
    }
  }
`;
