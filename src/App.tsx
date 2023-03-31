import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useMessageStore } from '../store/store';
import { AddMessage } from '../components/AddMessage';
import { Sidebar } from '../components/Sidebar';
import { Chat } from '../components/Chat';
import { ChannelType, MessageType, UserType } from '../types';
import { users, channels } from '../config';
import { queryLatestMessages } from '../graphql';
import { queryMoreMessages } from '../graphql';
import { queryPostMessage } from '../graphql';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

export const App = () => {
  const [activeUser, setActiveUser] = useState<UserType | null>(users[0]);
  const [activeChannel, setActiveChannel] = useState<ChannelType | null>(
    channels[0]
  );
  const [tryAgain, setTryAgain] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [currentView, setCurrentView] = useState('latest');

  // Accessing Zustand Store
  const message = useMessageStore((state) => state.message);
  const setMessage = useMessageStore((state) => state.setMessage);
  const clearMessage = useMessageStore((state) => state.clearMessage);

  // GraphQL Queries
  const { data: latestMessages, loading } = useQuery(queryLatestMessages, {
    variables: { channelId: activeChannel?.value },
  });
  const [fetchMore] = useLazyQuery(queryMoreMessages);
  const [addPost, postResult] = useMutation(queryPostMessage);

  const updateMessages = () => {
    const data: MessageType = postResult?.data?.postMessage;
    if (data) {
      const newMessage = {
        ...data,
      };
      setMessages([...messages, newMessage]);
      setCurrentView('latest');
      setTryAgain(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = e.target as HTMLFormElement;
      const textarea = form.elements[0] as HTMLTextAreaElement;
      setMessage(textarea.value);
      await addPost({
        variables: {
          channelId: activeChannel?.value,
          text: message,
          userId: activeUser?.value,
        },
      });
      clearMessage();
    } catch (error) {
      toast.error('Server error, try again please!');
      setTryAgain(true);
    }
  };

  const loadOlderMessages = () => {
    fetchMore({
      variables: {
        channelId: activeChannel?.value,
        messageId: messages[messages.length - 1].messageId,
        old: true,
      },
    }).then((res) => {
      setMessages((prev) => [...res.data.MessagesFetchMore, ...prev]);
      setCurrentView('old');
    });
  };

  useEffect(() => {
    toast.success(`Active Channel is ${activeChannel?.label}`);
  }, [activeChannel]);

  useEffect(() => {
    toast.success(`Active User is ${activeUser?.label}`);
  }, [activeUser]);

  useEffect(() => {
    setMessages(latestMessages?.MessagesFetchLatest);
  }, [latestMessages]);

  useEffect(() => {
    if (postResult.data || postResult.error) {
      updateMessages();
    }
  }, [postResult.data, postResult.error]);

  return (
    <div className='w-[100%]'>
      <div className='fixed flex w-[100%] h-[100%] max-lg:flex-col'>
        <Sidebar
          activeUser={activeUser}
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
          setActiveUser={setActiveUser}
        />
        <Chat
          messages={messages}
          currentView={currentView}
          activeUser={activeUser}
          activeChannel={activeChannel}
          loading={loading}
        />
      </div>
      <AddMessage
        tryAgain={tryAgain}
        handleSubmit={handleSubmit}
        currentView={currentView}
        loadOlderMessages={loadOlderMessages}
        setCurrentView={setCurrentView}
      />
    </div>
  );
};
