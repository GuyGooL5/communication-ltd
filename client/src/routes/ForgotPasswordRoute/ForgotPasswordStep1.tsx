import { Dispatch, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Snackbar, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "$/components/LoadingButton";
import Logo from "$/components/Logo";
import { useMutation } from "react-query";
import updatePassword from "$/api/forgotPassword";


const forgotPasswordPromise = (email: string) => new Promise<true>((resolve, reject) => updatePassword(email)(resolve, reject));

interface ForgotPasswordStep1Props {
  onFinish: () => void;
  email: string;
  setEmail: Dispatch<string>;
}

const ForgotPasswordStep1: React.FC<ForgotPasswordStep1Props> = ({ email, setEmail, onFinish }) => {

  const navigate = useNavigate();

  const { mutate, reset, error, isLoading } = useMutation<true, string>(() => forgotPasswordPromise(email), { onSuccess: onFinish });

  const submit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    mutate();
  }
  const navigateToLogin = () => navigate("/login");



  return <form onSubmit={submit}>
    <Container maxWidth="sm">
      <Stack spacing={2} >
        <Logo height={64} />
        <Typography variant="h3" color="primary">Forgot password?</Typography>

        <Typography variant="body1">Enter your email address to set a new password.</Typography>

        <TextField fullWidth required variant="standard" label="Email" name="email" type="email"
          value={email} onChange={e => setEmail(e.target.value)} />

        <Stack direction="row" spacing={1}>
          <LoadingButton loading={isLoading} variant="contained" type="submit">Next</LoadingButton>
          <Button disabled={isLoading} variant="text" color="secondary"
            onClick={navigateToLogin}>Login</Button>
        </Stack>

      </Stack>
      <Snackbar open={!!error} message={error}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        action={<Button variant="text" onClick={reset}>Dismiss</Button>} />
    </Container>
  </form >
}

export default ForgotPasswordStep1;
