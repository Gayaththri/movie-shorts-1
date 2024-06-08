// hono/index.js
const { Hono } = require('hono');
const sqlite = require('sqlite');
const { fetchMovieData } = require('./utils/movieAPI');

async function start() {
  const db = await sqlite.open({
    filename: './database.db',
    driver: sqlite.Database,
  });

  const app = new Hono({
    db: {
      client: db,
      useNullAsDefault: true,
    },
  });

  app.get('/hello', (c) => c.json({ message: 'Hello Hono!' }));

  app.get('/api/movies', async (c) => {
    const { movieName } = c.query;
    if (!movieName) {
      return c.status(400).json({ error: 'Movie name is required' });
    }

    try {
      const movieData = await fetchMovieData(movieName);
      c.json(movieData);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      c.status(500).json({ error: 'Failed to fetch movie data' });
    }
  });

  await app.listen(3001);
}

start();
