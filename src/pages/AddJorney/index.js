import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import querySearch from "stringquery";
import PropTypes from "prop-types";

import { Form } from "./styles";

import api from "../../services/api";

class AddJourney extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  state = {
    from_latitude: "",
    from_longitude: "",
    to_latitude: "",
    to_longitude: "",
    error: "",
    journeys: []
  };

  componentDidMount() {
    const params = querySearch(this.props.location.search);
    if (
      !params.hasOwnProperty("from_latitude") ||
      !params.hasOwnProperty("from_longitude") ||
      !params.hasOwnProperty("to_latitude") ||
      !params.hasOwnProperty("to_longitude")
    ) {
      alert("É necessário definir a latitude e longitude para uma jornada.");
      this.props.history.push("/app");
    }

    this.setState({ ...params });
  }

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const { from_latitude, from_longitude, to_latitude, to_longitude } = this.state;

      if (!from_latitude || !from_longitude || !to_latitude || !to_longitude) {
        this.setState({ error: "Preencha todos os campos" });
        return;
      }

      await api.post("api/journey", {
        from_latitude,
        from_longitude,
        to_latitude,
        to_longitude
      });  

      this.props.history.push("/app");
    } catch (err) {
      this.setState({ error: "Ocorreu algum erro ao adicionar a Jornada" });
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Adicionar Jornada</h1>
        <hr />
        {this.state.error && <p>{this.state.error}</p>}
        <input
          type="text"
          placeholder="from_Latitude"
          onChange={e => this.setState({ title: e.target.value })}
        />
        <input
          type="text"
          placeholder="from_Longitude"
          onChange={e => this.setState({ address: e.target.value })}
        />
        <input
          type="text"
          placeholder="to_Latitude"
          onChange={e => this.setState({ title: e.target.value })}
        />
        <input
          type="text"
          placeholder="to_Longitude"
          onChange={e => this.setState({ address: e.target.value })}
        />
        <div className="actions">
          <button type="submit">Adicionar</button>
          <button onClick={this.handleCancel} className="cancel">
            Cancelar
          </button>
        </div>
      </Form>
    );
  }
}

export default withRouter(AddJourney);