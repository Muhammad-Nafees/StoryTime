import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import Message from './Messages';
import {getChats} from '../../../services/api/support';

const MessageList = () => {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    console.log('🚀 ~ MessageList ~ messages:', messages);
    const fetchMessages = async () => {
      try {
        const response = await getChats();
        const data = response.data.supportChats;
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);
  return (
    <>
      {!messages.length ? (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="#395E66" />
        </View>
      ) : (
        <FlatList
          data={messages}
          key={item => item.id}
          contentContainerStyle={{paddingBottom: 50}}
          renderItem={({item}) => <Message item={item} />}
        />
      )}
    </>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
