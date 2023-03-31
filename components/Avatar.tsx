interface AvatarProps {
  userId?: string;
  size?: string;
}

export const Avatar = ({
  userId,
  size = 'w-12 h-12',
}: AvatarProps): JSX.Element => {
  return (
    <div className='flex items-center flex-col mt-5 mb-5'>
      <img
        className={`${size} rounded-full mb-1`}
        src={`/users/${userId}.jpg`}
        alt={userId}
      />
      <span>{userId}</span>
    </div>
  );
};
