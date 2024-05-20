const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./Routes/user.routes');
const postRoute = require('./Routes/post.routes');
const commentsRoute = require('./Routes/comments.routes');
const categoryRoute = require('./Routes/category.routes');
const loginRoute    = require('./Routes/login.routes');
const cors = require('cors');
const {adminchecker,authtoken} = require('./middleware/adminMiddleware');
const app = express();

app.use(cors());
app.use(express.json());

const url = 'mongodb+srv://MarkNicholas:Mark2002112@cluster0.ohkkzev.mongodb.net/Developer?retryWrites=true&w=majority';

mongoose.connect(url).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/user', userRoute);

app.use('/login',(req,res,next)=>{
 console.log('we are arriving at this api');
  next();
},loginRoute);

app.use('/post',authtoken,postRoute);
app.use('/comments',authtoken, commentsRoute);
app.use('/category', categoryRoute);

const PORT = process.env.PORT || 3000;

app.listen(3000,'localhost',() => {
  console.log(`Server started on port ${PORT}`);
});
