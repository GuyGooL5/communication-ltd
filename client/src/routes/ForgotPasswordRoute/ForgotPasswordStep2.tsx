import { Dispatch, FormEventHandler, ReactEventHandler, useState } from "react";
import { Button, Container, Snackbar, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "$/components/LoadingButton";
import Logo from "$/components/Logo";
import { useMutation } from "react-query";
import verifyOtp from "$/api/verifyOtp";

const verifyOtpPromise = (email: string, otp: string) =>
  new Promise<string>((resolve, reject) => { verifyOtp(email, otp)(resolve, reject) });

interface ForgotPasswordStep2Props {
  email: string;
  onNewPassword: Dispatch<string>;
}


const ForgotPasswordStep2: React.FC<ForgotPasswordStep2Props> = ({ onNewPassword, email }) => {


  const [otp, setOtp] = useState("")

  const { error, isLoading, mutate, reset } = useMutation<string, string>(() => verifyOtpPromise(email, otp), {
    onSuccess: (data) => {
      onNewPassword(data)
    }
  });

  const submit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    mutate();
  }


  return <form onSubmit={submit}>
    <Container maxWidth="sm">
      <Stack spacing={2} >
        <Logo height={64} />
        <Typography variant="h3" color="primary">Enter Code</Typography>
        <Typography variant="body1">Enter the one time code you received on your email.</Typography>
        <TextField fullWidth required variant="standard" label="One time code" name="otp"
          value={otp} onChange={e => setOtp(e.target.value)} />
        <LoadingButton loading={isLoading} variant="contained" type="submit">Reset password</LoadingButton>

      </Stack>
      <Snackbar open={!!error} message={error}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        action={<Button variant="text" onClick={reset}>Dismiss</Button>} />
    </Container>
  </form >
}

export default ForgotPasswordStep2;
