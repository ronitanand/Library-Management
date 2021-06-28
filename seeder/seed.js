const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/library',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
const db=mongoose.connection;
db.on('error',console.error.bind('connection error'));
db.once('open',()=>{
    console.log('database connected');
});
const Books=require('../models/Books');

const seed=async ()=>{
await Books.deleteMany({});
await Books.insertMany({name:'Apes and Angels',author:'Bova Ben'});
await Books.insertMany([
{name:'Books of GGG',author:'Lei Qing'},
{name:'Death Wave',author:'Bova Ben'},
{name:'express',author:'Korash Francis'},
{name:'Invisible Men',author:'Wells HG'},
{name:'Song of Ice and Fire',author:'Martin George'}

])

}


