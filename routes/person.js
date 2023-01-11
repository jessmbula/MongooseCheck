const express = require('express')

const person=express.Router()
const Person=require('../models/Person')

//Create and Save a Record of a Model:
router.post("/", async (req,res)=>{
    const {name, age, favoriteFoods}= req.body
    try{
    const newPerson = new Person({
        name,
        age,
        favoriteFoods
    })
    const person = await newPerson.save()
    res.send({msg:"person added", person})
} catch (err) {
    console.log(err)}
})

//Create Many Records with model.create()

person.post(("/creat"),(req, res)=> {
    const arrayOfPepole=req.body.arrayOfPepole
    Person.create(arrayOfPepole)
    .then((newPerson)=>res.json(newPerson))
    .catch((err)=>console.log(err))
    });

// Use model.find() to Search Your Database
//model.find() @get persons byName

person.get(("/:name"),(req, res)=> {
    var {name}=req.params
    Person.find({name})
    .then(newPerson=>res.json(newPerson))
   .catch(err=>console.log(err))
  });
 

  person.get(("/:food"),(req, res)=> {
    var {food}=req.params
    Person.findOne({favoriteFoods:food})
      .then(newPerson=>res.json(newPerson))
     .catch(err=>console.log(err))
    })
  
        person.get('find/:_id',(req,res)=>{
          const personId = req.params._id
          Person.findById({_id:personId })
          .then(newPerson=>res.send(newPerson))
          .catch(err=>console.log(err))
      })

// Perform Classic Updates by Running Find, Edit, then Save :

  person.post('/findeditsave/:_id',(req, res) => {
    const personId = req.params._id
    const [foodadd] = req.body.favoriteFoods
              Person.findById({_id:personId },(err,data)=>{
                if (err) {console.log(err)}else{data.favoriteFoods.push(foodadd)
                data.save()
              res.send(data)};
                });
            });

//Perform New Updates on a Document Using model.findOneAndUpdate :

  person.put('/findupdate/:name',(req, res) => {
    var ageSet = req.body.age
    var personName = req.params.name;
    Person.findOneAndUpdate(
        {name: personName},
        {$set: {age:ageSet}},{new : true})
        .then((newPerson)=>res.send(newPerson))
        .catch(err=>console.log(err))
      });
    
//Delete One Document Using model.findByIdAndRemove :

      person.delete('/findremove/:_id',(req, res) => {
        const personId = req.params._id
        Person.findByIdAndRemove({_id:personId })
        .then((newPerson)=>res.send(newPerson))
        .catch(err=>console.log(err))
  
          });

//MongoDB and Mongoose - Delete Many Documents with model.remove :

          person.delete('/removeperson/:name',(req, res) => {
            var nameToRemove = req.params.name;
  
          Person.remove({name: nameToRemove})
          .then((newPerson)=>res.send(newPerson))
          .catch(err=>console.log(err))
        });

//Chain Search Query Helpers to Narrow Search Results :

        person.get('/search/:food',(req, res) => {
          const {food} = req.params;
           Person.find({favoriteFoods:food}).sort({name : "desc"}).limit(2).select("-age").exec((err, data) => {
               err ? res.status(400).send(err):res.send(data);
               console.log(data);
           });
       });
  
    module.exports = person;