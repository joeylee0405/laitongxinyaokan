//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component,sharedComponentData } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert,Card, NavBar,ListGroup,Row, Column, Button, Form  } from './widgets';
import { recipeService,categoryService } from './services';
import createHashHistory from 'history/createHashHistory';


const history = createHashHistory();


class Menu extends Component {
  categories = [];
  render() {
    return (
      <>
        <NavBar>
          <NavBar.Brand>Home</NavBar.Brand>
          <NavBar.Link to={"/categories/All/1"}> All </NavBar.Link>
          <NavBar.Link to={"/categories/Breakfast&bunch/1"}> Breakfast&bunch </NavBar.Link>
          <NavBar.Link to={"/categories/Dinner/1"}> Dinner </NavBar.Link>
          <NavBar.Link to={"/categories/Dessert/1"}> Dessert </NavBar.Link>
          <NavBar.Link to={"/categories/Vegetarians/1"}> Vegetarians </NavBar.Link>
          <NavBar.Link to={"/categories/Asian/1"}> Asian </NavBar.Link>
          <NavBar.Button to="/recipes">Add Recipe</NavBar.Button>
        </NavBar>
        <div className="jumbotron">
          <div className="container text-center">
            <h1><strong>What should I eat today?</strong></h1>
            <p>We have always a choice for you  to choose</p>
          </div>
        </div>
     </>
    );
  }
  mounted(){
    categoryService
    .getCategories()
    .then(categories =>(this.categories=categories))
    .catch((error: Error) => Alert.danger(error.message));
  }
}

class Home extends Component {
  recipes =[];
  popularrecipes =[];
  recipe1 = new Object();

  render() {
    return (
      <>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">

      {this.recipes.slice(0,1).map(recipe=>(
        <div class="carousel-item active">
          <img class="d-block w-100" src="../bilde.jpg" height="400" width="300" alt="First slide"/>
          <div class="carousel-caption">
            <h4> New Recipe </h4><ul/>
            <h5>Created at {recipe.createdAt.slice(0,16).replace("T", " ")}</h5>
            <p><NavLink to={'/recipes/' + recipe.id} activeClassName="active ">{recipe.name}</NavLink></p>
          </div>
        </div>))}

      {this.recipes.slice(1,2).map(recipe=>(
        <div class="carousel-item">
        <img class="d-block w-100" src="../bilde.jpg" height="400" width="300" hialt="Second slide"/>
        <div class="carousel-caption">
          <h4> New Recipe </h4><ul/>
          <h5>Created at {recipe.createdAt.slice(0,16).replace("T", " ")}</h5>
          <p><NavLink to={'/recipes/' + recipe.id} activeClassName="active ">{recipe.name}</NavLink></p>
        </div>
        </div>))}

      {this.recipes.slice(2,3).map(recipe=>(
        <div class="carousel-item">
        <img class="d-block w-100" src="../bilde.jpg" height="400" width="300" alt="Third slide"/>
        <div class="carousel-caption">
          <h4> New Recipe </h4><ul/>
          <h5>Created at {recipe.createdAt.slice(0,16).replace("T", " ")}</h5>
          <p><NavLink to={'/recipes/' + recipe.id} activeClassName="active ">{recipe.name}</NavLink></p>
        </div>
        </div>))}

        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
        </a>

        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
        </a>
      </div>
  </div>
  <br/><br/>
      <div className="container-fluid bg-3 text-center">
          <br/><br/><h3>The Top 8 Most Popular</h3><br/><br/>
              <div className="row">
              {this.popularrecipes.slice(0,8).map(recipe=> (
                <div className="col-sm-3" key={recipe.id}>
                  <br/><br/><p><NavLink to={'/recipes/' + recipe.id} activeClassName="active ">{recipe.name}</NavLink></p>
                  <img src={recipe.picture} className=".img-circle" height="200" width="300" alt="Image" />
                  <p>Total Likes: {recipe.likes}</p>
                </div>
                ))}
                </div>
          </div><br/><br/>
      </>
    );
  }

  mounted(){
    recipeService
      .getRecipes()
      .then(recipes => (this.recipes = recipes))
      .catch((error: Error) => Alert.danger(error.message));

    recipeService
      .getPopularRecipes()
      .then(recipes => (this.popularrecipes = recipes))
      .catch((error: Error) => Alert.danger(error.message));
  };
}

//to slice a array with a particular size
function sliceArray(array, size) {
    var result = [];
    for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
    }
    return result;
}


function count(array) {
    var result = [];
    for (var x = 1; x < array.length+1; x++) {
        result.push(x);
    }
    return result;
}

