import { Button, Col, Divider, Form, Input, Row, Spin, Switch } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import googleLogo from "../../../assets/Google__G__Logo.webp";
import logoimg from "../../../assets/logo.svg";
import FacebookLogo from "../../../assets/logos-facebook.svg";
import { useAuthentication } from "../../../context/UserAuthContext";
import { isValidEmail } from "../../Validation";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginInUserWithEmailAndPassword, signInWithGoogle, currentUser } =
    useAuthentication();

  const onFinish = async () => {
    const emptyFields = [];
    if (!formData.email) emptyFields.push("Email");
    if (!formData.password) emptyFields.push("Password");

    // Show error message for empty fields
    if (emptyFields.length > 0) {
      const errorMessage = `Please fill in the following fields: ${emptyFields.join(
        ", "
      )}`;
      toast.error(errorMessage);
      return; // Stop further execution if there are empty fields
    }

    // Validate email
    const emailError = isValidEmail(formData.email);
    if (emailError) {
      toast.error(emailError); // Show specific email error
      return; // Stop further execution if there's an email error
    }

    try {
      setIsLoading(true);
      await loginInUserWithEmailAndPassword(formData.email, formData.password);

      toast.success(
        "Successfully logged in! Enjoy your experience and check out your profile."
      );
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-credential") {
        toast.error(
          "Please check your email format and ensure your password is correct."
        );
      } else if (error.code === "auth/user-not-found") {
        toast.error(
          "No user found with this email. Please check the email you entered."
        );
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error("Error logging in: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const SignWithGoogle = async () => {
    await signInWithGoogle();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]); // Add the dependencies

  return (
    <Spin size="large" spinning={isLoading} className="spin">
      <div>
        <div className="login-container">
          <div className="Signup-main">
            <img
              src={logoimg}
              style={{ width: "50px", margin: "0 auto", display: "flex" }}
              alt=""
            />
            <h3 style={{ marginTop: "20px" }}>Sign In to Uko</h3>

            <div className="">
              <div className="buttons-page">
                <Button className="logo-button" onClick={SignWithGoogle}>
                  <img width={20} src={googleLogo} alt="" />
                </Button>
                <Button className="logo-button">
                  <img width={20} src={FacebookLogo} alt="" />
                </Button>
              </div>
            </div>
            <div className="divider">
              <Divider>
                <span>Or</span>
              </Divider>
            </div>
            <Form onFinish={onFinish}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24}>
                  <Form.Item name="email">
                    <Input
                      onChange={handleChange}
                      value={formData.email}
                      placeholder="Email"
                      size="large"
                      name="email"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24}>
                  <Form.Item name="password">
                    <Input
                      onChange={handleChange}
                      value={formData.password}
                      placeholder="Password"
                      type="password"
                      size="large"
                      name="password"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="Switch-main">
                <div className="switch-one">
                  <Switch defaultChecked />
                  <span className="span">Remember Me</span>
                </div>
                <div className="switch-one">
                  <small>Forgot Password?</small>
                </div>
              </div>
              <div className="signup-button">
                <Button
                  style={{ width: "100%", marginTop: "20px" }}
                  type="primary"
                  htmlType="submit" // Set button to submit
                >
                  <p>Sign in</p>
                </Button>
                <div className="create-title">
                  <small>
                    {`Don't have an account?`}
                    <Link to="/register"> Create an account</Link>
                  </small>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Login;
