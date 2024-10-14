"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// Middleware pour traiter le body en tant que texte brut (text/plain)
app.use(express_1.default.text());
// Fonction pour justifier le texte
function justifyText(text, lineWidth = 80) {
    const words = text.split(' ');
    let currentLine = '';
    let justifiedText = '';
    // Parcours de tous les mots du texte
    for (let word of words) {
        if ((currentLine + word).length <= lineWidth) {
            currentLine += word + ' ';
        }
        else {
            justifiedText += justifyLine(currentLine.trim(), lineWidth) + '\n';
            currentLine = word + ' ';
        }
    }
    justifiedText += currentLine.trim();
    return justifiedText;
}
// Fonction pour justifier une seule ligne
function justifyLine(line, lineWidth) {
    const words = line.split(' ');
    const gaps = words.length - 1;
    if (gaps === 0)
        return line;
    const totalSpaces = lineWidth - line.length + gaps;
    const spaces = Math.floor(totalSpaces / gaps);
    const extraSpaces = totalSpaces % gaps;
    return words.reduce((acc, word, index) => {
        if (index < gaps) {
            return acc + word + ' '.repeat(spaces + (index < extraSpaces ? 1 : 0));
        }
        else {
            return acc + word;
        }
    }, '');
}
// Route POST pour justifier le texte
app.post('/api/justify', (req, res) => {
    const text = req.body;
    if (typeof text !== 'string') {
        return res.status(400).send('Invalid input. Expected text/plain.');
    }
    const justifiedText = justifyText(text);
    res.send(justifiedText);
});
// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
