import React, { useState } from 'react'
import { Container, Row,Col,Button } from "react-bootstrap";
import { useEffect } from "react";

function Question(props) {
  const {questions} = props;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers,setAnswers] = useState([]);

  useEffect(() => {
    const parser = new DOMParser();

    questions.forEach(q => {
        q.question = parser.parseFromString(q.question,'text/html').body.textContent;
    });

    let answerList = questions[questionIndex].incorrect_answers.concat(questions[questionIndex].correct_answer);
    setAnswers(answerList);
  }, [setAnswers]);

  const nextQuestion = () =>{

    if(questionIndex < questions.length-1){
        setQuestionIndex(questionIndex+1);

        let answerList = questions[questionIndex].incorrect_answers.concat(questions[questionIndex].correct_answer);
        setAnswers(answerList);
    }
  }

  const showResult = () =>{

  }

  return (
    <Container fluid className='main-card-container'>
        <Row>
            <p>{questions[questionIndex].question}</p>
        </Row>
        <Row>
        {answers &&
                answers.map((answer,index) => {
                  return (
                    <p key={index}>
                      {answer}
                    </p>
                  );
                })}
        </Row>
        <Row>
        <Col className='custom-button'>
            {questionIndex < questions.length-1 && <Button variant="dark" onClick={nextQuestion}>Next</Button>}
            {questionIndex > questions.length-1 && <Button variant="dark" onClick={showResult}>Finish</Button>}
          </Col>
        </Row>
    </Container>
  )
}

export default Question