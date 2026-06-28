'use client';

import { type FormEvent, useState } from 'react';
import { Spinner } from '@/components/Spinner';

type SaltwaterChatResponse = {
  response?: string;
};

export const SaltwaterChat = () => {
  const [question, setQuestion] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    const response = await fetch('/api/saltwater-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = (await response.json()) as SaltwaterChatResponse;

    setResponseText(data.response ?? '');
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="saltwater-chat-question">Question</label>
      <input
        id="saltwater-chat-question"
        name="question"
        type="text"
        value={question}
        onChange={(event) => setQuestion(event.currentTarget.value)}
      />
      <button type="submit" disabled={isLoading}>
        Submit
      </button>
      {isLoading ? (
        <span role="status">
          <Spinner />
        </span>
      ) : null}
      {responseText !== '' ? <p>{responseText}</p> : null}
    </form>
  );
};
