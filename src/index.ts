import express, { Request, Response } from 'express';
const app = express();

app.use(express.text()); // Pour traiter le body des requêtes en text/plain

app.post('/api/justify', (req: Request, res: Response) => {
    const text = req.body;
    res.send(`Received text: ${text}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