class AllRecipes extends Component<{ match: { params: { id: number } } }>{
  recipes=new Array();
  allrecipes=new Array();
  recipe = sliceArray(this.allrecipes, 8);
  a = 0;
  render(){
    console.table(sliceArray(this.allrecipes, 8));
    return(
      <>
      <div class="container-fluid bg-3 text-center">
          <br/><br/><h3>All Recipes</h3><br/><br/>
            <div class="row">
              {this.recipes.map(recipe=> (
                <div class="col-sm-3">
                  <br/><br/><p><strong><NavLink to={'/recipes/' + recipe.id} activeClassName="active">{recipe.name}</NavLink></strong></p>
                  <img src={recipe.picture} class=".img-circle" height="200" width="300" alt="Image"/>
                  <br/><p> Created by {recipe.author}</p>
                </div>
                ))}
            </div>
      </div><br/><br/>
      <div id='toolbar'>
        <div class='wrapper text-center'>
              <div class="btn-group">
              {(count(sliceArray(this.allrecipes, 8))).map(recipe => (
                <button type="button" class="btn btn-outline-dark" onClick={() => history.push('/categories/All/'+recipe)}>{recipe}</button>
                ))}
              </div>
        </div>
      </div>
      </>
    )
  }

  mounted(){
    recipeService
      .getAllRecipes(this.props.match.params.id)
      .then(recipes => (this.recipes = recipes))
      .catch((error: Error) => Alert.danger(error.message));

    recipeService
      .getRecipes()
      .then(recipes => (this.allrecipes = recipes))
      .catch((error: Error) => Alert.danger(error.message));

  }
}

