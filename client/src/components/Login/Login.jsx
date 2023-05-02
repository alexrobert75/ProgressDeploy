import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import "./Login.scss";
import { useState, useContext } from "react";
import apiHandler from "../../api/axiosHandler";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [context, setContext] = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("abcd@gmail.com");
  const [password, setPassword] = useState("1234");

  const handleSubmit = () => {
    apiHandler.signin({ email: email, password: password }).then((data) => {
      setContext({ data, isLoggedIn: true });
      if (data.isTeacher === false) {
        navigate("/profile");
      } else {
        navigate("/teacher/profile");
      }

    });
  };

  return (
    <div className="login-form">
      <Segment inverted>
        <Form inverted>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Email"
              placeholder="Mon email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              fluid
              label="Mot de passe"
              placeholder="Mon mot de passe"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" onClick={handleSubmit}>
            Se connecter
          </Button>
        </Form>
      </Segment>
    </div>
  );
};

export default Login;
