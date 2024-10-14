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

app.post('/api/justify', (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  const text = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).send('Invalid text');
  }

  const justifiedText = justifyText(text, 80);
  res.type('text/plain').send(justifiedText);
});

function justifyText(text: string, maxLength: number): string {
  const words = text.split(/\s+/);
  let lines: string[] = [];
  let currentLine: string[] = [];

  words.forEach(word => {
    if ((currentLine.join(' ').length + word.length + 1) <= maxLength) {
      currentLine.push(word);
    } else {
      lines.push(justifyLine(currentLine, maxLength));
      currentLine = [word];
    }
  });

  if (currentLine.length > 0) {
    lines.push(currentLine.join(' '));
  }

  return lines.join('\n');
}

function justifyLine(words: string[], maxLength: number): string {
  if (words.length === 1) return words[0];

  let spacesToAdd = maxLength - words.join(' ').length;
  let gaps = words.length - 1;
  let spaces = Array(gaps).fill(Math.floor(spacesToAdd / gaps));
  for (let i = 0; i < spacesToAdd % gaps; i++) {
    spaces[i]++;
  }

  return words.reduce((line, word, index) => {
    if (index < spaces.length) {
      return line + word + ' '.repeat(spaces[index]);
    }
    return line + word;
  }, '');
}

app.get('/', (req: Request, res: Response) => {
  res.send('API Justification Ready!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
