import "./AddArticle.css";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddArticle() {
  let { register, handleSubmit } = useForm();
  let { currentUser } = useSelector(
    (state) => state.userAuthorLoginReducer
  );
  let [err, setErr] = useState("");
  let navigate = useNavigate();
  let token=localStorage.getItem('token')
  //create axios with token
  const axiosWithToken=axios.create({
    headers:{Authorization:`Bearer ${token}`}
  })

  const postNewArticle = async (article) => {
    article.dateOfCreation = new Date();
    article.dateOfModification = new Date();
    article.articleId = Date.now();
    article.username = currentUser.username;
    article.comments = [];
    article.status = true;
   //make HTTP post req
   let res=await axiosWithToken.post('http://localhost:5000/author-api/article',article)
   console.log(res)
   if(res.data.message==='New article created'){
    navigate(`/author-profile/articles-by-author/${currentUser.username}`)
   }else{
    setErr(res.data.message)
   }
  };

  //<p style="white-space: pre-line">multi-line text</p>
  return (
    <div className="container">
      <div className="row justify-content-center mt-5 mb-5">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <div className="card shadow">
            <div className="form-container card-body">
              {/* {err.length!==0&&<p className='text-danger fs-5'>{err}</p>} */}
              <div className="card-title text-center border-bottom border-dark">
              <h2 className="p-3">Write an Article</h2>
            </div>
              <form onSubmit={handleSubmit(postNewArticle)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register("title",{required:true})}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Select a category
                  </label>
                  <select
                    {...register("category",{required:true})}
                    id="category"
                    className="form-select"
                  >
                    <option value="">Select category</option>
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI&ML</option>
                    <option value="database">Database</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    {...register("content",{require:true})}
                    className="form-control"
                    id="content"
                    rows="10"
                  ></textarea>
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-primary">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddArticle;