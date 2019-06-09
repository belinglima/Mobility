import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import MapGL from "react-map-gl";
import PropTypes from "prop-types";
// import debounce from "lodash/debounce";

// import api from "../../services/api";
import { logout } from "../../services/auth";

import Button from "./Button";

import { Container, ButtonContainer, ButtonContainer2 } from "./styles";

const TOKEN =
  "pk.eyJ1IjoiYmVsaW5nbGltYSIsImEiOiJjandvajh0cTkwcHB0NGJuMzg5bDQ2OTduIn0.RzPhYdL09PPWYcoX38o8FQ";

class Map extends Component {
  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired
  };

  // constructor() {
  //   super();
  //   this.updateJornadasLocalization = debounce(
  //     this.updateJornadasLocalization,
  //     500
  //   );
  // }

  state = {
    viewport: {
      latitude: -31.7678673,
      longitude: -52.3386519,
      zoom: 12.8,
      bearing: 0,
      pitch: 0
    }
    // },
    // Jornadas: []
  };

  // componentDidMount() {
  //   this.loadJornadas();
  // }

  // updateJornadasLocalization() {
  //   this.loadJornadas();
  // }

  // loadJornadas = async () => {
  //   const { latitude, longitude } = this.state.viewport;
  //   try {
  //     const response = await api.get("/jorney", {
  //       params: { latitude, longitude }
  //     });
  //     this.setState({ properties: response.data });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  handleLogout = e => {
    logout();
    this.props.history.push("/");
  };

  renderActions() {
    return (
      <>
      <ButtonContainer2>
      <Button color="#222" onClick={this.handleLogout}>
        <i className="fa fa-plus" />
      </Button>
    </ButtonContainer2>
      <ButtonContainer>
        <Button color="#222" onClick={this.handleLogout}>
        Logout
          <i className="fa fa-times" />
        </Button>
      </ButtonContainer>
      </>
    );
  }

  render() {
    const { containerWidth: width, containerHeight: height } = this.props;
    // const { jornadas } = this.state;
    return (
      <Fragment>
        <MapGL
          width={width}
          height={height}
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={TOKEN}
          onViewportChange={viewport => this.setState({ viewport })}
          // onViewStateChange={this.updateJornadasLocalization.bind(this)}
        >
          {/* <Jornadas jornadas={jornadas} /> */}
        </MapGL>
        {this.renderActions()}
      </Fragment>
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
