import React, { useContext, useState } from "react";

import { Form, Input, TextArea, Button, Select } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { REGISTER_USER } from "../queries/queries";
import { AuthContext } from "../context/auth";

const Register = (props) => {
  const context = useContext(AuthContext);

  const [values, setvalues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [RegisterMut, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      context.login(result.data.register);
      props.history.push("/");
    },
    variables: values,
  });

  const onChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    RegisterMut();
  };

  return (
    <div className="form-controlling">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
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
          id="form-input-control-error-email"
          label="Email"
          name="email"
          type="email"
          control={Input}
          value={values.email}
          placeholder="Email"
          onChange={onChange}
        />
        <Form.Field
          id="form-input-control-password"
          control={Input}
          type="password"
          name="password"
          label="password"
          value={values.password}
          placeholder="First name"
          onChange={onChange}
        />

        <Form.Field
          id="form-input-control-confirmPassword"
          label="confirm Password"
          control={Input}
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          placeholder="Confirm password"
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
