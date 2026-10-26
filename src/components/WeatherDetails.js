import React, { useMemo, useState } from "react";

const conditionCycle = [
  "Sunny",
  "Partly Cloudy",
  "Humid",
  "Light Rain",
  "Hazy",
  "Cloudy",
  "Clear Sky",
];

const baseCityData = {
  Ahmedabad: {
    temp: 32,
    minTemp: 28,
    maxTemp: 36,
    humidity: 52,
    windSpeed: 12,
    windDirection: "SW",
    pressure: 1010,
    visibility: 10,
    uv: 8,
    sunrise: "06:23",
    sunset: "19:12",
    dayLength: "12h 49m",
    rainChance: 18,
    comfort: "Hot",
    conditionIndex: 0,
    daily: { morning: 29, afternoon: 34, evening: 31, night: 27 },
    weekly: [
      { day: "Mon", min: 27, max: 35, conditionIndex: 0 },
      { day: "Tue", min: 26, max: 34, conditionIndex: 1 },
      { day: "Wed", min: 27, max: 36, conditionIndex: 2 },
      { day: "Thu", min: 27, max: 35, conditionIndex: 3 },
      { day: "Fri", min: 26, max: 34, conditionIndex: 4 },
      { day: "Sat", min: 26, max: 33, conditionIndex: 5 },
      { day: "Sun", min: 27, max: 35, conditionIndex: 6 },
    ],
  },
  Delhi: {
    temp: 30,
    minTemp: 25,
    maxTemp: 35,
    humidity: 58,
    windSpeed: 14,
    windDirection: "NW",
    pressure: 1008,
    visibility: 9,
    uv: 9,
    sunrise: "06:15",
    sunset: "19:01",
    dayLength: "12h 46m",
    rainChance: 22,
    comfort: "Moderate",
    conditionIndex: 2,
    daily: { morning: 27, afternoon: 33, evening: 30, night: 26 },
    weekly: [
      { day: "Mon", min: 25, max: 34, conditionIndex: 2 },
      { day: "Tue", min: 25, max: 33, conditionIndex: 3 },
      { day: "Wed", min: 24, max: 32, conditionIndex: 4 },
      { day: "Thu", min: 26, max: 34, conditionIndex: 5 },
      { day: "Fri", min: 25, max: 33, conditionIndex: 6 },
      { day: "Sat", min: 25, max: 34, conditionIndex: 0 },
      { day: "Sun", min: 24, max: 32, conditionIndex: 1 },
    ],
  },
  Mumbai: {
    temp: 29,
    minTemp: 26,
    maxTemp: 32,
    humidity: 72,
    windSpeed: 18,
    windDirection: "W",
    pressure: 1011,
    visibility: 8,
    uv: 7,
    sunrise: "06:32",
    sunset: "19:19",
    dayLength: "12h 47m",
    rainChance: 40,
    comfort: "Humid",
    conditionIndex: 3,
    daily: { morning: 27, afternoon: 31, evening: 29, night: 27 },
    weekly: [
      { day: "Mon", min: 26, max: 32, conditionIndex: 3 },
      { day: "Tue", min: 26, max: 31, conditionIndex: 3 },
      { day: "Wed", min: 26, max: 32, conditionIndex: 4 },
      { day: "Thu", min: 26, max: 33, conditionIndex: 5 },
      { day: "Fri", min: 27, max: 33, conditionIndex: 6 },
      { day: "Sat", min: 26, max: 31, conditionIndex: 2 },
      { day: "Sun", min: 26, max: 32, conditionIndex: 1 },
    ],
  },
  Bangalore: {
    temp: 25,
    minTemp: 21,
    maxTemp: 28,
    humidity: 62,
    windSpeed: 16,
    windDirection: "SE",
    pressure: 1013,
    visibility: 10,
    uv: 6,
    sunrise: "06:24",
    sunset: "18:56",
    dayLength: "12h 32m",
    rainChance: 30,
    comfort: "Pleasant",
    conditionIndex: 1,
    daily: { morning: 22, afternoon: 27, evening: 24, night: 21 },
    weekly: [
      { day: "Mon", min: 21, max: 28, conditionIndex: 1 },
      { day: "Tue", min: 21, max: 27, conditionIndex: 2 },
      { day: "Wed", min: 22, max: 28, conditionIndex: 2 },
      { day: "Thu", min: 21, max: 27, conditionIndex: 3 },
      { day: "Fri", min: 22, max: 28, conditionIndex: 1 },
      { day: "Sat", min: 21, max: 27, conditionIndex: 0 },
      { day: "Sun", min: 21, max: 27, conditionIndex: 1 },
    ],
  },
  Surat: {
    temp: 31,
    minTemp: 27,
    maxTemp: 35,
    humidity: 64,
    windSpeed: 13,
    windDirection: "SW",
    pressure: 1010,
    visibility: 10,
    uv: 8,
    sunrise: "06:28",
    sunset: "19:14",
    dayLength: "12h 46m",
    rainChance: 28,
    comfort: "Humid",
    conditionIndex: 2,
    daily: { morning: 28, afternoon: 33, evening: 30, night: 27 },
    weekly: [
      { day: "Mon", min: 27, max: 34, conditionIndex: 2 },
      { day: "Tue", min: 27, max: 35, conditionIndex: 3 },
      { day: "Wed", min: 27, max: 35, conditionIndex: 4 },
      { day: "Thu", min: 28, max: 36, conditionIndex: 5 },
      { day: "Fri", min: 27, max: 34, conditionIndex: 6 },
      { day: "Sat", min: 27, max: 35, conditionIndex: 1 },
      { day: "Sun", min: 27, max: 34, conditionIndex: 0 },
    ],
  },
};

