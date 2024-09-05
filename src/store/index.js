import weather from "../features/weather/weatherSlice";
import favorites from "../features/favorites/favoritesSlice";
import { configureStore } from "@reduxjs/toolkit";

// Configuring the Redux store
const store = configureStore({
    reducer: { weather, favorites },
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
