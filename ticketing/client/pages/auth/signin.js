import { useState } from "react"
import useRouter from "next/router"
import useRequest from "../../hooks/use-request"

const signupForm = () => {
  const router = useRouter
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => router.push('/')
  })

  const onSubmit = async (event) => {
    event.preventDefault()

    await doRequest()
  }

  return (
      <form onSubmit={onSubmit}>
        <h1>Sign in</h1>
        <div className={'form-group'}>
          <label htmlFor="">Email address</label>
          <input className={'form-control'} type="text" value={email} onChange={
            e => setEmail(e.target.value)
          } />
        </div>
        <br/>
        <div className={'form-group'}>
          <label htmlFor="">Password</label>
          <input className={'form-control'} type="password" value={password} onChange={
            e => setPassword(e.target.value)
          } />
        </div>
        <br/>
        {errors}
        <button className={'btn btn-primary'}>Sign in</button>
      </form>
  )
}

export default signupForm
