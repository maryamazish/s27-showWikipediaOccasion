import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GenerateDate = () => {
  const formatDate = "MM-DD";
  //استیت روز بعد
  const [next, setNext] = useState(1);
  //استیت روز قبل
  const [before, setBefore] = useState(1);
  //ری دایرکت کردن
  const navigate = useNavigate();

  const onNext = () => {
    setNext(next + 1);
    navigate("/" + dayjs().add(next, "day").format(formatDate));
  };

  const onBefore = () => {
    setBefore(before + 1);
    navigate("/" + dayjs().subtract(before, "day").format(formatDate));
  };

  const goToHome = () => {
    navigate("/");
    //navigate("/" + dayjs().format(formatDate));
  };

  return (
    <div className="center button-wrapper">
      <button onClick={onBefore}>before day</button>
      <button onClick={goToHome}>Home</button>
      <button onClick={onNext}>next day</button>
    </div>
  );
};
export default GenerateDate;
