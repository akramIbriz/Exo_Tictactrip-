import express, { Request, Response } from 'express';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const usersTokens: { [key: string]: string } = {};

app.post('/api/token', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send('Email is required');
  }

  const token = crypto.randomBytes(16).toString('hex');
  usersTokens[email] = token;
  res.json({ token });
});

app.get('/', (req: Request, res: Response) => {
  res.send('API Justification Ready!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
