import { useState } from "react";
import RenderService from "./services/RenderService";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import NavBar from "./components/NavBar";

function App() {
  const [data, setData] = useState(0);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <RenderService>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </RenderService>
      </main>
    </>
  )
}

export default App


//       </RenderService><CardWrap />
