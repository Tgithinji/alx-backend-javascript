// full_server/server.js
import express from 'express';
import router from './routes/index';

const app = express();
const port = 1245;

// Use routes from index.js
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
