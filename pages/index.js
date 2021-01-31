import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  const formSubmit = (event) => {
    event.preventDefault();
    router.push(`/quiz?name=${name}`);
  };

  const onChange = (event) => {
    setName(event.target.value);
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>AluraQuiz</title>
      </Head>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>What is Lorem Ipsum?</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={formSubmit}>
              <Input name="username" placeholder="Enter your name" onChange={onChange} value={name} />
              <Button type="submit" disabled={name.length === 0}>
                Jogar {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>Why do we use it?</h1>
          </Widget.Header>
          <Widget.Content>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/PedroXavier14/nextjs-quiz" />
    </QuizBackground>
  );
}
