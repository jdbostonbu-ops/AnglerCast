'use client';

import { type FormEvent, useState } from 'react';
import { Spinner } from '@/components/Spinner';

type FreshwaterChatResponse = {
  response?: string;
};

type ChatHistoryMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export const FreshwaterChat = () => {
  const [question, setQuestion] = useState('');
  const [responseText, setResponseText] = useState('');
  const [history, setHistory] = useState<ChatHistoryMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch('/api/freshwater-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history }),
      });
      const data = (await response.json()) as FreshwaterChatResponse;
      const nextResponseText = data.response ?? '';

      setResponseText(nextResponseText);
      setHistory((currentHistory) => [
        ...currentHistory,
        { role: 'user', content: question },
        { role: 'assistant', content: nextResponseText },
      ]);
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
