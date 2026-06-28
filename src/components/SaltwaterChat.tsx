'use client';

import { type FormEvent, useState } from 'react';
import { Spinner } from '@/components/Spinner';

type ChatHistoryMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type SaltwaterChatResponse = {
  response?: string;
};

export const SaltwaterChat = () => {
  const [question, setQuestion] = useState('');
  const [responseText, setResponseText] = useState('');
  const [history, setHistory] = useState<ChatHistoryMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuestion('');
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
    <div style={{ maxWidth: '1100px' }}>
      <div
        style={{
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          height: '480px',
          overflowY: 'auto',
          padding: '12px',
          borderRadius: '12px',
          background: 'rgba(0,0,0,0.15)',
        }}
      >
        {history.length === 0 ? (
          <p
            style={{
              color: '#9aa4b2',
              fontSize: '1.05rem',
              textAlign: 'center',
              margin: 'auto',
              padding: '0 24px',
            }}
          >
            Ask the agent about saltwater fishing conditions, species, or trips.
          </p>
        ) : (
          history.map((message, index) => (
            <div
              key={index}
              style={{
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                padding: '12px 16px',
                borderRadius: '14px',
                background: message.role === 'user' ? '#e7c873' : '#1f3553',
                color: message.role === 'user' ? '#1a1a1a' : '#ffffff',
                fontSize: '1.1rem',
                lineHeight: 1.55,
                whiteSpace: 'pre-wrap',
              }}
            >
              {message.content}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="saltwater-chat-question"
          style={{
            display: 'block',
            fontSize: '1.15rem',
            fontWeight: 600,
            marginBottom: '8px',
          }}
        >
          Question
        </label>
        <input
          id="saltwater-chat-question"
          name="question"
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.currentTarget.value)}
          disabled={isLoading}
          style={{
            width: '100%',
            fontSize: '1.15rem',
            padding: '14px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '12px',
            boxSizing: 'border-box',
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            fontSize: '1.1rem',
            padding: '10px 24px',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          Submit
        </button>
        {isLoading ? (
          <span role="status" style={{ marginLeft: '12px' }}>
            <Spinner />
          </span>
        ) : null}
        {errorMessage !== '' ? (
          <p style={{ fontSize: '1.1rem', marginTop: '16px', color: '#ff6b6b' }}>
            {errorMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
};
