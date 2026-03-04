import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8081/api/auth/login', {
        usernameOrEmail,
        password,
      })
      localStorage.setItem('token', res.data.token)
      alert('Login successful!')
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username or Email</label>
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            className="w-full p-3 border rounded mt-1"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}