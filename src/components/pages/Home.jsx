import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Occasion from "./Occasion";
import ShowOccasion from "./ShowOccasion";

const Home = () => {
    const formatDate = "MM-DD"

  const today = dayjs().format(formatDate)
  let seprateDate = today.split("-");
  return (
    <>
      <ShowOccasion month= {seprateDate[0]} day={seprateDate[1]} />
    </>
  );
};
export default Home;
