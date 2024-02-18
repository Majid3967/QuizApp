import React, { useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { useEffect } from "react";

function Question(props) {
  const { questions, retry } = props;
  const parser = new DOMParser();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    questions.forEach((q) => {
      q.question = parser.parseFromString(
        q.question,
        "text/html"
      ).body.textContent;
    });

    let answerList = questions[questionIndex].incorrect_answers.concat(
      questions[questionIndex].correct_answer
    );

    answerList.forEach((a) => {
      a = parser.parseFromString(a, "text/html").body.textContent;
    });
    setAnswers(answerList);
  }, [setAnswers]);

  const nextQuestion = (event) => {
    event.preventDefault();

    if(selectedAnswer.length == 0){
      return;
    }

    if (selectedAnswer == questions[questionIndex].correct_answer) {
      setScore(score + 1);
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer("");

      let answerList = questions[questionIndex + 1].incorrect_answers.concat(
        questions[questionIndex + 1].correct_answer
      );
      answerList.forEach((a) => {
        a = parser.parseFromString(a, "text/html").body.textContent;
      });
      setAnswers(answerList);
    }
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const showResult = (event) => {
    event.preventDefault();

    if (selectedAnswer == questions[questionIndex].correct_answer) {
      setScore(score + 1);
    }
    setResult(true);
  };

  const handleRetry = () => {
    retry();
  };

  return (
    <Container fluid className="main-card-container">
      {!result && (
        <Form onSubmit={nextQuestion} className="question-form">
          <Form.Group controlId="formMultipleChoiceQuestion">
            <Form.Label>{questions[questionIndex].question}</Form.Label>
            {answers.map((answer, index) => (
              <Form.Check
                key={index}
                type="radio"
                id={`choice-${index}`}
                label={answer}
                value={answer}
                checked={selectedAnswer === answer}
                onChange={handleAnswerChange}
              />
            ))}
          </Form.Group>
          {questionIndex < questions.length - 1 && (
            <Row>
              <Col className="custom-button">
                <Button variant="dark" type="submit" onClick={nextQuestion}>
                  Next
                </Button>
              </Col>
            </Row>
          )}
          {questionIndex == questions.length - 1 && (
            <Row>
              <Col className="custom-button">
                <Button variant="dark" type="submit" onClick={showResult}>
                  Finish
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      )}
      {result && (
        <Container fluid>
          <Row className="question-score">Your Score: {score}</Row>
          <Row>
            <Col className="custom-button">
              <Button variant="dark" onClick={handleRetry}>
                Retry
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
}

export default Question;
