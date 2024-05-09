import express from 'express';
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import mainRouter from './routes';


const app = express();

const corsOptions:CorsOptions = {
  origin:function(origin,callback){
    console.log(origin)
    if(origin === process.env.FRONTEND_URL || origin === undefined){
      console.log('Allowed...')
      callback(null,true);
    } else {
      console.log('Not allowed...')
      callback(new Error(`Cors error`))
    }
  }
}

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/', mainRouter );

export default app;