import React, { useContext, useState } from "react";
import { Form, Input, TextArea, Button, Select } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_USER } from "../queries/queries";
import { AuthContext } from "../context/auth";

const Login = (props) => {
  const context = useContext(AuthContext);
  const [values, setvalues] = useState({
    username: "",
    password: "",
  });
  const [LoginMut, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      context.login(result.data.login);
      props.history.push("/");
    },
    variables: values,
  });

  const onChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    LoginMut();
  };

  return (
    <div className="form-controlling">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Field
          id="form-input-control-first-name"
          control={Input}
          name="username"
          type="text"
          label="First name"
          value={values.username}
          placeholder="First name"
          onChange={onChange}
        />

        <Form.Field
          id="form-input-control-password"
          control={Input}
          type="password"
          name="password"
          label="password"
          value={values.password}
          placeholder="Enter Password"
          onChange={onChange}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
