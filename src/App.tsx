import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NewGame from "./components/StartPage";
import MyAgent from "./components/MyAgent";
import ViewLocation from "./components/ViewLocation";
import Navbar from "./components/Navbar";

function ConditionalNavbar() {
  const location = useLocation();
  console.log("Current path:", location.pathname);
  const showNavbar = ["/myagent", "/viewlocation"].includes(location.pathname);

  return showNavbar ? <Navbar /> : null;
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ConditionalNavbar />
        <main className="flex-grow main-content">
          <Routes>
            <Route path="/" element={<NewGame />} />
            <Route path="/myagent" element={<MyAgent />} />
            <Route path="/viewlocation" element={<ViewLocation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
