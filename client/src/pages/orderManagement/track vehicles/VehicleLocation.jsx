import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { io } from "socket.io-client";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const socket = io("https://erp-e2hp.onrender.com");

const VehicleLocation = () => {
  const [vehicles, setVehicles] = useState([]);
  const [latestPosition, setLatestPosition] = useState([0, 0]);
  const mapRef = useRef(null);

  // Navigator
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatestPosition([latitude, longitude]);
          socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await axios.get(`https://erp-e2hp.onrender.com/api/v1/vehicle/location`);
      console.log(response)
      setVehicles(response.data.vehicles);
    };

    fetchVehicles();

    socket.on("locationUpdate", (vehicle) => {
      setVehicles((prevVehicles) => {
        const index = prevVehicles.findIndex((v) => v.id === vehicle.id);
        if (index !== -1) {
          const newVehicles = [...prevVehicles];
          newVehicles[index] = vehicle;
          return newVehicles;
        } else {
          return [...prevVehicles, vehicle];
        }
      });
    });

    return () => {
      socket.off("locationUpdate");
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(latestPosition, 10);
    }
  }, [latestPosition]);

  return (
    <div>
      <MapContainer
        center={latestPosition}
        zoom={10}
        style={{ height: "100vh", width: "100%" }}
        whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={latestPosition}>
          <Popup>Current Location</Popup>
        </Marker>
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={[vehicle.latitude, vehicle.longitude]}
          >
            <Popup>
              Vehicle ID: {vehicle.id} <br /> Last updated:{" "}
              {new Date(vehicle.updatedAt).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default VehicleLocation;
