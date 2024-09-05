import { useNavigate } from "react-router-dom";

import list from "../assets/img/list-task.svg";

const FavoritesListButton = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate("/favorites")} className="btn">
            <img src={list} alt="favoriteListButton" />
        </button>
    );
};

export default FavoritesListButton;
