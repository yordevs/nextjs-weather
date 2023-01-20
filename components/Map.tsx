import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Weather from "./Weather";

type props = {
  location: {
    lat: number;
    lon: number;
  };
  weather: any;
};

const Map = ({ location, weather }: props) => {
  return (
    <MapContainer
      style={{ height: "500px", width: "90vw" }}
      center={[location.lat, location.lon]}
      zoom={12}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[location.lat, location.lon]}>
        <Popup>
          <Weather weather={weather} />
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
