import { Container, Row, Col, Card } from "react-bootstrap";
import "./App.css";
import { getCategories,getQuestionsByCategories } from "./services/quizService";
import { useState, useEffect } from "react";

function App() {
  const [questions, setQuestions] = useState(null);
  useEffect(() => {
    getQuestionsByCategories(9,'easy').then((res) => {
      setQuestions(res.result);
      console.log(res);
    });
  }, [setQuestions]);

  return (
    <Container fluid bg="danger">
      <Row>
        <Col>
          <Card body color="light-blue">
            {questions &&
              questions.map((question,index) => (
                <question value={index} key={index}>
                  {question.question}
                </question>
              ))}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