class RecipeDetails extends Component<{ match: { params: { id: number } } }>{
  recipe = null;
  newcomment =new Object();
  comments = [];
  categories = [];
  render(){
    if(!this.recipe) return null;
    return(
      <>
      <div class="card text-center">
        <div class="card-header">
            Create by {this.recipe.author}
          <div class="card-header-pills text-left" >
          <Button.Success onClick={() => history.push('/')}>Back</Button.Success>
          </div>
        </div>
        <div class="card-body">
          {this.categories.map(category =>
            <p> <NavLink to={'/categories/' + category.id} activeClassName="active">{category.name}</NavLink></p>)}
            <h3 class="card-title">{this.recipe.name}</h3>
          <img src={this.recipe.picture} height="550" width="800" /><br/><br/>
           <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
          <h4 class="card-text"><span class="glyphicon glyphicon-time" aria-hidden="true">Total time：{this.recipe.time} min</span></h4>
          <p class="card-text text-left" width="100"><strong>Directions:</strong></p>
          <p class="card-text text-left" width="100"><pre>{this.recipe.directions}</pre></p>

          <Button.Light onClick={() => history.push('/recipes/'+this.recipe.id+'/Edit')}>Edit</Button.Light>
          <Button.Danger onClick={this.delete}>Delete</Button.Danger><br/><br/>
          <p>Press the button if you like this recipe</p>
          <button type="button" class="btn btn-primary btn-sm" onClick={this.like}>Like</button>
          <p>Total likes: {this.recipe.likes}</p>
        </div>
        <div class="card-footer text-muted">
          Created at {this.recipe.createdAt.slice(0,16).replace("T", " ")}, Updated At{this.recipe.updatedAt.slice(0,16).replace("T", " ")}
        </div>
      </div>
      <div class="card text-center">
      <div class="card-header">
        Review
      </div>
      <div class="card-body">
      </div>
      <Form.Input
        type="text"
        label="Nickname"
        value={this.nickname}
        onChange={event => (this.newcomment.nickname = event.target.value)}
      />
      <Form.Input
        type="text"
        label="Comment"
        value={this.comment}
        onChange={event => (this.newcomment.comment = event.target.value)}
        required
      />
      <Button.Success onClick={this.save}>Save</Button.Success>
      <Card title="Comments">
        <ListGroup>
          {this.comments.map(com => (
            <ListGroup.Item key={com.id}>
              {com.nickname} : {com.comment}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      </div>
      </>
    )
  }
  mounted(){
    recipeService
      .getRecipe(this.props.match.params.id)
      .then(recipe => (this.recipe = recipe))
      .catch((error: Error) => Alert.danger("error.message"));

    recipeService
      .getComments(this.props.match.params.id)
      .then(comments =>(this.comments = comments))
      .catch((error: Error) => Alert.danger("error.message"));

    recipeService
      .getCategories(this.props.match.params.id)
      .then(categories => (this.categories=categories))
      .catch((error: Error) => Alert.danger("error.message"));

  }

  delete(){
    recipeService
    .deleteRecipe(this.props.match.params.id)
    .then(()=> {
        let homelist = Home.instance();
        if(homelist) Home.mounted();
        history.push('/');
      })
    .catch((error: Error)=>Alert.danger(error.message));
  }

  like(){
    recipeService
    .addlikes(this.props.match.params.id)
    .then(()=> {
        let recipedetails = RecipeDetails.instance();
        recipedetails.mounted();
        history.push('/recipes/'+recipe.id);
      })
    .catch((error: Error)=>Alert.danger(error.message))
    alert("Thank you");
  }

  save(){
    if(this.newcomment.comment==""||this.newcomment.comment==null)return alert("Comment Cannot Be Blank");
    if(this.newcomment.nickname==""){
      this.newcomment.nickname="Unknown";
    };
    recipeService
    .addComment(this.props.match.params.id,this.newcomment)
    .then(()=> {
      let recipedetails = RecipeDetails.instance();
      recipedetails.mounted();
      history.push('/recipes/'+recipe.id);
    })
    .catch((error: Error)=>Alert.danger(error.message))
  }
}

function IsNum(s)
{
    if (s!=null && s!="")
    {
        return !isNaN(s);
    }
    return false;
}

class RecipeNew extends Component{
  Recipe = new Object();
  render(){
    return (
      <Card title="New Recipe">
        <form ref={e => (this.form = e)}>
          <Form.Input
            type="text"
            label="Recipe Name"
            value={this.name}
            onChange={event => (this.Recipe.name = event.target.value)}
            required
          />
          <Form.Input
            type="text"
            label="Author"
            value={this.author}
            onChange={event => (this.Recipe.author = event.target.value)}
            required
          />
          <Form.Input
            type="int"
            label="Time"
            value={this.time}
            onChange={event => (this.Recipe.time = event.target.value)}
            required
          />
          <Form.Input
            type="text"
            label="Picture (From internett)"
            value={this.picture}
            onChange={event => (this.Recipe.picture = event.target.value)}
            required
          />
          <form role="form">
          <div class="form-group">
          <label for="directions">Directions</label>
          <textarea class="form-control" rows="5" value={this.Recipe.directions} onChange={event => (this.Recipe.directions = event.target.value)}></textarea>
          </div>
          </form>
          <p>You can add the categories for you recipe later</p>
          <Button.Success onClick={this.create}>Create recipe</Button.Success>
          <Button.Light onClick={() => history.push('/')}>Cancel</Button.Light>
        </form>
      </Card>
    );
  }

  create(){
    if(this.Recipe.name==""||this.Recipe.name==null)return alert("The Name of Recipe Cannot Be Blank");
    if(!IsNum(this.Recipe.time)||this.Recipe.time==null) return alert("The cooking time have to be the number");
    var name = document.getElementById("exampleFormControlFile1");
    console.log(name);
    recipeService
      .addRecipe(this.Recipe)
      .then(Alert.success("Success"))
      .then(recipe=> {
          history.push('/recipes/'+recipe.id+'/Edit');
        })
      .catch((error: Error) => alert(error.message));

  }

}


class RecipeEdit extends Component<{ match: { params: { id: number } } }> {
  recipe = null;
  categoriesRegistration =[];
  categoriesNonRegistration=[];

  render(){
    if(!this.recipe)return null;

    return(
      <Card title="Edit">
        <form ref={e => (this.form = e)}>
          <Form.Input
            type="text"
            label="Recipe Name"
            value={this.recipe.name}
            onChange={event => (this.recipe.name = event.target.value)}
            required
          />
          <Form.Input
            type="text"
            label="Author"
            value={this.recipe.author}
            onChange={event => (this.recipe.author = event.target.value)}
            required
          />
          <Form.Input
            type="text"
            label="Picture"
            value={this.recipe.picture}
            onChange={event => (this.recipe.picture = event.target.value)}
            required
          />
          <Form.Input
            type="text"
            label="Time"
            value={this.recipe.time}
            onChange={event => (this.recipe.time = event.target.value)}
            required
          />
          <form role="form">
            <div class="form-group">
              <label for="directions">Directions</label>
              <textarea class="form-control" rows="5" value={this.recipe.directions} onChange={event => (this.recipe.directions = event.target.value)}></textarea>
            </div>
          </form>

          <Button.Success onClick={this.save}>Save</Button.Success>
          <Button.Light onClick={() => history.push('/')}>Cancel</Button.Light>

          <Card title="Categories">
          <b> Registered </b>
          <ListGroup>
            {this.categoriesRegistration.map(category=> (
              <ListGroup.Item>
              <Row>
              <Column width={4}>{category.name}</Column>
              <Column width={8}>
              <Button.Danger onClick={()=>this.deletecategories(category)}>-</Button.Danger>
              </Column></Row></ListGroup.Item>
            ))}
          </ListGroup>

          <b>Not Registered</b>
          <ListGroup>
              {this.categoriesNonRegistration.map(category=> (
              <ListGroup.Item>
              <Row>
              <Column width={4}>{category.name}</Column>
              <Column width={8}>
              <Button.Success onClick={()=>this.addcategories(category)}>+</Button.Success>
              </Column></Row></ListGroup.Item>
              ))}
          </ListGroup>
          </Card>
        </form>
      </Card>
      );
    }

  mounted(){
    recipeService
      .getRecipe(this.props.match.params.id)
      .then(recipe => (this.recipe = recipe))
      .catch((error: Error) => Alert.danger(error.message));

    recipeService
      .getCategories(this.props.match.params.id)
      .then(categoriesRegistration=>(this.categoriesRegistration=categoriesRegistration))
      .catch((error: Error) => Alert.danger(error.message));

    recipeService
      .getNonCategories(this.props.match.params.id)
      .then(categoriesNonRegistration=>(this.categoriesNonRegistration=categoriesNonRegistration))
      .catch((error: Error) => Alert.danger(error.message));

  }

  save(){
    if(this.recipe.name==""||this.recipe.name==null||this.recipe.name==" ")return alert("The Name of Recipe Cannot Be Blank");
    if(!IsNum(this.recipe.time)||this.recipe.time==null) return alert("The cooking time have to be the number");
    recipeService
      .updateRecipe(this.recipe)
      .then(()=> {
        if(this.recipe) history.push('/recipes/'+this.recipe.id);
        })
      .catch((error: Error) => Alert.danger(error.message));
  }

  addcategories(category:Category){
    recipeService
      .addCategory(this.props.match.params.id,category)
      .then(()=> {
          let categorieslist = RecipeEdit.instance();
          if(categorieslist) categorieslist.mounted();
        })
      .catch((error: Error) => Alert.danger(error.message));
  }

  deletecategories(category:Category){
    recipeService
      .deleteCategory(this.props.match.params.id,category)
      .then(()=> {
          let categorieslist = RecipeEdit.instance();
          if(categorieslist) categorieslist.mounted();
        })
      .catch((error: Error) => Alert.danger(error.message));
  }
}


class CategoryDetails extends Component<{ match: { params: { name: string, id: number} } }> {
   recipes = [];
   allrecipes = [];
   category = new Object();

   render(){
     return(
       <>
       <div class="container-fluid bg-3 text-center">
        <br/><br/><h3>{this.category.name}</h3><br/>
               <div class="row">
               {this.recipes.map(recipe=> (
                 <div class="col-sm-3">
                   <br/><br/><p><strong><NavLink to={'/recipes/' + recipe.id} activeClassName="active">{recipe.name}</NavLink></strong></p>
                   <img src={recipe.picture} class=".img-circle" height="200" width="300" alt="Image" />
                   <br/><br/>
                 </div>
                 ))}<br/><br/>
             </div>
             </div>
             <br/><br/>
             <div id='toolbar'>
               <div class='wrapper text-center'>
                     <div class="btn-group">
                     {(count(sliceArray(this.allrecipes, 8))).map(recipe => (
                       <button type="button" class="btn btn-outline-dark" onClick={() => history.push('/categories/'+this.category.name+'/'+recipe)}>{recipe}</button>
                       ))}
                     </div>
               </div>
             </div>
          </>
    );
   }

   mounted(){
     categoryService
     .getRecipeFromCategory(this.props.match.params.name,this.props.match.params.id)
     .then(recipes=>(this.recipes=recipes))
     .catch((error: Error) => Alert.danger(error.message));

     categoryService
     .getCategory(this.props.match.params.name)
     .then(category=>(this.category=category))
     .catch((error: Error) => Alert.danger(error.message));

     categoryService
     .getAllRecipeFromCategory(this.props.match.params.name)
     .then(recipes=>(this.allrecipes=recipes))
     .catch((error: Error) => Alert.danger(error.message));

   }

}






const root = document.getElementById('root');
if(root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Menu />
        <Route exact path="/" component={Home} />
        <Route exact path="/recipes" component={RecipeNew} />
        <Route exact path="/recipes/:id" component={RecipeDetails} />
        <Route exact path="/recipes/:id/Edit" component={RecipeEdit} />
        <Route exact path="/categories/All/:id" component={AllRecipes} />
        <Route exact path="/categories/:name/:id" component={CategoryDetails} />
      </div>
    </HashRouter>,
    root
  );
