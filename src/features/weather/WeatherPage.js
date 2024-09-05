import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchWeather } from "./weatherSlice";

import WeatherForecast from "./WeatherForecast";
import WeatherSummary from "./WeatherSummary";
import SearchForm from "../../components/SearchForm";
import FavoritesListButton from "../../components/FavoritesListButton";
import Spinner from "../../components/Spinner";

import { addNewCity } from "../favorites/favoritesSlice";

const WeatherPage = () => {
    const cityName = useSelector((state) => state.weather.cityName);
    const weatherInfo = useSelector((state) => state.weather.weatherInfo);
    const loadingStatus = useSelector((state) => state.weather.loadingStatus);
    const forecastInfo = useSelector((state) => state.weather.forecastInfo);

    const [favoriteButtonText, setFavoriteButtonText] = useState("Add to favorites");

    const dispatch = useDispatch();

    // Function to check if the current city is already in the favorites list
    const checkIfCityIsFavorite = () => {
        const storedFavorites = localStorage.getItem("favoritesList");
        if (storedFavorites) {
            const favoritesList = JSON.parse(storedFavorites);
            const isCityExists = favoritesList.some((city) => city.id === weatherInfo?.id);
            setFavoriteButtonText(isCityExists ? "Added" : "Add to favorites");
        }
    };

    useEffect(() => {
        dispatch(fetchWeather(cityName));
    }, []);

    // Update favorite button text when weatherInfo changes
    useEffect(() => {
        checkIfCityIsFavorite();
    }, [weatherInfo]);

    const onAddFavorite = () => {
        dispatch(addNewCity(weatherInfo));
        setFavoriteButtonText("Added");
    };

    // Display a loading spinner or error message while weather data is being fetched
    if (loadingStatus === "loading") {
        return <Spinner />;
    } else if (loadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error or city not found</h5>;
    }

    return (
        <div className="animate__animated animate__fadeIn d-flex flex-column h-100">
            <nav className="p-3 d-flex align-items-center justify-content-between bg-darker">
                <SearchForm />
                <FavoritesListButton />
            </nav>
            <section className="mt-auto">
                <div className="mt-3 badge bg-warning text-dark p-2 cursor added-btn" onClick={onAddFavorite}>
                    {favoriteButtonText}
                </div>

                <div className="d-flex column-gap-5 my-5">
                    <WeatherSummary weatherInfo={weatherInfo} loadingStatus={loadingStatus} />
                </div>
            </section>
            <section className="border-top border-secondary-subtle">
                <WeatherForecast forecastInfo={forecastInfo} loadingStatus={loadingStatus} />
            </section>
        </div>
    );
};

export default WeatherPage;
