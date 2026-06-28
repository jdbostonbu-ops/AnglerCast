'use client';

import { type FormEvent, useState } from 'react';

type SaltwaterChatResponse = {
  response?: string;
};

export const SaltwaterChat = () => {
  const [question, setQuestion] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/saltwater-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = (await response.json()) as SaltwaterChatResponse;

    setResponseText(data.response ?? '');
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
      <button type="submit">Submit</button>
      {responseText !== '' ? <p>{responseText}</p> : null}
    </form>
  );
};
