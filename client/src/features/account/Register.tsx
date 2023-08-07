import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import type { } from 'redux-thunk/extend-redux';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';


export default function Register() {
  const navigate = useNavigate();
  //const [validationErrors, setValidationErrors] = useState([]);
  const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
    mode: 'all'
  })

  function handleApiErrors(errors: any) {
    console.log(errors);

    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes('Password')) {
          setError('password', { message: error })
        } else if (error.includes('Email')) {
          setError('email', { message: error });
        } else if (error.includes('username')) {
          setError('username', { message: error });
        }
      });
    }
  }
  return (
    <Container component={Paper} maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box component="form"
        onSubmit={handleSubmit((data) =>
          agent.Account.register(data)
            .then(() => {
              toast.success('Registration successful - you can now login');
              navigate('/login');
            })
            .catch(error => handleApiErrors(error)))
        } noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          autoFocus
          {...register('username', { required: 'Username is required' })}
          error={!!errors.username}
          helperText={<>{errors?.username?.message}</>}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email address"
          autoFocus
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
              message: 'Not a valid email address'
            }
          })}
          error={!!errors.email}
          helperText={<>{errors?.email?.message}</>}
        />
        <TextField
          margin="normal"
          fullWidth
          // name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value: /(?=^.{8,30}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;&quot;:;'?/&gt;.&lt;,]).*$/,
              message: 'Password does not meet complexity requirement.'
            }
          })}
          error={!!errors.password}
          helperText={<>{errors?.password?.message}</>}
        />
        {/* {
                validationErrors.length > 0 &&
                <Alert>
                        <AlertTitle>Validation Errors</AlertTitle>
                        <List>
                            {
                                validationErrors.map(error => (
                                    <ListItem key={error}>
                                        <ListItemText>{error}</ListItemText>    
                                    </ListItem>
                                ))
                            }
                        </List>
                </Alert>
            } */}
        <LoadingButton loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to='/login'>
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>

  );
}