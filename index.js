import express from 'express';
import  dbConnection  from './database/dbConnection.js';
import bookRoutes from "./routes/Book.route.js";
import authorRoutes from "./routes/Author.route.js";
const PORT = 3000; 

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.get('/', (req, res) => {
    res.send('hello world');
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  
dbConnection();
export default app;