const todayDateLabel = () =>
  new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const rotate = (arr, n) => {
  const shift = n % arr.length;
  return [...arr.slice(shift), ...arr.slice(0, shift)];
};

const applyDailyVariation = (city) => {
  const base = baseCityData[city];
  const daySeed = new Date().getDate();
  const tempShift = (daySeed % 5) - 2; // -2 to +2
  const humidityShift = Math.max(-6, Math.min(6, tempShift * 2));
  const condition =
    conditionCycle[
      (base.conditionIndex + daySeed) % conditionCycle.length
    ];

  const adjustTemp = (value) => Math.round(value + tempShift);

  const highlights = {
    morning: adjustTemp(base.daily.morning),
    afternoon: adjustTemp(base.daily.afternoon),
    evening: adjustTemp(base.daily.evening),
    night: adjustTemp(base.daily.night),
  };

  const weeklyRotated = rotate(
    base.weekly.map((d, idx) => ({
      ...d,
      min: adjustTemp(d.min),
      max: adjustTemp(d.max),
      condition:
        conditionCycle[(d.conditionIndex + daySeed + idx) %
          conditionCycle.length],
    })),
    daySeed % base.weekly.length
  );

  return {
    city,
    condition,
    temperature: adjustTemp(base.temp),
    minTemp: adjustTemp(base.minTemp),
    maxTemp: adjustTemp(base.maxTemp),
    feelsLike: adjustTemp(base.temp + (tempShift > 0 ? 1 : 0)),
    humidity: Math.min(98, Math.max(15, base.humidity + humidityShift)),
    windSpeed: base.windSpeed + tempShift,
    windDirection: base.windDirection,
    pressure: base.pressure + tempShift,
    visibility: Math.max(4, base.visibility - Math.max(0, tempShift)),
    uv: base.uv,
    sunrise: base.sunrise,
    sunset: base.sunset,
    dayLength: base.dayLength,
    rainChance: Math.max(5, base.rainChance + tempShift * 2),
    comfort: base.comfort,
    highlights,
    weekly: weeklyRotated,
    dateLabel: todayDateLabel(),
  };
};

const StatCard = ({ title, value, sub, icon }) => (
  <div className="wd-card glass">
    <div className="d-flex justify-content-between align-items-center">
      <span className="wd-label">{title}</span>
      <span className="wd-icon">{icon}</span>
    </div>
    <div className="wd-value">{value}</div>
    {sub && <div className="wd-sub">{sub}</div>}
  </div>
);

