import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/* =========================
   ROTA: CLIMA ATUAL
========================= */

app.get("/weather", async (req, res) => {

    const city = req.query.city;

    if (!city) {
        return res.status(400).json({
            error: "Informe uma cidade"
        });
    }

    try {

        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric",
                lang: "pt_br"
            }
        });

        return res.json(response.data);

    } catch (error) {

        if (error.response) {

            return res.status(error.response.status).json({
                error: error.response.data.message
            });

        }

        return res.status(500).json({
            error: "Erro interno no servidor"
        });
    }
});


app.get("/forecast", async (req, res) => {

    const city = req.query.city;

    if (!city) {
        return res.status(400).json({
            error: "Informe uma cidade"
        });
    }

    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric",
                lang: "pt_br"
            }
        });

        return res.json(response.data);

    } catch (error) {

        if (error.response) {
            return res.status(error.response.status).json({
                error: error.response.data.message
            });
        }

        return res.status(500).json({
            error: "Erro interno no servidor"
        });
    }
});

app.get("/weather-coords", async (req, res) => {

    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({
            error: "Informe latitude e longitude"
        });
    }

    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: "metric",
                lang: "pt_br"
            }
        });

        return res.json(response.data);

    } catch (error) {

        if (error.response) {
            return res.status(error.response.status).json({
                error: error.response.data.message
            });
        }

        return res.status(500).json({
            error: "Erro interno no servidor"
        });
    }
});

app.get("/forecast-coords", async (req, res) => {

    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({
            error: "Informe latitude e longitude"
        });
    }

    try {

        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: "metric",
                lang: "pt_br"
            }
        });

        return res.json(response.data);

    } catch (error) {

        if (error.response) {
            return res.status(error.response.status).json({
                error: error.response.data.message
            });
        }

        return res.status(500).json({
            error: "Erro interno no servidor"
        });

    }

});








/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});