import "./App.css";
import { getCategories,getQuestionsByCategories } from "./services/quizService";
import { useState, useEffect } from "react";
import Main from "./components/Main";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Card, Image } from "react-bootstrap";

function App() {
  const [categories, setCategories] = useState(null);
  const [questions, setQuestions] = useState(null);
  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.trivia_categories);
    });
  }, [setCategories]);

  return (
    <>
      <Card className="main-card">
        <Image src="images/ideas.png" className="main-icon"/>
        <h2>Quiz</h2>
        <Main categories={categories}/>
      </Card>
    </>
  );
}

export default App;
