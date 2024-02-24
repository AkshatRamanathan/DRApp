import RenderService from "./services/RenderService";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import NavBar from "./components/NavBar";
import Dashboard from "./routes/Dashboard";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <RenderService>
          <BrowserRouter>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </RenderService>
      </main >
    </>
  )
}

export default App
