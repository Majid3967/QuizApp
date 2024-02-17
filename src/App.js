import "./App.css";
import { getCategories,getQuestionsByCategories } from "./services/quizService";
import { useState, useEffect } from "react";
import Main from "./components/Main";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Card, Image } from "react-bootstrap";
import Question from "./components/Question";

function App() {
  const [categories, setCategories] = useState(null);
  const [questions, setQuestions] = useState(null);
  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.trivia_categories);
    });
  }, [setCategories]);

  const getQuestions = (questionCategory,difficulty) => {

    getQuestionsByCategories(questionCategory,difficulty).then((res) => {
      console.log(res.results)
      setQuestions(res.results);
    });
  }

  

  return (
    <>
      <Card className="main-card">
        <Image src="images/ideas.png" className="main-icon"/>
        <h2>Quiz</h2>
        {!questions && categories && <Main categories={categories} getQuestions={getQuestions}/>}
        {questions && <Question questions={questions}/>}
        
      </Card>
    </>
  );
}

export default App;
