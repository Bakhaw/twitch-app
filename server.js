const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 3001);

const server = app.listen(app.get('port'), () => {
  console.log('listening on port ', server.address().port);
});