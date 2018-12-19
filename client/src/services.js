//@flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);

class Recipe {
  id : number;
  name: string;
  author: string;
  picture: string;
  time: number;
  directions: string;
  createdAt: string;
  updatedAt:string;
  likes: number;
}

class Category{
  id: number;
  name: string;
}

class Comment{
  nickname: string;
  comment: string;
}

class RecipeService {
  getRecipe(id:Number): Promise<Recipe>{
    return axios.get('/recipes/'+id);
  }

  getRecipes(): Promise<Recipe[]>{
    return axios.get('/recipes');
  }

  getAllRecipes(id:Number): Promise<Recipe[]>{
    return axios.get('/categories/All/'+id);
  }

  getPopularRecipes():Promise<Recipe[]>{
    return axios.get('/recipes/popular');
  }

  addRecipe(recipe: Recipe): Promise<Recipe>{
    return axios.post('/recipes' , recipe);
  }

  addCategory(recipeid:Number,category:Category): Promise<void>{
    return axios.post('/recipes/'+recipeid,category);
  }

  deleteCategory(id:number,category:Category): Promise<String>{
    return axios.delete('/recipes/'+id+'/categories' ,{data:category});
  }

  updateRecipe(recipe: Recipe): Promise<void>{
    return axios.put('/recipes',recipe);
  }

  deleteRecipe(id:Number): Promise<void>{
    return axios.delete('/recipes/'+id);
  }

  getCategories(id:Number): Promise<Category[]>{
    return axios.get('/recipes/'+id+'/categories');
  }

  getNonCategories(id:Number): Promise<Category[]>{
    return axios.get('/recipes/'+id+'/nocategories');
  }

  addlikes(id:Number):Promise<void>{
    return axios.put('/recipes/'+id);
  }

  addComment(id:Number,comment:Comment): Promise<void>{
    return axios.post('/recipes/'+id + '/comments',comment);
  }

  getComments(id:Number): Promise<Comment[]>{
    return axios.get('/recipes/'+id+'/comments');
  }

}

export let recipeService = new RecipeService();

class CategoryService{
  getCategories():Promise<Category[]>{
    return axios.get('/categories');
  }

  getCategory(name:String):Promis<Category>{
    return axios.get('/categories/'+name);
  }

  getRecipeFromCategory(name:String,id:Number):Promise<Recipe[]>{
    return axios.get('/categories/'+name+'/'+id);
  }

  getAllRecipeFromCategory(name:String):Promise<Recipe[]>{
    return axios.get('/categories/'+name+'/recipes');
  }
}

export let categoryService = new CategoryService();
