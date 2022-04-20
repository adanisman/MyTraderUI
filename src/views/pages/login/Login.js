import React, { useState, useEffect, useReducer } from 'react'
import classes from './Login.module.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const openRegister = () => {
    console.log('OpenRegister')
    window.location.href = './register'
  }
  const submitHandler = (event) => {
    event.preventDefault()
    const enteredEmail = email.value
    const enteredPassword = password.value
    setIsLoading(true)

    let signInUrl

    signInUrl =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjd2r-j28V1_km8m03Wm6vUBEDnvsWcGc'

    // signUpUrl =
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjd2r-j28V1_km8m03Wm6vUBEDnvsWcGc'

    fetch(signInUrl, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      setIsLoading(false)
      if (res.ok) {
        props.onLogin(enteredEmail, enteredPassword)
        // console.log('Login submit', username.value, '-', password.value)
      } else {
        res.json().then((data) => {
          let errorMessage = 'Authentication failed!'

          if (data && data.error.message) {
            errorMessage = data.error.message
            setErrMsg(errorMessage)
            console.log('hata: ', errorMessage)
          }
        })
      }
    })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={submitHandler}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="email" id="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                  <CRow>
                    <p></p>
                    <CCol xs={60}>
                      {errMsg && (
                        <CToast
                          autohide={true}
                          visible={true}
                          color="danger"
                          className="text-white align-items-center"
                        >
                          <div className="d-flex">
                            <CToastBody>{errMsg}</CToastBody>
                          </div>
                        </CToast>
                      )}
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Sign up for a FREE trader account</p>
                    <CButton
                      color="info"
                      className="px-4"
                      active
                      tabIndex={-1}
                      onClick={openRegister}
                    >
                      Register Now!
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
