const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');



const app = express();
const PORT = process.env.PORT || 3001;


// Middleware
mongoose.connect('mongodb://localhost/social_network_db')
  .then(() => {
    console.log('DB Connected!')
    })
    .catch(err => console.log(err));

    const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
        }
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + 'public'));

    app.use(routes);
    

    
    


    ;

    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));