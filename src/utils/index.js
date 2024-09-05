const PRESSURE_UNITS = 0.750062;

export const getPressureMm = (hPa) => {
    return Math.round(hPa * PRESSURE_UNITS);
};

export const getTime = (seconds) => {
    return new Date(seconds * 1000).toLocaleTimeString("en-GB", {
        timeZone: "Atlantic/Reykjavik",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const getCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
};
