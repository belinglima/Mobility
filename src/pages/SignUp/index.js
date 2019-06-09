import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../assets/logo.png";
import api from "../../services/api";
import { Form, Container } from "./styles";

class SignUp extends Component {
  state = {
    username: "",
    fullname: "",
    email: "",
    pass: "",
    cpf: "",
    fone: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { username, fullname, email, pass, cpf, fone } = this.state;
    if (!username || !fullname || !email || !pass ||  !cpf || !fone) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await api.post("/user", { username, fullname, email, pass, cpf, fone  });
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar" });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="Cityzen logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Nome de usuário"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nome Completo"
            onChange={e => this.setState({ fullname: e.target.value })}
          />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="text"
            placeholder="cpf"
            onChange={e => this.setState({ cpf: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ pass: e.target.value })}
          />
          <input
            type="text"
            placeholder="fone"
            onChange={e => this.setState({ fone: e.target.value })}
          />
          <button type="submit">Registre-se</button>
          <hr />
          <Link to="/">Fazer login</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);
