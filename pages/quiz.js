/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import QuizBackground from '../src/components/QuizBackground';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';

const LoadingWidget = () => (
  <Widget>
    <Widget.Header>
      Loading...
    </Widget.Header>
    <Widget.Content>
      [Loading Challenge]
    </Widget.Content>
  </Widget>
);

const submitForm = (event, handleSubmitQuestion) => {
  event.preventDefault();
  handleSubmitQuestion();
};

const QuestionWidget = ({
  question, totalQuestions, questionIndex, onSubmit,
}) => {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <h3>Question {questionIndex + 1} of {totalQuestions}</h3>
      </Widget.Header>
      <img
        alt="Description"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <form onSubmit={(event) => submitForm(event, onSubmit)}>
          {question.alternatives.map((alt, index) => (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <Widget.Topic
              key={`topic_${index}`}
              as="label"
            >
              <input
                id={`alt_${index}`}
                name={questionId}
                type="radio"
              />
              {alt}

            </Widget.Topic>
          ))}
          <Button
            type="submit"
          >
            Confirm
          </Button>
        </form>

      </Widget.Content>
    </Widget>
  );
};

const SCREEN_STATES = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

// eslint-disable-next-line react/prop-types
export default function QuizPage() {
  const {
    query: { name },
  } = useRouter();

  const [screenState, setScreenState] = useState(SCREEN_STATES.LOADING);
  const totalQuestions = db.questions.length;
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = db.questions[questionIndex];

  useEffect(() => {
    setTimeout(() => {
      setScreenState(SCREEN_STATES.QUIZ);
    }, 1 * 1000);
  }, []);

  const handleSubmitQuestion = () => {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setScreenState(SCREEN_STATES.RESULT);
    }
  };
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === SCREEN_STATES.QUIZ && (
        <QuestionWidget
          question={question}
          totalQuestions={totalQuestions}
          questionIndex={questionIndex}
          onSubmit={handleSubmitQuestion}
        />
        )}
        {screenState === SCREEN_STATES.LOADING && <LoadingWidget />}

        {screenState === SCREEN_STATES.RESULT && <div>Congrats {name}!</div>}
      </QuizContainer>
    </QuizBackground>
  );
}

// TODO: Add propTypes and remove this from file /* eslint-disable react/prop-types */
// QuestionWidget.propTypes = {
//   question: PropTypes.isRequired.shape({
//     image: PropTypes.string,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     answer: PropTypes.number,
//     alternatives: PropTypes.array,
//   }),
// };
