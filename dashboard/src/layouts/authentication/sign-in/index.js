import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import { useAuth } from "context/auth";

// Image
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { signIn, user, error } = useAuth()
  const navigate = useNavigate()

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const onSignIn = async () => {
    await signIn(username, password)
  }

  useEffect(() => {
    if(user) {
      navigate('/')
    } else {
      navigate('/authentication/sign-in')
    }
  }, [user])

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput type="email" placeholder="Email" size="large" onChange={e => setUsername(e.target.value)} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="password" placeholder="Password" size="large" onChange={e => setPassword(e.target.value)} />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonTypography fontWeight="regular" fontSize={14} sx={{ color: "#f93707" }}>
            {error}
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <ArgonTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mt={4} mb={1}>
          <ArgonButton color="info" size="large" fullWidth onClick={() => onSignIn()}>
            Sign In
          </ArgonButton>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
