const mongoose=require("mongosse")
const schema=mongoose.Schema

const PersonSchema=new schema({
    name:{
        type:String,
        required
    },
    age:{
        type:Number,
        unique:true
    },
    favoriteFoods:{
        type:[String]
    }
})

module.exports=Person=mongosose.model=("persons",personSchema)