// @flow

import {Recipes,Categories,RecipeCates,Comments,sync} from '../src/testModels.js';


beforeAll(async () => {
  await sync;
});

describe('Recipes test', () => {
  it('correct data', async () => {
    let recipes = await Recipes.findAll();
    expect(
      recipes.map(recipe => recipe.toJSON()).map(recipe => ({
        id: recipe.id,
        name: recipe.name,
        author: recipe.author,
        picture: recipe.picture,
        time: recipe.time,
        directions: recipe.directions
      }))
    ).toEqual([
      {
        id: 1,
        name: 'EpleKake',
        author: 'Joey',
        picture: 'bilde.jpg',
        time: 30,
        directions: '1. blande opp powder'
      },
      {
        id: 2,
        name: 'Carbonana',
        author: 'Joey',
        picture: 'bilde.jpg',
        time: 30,
        directions: '1. koke opp nudler'
      }
    ]);
  });
});

describe('Categories test',() => {
  it('correct data', async () => {
    let categories = await Categories.findAll();
    expect(
      categories.map(category => category.toJSON()).map(category => ({
        id: category.id,
        name: category.name,
      }))
    ).toEqual([
      {
        id: 1,
        name: 'frokost'
      },
      {
        id: 2,
        name: 'middag'
      }
    ]);
  });
});

describe('Associations between Categories og Recipes test', () => {
    it('correct data', async() => {
       let reciepecates = await RecipeCates.findAll();
       expect(
         reciepecates.map(recipecate => recipecate.toJSON()).map(recipecate => ({
            RecipeId: recipecate.RecipeId,
            CategoryId: recipecate.CategoryId,
          }))
        ).toEqual([
            {
              RecipeId:1,
              CategoryId:1
            }
          ]);
      });
  });


  describe('Comments test and Association between Comments and Recipes', () => {
      it('correct data', async() => {
         let comments = await Comments.findAll();
         expect(
           comments.map(comment => comment.toJSON()).map(comment => ({
             id :comment.id,
             nickname:comment.nickname,
             comment: comment.comment,
             RecipeId: comment.RecipeId,
            }))
          ).toEqual([
              {
                id :1,
                nickname:"Joey",
                comment: "Delicous",
                RecipeId: 1,
              }
            ]);
        });
    });
