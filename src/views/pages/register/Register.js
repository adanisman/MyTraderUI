import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Register = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const openLogin = () => {
    console.log('OpenLogin')
    window.location.href = './login'
  }
  const submitHandler = (event) => {
    console.log('Submit On Register', registerMail.value)

    event.preventDefault()
    const enteredEmail = registerMail.value
    const enteredPassword = registerPassword.value
    const enteredRepeatPassword = registerRepeatPassword.value

    if (!enteredEmail.includes('@')) {
      setErrorMsg('Invalid Email Address')
    } else if (enteredPassword != enteredRepeatPassword) {
      setErrorMsg('The password and confirmation password do not match')
    } else {
      let signUpUrl

      signUpUrl =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjd2r-j28V1_km8m03Wm6vUBEDnvsWcGc'

      fetch(signUpUrl, {
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
        if (res.ok) {
          openLogin()
          // console.log('Login submit', username.value, '-', password.value)
        } else {
          res.json().then((data) => {
            let errorMessage = 'Authentication failed!'

            if (data && data.error.message) {
              errorMessage = data.error.message
              setErrorMsg(errorMessage)
              console.log('hata: ', errorMessage)
            }
          })
        }
      })
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={submitHandler}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  {/* <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" />
                  </CInputGroup> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" id="registerMail" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      id="registerPassword"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      id="registerRepeatPassword"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
                <CRow>
                  <p></p>
                  <CCol xs={100}>
                    {errorMsg && (
                      <CBadge color="danger" shape="rounded-pill">
                        {errorMsg}
                      </CBadge>
                    )}
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
