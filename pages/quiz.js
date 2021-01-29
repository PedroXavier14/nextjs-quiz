import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Content = styled.div`
  background-color: red;
`;

// eslint-disable-next-line react/prop-types
export default function QuizPage() {
  const {
    query: { name },
  } = useRouter();

  return (
    <Content>
      QuizPage {name}
    </Content>
  );
}
