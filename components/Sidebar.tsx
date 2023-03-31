import Select from 'react-select';
import { ChannelType, UserType } from '../types';
import { users, channels } from '../config';
import { Avatar } from './Avatar';

interface SidebarProps {
  activeUser: UserType | null;
  setActiveUser: (user: UserType | null) => void;
  activeChannel: ChannelType | null;
  setActiveChannel: (channel: ChannelType | null) => void;
}

export const Sidebar = ({
  activeUser,
  setActiveUser,
  activeChannel,
  setActiveChannel,
}: SidebarProps): JSX.Element => {
  return (
    <div className='grow max-w-[25%] bg-[#2D2727] text-[#fff] p-5 max-lg:flex-col max-lg:max-w-none max-lg:p-4 max-lg:grow-0'>
      <h2 className='text-xl mb-10 max-lg:hidden'>Clean at 00:00 UTC</h2>
      <div className='bg-[#F0EB8D] h-1 max-lg:hidden' />
      <div className='max-lg:flex max-lg:items-center max-lg:justify-center max-lg:gap-4'>
        <div className='mt-10 mb-5 max-lg:mt-0 max-lg:mb-0'>
          <span className='block mb-1'>Select User</span>
          <Select
            className='text-black'
            defaultValue={activeUser}
            options={users}
            onChange={(user: UserType | null) => {
              setActiveUser(user);
            }}
          />
        </div>
        <div className='mb-20 max-lg:mt-0 max-lg:mb-0'>
          <span className='block mb-1'>Select Channel</span>
          <Select
            className='text-black'
            defaultValue={activeChannel}
            options={channels}
            onChange={(channel: ChannelType | null) => {
              setActiveChannel(channel);
            }}
          />
        </div>
      </div>

      <div className='max-lg:hidden'>
        <Avatar size='w-40 h-40' userId={activeUser?.label} />
      </div>
    </div>
  );
};
