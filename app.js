const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.set('port', process.env.PORT || 3000);

app.use(require('./routes/users'));
app.use(require('./routes/manifestations'));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});