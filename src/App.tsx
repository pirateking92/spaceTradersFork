import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewGame from './components/NewGame';
import MyAgent from './components/MyAgent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewGame />} />
        <Route path="/myagent" element={<MyAgent />} />
      </Routes>
    </Router>
  );
}

export default App;