function WeatherDetails() {
  const [city, setCity] = useState("Ahmedabad");

  const data = useMemo(() => applyDailyVariation(city), [city]);

  return (
    <div className="weather-details-page text-white">
      <div className="weather-details-overlay">
        <div className="container py-5">
          {/* Header */}
          <div className="mb-5 d-flex flex-wrap justify-content-between align-items-start gap-3">
            <div>
              <p className="wd-kicker">Weather Insights</p>
              <h1 className="display-5 fw-bold mb-1">{data.city}</h1>
              <p className="mb-1 text-light">{data.dateLabel}</p>
              <p className="text-secondary-emphasis">
                Detailed Climate Overview
              </p>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <select
                className="form-select wd-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {Object.keys(baseCityData).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <span className="wd-pill">Updated daily</span>
            </div>
          </div>

          {/* Current overview */}
          <div className="wd-main glass mb-4">
            <div>
              <p className="wd-label text-uppercase mb-1">Current Weather</p>
              <div className="d-flex flex-wrap align-items-center gap-3">
                <div className="display-1 fw-bold">
                  {data.temperature}°C
                </div>
                <div>
                  <div className="fs-4">{data.condition}</div>
                  <div className="text-light">
                    Min {data.minTemp}° • Max {data.maxTemp}°
                  </div>
                  <div className="text-light">
                    Feels like {data.feelsLike}°
                  </div>
                </div>
              </div>
            </div>
            <div className="wd-main-mini">
              <span className="wd-icon">🌡️</span>
              <div>
                <div className="wd-label">Comfort</div>
                <div className="wd-value">{data.comfort}</div>
                <div className="wd-sub">Chance of rain {data.rainChance}%</div>
              </div>
            </div>
          </div>

          {/* Atmospheric */}
          <div className="row g-3 mb-4">
            <div className="col-md-3 col-sm-6">
              <StatCard
                title="Humidity"
                value={`${data.humidity}%`}
                sub="Ideal: 40-60%"
                icon="💧"
              />
            </div>
            <div className="col-md-3 col-sm-6">
              <StatCard
                title="Wind"
                value={`${data.windSpeed} km/h`}
                sub={`Direction ${data.windDirection}`}
                icon="🌬️"
              />
            </div>
            <div className="col-md-3 col-sm-6">
              <StatCard
                title="Pressure"
                value={`${data.pressure} hPa`}
                sub="Sea level pressure"
                icon="🧭"
              />
            </div>
            <div className="col-md-3 col-sm-6">
              <StatCard
                title="Visibility"
                value={`${data.visibility} km`}
                sub="Clear horizons"
                icon="👁️"
              />
            </div>
          </div>

          {/* Sun & time */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <StatCard
                title="Sunrise"
                value={data.sunrise}
                sub="Local time"
                icon="🌅"
              />
            </div>
            <div className="col-md-4">
              <StatCard
                title="Sunset"
                value={data.sunset}
                sub="Local time"
                icon="🌇"
              />
            </div>
            <div className="col-md-4">
              <StatCard
                title="Day length"
                value={data.dayLength}
                sub="Sun above horizon"
                icon="⏳"
              />
            </div>
          </div>

          {/* Daily highlights */}
          <div className="glass p-4 rounded-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <p className="wd-label mb-1">Daily Highlights</p>
                <h5 className="mb-0 text-white">Temperature Timeline</h5>
              </div>
              <span className="wd-pill">UV Index {data.uv}</span>
            </div>
            <div className="row g-3">
              {[
                { label: "Morning", value: data.highlights.morning },
                { label: "Afternoon", value: data.highlights.afternoon },
                { label: "Evening", value: data.highlights.evening },
                { label: "Night", value: data.highlights.night },
              ].map((item) => (
                <div className="col-md-3 col-sm-6" key={item.label}>
                  <div className="wd-mini glass">
                    <p className="wd-label mb-1">{item.label}</p>
                    <div className="wd-value">{item.value}°C</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly overview */}
          <div className="glass p-4 rounded-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <p className="wd-label mb-1">Weekly Overview</p>
                <h5 className="mb-0 text-white">Next 7 days</h5>
              </div>
              <span className="wd-pill">Static forecast</span>
            </div>
            <div className="row g-3">
              {data.weekly.map((item, idx) => (
                <div className="col-lg-2 col-md-3 col-sm-4" key={idx}>
                  <div className="wd-forecast glass">
                    <p className="wd-label mb-1">{item.day}</p>
                    <div className="wd-icon mb-1">☁️</div>
                    <div className="text-white fw-semibold">{item.condition}</div>
                    <div className="text-light">
                      {item.min}° / <span className="fw-bold">{item.max}°</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;
