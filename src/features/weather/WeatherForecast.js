import { WeatherIcon } from "weather-react-icons";
import { getCelsius, getTime } from "../../utils";

const WeatherForecast = ({ forecastInfo }) => {
    // Function to get the weekday name from a UNIX timestamp
    const getWeekday = (seconds) => {
        return new Date(seconds * 1000).toLocaleDateString("en-EN", {
            weekday: "long",
        });
    };

    // Function to get the day and month from a UNIX timestamp
    const getDayMonth = (seconds) => {
        return new Date(seconds * 1000).toLocaleDateString("en-EN", {
            day: "numeric",
            month: "long",
        });
    };
    return (
        <div className="d-flex justify-content-between gap-3 my-5 p-2 bg-darker">
            {forecastInfo?.list?.map((day, index) => {
                if (getTime(day.dt) === "12:00") {
                    return (
                        <div className="p-2" key={day.dt}>
                            <div className="fs-5 fw-bold">{getWeekday(day.dt)}</div>
                            <div>
                                <div className="opacity-75 fw-light">{getDayMonth(day.dt)}</div>
                                <div className="mt-2">
                                    min: <b>{getCelsius(day.main.temp_min)} °C</b>
                                </div>
                                <div>
                                    max: <b>{getCelsius(day.main.temp_max)} °C</b>
                                </div>
                                <WeatherIcon
                                    iconId={day?.weather?.[0]?.id || 800}
                                    name="owm"
                                    className="my-3 display-6"
                                />
                                <div className="fst-italic">{day?.weather?.[0].description}</div>
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default WeatherForecast;
