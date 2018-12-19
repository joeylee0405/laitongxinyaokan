// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';
import {
  Recipes,
  Categories,
  RecipeCates,
  Comments
} from './models.js';

type Request = express$Request;
type Response = express$Response;

let app = express();
const public_path = path.join(__dirname, '/../../client/public');
app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json


app.get('/recipes', (req: Request, res: Response) => {
  return Recipes.findAll({
    order: [['createdAt', 'DESC'],]
    }).then(recipes => res.send(recipes));
});


app.get('/categories/All/:id',(req: Request, res: Response) =>{
  return Recipes.findAll({
      order: [['createdAt', 'DESC'],],
      offset: (req.params.id-1)*8,
      limit: 8
    }).then(recipes => res.send(recipes));
});

app.get('/recipes/popular', (req: Request, res: Response) => {
  return Recipes.findAll({
    order: [['likes', 'DESC'],]
    }).then(recipes => res.send(recipes));
});

app.get('/categories', (req: Request, res: Response) => {
  return Categories.findAll().then(categories => res.send(categories));
});

app.get('/recipes/:id/categories',(req: Request, res:Respones) =>{
  return  Recipes.findOne({
    where:{
      id:Number(req.params.id)
    }
  }).then(
    recipe =>(recipe.getCategories())
    ).then(
      categories =>(categories.map(category=>category.id))
      ).then(categories=>Categories.findAll({
          where:{
            id:categories
          }
      })).then(categories => (categories? res.send(categories) : res.sendStatus(404)));
});

app.get('/recipes/:id/nocategories',(req: Request, res:Respones) =>{
  return  Recipes.findOne({
    where:{
      id:Number(req.params.id)
    }
  }).then(
    recipe =>(recipe.getCategories())
    ).then(
    categoriesmed=>(categoriesmed.map(category=> category.id))
      ).then(categories => Categories.findAll({
          where:{
            id:{$notIn: categories}
          }
      })).then(categories => (categories? res.send(categories) : res.sendStatus(404)));
});

app.post('/recipes/:id', (req: Request, res: Response) => {
  return RecipeCates.create({
    RecipeId: req.params.id,
    CategoryId: req.body.id
  }).then(res.send(count => (count ? res.sendStatus(202) : res.sendStatus(404))));
});


app.post('/recipes/:id/comments', (req: Request, res: Response) => {
  return Comments.create({
    nickname:req.body.nickname,
    comment: req.body.comment,
    RecipeId: req.params.id
  }).then(res.send(count => (count ? res.sendStatus(202) : res.sendStatus(404))));
});

app.get('/recipes/:id/comments', (req: Request, res: Response) => {
  return Comments.findAll({
      where:{
        RecipeId:Number(req.params.id)
      },
      order: [['createdAt', 'DESC'],]
    }).then(comments =>(comments? res.send(comments) : res.sendStatus(404)));
});

app.delete('/recipes/:id/categories',  (req: Request, res: Response) => {
  return RecipeCates.destroy({
    where: {
      RecipeId: Number(req.params.id),
      CategoryId: Number(req.body.id)
    }
  }).then(res.send(count => (count ? res.sendStatus(202) : res.sendStatus(404))));
});


app.get('/recipes/:id', (req: Request, res: Response) => {
  return Recipes.findOne({
    where: {
      id: Number(req.params.id)
    }
  }).then(
    recipe => (recipe ? res.send(recipe) : res.sendStatus(404))
  );
});


app.get('/categories/:name/recipes', (req: Request, res: Response) => {
  return Categories.findOne({
    where: {
      name: String(req.params.name)
    }
  }).then(
    category => (category.getRecipes())).then(recipes => (recipes ? res.send(recipes) : res.sendStatus(404)));
});

app.get('/categories/:name/:id', (req: Request, res: Response) => {
  return Categories.findOne({
    where: {
      name: String(req.params.name)
    }
  }).then(
    category => (category.getRecipes(
      {   order: [['createdAt', 'DESC'],],
          offset: (req.params.id-1)*8,
          limit: 8
        }
      ))).then(recipes => (recipes ? res.send(recipes) : res.sendStatus(404)));
});


app.delete('/categories/:id/recipes', (req: Request, res: Response) => {
  return RecipeCates.destroy({
    where: {
      RecipeId: Number(req.body.id),
      CategoryId: Number(req.params.id)
    }
  }).then(res.send(count => (count ? res.sendStatus(202) : res.sendStatus(404))));
});


app.put('/recipes', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  return Recipes.update({
    name: req.body.name,
    author: req.body.author,
    picture: req.body.picture,
    time: req.body.time,
    directions: req.body.directions
  }, {
    where: {
      id: req.body.id
    }
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});


app.put('/recipes/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Recipes.findOne({
    where: {
      id: Number(req.params.id)
   }
   }).then(recipe =>(
    recipe.update({
    likes: recipe.likes+1
    }))).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.post('/recipes', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);
  return Recipes.create({
    name: req.body.name,
    author: req.body.author,
    picture: req.body.picture,
    time: req.body.time,
    directions: req.body.directions
  }).then(
    recipe => (recipe ? res.send(recipe) : res.sendStatus(404))
  );
});

app.delete('/recipes/:id', (req: Request, res: Response) => {
  return Recipes.destroy({
    where: {
      id: Number(req.params.id)
    }
  }).then(count => (count ? res.sendStatus(200) : res.sendStatus(404)));
});

app.get('/categories/:name',(req: Request, res: Response) => {
  return Categories.findOne({
    where: {
      name: String(req.params.name)
    }
  }).then(
    category => (category ? res.send(category) : res.sendStatus(404))
  );
});

// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise < void > ((resolve, reject) => {
  app.listen(3000, error => {
    if (error) reject(error.message);
    console.log('Server started');
    resolve();
  });
});
