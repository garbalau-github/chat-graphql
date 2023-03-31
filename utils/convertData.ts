export const convertData = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return `${hours}:${minutes}`;
};
