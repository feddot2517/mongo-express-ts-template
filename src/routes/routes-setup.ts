import express = require('express');
import { registerRoute } from './register-route';

export function routesSetup(app: express.Application) {
    registerRoute(app);
}
