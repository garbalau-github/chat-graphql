export const Spinner = (): JSX.Element => {
  return (
    <div className='absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4'>
      <img
        className='w-[75px] h-[75px] object-cover'
        src='/diamond-spinner.gif'
        alt='Spinner'
      />
    </div>
  );
};
