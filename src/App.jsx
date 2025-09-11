import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Packages from "./pages/Packages";
import AssignDriver from "./pages/AssignDriver";
import Tracking from "./pages/Tracking";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex flex-col flex-1">
          <Header />
          <main className="p-4 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/assign" element={<AssignDriver />} />
              <Route path="/tracking" element={<Tracking />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
