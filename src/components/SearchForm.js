import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather, setCityName } from "../features/weather/weatherSlice";

const SearchForm = () => {
    const [city, setCity] = useState("");
    const dispatch = useDispatch();

    const onSearch = (e) => {
        e.preventDefault();
        const currentCity = city.trim(); // Trim whitespace from the city input
        if (currentCity) {
            dispatch(setCityName(currentCity));
            dispatch(fetchWeather(currentCity));
        }
        // Clear the input field after submission
        setCity("");
    };

    return (
        <form className="d-flex w-50" role="search" onSubmit={onSearch}>
            <input
                className="form-control me-2"
                type="search"
                placeholder={city}
                aria-label="Search"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
                Search
            </button>
        </form>
    );
};

export default SearchForm;
