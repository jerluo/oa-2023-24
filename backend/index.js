import express from "express"
import cors from "cors"
import axios from "axios"
import env from 'dotenv'

const app = express()
env.config();

const API_KEY = process.env.API_KEY;
const options = {
  method: 'GET',
  url: 'https://coronavirus-smartable.p.rapidapi.com/stats/v1/US/',
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'coronavirus-smartable.p.rapidapi.com'
  }
};


const response = await axios.request(options);
const totalConfirmedCases = response.data.stats.totalConfirmedCases
const newlyConfirmedCases = response.data.stats.newlyConfirmedCases
const totalDeaths = response.data.stats.totalDeaths

app.use(cors({
    origin: "http://localhost:5500"
}))

app.get("/", (req, res) => {
    res.send({
        x: ["Total Confirmed Cases", "Total Deaths", "Newly Confirmed Cases"],
        y: [totalConfirmedCases, totalDeaths, newlyConfirmedCases],
        type: 'bar'
    }).status(200)
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listening on port ${port} 🚀`))