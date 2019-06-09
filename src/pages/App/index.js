import React, { Component } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import MapGL from "react-map-gl";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import { ModalRoute } from "react-router-modal";
import api from "../../services/api";
import { logout,  TOKEN_KEY } from "../../services/auth";

import Button from "./components/Button";

import { Container, ButtonContainer, PointReference, ButtonContainer2 } from "./styles";
import Journey from "./components/Jorney";
import AddJorney from "../AddJorney";

const TOKEN =
  "pk.eyJ1IjoiYmVsaW5nbGltYSIsImEiOiJjandvajh0cTkwcHB0NGJuMzg5bDQ2OTduIn0.RzPhYdL09PPWYcoX38o8FQ";

  const config = {
    headers: {
      "content-type": "Aplication/Json",
      "Authorization": "JWT "+localStorage.getItem(TOKEN_KEY)
    }
  };

class Map extends Component {
  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired
  };

  constructor() {
    super();
    this.updateJourneysLocalization = debounce(
      this.updateJourneysLocalization,
      500
    );
  }

  state = {
    viewport: {
      latitude: -31.7696186,
      longitude: -52.3378794,
      zoom: 12.8,
      bearing: 0,
      pitch: 0
    },
    journeys: [],
    addActivate: false
  };

  componentDidMount() {
    this.loadJourneys();
  }

  updateJourneysLocalization() {
    this.loadJourneys();
  }

  loadJourneys = async () => {
    const { from_latitute, from_longitute, to_latitute, to_longitute } = this.state.viewport;
    try {
      const response = await api.get("api/journey", config, {
        params: { from_latitute, from_longitute, to_latitute, to_longitute  }
      });
      this.setState({ journeys: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  handleLogout = e => {
    logout();
    this.props.history.push("/");
  };

  handleAddJourney = () => {
    const { match, history } = this.props;
    const { latitude, longitude } = this.state.viewport;
    history.push(
      `${match.url}/journeys/add?latitude=${latitude}&longitude=${longitude}`
    );

    this.setState({ addActivate: false });
  };

  renderActions() {
    return ( 
      <>
      <ButtonContainer2>
      <Button
        color="#ffd301"
        onClick={() => this.setState({ addActivate: true })}
      >
        <i className="fa fa-plus" />
      </Button>
      </ButtonContainer2>
      <ButtonContainer>
      <Button color="#222" onClick={this.handleLogout}>
        <i className="fa fa-times" />
      </Button>
    </ButtonContainer>
    </>
    );
  }

  renderButtonAdd() {
    return (
      this.state.addActivate && (
        <PointReference>
          <i className="fa fa-map-marker" />
          <div>
            <button onClick={this.handleAddJourney} type="button">
              Adicionar
            </button>
            <button
              onClick={() => this.setState({ addActivate: false })}
              className="cancel"
            >
              Cancelar
            </button>
          </div>
        </PointReference>
      )
    );
  }

render() {
  const {
    containerWidth: width,
    containerHeight: height,
    match
  } = this.props;
  const { journeys, addActivate } = this.state;
  return (
    <>
      <MapGL
        width={width}
        height={height}
        {...this.state.viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={viewport => this.setState({ viewport })}
        onViewStateChange={this.updateJourneysLocalization.bind(this)}
      >
        {!addActivate && <Journey match={match} journeys={journeys} />}
      </MapGL>
      {this.renderButtonAdd()}
      {this.renderActions()}
      <ModalRoute
        path={`${match.url}/journey/`}
        parentPath={match.url}
        component={AddJorney}
      />
      <ModalRoute
        path={`${match.url}/journey/`}
        parentPath={match.url}
        component={Journey}
      />
    </>
  );
}
}

const DimensionedMap = withRouter(Dimensions()(Map));
const App = () => (
  <Container>
    <DimensionedMap />
  </Container>
);

export default App;
