import { useDispatch, useSelector } from "react-redux";

import FavoritesListItem from "./FavoritesListItem";
import { useNavigate } from "react-router-dom";
import { removeCity } from "./favoritesSlice";

const FavoritesList = () => {
    const favoritesList = useSelector((state) => state.favorites.favoritesList);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handler function to remove a city from favorites
    const onDelete = (id) => {
        dispatch(removeCity(id));
    };

    // Function to render the list of favorite cities
    const renderFavoritesList = (list) => {
        if (list.length === 0) {
            return <h5 className="text-center mt-5">No favorites yet</h5>;
        }

        return list.map((city) => {
            return <FavoritesListItem key={city.id} city={city} onDelete={() => onDelete(city.id)} />;
        });
    };

    // Generate the list elements based on the favorites list
    const elements = renderFavoritesList(favoritesList);

    return (
        <>
            <nav className="p-3 d-flex align-items-center justify-content-between bg-darker">
                <button className="btn btn-outline-light" onClick={() => navigate("/")}>
                    Back
                </button>
                <div className="me-3 text-warning">Favorites cities</div>
            </nav>
            <section>
                <ul className="container">{elements}</ul>
            </section>
        </>
    );
};

export default FavoritesList;
