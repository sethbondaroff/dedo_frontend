import {React} from 'react'
import '../styles/Login.css'
import {
    Card, 
    CardContent,
    TextField
} from '@mui/material'

const Login = () => {
    return (
        <div className='login-container'>
            <Card sx={{maxWidth: 400, margin: 'auto', marginTop: '30px'}}>
                <CardContent>
                    <TextField/>
                    <TextField/>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login