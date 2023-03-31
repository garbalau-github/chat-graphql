import { convertData } from '../utils/convertData';
import { Avatar } from './Avatar';

interface MessageProps {
  messageId: string;
  text: string;
  datetime: string;
  userId: string;
  isCurrentUser: boolean;
}

export const Message = ({
  messageId,
  text,
  datetime,
  userId,
  isCurrentUser,
}: MessageProps): JSX.Element => {
  if (isCurrentUser) {
    return (
      <div key={messageId} className='flex items-center justify-end'>
        <div className='m-0 px-[15px] py-[5px] rounded-[10px] bg-white mr-3 mb-3 max-w-md'>
          <p>{text}</p>
          <span className='text-xs'>{convertData(datetime)}</span>
        </div>
        <Avatar userId={userId} />
      </div>
    );
  }
  return (
    <div key={messageId} className='flex items-center justify-start'>
      <Avatar userId={userId} />
      <div className='m-0 px-[15px] py-[5px] rounded-[10px] bg-white ml-3 mb-3 max-w-md'>
        <p>{text}</p>
        <span className='text-xs'>{convertData(datetime)}</span>
      </div>
    </div>
  );
};
