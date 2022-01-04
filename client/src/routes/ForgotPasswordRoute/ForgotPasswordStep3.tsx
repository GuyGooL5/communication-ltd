import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Snackbar, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "$/components/LoadingButton";
import Logo from "$/components/Logo";
import { useMutation } from "react-query";

interface ForgotPasswordStep3Props {
  onFinish: () => void;
  newPassword: string;
}


const ForgotPasswordStep3: React.FC<ForgotPasswordStep3Props> = ({ newPassword, onFinish }) => {

  return <Container maxWidth="sm">
    <Stack spacing={2} >
      <Logo height={64} />
      <Typography variant="h3" color="primary">Password updated!</Typography>
      <Typography variant="body1">This is your new password, please change it upon login.</Typography>
      <Typography variant="h6">{newPassword}</Typography>
      <Button variant="contained" onClick={onFinish}>Login</Button>
    </Stack>
  </Container>
}

export default ForgotPasswordStep3;
