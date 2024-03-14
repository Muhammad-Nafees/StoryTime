import {FlatList} from 'react-native';
import React from 'react';
import Chat from './Chat';

const messages = [
  {
    id: 'KGNV83JNFG8',
    date: '02/10/2023',
    time: '6:00 AM',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pretium sem sit amet venenatis commodo. Nullam aliquam lacus nisl, varius luctus mauris hendrerit ut. Etiam eros lectus, commod.',
  },
  {
    id: 'KGNV83JNFG7',
    date: '03/10/2023',
    time: '7:00 AM',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pretium sem sit amet venenatis commodo. Nullam aliquam lacus nisl, varius luctus mauris hendrerit ut. Etiam eros lectus, commod.',
  },
];
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
