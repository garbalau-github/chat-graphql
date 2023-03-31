import { useMessageStore } from '../store/store';

interface AddMessageProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  tryAgain: boolean;
  currentView: string;
  setCurrentView: (view: string) => void;
  loadOlderMessages: () => void;
}

export const AddMessage = ({
  handleSubmit,
  tryAgain,
  currentView,
  setCurrentView,
  loadOlderMessages,
}: AddMessageProps): JSX.Element => {
  // Accessing Zustand Store
  const message = useMessageStore((state) => state.message);
  const setMessage = useMessageStore((state) => state.setMessage);

  return (
    <div className='fixed bottom-0 w-[100%] flex justify-center py-7 bg-[#413543]'>
      <form className='flex flex-col items-start' onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='w-[500px] h-[100px] rounded-md resize-none p-5 focus:outline-none focus:bg-yellow-100 cursor-pointer mb-2 max-sm:w-[350px] max-xs:w-[100%]'
          placeholder='Share your thoughts...'
          required
          autoFocus
        ></textarea>
        <div className='flex'>
          {tryAgain ? (
            <button className='text-[black] bg-[palegreen] transition-all duration-[0.3s] m-[5px] px-2.5 py-[5px] rounded-[5px] font-sans cursor-pointer hover:bg-[#646cff] hover:text-[white]'>
              Send Again
            </button>
          ) : (
            <button
              className='text-[black] bg-[#F0EB8D] transition-all duration-[0.3s] m-[5px] px-2.5 py-[5px] rounded-[5px] font-sans cursor-pointer hover:bg-[#646cff] hover:text-[white]'
              type='submit'
            >
              Send
            </button>
          )}
          <span
            className={`${
              currentView === 'old' && 'blur-[3px] pointer-events-none'
            }  text-[#F0EB8D] transition-all duration-[0.3s] m-[5px] px-2.5 py-[5px] rounded-[5px] font-sans cursor-pointer hover:bg-[#646cff] hover:text-[white]`}
            onClick={loadOlderMessages}
          >
            Load Older
          </span>
          {currentView === 'old' && (
            <span
              className=' text-[#F0EB8D] transition-all duration-[0.3s] m-[5px] px-2.5 py-[5px] rounded-[5px] font-sans cursor-pointer hover:bg-[#646cff] hover:text-[white]'
              onClick={() => setCurrentView('latest')}
            >
              Back To Latest
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
