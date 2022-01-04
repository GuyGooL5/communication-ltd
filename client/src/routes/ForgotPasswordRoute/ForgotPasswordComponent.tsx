
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { Container, Stack } from "@mui/material";

import ForgotPasswordStep1 from "./ForgotPasswordStep1";
import ForgotPasswordStep2 from "./ForgotPasswordStep2";
import ForgotPasswordStep3 from "./ForgotPasswordStep3";

import splash from "$/assets/images/register_splash.png";

const StyledImg = styled("img")`
  height:600px; 
`;


const StyledContainer = styled(Container)`
  margin-top:${({ theme }) => theme.spacing(2)};
  margin-bottom:${({ theme }) => theme.spacing(2)};
  overflow:hidden;
`;

const StyledStack = styled(Stack)`
  min-width : ${({ theme }) => theme.breakpoints.values.md}px;
  box-shadow:0 0 0 2px ${({ theme }) => theme.palette.primary.main} inset;
`;

const ForgotPasswordContainer = styled("div")`
  margin: ${({ theme }) => theme.spacing(1)};
`


enum Step {
  Email,
  Otp,
  NewPassword
}

const ForgotPasswordComponent = () => {

  const [step, setStep] = useState<Step>(Step.Email);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const updateNewPassword = (_newPassword: string) => {
    setNewPassword(_newPassword);
    setStep(Step.NewPassword);
  }

  return <StyledContainer maxWidth="lg">
    <StyledStack direction="row" justifyContent="space-between">
      <ForgotPasswordContainer>
        {step === Step.NewPassword && <ForgotPasswordStep3 newPassword={newPassword} onFinish={() => navigate("/")} />}
        {step === Step.Otp && <ForgotPasswordStep2 email={email} onNewPassword={updateNewPassword} />}
        {step === Step.Email && <ForgotPasswordStep1 email={email} setEmail={setEmail} onFinish={() => setStep(Step.Otp)} />}
      </ForgotPasswordContainer>
      <StyledImg src={splash} />
    </StyledStack>
  </StyledContainer>

}
export default ForgotPasswordComponent;
