import { useParams } from "react-router-dom";
import ShowOccasion from "./ShowOccasion";

const Occasion = () => {
  const params = useParams()?.date && useParams().date ;
  let seprateDate = params && params.split("-");

  return (
    <>
      <ShowOccasion month={seprateDate[0]} day={seprateDate[1]} />
    </>
  );
};
export default Occasion;
