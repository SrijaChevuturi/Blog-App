
import './App.css';
import RouteLayout from './components/RouteLayout';
import {lazy, Suspense} from 'react'
import {createBrowserRouter,Navigate,RouterProvider} from 'react-router-dom'
import Home from './components/home/Home';
import Register from './components/Register/Register';
import Login from 'H:/training/blog-app/client/src/components/Login/Login.jsx'
import AuthorProfile from 'H:/training/blog-app/client/src/components/author-profile/AuthorProfile.jsx';
import Userprofile from 'H:/training/blog-app/client/src/components/user-profile/Userprofile.jsx';
//import AddArticle from './components/add-article/AddArticle';
import Article from './components/article/Article';
import Articles from './components/articles/Articles';

import ArticlesByAuthor from './components/articles-by-author/ArticlesByAuthor';
import ErrorPage from './components/ErrorPage';

//dynamic import of addarticle
const AddArticle=lazy(()=>import('./components/add-article/AddArticle'))

function App() {


let router=createBrowserRouter([
  {
    path : '',
    element:<RouteLayout/>,
    errorElement:<ErrorPage />,
    children:[
      {
        path:'',
        element:<Home></Home>
      },
      {
        path:'home',
        element:<Home></Home>
      },
      {
        path:'Register',
        element:<Register></Register>
      },
      {
        path:'Login',
        element:<Login></Login>
      },
      {
        path:'user-profile',
        element:<Userprofile></Userprofile>,
        children:[
          {
            path:"articles",
            element:<Articles />
          },
          {
            path:"article/:articleId",
            element:<Article />
          },
          {
            path:'',
            element:<Navigate to='articles'/>
          }
        ]
      },
      {
        path:'author-profile',
        element:<AuthorProfile></AuthorProfile>,
        children:[
          {
            path:'new-article',
            element:<Suspense fallback="loading..."><AddArticle /></Suspense> 
          },
          {
            path:'articles-by-author/:author',
            element:<ArticlesByAuthor />,
          },
          {
            path:"article/:articleId",
            element:<Article />
          },
          {
            path:'',
            element:<Navigate to='articles-by-author/:author'></Navigate>
          }
        ]
      }
      

    ]
  }
]

)


  return (
    <div className="App">

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
