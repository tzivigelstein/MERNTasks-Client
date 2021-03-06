import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/auth/authContext'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'

const SignUp = props => {
  const authContext = useContext(AuthContext)
  const { msg, auth, registerUser, visualLoading } = authContext

  const alertContext = useContext(AlertContext)
  const { alert, showAlert } = alertContext

  useEffect(() => {
    if (auth) {
      props.history.push('/projects')
    } else if (msg) {
      showAlert(msg.msg, msg.category)
    }
    //eslint-disable-next-line
  }, [msg, auth, props.history])

  //State de registro de sesión

  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    confirm: '',
  })

  //Extraer del state user

  const { name, email, password, confirm } = user

  //Lectura de datos del form

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  //Submit del signup

  const onSubmit = e => {
    e.preventDefault()

    //Validacion de los datos
    if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === '') {
      showAlert('All fields are required', 'alerta-error')
      return
    } else if (password.length < 6) {
      showAlert('Password must contain at least 6 characters', 'alerta-error')
      return
    }

    if (password !== confirm) {
      showAlert('Passwords must be the same', 'alerta-error')
      return
    }

    //Pasarlo al action
    registerUser({
      name,
      email,
      password,
    })
  }

  return (
    <div className="form-usuario">
      {alert ? (
        <div data-cy="alert" className={`alerta ${alert.category}`}>
          {alert.msg}
        </div>
      ) : null}
      <div className="contenedor-form sombra">
        <h1 data-cy="title">Join us 🤗</h1>
        <form data-cy="signup-form" onSubmit={onSubmit}>
          <div className="campo-form">
            <input
              data-cy="name-input"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              data-cy="email-input"
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              data-cy="password-input"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              data-cy="confirm-password-input"
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Confirm password"
              value={confirm}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <button data-cy="submit-signup" type="submit" className="btn btn-primario btn-block">
              {visualLoading ? <Spinner width={16} height={16} /> : 'Signup'}
            </button>
          </div>
        </form>
        <Link data-cy="login-link" to={'/'} className="enlace-cuenta">
          You have an account?. Login
        </Link>
      </div>
    </div>
  )
}

export default SignUp
