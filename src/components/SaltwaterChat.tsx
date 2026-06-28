'use client';

import { type FormEvent, useState } from 'react';
import { Spinner } from '@/components/Spinner';

type SaltwaterChatResponse = {
  response?: string;
};

type ChatHistoryMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export const SaltwaterChat = () => {
  const [question, setQuestion] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ChatHistoryMessage[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/saltwater-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history }),
      });

      if (!response.ok) {
        setErrorMessage('Something went wrong. Please try again.');
        return;
      }

      const data = (await response.json()) as SaltwaterChatResponse;
      const nextResponseText = data.response ?? '';

      setResponseText(nextResponseText);
      setHistory((currentHistory) => [
        ...currentHistory,
        { role: 'user', content: question },
        { role: 'assistant', content: nextResponseText },
      ]);
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
      {errorMessage !== '' ? <p>{errorMessage}</p> : null}
    </form>
  );
};
