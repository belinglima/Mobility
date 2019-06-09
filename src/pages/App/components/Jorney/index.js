import React from "react";
import { Marker } from "react-map-gl";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Pin } from "./styles";

const Journey = ({ journeys, match }) =>
journeys.map(journey => (
   <>
   <Marker
      key={journey.id}
      latitude={journey.from_latitute}
      longitude={journey.from_longitute}
      >
      <Pin
       >
        <Link to="">{journey.id}</Link>
      </Pin>
    </Marker>
    <Marker
      key={journey.id}
      latitude={journey.to_latitute}
      longitude={journey.to_longitute}
      >
      <Pin>
        <Link to="">{journey.id}</Link>
      </Pin>
    </Marker>
    <Marker
      key={journey.id}
      latitude={journey.to_latitute}
      longitude={journey.to_longitute}
      >
      <Pin
       >
        <Link to={`${match.url}/journey/${journey.id}`}>
        </Link>
      </Pin>
    </Marker>
    </>
  ));

Journey.propTypes = {
  journeys: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      from_longitute: PropTypes.number,
      from_latitute: PropTypes.number,
      to_longitute: PropTypes.number,
      to_latitute: PropTypes.number
    })
  ).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string
  }).isRequired
};

export default Journey;