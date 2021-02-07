/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import QuizBackground from '../../components/QuizBackground';
import Widget from '../../components/Widget';
import Button from '../../components/Button';
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import AlternativesForm from '../../components/AlternativesForm';
import BackLinkArrow from '../../components/BackLinkArrow';

const ResultWidget = ({ results, name }) => (
  <Widget>
    <Widget.Header>
      Results to {name}
    </Widget.Header>
    <Widget.Content>
      <p>You got {results.reduce((sum, res) => (res ? sum + 1 : sum), 0)} questions right
      </p>
      <ul>
        {
          results.map((result, index) => {
            const key = `result__${index}`;
            return (
              <li key={key}>
                #0{index + 1}: {result ? 'Correct answer' : 'Wrong asnwer'}
              </li>
            );
          })
        }

      </ul>
    </Widget.Content>
  </Widget>
);

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

const submitForm = (
  event,
  handleSubmitQuestion,
  setIsQuestionSubmited,
  setSelectedAlt,
) => {
  event.preventDefault();
  setIsQuestionSubmited(true);
  setTimeout(() => {
    handleSubmitQuestion();
    setIsQuestionSubmited(false);
    setSelectedAlt(undefined);
  }, 3 * 1000);
};

const QuestionWidget = ({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) => {
  const questionId = `question__${questionIndex}`;
  const [selectedAlt, setSelectedAlt] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const isCorrect = selectedAlt === question.answer;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
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
        <AlternativesForm onSubmit={(event) => {
          addResult(isCorrect);
          submitForm(event, onSubmit, setIsQuestionSubmited, setSelectedAlt, addResult);
        }}
        >
          {question.alternatives.map((alt, index) => {
            const altId = `alt__${index}`;
            const altStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlt === index;
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            return (
              <Widget.Topic
                key={altId}
                as="label"
                htmlFor={altId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && altStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={altId}
                  name={questionId}
                  onChange={() => setSelectedAlt(index)}
                  type="radio"
                />
                {alt}

              </Widget.Topic>
            );
          })}
          <Button
            type="submit"
            disabled={selectedAlt === undefined}
          >
            Confirm
          </Button>
          { isQuestionSubmited && isCorrect && <p>Correct answer!</p> }
          { isQuestionSubmited && !isCorrect && <p>Wrong answer!</p> }
        </AlternativesForm>

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
export default function QuizPage({ questions, bg }) {
  const {
    query: { name },
  } = useRouter();

  const [screenState, setScreenState] = useState(SCREEN_STATES.LOADING);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [results, setResults] = useState([]);
  const totalQuestions = questions.length;
  const question = questions[questionIndex];

  const addResult = (result) => {
    setResults([
      ...results,
      result,
    ]);
  };

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
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === SCREEN_STATES.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmitQuestion}
            addResult={addResult}
          />
        )}
        {screenState === SCREEN_STATES.LOADING && <LoadingWidget />}

        {screenState === SCREEN_STATES.RESULT && <ResultWidget results={results} name={name} />}
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
