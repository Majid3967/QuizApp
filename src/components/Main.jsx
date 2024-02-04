import React from 'react'
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";


export default function Main(props) {

const {categories} = props;

const diffcultyLevel = [{id:0,name:'Easy'},{id:1,name:'Medium'},{id:2,name:'Hard'}];

const [questionCategory, setQuestionCategory] = useState(0);
const [difficulty, setDifficulty] = useState('Easy');

const handleDifficultyChange = (event) => {
    console.log(event.target.value)
    setDifficulty(event.target.value);
}

const handleCategoryChange = (event) => {
    console.log(event.target.value);
    setQuestionCategory(event.target.value);
}

  return (
      <Container fluid className='main-card-container'>
        <Row>
          <Col>
            <Form.Select
              aria-label="Select Category"
              value={questionCategory}
              onChange={handleCategoryChange}
            >
              {categories &&
                categories.map((category) => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  );
                })}
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Select
              aria-label="Select Difficulty"
              value={difficulty}
              onChange={handleDifficultyChange}
            >
              {diffcultyLevel &&
                diffcultyLevel.map((level) => {
                  return (
                    <option value={level.name} key={level.id}>
                      {level.name}
                    </option>
                  );
                })}
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col className='custom-button'>
            <Button variant="dark">Start</Button>
          </Col>
        </Row>
      </Container>
  );
}
