import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Ensure the correct path to your CSS file

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const onRegisterFormSubmit = async (newUser) => {
    try {
      let res;
      if (newUser.userType === 'user') {
        res = await axios.post('http://localhost:5000/user-api/user', newUser);
      } else if (newUser.userType === 'author') {
        res = await axios.post('http://localhost:5000/author-api/author', newUser);
      }

      if (res.data.message === 'User created' || res.data.message === 'new author created') {
        navigate('/Login');
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErr('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="class1">
      <div className="p-3">
        <div className="text-center m-5">
          <div className="register d-block mx-auto w-50 container rounded-4 pt-4 pb-4 shadow-lg mx-5 my-5">
            <h1 className="display-2 text-dark fw-semibold my-4">Register</h1>

            {err && <p className="text-danger fs-3">{err}</p>}

            <form className="w-50 mx-auto" onSubmit={handleSubmit(onRegisterFormSubmit)}>
              <div className="mb-3">
                <div className="form-check form-check-inline fs-5">
                  <input
                    className="form-check-input"
                    type="radio"
                    {...register("userType", { required: true })}
                    value="author"
                  />
                  <label className="form-check-label">Author</label>
                </div>
                <div className="form-check form-check-inline fs-5">
                  <input
                    className="form-check-input"
                    type="radio"
                    {...register("userType", { required: true })}
                    value="user"
                  />
                  <label className="form-check-label">User</label>
                </div>
                {errors.userType && (
                  <h5 className="mx-4 text-start text-danger">Please select a role</h5>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="username" className="form-label"></label>
                <input
                  type="text"
                  {...register("username", { required: true })}
                  id="username"
                  className="form-control fs-5"
                  placeholder="Username"
                />
                {errors.username && <h5 className="mx-4 text-start text-danger">Username is required</h5>}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label"></label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  id="password"
                  className="form-control fs-5"
                  placeholder="Password"
                />
                {errors.password && <h5 className="mx-4 text-start text-danger">Password is required</h5>}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label"></label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  id="email"
                  className="form-control fs-5"
                  placeholder="E-mail"
                />
                {errors.email && <h5 className="mx-4 text-start text-danger">Email is required</h5>}
              </div>

              <button type="submit" className="btn btn-dark fs-4 fw-medium m-5">Register</button>

              <p className="lead text-dark text-center fw-semibold fs-3">
                Already registered !!
                <Link to="/Login" className="fs-4 fw-semibold text-dark">
                  <p className="lead fw-medium text-dark">Login Here!</p>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
