import React, { Component } from "react";
import { Menu, Button } from "semantic-ui-react";
import { useState, useContext } from "react";
import apiHandler from "../../api/axiosHandler";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
  const [context, setContext] = useContext(UserContext);
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    apiHandler.logout().then(() => {
      setContext({ userInfo: null, isLoggedIn: false });
      navigate('/') ;
    });
  };

  return (
    <Menu tabular>

      {context.isLoggedIn && context.data?.isTeacher === false && (
        <Link to="./profile">

          <Menu.Item
            name="profile"
            active={activeItem === "profile"}
            onClick={() => setActiveItem("profile")}
          >
            Mon profil
          </Menu.Item>
        </Link>)}

        {context.isLoggedIn && context.data?.isTeacher === false && context.data?.currentEvaluation.isOpen && (
         <Link to="./passeval">
        <Menu.Item
          name="passeval"
          active={activeItem === "passeval"}
          onClick={() => setActiveItem("passeval")}
        >
          Passer une évaluation
        </Menu.Item>
        </Link>)}

        {context.isLoggedIn && context.data?.isTeacher === true && (
        <Link to="./teacher/profile">

          <Menu.Item
            name="manageevaluations"
            active={activeItem === "manageevaluations"}
            onClick={() => setActiveItem("manageevaluations")}
          >
            Gestion des évaluations
          </Menu.Item>
        </Link>)}

        {context.isLoggedIn && context.data?.isTeacher === true && (
         <Link to="./teacher/analytique">
        <Menu.Item
          name="analytique"
          active={activeItem === "analytique"}
          onClick={() => setActiveItem("analytique")}
        >
          Vue analytique
        </Menu.Item>
        </Link>)}

        {context.isLoggedIn && context.data?.isTeacher === true && (
         <Link to="./teacher/enableeval">
        <Menu.Item
          name="enableeval"
          active={activeItem === "enableeval"}
          onClick={() => setActiveItem("enableeval")}
        >
          Ouvrir/fermer des évaluations
        </Menu.Item>
        </Link>)}

      <Menu.Menu position="right">
        {!context.isLoggedIn && (
          <Menu.Item
            name="signup"
            active={activeItem === "signup"}
            onClick={() => setActiveItem("signup")}
          >
            <Link to="./signup">
              <Button primary>S'inscrire</Button>
            </Link>
          </Menu.Item>
        )}
        {!context.isLoggedIn && (
          <Menu.Item
            name="signin"
            active={activeItem === "signin"}
            onClick={() => setActiveItem("signin")}
          >
            <Link to="./">
              <Button>Se connecter</Button>
            </Link>
          </Menu.Item>
        )}
        {context.isLoggedIn && (
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={() => setActiveItem("logout")}
          >
            <Button onClick={() => handleLogout()}>Se déconnecter</Button>
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
