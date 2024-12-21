import "./App.css";
import Quiz from "./components/Quiz/Quiz";
import { QuizProvider } from "./Context/QuizContext";

const App = () => {
  return (
    <div className="app">
      <QuizProvider>
        <Quiz
          title="THE REACT QUIZ"
          showProgress={true}
          showPoints={true}
          navigation={true}
          summary="Congratulations! &nbsp;You have successfully completed THE REACT QUIZ."
        />
      </QuizProvider>
    </div>
  );
};

export default App;
