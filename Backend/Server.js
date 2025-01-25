import exprss from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import "dotenv/config"
import dbConnect from './config/db.js';
import PostRoutes from './routes/PostRoutes.js'
import UserRoutes from './routes/UserRoutes.js'




const app = exprss();
const PORT = process.env.PORT || 5600

app.use(bodyParser.json());
app.use(cors());

//----------DataBase----
dbConnect()

app.get('/',(req,res)=>{
    res.json({'Res':"hello world"})
})

//-------Rounting------
app.use('/api/post',PostRoutes)
app.use('/api/user',UserRoutes)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})