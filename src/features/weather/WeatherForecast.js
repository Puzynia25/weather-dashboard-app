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
            month: "short",
        });
    };
    return (
        <div className="row justify-content-between gap-3 my-5 p-2 bg-darker">
            {forecastInfo?.list?.map((day, index) => {
                if (getTime(day.dt) === "12:00") {
                    return (
                        <div className="col-12 col-sm p-2 p-sm-4 p-md-2 border-bottom" key={day.dt}>
                            <div className="row">
                                <div className="col-4 col-md-12">
                                    <div className="fw-bold">{getWeekday(day.dt)}</div>
                                    <div className="opacity-75 fw-light">{getDayMonth(day.dt)}</div>
                                </div>
                                <div className="col-8 col-md-12 row align-items-center d-md-block gap-3">
                                    <div className="col">
                                        <div className="mt-md-2">
                                            min: <span className="fw-bold">{getCelsius(day.main.temp_min)} °C</span>
                                        </div>
                                        <div>
                                            max: <span className="fw-bold">{getCelsius(day.main.temp_max)} °C</span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <WeatherIcon
                                            iconId={day?.weather?.[0]?.id || 800}
                                            name="owm"
                                            className="mx-2 mx-sm-4 mx-md-0 my-md-3 forecast-icon"
                                        />
                                        <div className="fst-italic">{day?.weather?.[0].description}</div>
                                    </div>
                                </div>
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
