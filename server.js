import express from 'express';
import router from './src/router.js';
import { PORT } from './config/index.js';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

app.use('/public', express.static('assets/imgs'));

const port = PORT || 3030;
app.listen(port, () => {
    console.log(`Server on port: ${port}`);
});