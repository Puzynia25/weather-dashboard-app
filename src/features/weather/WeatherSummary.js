import { getCelsius, getPressureMm, getTime } from "../../utils";
import { WeatherIcon } from "weather-react-icons";
import geoIcon from "../../assets/img/geo-alt.svg";

const WeatherSummary = ({ weatherInfo }) => {
    const iconId = weatherInfo?.weather?.[0]?.id || 800;

    const timezone = weatherInfo?.timezone || "UTC";

    // Get today's date and time in a readable format
    const todayDate = new Date().toLocaleString("en-EN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
    });
    const todayTime = getTime(new Date() / 1000 + timezone);

    // Get sunrise and sunset times, adjusting for the timezone
    const sunriseTime = getTime(weatherInfo?.sys?.sunrise + timezone);
    const sunsetTime = getTime(weatherInfo?.sys?.sunset + timezone);

    return (
        <div className="flex-column flex-sm-row d-flex gap-3 gap-md-5 summary align-items-sm-end">
            <div>
                <WeatherIcon iconId={iconId} name="owm" className="display-1" />
                <div className="d-flex mt-4 fw-bold justify-content-start align-items-middle">
                    <img src={geoIcon} alt="geoIcon" className="block pe-1" />
                    <div className="fs-5">{weatherInfo?.name}</div>
                </div>
                <div className="mt-2">
                    Sunrise: <b>{sunriseTime}</b>
                </div>
                <div>
                    Sunset: <b>{sunsetTime}</b>
                </div>
            </div>
            <div className="px-md-3">
                <div>
                    {todayDate} {todayTime}
                </div>
                <div className="display-1">{getCelsius(weatherInfo?.main?.temp)} °C</div>
                <div className="my-2 my-md-0">Feels like {getCelsius(weatherInfo?.main?.feels_like)} °C</div>
                <div className="fst-italic">{weatherInfo?.weather?.[0].description}</div>
            </div>
            <div>
                <div>
                    Wind speed: <b>{weatherInfo?.wind?.speed} m/s</b>
                </div>
                <div>
                    Air humidity: <b>{weatherInfo?.main?.humidity}%</b>
                </div>
                <div>
                    Pressure: <b>{getPressureMm(weatherInfo?.main?.pressure)} mm</b>
                </div>
            </div>
        </div>
    );
};

export default WeatherSummary;
