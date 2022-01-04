import { FormEventHandler, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Stack, Snackbar, TextField, Typography, styled } from "@mui/material";

import Logo from "$/components/Logo";
import PasswordField from "$/components/PasswordField";

import { useAuth } from "$/context/AuthContext/AuthContext";

import login from "$/api/login";
import authUser from "$/api/authUser";

import JwtManager from "$/utils/JwtManager";
import LoadingButton from "$/components/LoadingButton";



export default function LoginForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useAuth();

  const navigate = useNavigate();


  function onUserAuthenticated(_username: string, authenticateD: boolean) {
    setUser(_username);
  }

  function onUserAuthFail(_error: string) {
    alert(_error);
  }

  function onSuccess(token: string) {
    JwtManager.set(token);
    authUser()(onUserAuthenticated, onUserAuthFail);
  }

  function onError(_error: string) {
    setError(_error);
  }

  const submit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onSumbit();
  }

  const onSumbit = async () => {
    setError("");
    setLoading(true);
    await login(username, password)(onSuccess, onError);
    setLoading(false);
  }

  const navigateToRegister = () => navigate("/register");



  return <form onSubmit={submit}>
    <Container maxWidth="sm">
      <Stack spacing={2} >
        <Logo height={64} />
        <Typography variant="h3" color="primary">Welcome Back!</Typography>
        <TextField fullWidth required variant="standard" label="Username" name="username"
          value={username} onChange={e => setUsername(e.target.value)} />
        <PasswordField fullWidth required variant="standard" label="Password" name="password"
          value={password} onChange={e => setPassword(e.target.value)} />
        <Stack direction="row" spacing={1}>
          <LoadingButton loading={loading} variant="contained" type="submit">Login</LoadingButton>
          <Button disabled={loading} variant="outlined"
            onClick={navigateToRegister}>Sign-up</Button>
        </Stack>
        <StyledLink to="/forgotPassword">
          <Typography variant="subtitle1" color="primary">Forgot password?</Typography>
        </StyledLink>
      </Stack>
      <Snackbar open={!!error.length} message={error}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        action={<Button variant="text" onClick={() => setError("")}>Dismiss</Button>} />
    </Container>
  </form >
}


const StyledLink = styled(Link)`
  text-decoration:none;
  &:hover *{
    font-weight:700;
  }
`;