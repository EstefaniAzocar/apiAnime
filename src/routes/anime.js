const express = require('express');
const axios = require('axios');
const router = express.Router();

const getScoreMessage = (score) => {
  if (score >= 1 && score <= 4) {
    return 'No lo recomiendo.';
  } else if (score >= 5 && score <= 7) {
    return 'Puedes divertirte.';
  } else {
    return 'Genial, esto es uno de los mejores animes.';
  }
};

router.get('/default-images', async (req, res) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/anime?q=anime&sfw');
    const defaultImagesWithScoreMessages = response.data.data.map((anime) => ({
      ...anime,
      scoreMessage: getScoreMessage(anime.score)
    }));
    res.json(defaultImagesWithScoreMessages);
  } catch (error) {
    console.error('Error al obtener imágenes predeterminadas:', error);
    res.status(500).send('Error al obtener imágenes predeterminadas');
  }
});

router.get('/', async (req, res) => {
  const { q: query } = req.query;

  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
    const animeDataWithScoreMessages = response.data.data.map((anime) => ({
      ...anime,
      scoreMessage: getScoreMessage(anime.score)
    }));

    res.json(animeDataWithScoreMessages);
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    res.status(500).send('Error en la búsqueda');
  }
});

module.exports = router;



