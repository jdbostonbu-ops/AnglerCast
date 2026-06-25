export const formatRelativeTime = (date: Date | string, now: Date): string => {
  const timestamp = new Date(date);
  const differenceInSeconds = Math.floor(
    (now.getTime() - timestamp.getTime()) / 1000,
  );

  if (differenceInSeconds < 60) {
    return 'just now';
  }

  const differenceInMinutes = Math.floor(differenceInSeconds / 60);

  if (differenceInMinutes < 60) {
    const unit = differenceInMinutes === 1 ? 'minute' : 'minutes';

    return `${differenceInMinutes} ${unit} ago`;
  }

  const differenceInHours = Math.floor(differenceInMinutes / 60);

  if (differenceInHours < 24) {
    const unit = differenceInHours === 1 ? 'hour' : 'hours';

    return `${differenceInHours} ${unit} ago`;
  }

  const differenceInDays = Math.floor(differenceInHours / 24);
  const unit = differenceInDays === 1 ? 'day' : 'days';

  return `${differenceInDays} ${unit} ago`;
};
