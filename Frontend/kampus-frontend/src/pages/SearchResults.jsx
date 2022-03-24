import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PersonInfo } from "../components/PersonInfo";
import moment from "moment";

const SearchResults = ({ results, setResults }) => {
  return (
    <div>
      <Header results={results} setResults={setResults} />
      <Sidebar />
      <div className="homepage-container">
        <div className="post-placeholder">
          {results.length === 0 ? (
            <h1 className="searchresults__notfound">No posts found :(</h1>
          ) : (
            results.map((data, key) => (
              <Container className="post" key={key}>
                <Container className="questionSection">
                  <PersonInfo
                    userName={data.askedBy}
                    followButton={true}
                    date={moment(data.createdAt).format("Do MMMM YYYY")}
                    userProfile={data.userProfile}
                    userId={data.userId}
                  />
                  <Link to={`/post/${data._id}`}>
                    <h3 className="question-title">{data.title}</h3>
                  </Link>

                  <p
                    dangerouslySetInnerHTML={{
                      __html: data.body,
                    }}
                    className="question-body"
                  ></p>
                </Container>
                <hr className="lineBreak" />
              </Container>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
