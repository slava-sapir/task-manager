const express = require('express');

const app = express();

app.use(express.static('./dist/task-manager'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/task-manager/'}),
);

app.listen(process.env.PORT || 8080);