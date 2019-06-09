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
    error: "",
    sucess: "Cadastrado com sucesso"
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { username, fullname, email, password, cpf, phone } = this.state;
    if (!username || !fullname || !email || !password ||  !cpf || !phone) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await api.post("api/user", { username, fullname, email, password, cpf, phone  });
        // {alert(this.state.sucess)}
        await this.props.history.push("/app");
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
            onChange={e => this.setState({ password: e.target.value })}
          />
          <input
            type="text"
            placeholder="fone"
            onChange={e => this.setState({ phone: e.target.value })}
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
