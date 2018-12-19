//@flow

import Sequelize from 'sequelize';
import type { Model } from 'sequelize';

let sequelize = new Sequelize('Recipe', 'root', '', {
  host: process.env.CI ? 'mysql' : 'localhost', // The host is 'mysql' when running in gitlab CI '127.0.0.1'
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


export let Recipes: Class <
  Model < {
    id ? : number,
    name: string,
    author: string,
    picture: string,
    time: number,
    directions: string
  } >
  >
  = sequelize.define('Recipes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    author: {
      type: Sequelize.STRING,
      defaultValue: "Unknown"
    },
    picture: Sequelize.STRING,
    time: Sequelize.INTEGER,
    directions: Sequelize.TEXT
  },{
    freezeTableName: true,
    timestamps: false
  });

  export let Categories: Class <
    Model < {
      id ? : number,
      name: string
    } >
    >
    = sequelize.define('Categories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING
    }, {
      freezeTableName: true,
      timestamps: false
    });




  export let RecipeCates: Class <
    Model < {
      RecipeId: number,
      CategoryId: number
    } >
    >
    = sequelize.define('RecipeCate', {}, {
      timestamps: false
    });

  export let Comments: Class <
    Model <{
      id ?:number,
      nickname:string,
      comment: string,
      RecipeId: number
    }>
    >
    = sequelize.define('Comment',{
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nickname:{
        type: Sequelize.STRING,
        defaultValue: "Unknown"
      },
      comment:{
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  Recipes.hasMany(Comments);

  Recipes.belongsToMany(Categories, {
    through: 'RecipeCate',
  });
  Categories.belongsToMany(Recipes, {
    through: 'RecipeCate',
  });



// The sync promise can be used to wait for the database to be ready (for instance in your tests)
export let sync = sequelize.sync({force:true}).then(() => {
    return Recipes.create({
      name: 'EpleKake',
      author: 'Joey',
      picture: 'bilde.jpg',
      time: 30,
      directions: '1. blande opp powder'
    }).then(() =>
      Recipes.create({
        name: 'Carbonana',
        author: 'Joey',
        picture: 'bilde.jpg',
        time: 30,
        directions: '1. koke opp nudler'
      })
    ).then(() =>
      Categories.create({
        name: 'frokost'
      })
    ).then(() =>
      Categories.create({
        name: 'middag'
      })
    ).then(() =>
      RecipeCates.create({
        RecipeId: 1,
        CategoryId: 1
      })
    ).then(() =>
      Comments.create({
        nickname: "Joey",
        comment:"Delicous",
        RecipeId: 1
      })
    )
});
