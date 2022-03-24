import { React } from "react";
import Sidebar from "../components/Sidebar";
import QuestionNAnswer from "../components/QuestionsNAnswer";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import Leaderboard from "../components/Leaderboard";

function Homepage({ results, setResults }) {
  const params = useParams();

  return (
    <div>
      <Header results={results} setResults={setResults} />
      <Sidebar />
      <div className="homepage-container">
        <div className="post-placeholder">
          {/*Posts go here*/}
          <QuestionNAnswer category={params.id} />
          {/* to be shifted inside QuestionNAnswer 
					<Comment />
					<Comment /> */}
        </div>
        <Leaderboard />
      </div>
    </div>
  );
}

export default Homepage;
