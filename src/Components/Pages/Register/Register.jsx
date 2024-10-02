import { Button, Col, Divider, Form, Input, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import googleLogo from "../../../assets/Google__G__Logo.webp";
import logoimg from "../../../assets/logo.svg";
import FacebookLogo from "../../../assets/logos-facebook.svg";
import { useAuthentication } from "../../../context/UserAuthContext";
import { isStrongPassword, isValidEmail } from "../../Validation";
import "../Login/login.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const {
    signUpUserWithEmailAndPassword,
    signInWithGoogle,
    currentUser,
    displayName,
    setDisplayName,
  } = useAuthentication();
  const navigate = useNavigate();

  const onFinish = async () => {
    const emptyFields = [];
    if (!displayName) emptyFields.push("Name");
    if (!formData.email) emptyFields.push("Email");
    if (!formData.password) emptyFields.push("Password");
    if (!formData.confirmPassword) emptyFields.push("Confirm Password");

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

    // Validate password
    const passwordError = isStrongPassword(formData.password);
    if (passwordError) {
      toast.error(passwordError); // Show specific password error
      return; // Stop further execution if there's a password error
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setIsLoading(true);
      await signUpUserWithEmailAndPassword(
        formData.email,
        formData.password,
        displayName
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const SignWithGoogle = async () => {
    await signInWithGoogle();
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  return (
    <Spin size="large" spinning={isLoading} className="spin">
      <div className="login-container">
        <div className="Signup-main">
          <img
            src={logoimg}
            style={{ width: "50px", margin: "0 auto", display: "flex" }}
            alt=""
          />
          <h3 style={{ marginTop: "20px" }}>Sign Up to Uko</h3>
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
              <Col xs={24} sm={12}>
                <Form.Item name="name">
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Name"
                    size="large"
                    name="name"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="email">
                  <Input
                    onChange={handleChange}
                    value={formData.email}
                    type="text"
                    placeholder="Email"
                    size="large"
                    name="email"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
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
              <Col xs={24} sm={12}>
                <Form.Item name="confirmPassword">
                  <Input
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    placeholder="Confirm Password"
                    type="password"
                    size="large"
                    name="confirmPassword"
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="signup-button">
              <Button
                style={{ width: "100%", marginTop: "20px" }}
                type="primary"
                htmlType="submit"
              >
                Sign Up
              </Button>
              <div className="create-title">
                <small>
                  Already have an account? <Link to="/"> Log In</Link>
                </small>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default Register;
