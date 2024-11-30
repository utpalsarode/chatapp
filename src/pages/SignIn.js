import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaPhone, FaEnvelope, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useFormik } from "formik";
import InputTextField from '../components/InputTextFiled';
import { ApiCall } from '../helper/axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/commonSlice';
// import * as Yup from "yup";
// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPass, setConfirmPass] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [initialValues, setInitialValues] = useState({
    username: '',
    reg_email: '',
    mobile_no: '',
    reg_password: '',
    confirm_pass: '',
    email: '',
    password: '',
  })

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: Yup.object({
    //   email: Yup.string().email().required("Please enter your email"),
    //   password: Yup.string().matches(passwordRules, { message: "Please create a stronger password" }).required("Please enter your password"),
    // }),
    onSubmit: (values) => {
      if (isLogin) {
        handleLogin(values)
      } else {
        handleRegister(values)
      }
    }
  })

  const handleRegister = async (values) => {
    try {
      // await axios.post("http://localhost:5000/api/auth/register", { name: formik.values.username, email: formik.values.reg_email, password: formik.values.reg_password })
      const data = {
        name: formik.values.username,
        email: formik.values.reg_email,
        password: formik.values.reg_password
      }
      let res = await ApiCall('POST', '/register', data);
      if (res.data.status === 'success' && res.data.statusCode === 200) {
        const detailData = res.data.data;
        localStorage.setItem("user", JSON.stringify(detailData.user));
        setIsLogin(true);
      } else {

      }
    }
    catch {
      console.log(formik.errors)
    }
  }

  const handleLogin = async (values) => {
    try {
      // await axios.post("http://localhost:5000/api/auth/login", { name: formik.values.email, password: formik.values.password })
      const data = {
        email: formik.values.email,
        password: formik.values.password
      }
      let res = await ApiCall('POST', '/login', data);
      if (res.data.status === 'success' && res.data.statusCode === 200) {
        const detailData = res.data.data;
        const userData = {
          user_data: detailData.user_data,
          token: detailData.token
        }
        localStorage.setItem("user", JSON.stringify(detailData.user_data));
        localStorage.setItem("access-token", detailData.token);
        dispatch(setUserData(userData))
        navigate('/');
      }
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
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            {/* <input type="email" name="email" className="form-style" value={formik.values.email} onChange={(e) => formik.setFieldValue('email', e.target.value)} placeholder="Email" id="email" autoComplete="off" /> */}
                            <InputTextField
                              value={formik.values.email}
                              className={'form-style'}
                              type="email"
                              id={'email'}
                              label='Email address'
                              placeholder='Email'
                              name='email'
                              autoComplete='on'
                              handleChange={(name, value) => { formik.setFieldValue(name, value) }}
                              handleBlur={formik.setFieldTouched}
                              invalid={formik.errors?.email && formik.touched?.email && true}
                              errors={formik.errors?.email}
                              touched={formik.touched?.email}
                            />
                            <i className="input-icon uil uil-at"><FaEnvelope /></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type={showPassword ? 'text' : 'password'} name="password" className="form-style" value={formik.values.password} onChange={(e) => formik.setFieldValue('password', e.target.value)} placeholder="Password" id="password" autoComplete="off" />
                            <i className="input-icon uil uil-lock-alt" onClick={handleShowPassword}>{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}</i>
                          </div>
                          <button className="btn mt-4" type='submit' onClick={() => { setIsLogin(true); formik.handleSubmit(); }}>submit</button>
                          <p className="mb-0 mt-4 text-center"><a href="/" className="link">Forgot your password?</a></p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <div className="avatar mb-3"><Link to={'/pickavatar'}><img src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" width="80px" alt="avatar" /></Link></div>
                          {/* <h4 className="mb-4 pb-3">Sign Up</h4> */}
                          <div className="form-group">
                            <input type="text" name="username" className="form-style" value={formik.values.username} onChange={(e) => formik.setFieldValue('username', e.target.value)} placeholder="Username" id="username" autoComplete="off" />
                            <i className="input-icon uil uil-user"><FaUser /></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="number" name="mobile_no" className="form-style" value={formik.values.mobile_no} onChange={(e) => formik.setFieldValue('mobile_no', e.target.value)} placeholder="Mobile No." id="mobile_no" autoComplete="off" />
                            <i className="input-icon uil uil-at"><FaPhone /></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type="email" name="reg_email" className="form-style" value={formik.values.reg_email} onChange={(e) => formik.setFieldValue('reg_email', e.target.value)} placeholder="Email" id="reg_email" autoComplete="off" />
                            <i className="input-icon uil uil-at"><FaEnvelope /></i>
                          </div>
                          <div className="form-group mt-2">
                            <input type={showPassword ? 'text' : 'password'} name="reg_password" className="form-style" value={formik.values.reg_password} onChange={(e) => formik.setFieldValue('reg_password', e.target.value)} placeholder="Password" id="reg_password" autoComplete="off" />
                            <i className="input-icon uil uil-lock-alt" onClick={handleShowPassword}>{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}</i>
                          </div>
                          <div className="form-group mt-2">
                            <input type={confirmPass ? 'text' : 'password'} name="confirm_pass" className="form-style" value={formik.values.confirm_pass} onChange={(e) => formik.setFieldValue('confirm_pass', e.target.value)} placeholder="Confirm Password" id="confirm_pass" autoComplete="off" />
                            <i className="input-icon uil uil-lock-alt" onClick={handleConfirmPass}>{confirmPass ? <FaRegEyeSlash /> : <FaRegEye />}</i>
                          </div>
                          <button className="btn mt-4" type='submit' onClick={() => { setIsLogin(false); formik.handleSubmit(); }}>submit</button>
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