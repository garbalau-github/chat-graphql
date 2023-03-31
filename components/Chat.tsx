import { useEffect, useRef } from 'react';
import { generateRandomId } from '../utils/generateRandomId';
import { ChannelType, MessageType, UserType } from '../types';
import { Message } from './Message';
import { Spinner } from './Spinner';

interface ChatProps {
  messages: MessageType[];
  activeUser: UserType | null;
  activeChannel: ChannelType | null;
  currentView: string;
  loading: boolean;
}

export const Chat = ({
  messages,
  activeUser,
  activeChannel,
  currentView,
  loading,
}: ChatProps): JSX.Element => {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef?.current) {
      messagesRef?.current?.scrollIntoView({
        behavior: 'smooth',
        inline: 'end',
        block: currentView === 'latest' ? 'end' : 'start',
      });
    }
  }, [messages, currentView, activeChannel, activeUser]);

  return (
    <div className='max-h-[592px] overflow-y-auto bg-[linear-gradient(70deg,papayawhip,#b2a4ff)] text-[black] relative grow-[2] px-[30px]'>
      {loading ? (
        <Spinner />
      ) : (
        <div ref={messagesRef}>
          {messages &&
            messages.map((message: MessageType) => (
              <Message
                key={generateRandomId()}
                messageId={message.messageId}
                text={message.text}
                datetime={message.datetime}
                userId={message.userId}
                isCurrentUser={message.userId === activeUser?.value}
              />
            ))}
        </div>
      )}
    </div>
  );
};
