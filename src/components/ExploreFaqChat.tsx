'use client';

import { useState } from 'react';

type ExploreChatResponse = {
  answer: string;
  sources: string[];
};

export const ExploreFaqChat = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAskClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/explore-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error('Explore chat request failed.');
      }

      const data = (await response.json()) as ExploreChatResponse;

      setAnswer(data.answer);
      setSources(data.sources);
      setErrorMessage(null);
    } catch {
      setAnswer(null);
      setSources([]);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form>
      <label htmlFor="explore-faq-question">Your question</label>
      <input
        id="explore-faq-question"
        type="text"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
      />
      <button type="button" onClick={handleAskClick} disabled={isLoading}>
        Ask
      </button>
      {errorMessage !== null ? <p>{errorMessage}</p> : null}
      {errorMessage === null && answer !== null && answer !== '' ? (
        <p>{answer}</p>
      ) : null}
      {errorMessage === null && sources.length > 0 ? (
        <div>
          <p>Sources</p>
          <ul>
            {sources.map((title) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </form>
  );
};
