import { cache, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Spinner from "../general/spinner";
import Card from "../general/card";

const ShowOccasion = ({ month, day }) => {
  const [holidays, setHolidays] = useState([]);
  const [births, setBirths] = useState([]);
  const [deaths, setDeaths] = useState([]);

  const [state, setState] = useState("Idle");

  const getData = async () => {
    try {
      setState("pending");
      setHolidays([]);
      setBirths([]);
      setDeaths([]);
      const [responseHolidays, responseBirths, responseDeaths] =
        await Promise.all([
          fetch(
            `https://en.wikipedia.org/api/rest_v1/feed/onthisday/holidays/${month}/${day}`
          ),
          fetch(
            `https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/${month}/${day}`
          ),
          fetch(
            `https://en.wikipedia.org/api/rest_v1/feed/onthisday/deaths/${month}/${day}`
          ),
        ]);

      // if (!responseHolidays.ok || !responseBirths.ok || !responseDeaths.ok) {
      //   throw new Error(
      //     `HTTP error! status: ${responseHolidays.status} ${responseBirths.status} ${responseDeaths.status}`
      //   );
      // }

      const [resultHolidays, resultBirths, resultDeaths] = await Promise.all([
        responseHolidays.json(),
        responseBirths.json(),
        responseDeaths.json(),
      ]);

      setHolidays(resultHolidays.holidays);
      setBirths(resultBirths.births);
      setDeaths(resultDeaths.deaths);

      setState("finish");
    } catch (error) {
      console.log("error.message :", error.message);
      setState("error");
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      getData();
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [month, day]);

  return (
    <>
      {state === "pending" && (
        <Card variant="outline">
          <Spinner />
        </Card>
      )}
      {state === "error" && (
        <Card variant="outline">
          <strong>ERROR</strong>
        </Card>
      )}
      <div className="list-wrapper">
        <div className="ol-wrapper">
          <h2>holidays</h2>
          <ol>
            {holidays.map((holiday) => {
              return (
                <li key={nanoid()}>
                  <p>{holiday.text}</p>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="ol-wrapper">
          <h2>births</h2>
          <ol>
            {births.map((birth) => {
              return (
                <li key={nanoid()}>
                  <p>{birth.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="ol-wrapper">
          <h2>deaths</h2>
          <ol>
            {deaths.map((death) => {
              return (
                <li key={nanoid()}>
                  <p>{death.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
};
export default ShowOccasion;
