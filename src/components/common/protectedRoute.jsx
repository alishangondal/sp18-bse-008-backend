import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../../services/authService";
//video 186 jo login hony pe hi new movie ka button how ho but us ka /newmovie wala route bi
//protect karna hota ha
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

//redirect ka to = user nai ha to /login pe ly jaye ab to main ham object pass kar sakty
//so state from to syntax ha idar ham us li location pass kar rhy ..ab location ky andar
//pathname ha jahan jana ha so idar location pass kar di login main access karain gy
export default ProtectedRoute;
