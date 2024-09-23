import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewGame from "./components/StartPage";
import MyAgent from "./components/MyAgent";
import ViewLocation from "./components/ViewLocation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewGame />} />
        <Route path="/myagent" element={<MyAgent />} />
        <Route path="/viewlocation" element={<ViewLocation />} />
      </Routes>
    </Router>
  );
}

export default App;
