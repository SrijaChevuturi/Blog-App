// create author-api app
const exp=require('express')
const authorApp=exp.Router()
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const verifyToken=require('../Middlewares/verifyToken')
require('dotenv').config()

let authorsCollection
let articlescollection
authorApp.use((req,res,next)=>{
    authorsCollection=req.app.get('authorsCollection')
    articlescollection=req.app.get('articlescollection')
    next()
})

// user registration route
authorApp.post('/author',expressAsyncHandler(async(req,res)=>{
    // get author resource from client
    const newAuthor=req.body
    // check for duplicate authors based on username
    const dbAuthor=await authorsCollection.findOne({username:newAuthor.username})
    // if author found in db
    if (dbAuthor!==null){
        res.send({message:"author already exists"})
    }
    else{
        // hash paasword
        const hashedPassword=await bcryptjs.hash(newAuthor.password,5)
        // replace plain password with hashed password
        newAuthor.password=hashedPassword
        // create new user
        await authorsCollection.insertOne(newAuthor)
        // send repsonse
        res.send({message:"new author created"})
    }
}))

// author login
authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
    // get author credentails from client
    const authorCred=req.body
    // check for username
    const dbAuthor=await authorsCollection.findOne({username:authorCred.username})
    if (dbAuthor===null){
        res.send({message:"Invalid username"})
    }else{
        // check for password
        const status=await bcryptjs.compare(authorCred.password,dbAuthor.password)
        if(status===false){
            res.send({message:"Invalid password"})
        }else{
            // create jwt token and encode it
            const signedToken=jwt.sign({username:dbAuthor.username},process.env.SECRET_KEY,{expiresIn:'1d'})
             // send res
            res.send({message:"Login success",token:signedToken,user:dbAuthor})
        }
    }
}))



//read articles of author
authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get author's username from url
    const authorName=req.params.username;
    //get atricles whose status is true
    const articlesList=await articlescollection.find({username:authorName}).toArray()
    res.send({message:"List of atricles",payload:articlesList})

}))



//adding new article by author
authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    const newArticle=req.body;
    //console.log(newArticle)
    //post to articles collection
    await articlescollection.insertOne(newArticle)
    //sen res
    res.send({message:"New article created"})

}))


//modify article by author
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get modified article from client
    const modifiedArticle=req.body;
    //update by article id
    let result=await articlescollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}});
    let latestArticle=await articlescollection.findOne({articleId:modifiedArticle.articleId})
    //console.log(result)
    res.send({message:"Article modified",article:latestArticle})

}))



//deleting the article by article ID
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articleId from url
    const articleIdFromUrl=(+req.params.articleId);
    //get article
    const articleToDelete=req.body;
    //update status of article to false
    // await articlescollection.updateOne({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:false}})
    // res.send({message:"Article removed"})
    if(articleToDelete.status===true){
        let modifiedArt= await articlescollection.findOneAndUpdate({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
        res.send({message:"article deleted",payload:modifiedArt.status})
     }
     if(articleToDelete.status===false){
         let modifiedArt= await articlescollection.findOneAndUpdate({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
         res.send({message:"article restored",payload:modifiedArt.status})
     }
    
}))

// export authorApp
module.exports=authorApp;