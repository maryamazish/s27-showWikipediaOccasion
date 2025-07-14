import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Header from "./components/layout/header";
import { useEffect } from "react";
import NotFound from "./components/pages/NotFound";
import Occasion from "./components/pages/Occasion";
import GenerateDate from "./components/layout/GenerateDate";

const App = () => {
  useEffect(() => {
    console.log("initial Render");
  }, []);
  return (
    <>
      <Header></Header>
      <GenerateDate />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:date" element={<Occasion />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
