import { Router, type Request, type Response } from 'express';
const router = Router();

//internall
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService';

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // GET weather data from city name
  // save city to search history
  const { city } = req.body;
 if (!city) {
  return res.status(400).send('City name is required.');
 } try {
  const weatherData = await WeatherService.getWeatherForCity(city);
  await HistoryService.addCity(city);
  res.json({
    message: `Weather data for ${city}`,
    data: weatherData
  });
 } catch (error: any) {
  res.status(500).send(`Error retrieving weather data: ${(error as Error).message || 'Unknown error'}`);
 }
});

// GET search history
router.get('/history', async (__req: Request, res: Response) => {
  try {
    const savedCity = await HistoryService.getCities();
    res.json(savedCity);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// * BONUS DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: 'City id is required.'});
    }
    await HistoryService.removeCity(req.params.id);
    res.json({ success: 'City successfully removed from search history.'});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



export default router;
