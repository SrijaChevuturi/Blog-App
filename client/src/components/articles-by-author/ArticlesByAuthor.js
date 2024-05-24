//import axios from "axios";
import {axiosWithToken} from '../../axiosWithToken'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ArticlesByAuthor.css";
import { useNavigate, redirect, Outlet } from "react-router-dom";

function ArticlesByAuthor() {
  const [articlesList, setArticlesList] = useState([]);
  let navigate = useNavigate();
  let { currentUser } = useSelector(
    (state) => state.userAuthorLoginReducer
  );

//   let token=localStorage.getItem('token')

//   const axiosWithToken=axios.create({
//     headers:{Authorization:`Bearer ${token}`}
//   })

  const getArticlesOfCurrentAuthor=async()=>{
    try{
    let res=await axiosWithToken.get(`http://localhost:5000/author-api/articles/${currentUser.username}`)
    console.log(res)
    setArticlesList(res.data.payload)
    }catch(error){
        console.error("Error fetching articles:",error);
    }
  }


  const readArticleByArticleId=(articleObj)=>{
    navigate(`../article/${articleObj.articleId}`,{state:articleObj})
  }


    useEffect(()=>{
      getArticlesOfCurrentAuthor()
    },[])

  // return (
  //   <div className='articles-page'>
  //     <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 m-5">
  //       {articlesList.map((article) => (
  //         <div className="col" key={article.articleId}>
  //           <div className="card h-100">
  //             <div className="card-body">
  //               <h5 className="card-title">{article.title}</h5>
  //               <p className="card-text text-black">
  //                 {article.content.substring(0, 80) + "...."}
  //               </p>
  //               <button className="btn btn-info custom-btn text-black btn-4" onClick={()=>readArticleByArticleId(article)}>
  //                 <span>Read More</span>
  //               </button>
  //             </div>
  //             <div className="card-footer">
  //               <small className="text-body-secondary">
  //                 Last updated on {article.dateOfModification}
  //               </small>
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //     <Outlet />
  //   </div>
  // );
  return (
    <div className='articles-page'>
    <div className='container'>
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 m-5">
      {articlesList.map((article) => (
        <div className="col" key={article.articleId}>
          <div className="card h-100 article-card">
            <div className="card-body">
              <h4 className="card-title">{article.title}</h4>
              <p className="card-text text-black">
                {article.content.substring(0, 80) + "...."}
              </p>
              <button className="btn btn-info custom-btn  btn-4" onClick={()=>readArticleByArticleId(article)}>
                <span>Read More</span>
              </button>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                Last updated on {article.dateOfModification}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
    <Outlet />
    </div>
  </div>
  )
}

export default ArticlesByAuthor;