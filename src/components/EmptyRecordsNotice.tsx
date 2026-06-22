type EmptyRecordsNoticeProps = {
  totalCount: number;
};

export const EmptyRecordsNotice = ({
  totalCount,
}: EmptyRecordsNoticeProps) => {
  if (totalCount > 0) {
    return null;
  }

  return <p>No records found near these coordinates.</p>;
};
