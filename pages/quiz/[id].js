import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';
import db from '../../db.json';

const OtherQuiz = ({ externalDb }) => (
  <ThemeProvider theme={externalDb.theme}>
    <QuizScreen
      questions={externalDb.questions}
      bg={externalDb.bg}
    />
  </ThemeProvider>

);

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const externalDb = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => {
      console.error(err);
      return db;
    });
  return {
    props: {
      externalDb,
    }, // will be passed to the page component as props
  };
}

export default OtherQuiz;
