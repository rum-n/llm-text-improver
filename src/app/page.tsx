'use client';

import styled from 'styled-components';
import { useState } from 'react';
import TextInput from '@/components/TextInput';

const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
`;

const EnhancedTextWrapper = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 8px;
`;

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCorrection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      const data = await response.json();
      setResult(data.correctedText);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Main>
      <Title>The Magic Text Enhancer</Title>
      <TextInput
        value={input}
        onChange={setInput}
        onSubmit={handleCorrection}
      />
      {result && (
        <EnhancedTextWrapper>
          <h2>Wow! Your text looks so much better now!</h2>
          <p>{result}</p>
        </EnhancedTextWrapper>
      )}
    </Main>
  );
}