import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, BASE_URL, PROXY_URL } from "../../constants/index";

const initialState = {
    cityName: "Warsaw",
    weatherInfo: null,
    forecastInfo: null,
    loadingStatus: "idle", // Possible values: 'idle', 'loading', 'error'
};

export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (city = initialState.cityName, { rejectWithValue }) => {
        try {
            // Fetch current weather data
            const weatherResponse = await fetch(`${PROXY_URL}${BASE_URL}weather?q=${city}&appid=${API_KEY}`);
            if (!weatherResponse.ok) {
                if (weatherResponse.status === 404) {
                    throw new Error("City not found");
                }

                throw new Error(`Error ${weatherResponse.status}: ${weatherResponse.statusText}`);
            }

            const weather = await weatherResponse.json();

            // Fetch forecast data
            const forecastResponse = await fetch(`${BASE_URL}forecast?q=${city}&appid=${API_KEY}`);
            const forecast = await forecastResponse.json();

            return { weather, forecast };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setCityName: (state, action) => {
            state.cityName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loadingStatus = "loading";
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loadingStatus = "idle";
                state.weatherInfo = action.payload.weather;
                state.forecastInfo = action.payload.forecast;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loadingStatus = "error";
                console.error(action.payload);
            })
            .addDefaultCase(() => {});
    },
});

const { actions, reducer } = weatherSlice;

export default reducer;
export const { setCityName } = actions;
