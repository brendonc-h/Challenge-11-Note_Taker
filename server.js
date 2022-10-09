const express = require('express');

const PORT = process.allowedNodeEnvironmentFlags.PORT || 3001;

//get express middleware 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(require(".routes"));
app.listen(PORT, () =>
console.log('App listening at local host')
);
