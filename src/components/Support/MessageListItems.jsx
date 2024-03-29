import { FlatList } from 'react-native';
import React from 'react';
import Chat from './Chat';

const MessageListItems = ({ messageList }) => {
  return (
    <FlatList
      data={messageList}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Chat key={item.id} item={item} />}
    />
  );
};

export default MessageListItems;
