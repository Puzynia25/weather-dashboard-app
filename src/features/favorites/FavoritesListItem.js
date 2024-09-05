import { WeatherIcon } from "weather-react-icons";
import trash from "../../assets/img/trash.svg";
import { getCelsius } from "../../utils";

const FavoritesListItem = ({ city, onDelete }) => {
    const iconId = city.weather[0].id || 800;

    return (
        <li className="animate__animated animate__fadeIn row justify-content-between align-items-center border-bottom px-1 py-4 p-sm-4">
            <div className="col col-sm-2 my-3 d-flex align-items-center gap-sm-5">
                <WeatherIcon iconId={iconId} name="owm" className="display-5" />
            </div>
            <div className="col text-start">
                <h3 className="">{city.name}</h3>
                <div className="fst-italic">{city.weather[0].description}</div>
            </div>
            <div className="col temp text-start">{getCelsius(city.main.temp)} °C</div>
            <div className="col text-end">
                <div className="mt-2">
                    <div>min: </div>
                    <span className="fw-bold">{getCelsius(city.main.temp_min)} °C</span>
                </div>
                <div>
                    <div>max:</div>
                    <span className="fw-bold">{getCelsius(city.main.temp_max)} °C</span>
                </div>
            </div>
            <div onClick={onDelete} type="button" className="col col-sm-1 m-2 text-end" aria-label="Remove">
                <img src={trash} alt="trash" />
            </div>
        </li>
    );
};

export default FavoritesListItem;
