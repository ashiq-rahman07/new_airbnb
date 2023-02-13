import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

export const RegisterPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (ev) => {
      ev.preventDefault()

    try{
      await axios.post('/register',{
        name,
        email,
        password,

      });

      alert('Registration Succesful , Now You log in')
    }catch(err){
      alert('Registration failed, Please try again')
    }
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
            <h1 className='text-4xl text-center mb-4'>Register</h1>
            <form className='max-w-2xl mx-auto' onSubmit={registerUser}>
              <input type="text"
                  placeholder='John Doe'
                  value={name}
                  onChange = {ev=>setName(ev.target.value)}
                />
              <input type="email" 
                  placeholder='your@email.com'
                  value={email}
                  onChange = {ev=>setEmail(ev.target.value)}
              />
              <input type="password" 
                  placeholder='password'
                  value={password}
                  onChange = {ev=>setPassword(ev.target.value)}
              />

              <button className='primary'>Register</button>

              <div className='text-center py-2 text-gray-500'>
                You have an account ?
                <Link to={'/login'} className="underline text-black">Login</Link>
              </div>

            </form>

      </div>
  
    </div>
  )
}
