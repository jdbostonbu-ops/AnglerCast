'use client';

import { useEffect, useState, type ReactElement } from 'react';

type CatchFeedProps = {
  waterType: string;
  fetchReports: (args: { waterType: string }) => Promise<unknown[]>;
};

export const CatchFeed = ({
  waterType,
  fetchReports,
}: CatchFeedProps): ReactElement => {
  const [reports, setReports] = useState<unknown[]>([]);

  useEffect(() => {
    const loadReports = (): void => {
      void fetchReports({ waterType }).then(setReports);
    };

    loadReports();

    const intervalId = window.setInterval(loadReports, 10000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [fetchReports, waterType]);

  return <div>{reports.length}</div>;
};
