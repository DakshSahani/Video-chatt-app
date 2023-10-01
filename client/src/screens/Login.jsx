import {Link, useNavigate} from 'react-router-dom'
import {useState, useCallback} from 'react'
import Button from '../utils/Button'
import MainPageTemplate from '../utils/HomePageTemplate'
import Form from '../utils/Form'
import Input from '../utils/Input'
import axios from 'axios'

const Login =  ()=>{
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const navigate = useNavigate();

    const handleSubmit = useCallback(async(e)=>{
        e.preventDefault()
        try{
            await axios.post('/user/login',{
                email:email,
                password:pass
            },{
                withCredentials:true
            })
            navigate('/')
        }catch(err){
            window.alert(err.message)
        }
    },[email, navigate, pass])

    return <MainPageTemplate>
        <Form className="text-center">
            <Input label="Email" id="email" type="email" state={{
                value:email,
                set:setEmail
            }}/>
            <Input label="Password" id="password" type="text" state={{
                value:pass,
                set:setPass
            }}/>
            <Button primary onClick={handleSubmit}>login</Button>
            <p className='m-4'>Do not have a account <Link className='text-blue-700' to='/signup'>signup here</Link></p>
        </Form>

    </MainPageTemplate>
    
}

export default Login