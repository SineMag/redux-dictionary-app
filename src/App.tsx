import "./App.css";
import { WordSearch } from "./components/WordSearch";
import { DefinitionDisplay } from "./components/DefinitionDisplay";

function App() {
  return (
    <>
      <div className="container">
        <h1>Dictionary</h1>
        <WordSearch />
        
        <DefinitionDisplay />
      </div>
    </>
  );
}

export default App;
