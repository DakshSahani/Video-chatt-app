import {Link, useNavigate} from 'react-router-dom'
import {useCallback, useState} from 'react'
import Button from '../utils/Button'
import MainPageTemplate from '../utils/HomePageTemplate'
import Form from '../utils/Form'
import Input from '../utils/Input'
import axios from 'axios'


const SignUp =  ()=>{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = useCallback(async (e)=>{
        e.preventDefault()
        setLoading(true);
        await axios.post('http://localhost:8000/user/signup',{
            name:name,
            email:email,
            password:pass
        }).then(()=>{
            setLoading(false)
            navigate('/lobby')
        }).catch(err=>{
            window.alert(err.message)
            setLoading(false)
        })
    },[name, email, pass, navigate])

    return <MainPageTemplate>
        <Form className="text-center">
            <Input label="Name" id="Name" type="text" state={{
                value:name,
                set:setName
            }}/>
            <Input label="Email" id="email" type="email" state={{
                value:email,
                set:setEmail
            }}/>
            <Input label="Password" id="password" type="text" state={{
                value:pass,
                set:setPass
            }}/>
            <Button primary disabled={loading} onClick={handleSubmit}>Sign Up</Button>
            <p className='m-4'>Already have an account <Link className='text-blue-700' to='/login'>login here</Link></p>
        </Form>

    </MainPageTemplate>
    
}

export default SignUp