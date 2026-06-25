'use client';

import { type KeyboardEvent, useState } from 'react';

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
    if (isLoading) {
      return;
    }

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

  const handleQuestionKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    void handleAskClick();
  };

  return (
    <div className="faq-chat">
      <form className="faq-chat__form">
        <div className="faq-chat__field">
          <label className="faq-chat__label" htmlFor="explore-faq-question">
            Your question
          </label>
          <input
            className="faq-chat__input"
            id="explore-faq-question"
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={handleQuestionKeyDown}
          />
        </div>
        <button
          className="faq-chat__submit"
          type="button"
          onClick={handleAskClick}
          disabled={isLoading}
        >
          Ask
        </button>
        {errorMessage !== null ? (
          <p className="faq-chat__error">{errorMessage}</p>
        ) : null}
        {errorMessage === null && answer !== null && answer !== '' ? (
          <p className="faq-chat__answer">{answer}</p>
        ) : null}
        {errorMessage === null && sources.length > 0 ? (
          <div className="faq-chat__sources">
            <p>Sources</p>
            <ul>
              {sources.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </form>
    </div>
  );
};
