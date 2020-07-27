'use strict'
const app = require('./bin/express');
const variables = require('./bin/configurations/variables');

app.listen(variables.Api.port, () => {
    console.info(`Api inicializada com sucesso na porta ${variables.Api.port}.`);
});