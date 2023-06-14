const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/apiRoutes');
const thoughtRoutes = require('./routes/apiRoutes');
const reactionRoutes = require('./routes/apiRoutes');



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

    

    app.use('/api', userRoutes);
    app.use('/api', thoughtRoutes);
    app.use('/api', reactionRoutes);

    
    


    // module.exports = mongoose.model('User', userSchema);

    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));