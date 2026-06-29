'use client';

import { type FormEvent, useState } from 'react';
import { Spinner } from '@/components/Spinner';

type FreshwaterChatResponse = {
  response?: string;
};

export const FreshwaterChat = () => {
  const [question, setQuestion] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch('/api/freshwater-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = (await response.json()) as FreshwaterChatResponse;

      setResponseText(data.response ?? '');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="freshwater-chat-question">Question</label>
      <input
        id="freshwater-chat-question"
        name="question"
        type="text"
        value={question}
        onChange={(event) => setQuestion(event.currentTarget.value)}
      />
      <button type="submit" disabled={isLoading}>Submit</button>
      {isLoading ? (
        <span role="status">
          <Spinner />
        </span>
      ) : null}
      {responseText !== '' ? <p>{responseText}</p> : null}
    </form>
  );
};
