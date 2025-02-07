'use client';

import styled from 'styled-components';
import { useState } from 'react';
import TextInput from '@/components/TextInput';
import { useCompletion } from 'ai/react';

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

const ErrorText = styled.div`
  color: red;
  margin-top: 1rem;
`;

const LoadingText = styled.div`
  margin-top: 1rem;
`;

export default function Home() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const { completion, complete, isLoading } = useCompletion({
    api: '/api/enhance',
    onError: (error) => {
      console.error('Completion error:', error);
      setError('Failed to enhance text. Please try again.');
    }
  });

  const handleCorrection = async () => {
    try {
      setError('');
      await complete(input);
    } catch (error) {
      console.error('Completion error:', error);
      setError('Failed to enhance text. Please try again.');
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
      {error && <ErrorText>{error}</ErrorText>}
      {isLoading && <LoadingText>Loading...</LoadingText>}
      {completion && (
        <EnhancedTextWrapper>
          <h2>Wow! Your text looks so much better now!</h2>
          <p>{completion}</p>
        </EnhancedTextWrapper>
      )}
    </Main>
  );
}