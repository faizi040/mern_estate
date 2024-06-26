import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"

const Signin = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const naviagte = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id]: e.target.value,

    })
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      naviagte('/');
      console.log(data);

    } catch (error) {
      setLoading(false);
      setError(error.message)
    }

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      {/* //max-w-lg menas maximum width this div will get large size of tailwind css */}
      <h1 h1 className='text-3xl text-center font-semibold my-7' > Sign In</h1 >
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95
        disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Do not have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700'>Sign Up</span>
        </Link>

      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div >
  )
}

export default Signin