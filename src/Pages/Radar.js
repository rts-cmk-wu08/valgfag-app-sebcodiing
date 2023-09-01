/* eslint import/no-webpack-loader-syntax: off */

import { Map, NavigationControl, Marker, GeolocateControl } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "../style.css";

mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Radar = () => {
  return (
    <>
        <p>Her kan du se det seneste nedbør over Danmark, med radarkortet</p>
      <section className="radar-wrapper">
        <Map
          mapLib={import("mapbox-gl")}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          style={{ width: "80vw", height: "50vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          initialViewState={{
            latitude: 55.7060378,
            longitude: 12.5142235,
            zoom: 16,
          }}
        >
          <NavigationControl />

          <Marker latitude={55.7060378} longitude={12.5142235} color="orange" />
          <GeolocateControl
            trackUserLocation={true}
            positionOptions={{ enableHighAccuracy: true }}
            showAccuracyCircle={true}
            auto
          />
        </Map>
      </section>
    </>
  );
};

export default Radar;
