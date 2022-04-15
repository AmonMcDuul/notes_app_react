import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import NotesPage from "./pages/NotesPage";
import Note from "./pages/Note";

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Route path="/" exact component={NotesPage} />
          <Route path="/note/:id" component={Note} />
        </div>
      </div>
    </Router>
  );
}

export default App;
