import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WeatherPage from "./features/weather/WeatherPage";
import FavoritesList from "./features/favorites/FavoritesList";

import "./app.scss";

function App() {
    return (
        <Router>
            <main className="app">
                <div className="content">
                    <Routes>
                        <Route path="/" element={<WeatherPage />} />
                        <Route path="/favorites" element={<FavoritesList />} />
                    </Routes>
                </div>
            </main>
        </Router>
    );
}

export default App;
