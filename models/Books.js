const mongoose=require('mongoose');

const schema= mongoose.Schema;

const book_schema=new schema({
name:String,
author:String,
year_of_publication:String
});


module.exports=mongoose.model('books',book_schema);

