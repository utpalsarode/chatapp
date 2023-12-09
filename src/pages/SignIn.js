import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaPhone, FaEnvelope, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useFormik } from "formik";
import axios from 'axios';
// import * as Yup from "yup";
// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const SignIn = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPass, setConfirmPass] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  console.log('islogin', isLogin)
  // const [initialValues, setInitialValues] = useState(
  //   {
  //     username: '',
  //     reg_email: '',
  //     mobile_no: '',
  //     reg_password: '',
  //     confirm_pass: '',
  //     email: '',
  //     password: '',
  //   })

  const formik = useFormik({
    initialValues: {
      username: '',
      reg_email: '',
      mobile_no: '',
      reg_password: '',
      confirm_pass: '',
      email: '',
      password: '',
    },
    // validationSchema: Yup.object({
    //   email: Yup.string().email().required("Please enter your email"),
    //   password: Yup.string().matches(passwordRules, { message: "Please create a stronger password" }).required("Please enter your password"),
    // }),
    onSubmit: (values) => {
      if (isLogin) {
        console.log('loginvalues', values)
        handleLogin(values)
      } else {
        console.log('regvalues', values)
        handleRegister(values)
      }
      localStorage.setItem("user", JSON.stringify(values));
      navigate("/signin");
    }
  })

  const handleRegister = async (values) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {name: formik.values.username, email: formik.values.reg_email, password: formik.values.reg_password})
    }
    catch {
      console.log(formik.errors)
    }
  }

  const handleLogin = async (values) => {
    try {
      await axios.post("http://localhost:5000/api/auth/login", {name: formik.values.email, password: formik.values.password})
    }
    catch {
      console.log(formik.errors)
    }
    setIsLogin(false)
  }

  const handleShowPassword = () => {
    if (showPassword === false) {
      setShowPassword(true)
    } else {
      setShowPassword(false)
    }
  }

  const handleConfirmPass = () => {
    if (confirmPass === false) {
      setConfirmPass(true)
    } else {
      setConfirmPass(false)
    }
  }
  return (
    <>

      <div class="section">
        <div class="container">
          <div class="row full-height justify-content-center">
            <div class="col-12 text-center align-self-center py-5">
              <div class="section pt-5 pt-sm-2 text-center">
                <h6 class="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                <input class="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                <label for="reg-log"></label>
                <div class="card-3d-wrap mx-auto">
                  <div class="card-3d-wrapper">
                    <div class="card-front">
                      <div class="center-wrap">
                        <div class="section text-center">
                          <h4 class="mb-4 pb-3">Log In</h4>
                          <div class="form-group">
                            <input type="email" name="email" class="form-style" value={formik.values.email} onChange={(e) => formik.setFieldValue('email', e.target.value)} placeholder="Email" id="email" autocomplete="off" />
                            <i class="input-icon uil uil-at"><FaEnvelope /></i>
                          </div>
                          <div class="form-group mt-2">
                            <input type={showPassword ? 'text' : 'password'} name="password" class="form-style" value={formik.values.password} onChange={(e) => formik.setFieldValue('password', e.target.value)} placeholder="Password" id="password" autocomplete="off" />
                            <i class="input-icon uil uil-lock-alt" onClick={handleShowPassword}>{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}</i>
                          </div>
                          <Link to='/signin' class="btn mt-4" onClick={()=>{formik.handleSubmit(); setIsLogin(true)}}>submit</Link>
                          <p class="mb-0 mt-4 text-center"><a href="/" class="link">Forgot your password?</a></p>
                        </div>
                      </div>
                    </div>
                    <div class="card-back">
                      <div class="center-wrap">
                        <div class="section text-center">
                          <div className="avatar mb-3"><Link to={'/pickavatar'}><img src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" width="80px" alt="avatar" /></Link></div>
                          {/* <h4 class="mb-4 pb-3">Sign Up</h4> */}
                          <div class="form-group">
                            <input type="text" name="username" class="form-style" value={formik.values.username} onChange={(e) => formik.setFieldValue('username', e.target.value)} placeholder="Username" id="username" autocomplete="off" />
                            <i class="input-icon uil uil-user"><FaUser /></i>
                          </div>
                          <div class="form-group mt-2">
                            <input type="number" name="mobile_no" class="form-style" value={formik.values.mobile_no} onChange={(e) => formik.setFieldValue('mobile_no', e.target.value)} placeholder="Mobile No." id="mobile_no" autocomplete="off" />
                            <i class="input-icon uil uil-at"><FaPhone /></i>
                          </div>
                          <div class="form-group mt-2">
                            <input type="email" name="reg_email" class="form-style" value={formik.values.reg_email} onChange={(e) => formik.setFieldValue('reg_email', e.target.value)} placeholder="Email" id="reg_email" autocomplete="off" />
                            <i class="input-icon uil uil-at"><FaEnvelope /></i>
                          </div>
                          <div class="form-group mt-2">
                            <input type={showPassword ? 'text' : 'password'} name="reg_password" class="form-style" value={formik.values.reg_password} onChange={(e) => formik.setFieldValue('reg_password', e.target.value)} placeholder="Password" id="reg_password" autocomplete="off" />
                            <i class="input-icon uil uil-lock-alt" onClick={handleShowPassword}>{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}</i>
                          </div>
                          <div class="form-group mt-2">
                            <input type={confirmPass ? 'text' : 'password'} name="confirm_pass" class="form-style" value={formik.values.confirm_pass} onChange={(e) => formik.setFieldValue('confirm_pass', e.target.value)} placeholder="Confirm Password" id="confirm_pass" autocomplete="off" />
                            <i class="input-icon uil uil-lock-alt" onClick={handleConfirmPass}>{confirmPass ? <FaRegEyeSlash /> : <FaRegEye />}</i>
                          </div>
                          <Link to='/signin' class="btn mt-4" onClick={formik.handleSubmit}>submit</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn