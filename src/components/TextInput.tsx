'use client'

import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 160px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  }
`

const SubmitButton = styled.button`
    background-color: #EE7C5E;
    color: #FEF8ED;
    border: none;
    padding: 0.7rem 1.5rem;
    font-size: 1.2rem;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #D66D53;
    }
`

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function TextInput({ value, onChange, onSubmit }: TextInputProps) {
  return (
    <Container>
      <StyledTextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your text here..."
      />
      <SubmitButton onClick={onSubmit}>
        Enhance Text
      </SubmitButton>
    </Container>
  )
}