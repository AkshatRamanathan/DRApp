import RenderService from "./services/RenderService";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import NavBar from "./components/NavBar";
import Dashboard from "./routes/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <RenderService>
        <header>
          <NavBar />
        </header>
        <main>
          <br />
          <div className="d-flex justify-content-center">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </main >
      </RenderService >
    </BrowserRouter>
  )
}

export default App
