import React from "react";
import { Button, Form, Segment, Message } from "semantic-ui-react";
import "./SignupForm.scss";
import { useState, useContext } from "react";
import apiHandler from "../../api/axiosHandler";
import { UserContext } from "../../App";
import { SchoolClassEnum } from "../../types/type";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [context, setContext] = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [schoolclass, setSchoolclass] = useState("6G2");
  const [alert, setAlert] = useState("");
  const [showAlert, setShowAlert] = useState("");

  const handleSubmit = () => {
    if (password === confirmPassword) {
      apiHandler
        .signup({
          email: email,
          password: password,
          firstName: firstname,
          lastName: lastname,
          schoolClass: SchoolClassEnum[schoolclass],
        })
        .then((data) => {
          console.log("LA DATA", data);
          setContext({ data, isLoggedIn: true });
          navigate('/profile');
        });
    } else {
      setShowAlert(true);
      setAlert((prev) => (prev += "Les mots de passe ne correspondent pas"));
    }
  };

  return (
    <div className="SignupForm-form">
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Input
              fluid
              label="Confirmation du mot de passe"
              placeholder="Confirmer le mot de passe"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Form.Input
              fluid
              label="Prénom"
              placeholder="Mon Prénom"
              onChange={(e) => setFirstname(e.target.value)}
            />
            <Form.Input
              fluid
              label="Nom"
              placeholder="Mon Nom"
              onChange={(e) => setLastname(e.target.value)}
            />
            <Form.Field
              label="Ma classe"
              control="select"
              onChange={(e) => setSchoolclass(e.target.value)}
            >
              <option value="6G2">6G2</option>
              <option value="5G2">5G2</option>
              <option value="4G2">4G2</option>
              <option value="3G2">3G2</option>
              <option value="2G2">2G2</option>
              <option value="1G2">1G2</option>
            </Form.Field>
          </Form.Group>
          <Button type="submit" onClick={handleSubmit}>
            S'inscrire
          </Button>
        </Form>
        {showAlert && <Message error header="Problème" content={alert} />}
      </Segment>
    </div>
  );
};

export default Signup;
