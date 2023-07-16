const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const User = require('./models/user');
const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes');
const userController = require('./controllers/userControllers');

const app = express();

mongoose.connect(`mongodb://localhost:27017/Finals`,{
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('/users', userRoutes));
app.use(require('/product', productRoutes));

app.listen(process.env.PORT || 4000, () => {
	console.log(`API is now online on port ${ process.env.PORT || 4000}`)
});
