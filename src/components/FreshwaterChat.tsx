'use client';

import { type FormEvent, useState } from 'react';

type FreshwaterChatResponse = {
  response?: string;
};

export const FreshwaterChat = () => {
  const [question, setQuestion] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/freshwater-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = (await response.json()) as FreshwaterChatResponse;

    setResponseText(data.response ?? '');
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
      <button type="submit">Submit</button>
      {responseText !== '' ? <p>{responseText}</p> : null}
    </form>
  );
};
