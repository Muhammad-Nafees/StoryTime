import {FlatList} from 'react-native';
import React from 'react';
import Chat from './Chat';

const MessageListItems = ({messageList}) => {
  console.log('🚀 ~ MessageListItems ~ messageList:', messageList);
  return (
    <FlatList
      data={messageList}
      keyExtractor={item => item.id}
      renderItem={({item}) => <Chat item={item} />}
    />
  );
};

export default MessageListItems;
