import "./App.css";
import Reader from "./components/Reader/Reader";
import Toolbar from "./components/Toolbar/Toobar";

function App() {
  return (
    <div className="wrapper">
      <Toolbar />
      <Reader className={"reader"} />;
    </div>
  );
}

export default App;
