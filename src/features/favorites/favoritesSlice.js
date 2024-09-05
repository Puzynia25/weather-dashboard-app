import { createSlice } from "@reduxjs/toolkit";

// Function to load favorites from localStorage or return an empty array if none exist
const loadFavoritesFromLocalStorage = () => {
    const storedFavorites = localStorage.getItem("favoritesList");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const initialState = {
    favoritesList: loadFavoritesFromLocalStorage(),
    favoritesLoadingStatus: "idle",
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addNewCity: (state, action) => {
            // Check if the city already exists in the favorites list
            const isCityExists = state.favoritesList.some((city) => city.id === action.payload.id);
            if (!isCityExists) {
                state.favoritesList.push(action.payload);
                localStorage.setItem("favoritesList", JSON.stringify(state.favoritesList));
            }
        },
        removeCity: (state, action) => {
            state.favoritesList = state.favoritesList.filter((city) => city.id !== action.payload);
            // Update localStorage with the updated favorites list
            localStorage.setItem("favoritesList", JSON.stringify(state.favoritesList));
        },
    },
});

const { actions, reducer } = favoritesSlice;

export default reducer;
export const { addNewCity, removeCity } = actions;
