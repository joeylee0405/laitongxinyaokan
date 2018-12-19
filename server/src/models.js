//@flow

import Sequelize from 'sequelize';
import type {
  Model
} from 'sequelize';

let sequelize = new Sequelize('jingyili', 'jingyili', 'YwWC3YlU', {
  host: 'mysql.stud.iie.ntnu.no', // The host is 'mysql' when running in gitlab CI
  dialect: 'mysql', //the name of your databse

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
    directions: string,
    createdAt: Date,
    updatedAt: Date,
    likes:number
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
    directions: Sequelize.TEXT,
    likes: Sequelize.INTEGER
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



export let sync = sequelize.sync();
