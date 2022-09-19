import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import fileUpload from 'express-fileupload';

import router from './router/index.routes.js';
import { PORT } from './lib/index.js';

import {errorHandler} from './error/errorHandler.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});