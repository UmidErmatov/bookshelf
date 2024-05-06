import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../api/auth';
import { MD5 } from 'crypto-js'



export default function SignUp() {
    const navigate = useNavigate()
    const location = useLocation()
    console.log('location: ', location);


    const [signup, { isLoading }] = useSignupMutation()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const formState = {
            name: data.get('fullname') as string,
            email: data.get('email') as string,
            key: data.get('username') as string,
            secret: data.get('password') as string,
        }
        console.log('formState: ', formState);

        try {
            await signup(formState).unwrap().then(data => {
                console.log('signup: ', data);
                const sign = MD5('gfsdfsdfff').toString();
                console.log("dfff: ", location, sign);

            })
            navigate('/books')
        } catch (err) {
            console.log('signup error: ', err);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Ro'yhatdan o'tish
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="fullname"
                                label="To'lim ism"
                                name="fullname"
                                autoComplete="fullname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="username"
                                label="Login"
                                id="username"
                                autoComplete="username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Parol"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        loading={isLoading}
                    // onClick={async () => {
                    //     try {
                    //         await signup(formState).unwrap()
                    //         navigate('/')
                    //     } catch (err) {
                    //         console.log('signup error: ', err);
                    //     }
                    // }}
                    >
                        Ro'yhatdan o'tish
                    </LoadingButton>
                </Box>
                <Link href="/login" variant="body2">
                    Kirish sahifasiga o'tish
                </Link>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}