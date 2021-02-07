import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Link from '../src/components/Link';

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
        <QuizLogo />
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
          transition={{ delay: 0, duration: 0.5 }}
        >
          <Widget.Header>
            <h1>What is your name?</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={formSubmit}>
              <Input name="username" placeholder="Enter your name" onChange={onChange} value={name} />
              <Button type="submit" disabled={name.length === 0}>
                Play {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Widget.Header>
            <h1>Other people Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <ul>
              {db.external.map((link) => {
                const [projectName, githubUser] = link.replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');
                return (
                  <li key={link}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
          transition={{ delay: 1, duration: 1 }}
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/PedroXavier14/nextjs-quiz" />
    </QuizBackground>
  );
}
