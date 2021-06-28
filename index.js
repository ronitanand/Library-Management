const express=require('express');
const path=require('path');
const app=express();
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
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
const Books=require('./models/Books');
const methodOverride=require('method-override');
app.use(methodOverride('_method'));
//Adding initial books




//Routes
app.get('/',async(req,res)=>{
    let totalBooks=await Books.find({});

    res.render('Home',{TotalBooks:totalBooks.length,title:'Home'});
})

app.get('/all-books',async (req,res)=>{
    let bookList=await Books.find({});
    console.log(bookList);
    res.render('All-Books',{bookList,title:'All Books'})
})

app.get('/show-book/:id',async (req,res)=>{
    const ID=req.params.id;
    const bookFound=await Books.findById({_id:ID});
    console.log(bookFound);
    res.render('Show-book',{bookFound,title:'Book Details'});
})


app.get('/add-book',(req,res)=>{
    res.render('New Book',{title:'Add Book'});
})

app.post('/add-book',async (req,res)=>{
    let new_book_data=req.body;
    console.log(new_book_data);
    await Books.insertMany({name:new_book_data.book_name,author:new_book_data.book_author});
    res.redirect('/');
})

app.get('/delete/:deletedBook', async (req,res)=>{
    let deleteBook=req.params.deletedBook;
    console.log(deleteBook);
    await Books.deleteMany({name:deleteBook});
    res.redirect('/');
})



app.listen(3000,async ()=>{
    console.log('server started at port 3000');
    let x=await Books.find({author:'Bova Ben'});
    console.log(x);

});