import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import styles from "./Map.module.css";
import Dropdown from "/components/atoms/Dropdown/Dropdown";
import { IShopsItem } from "/api/wordpressApi";

interface MapYProps {
  mapData: IShopsItem[];
  selectedShopCoordinates?: [number, number];
  onCityChange: (city: string) => void;
  selectedCity: string;
  cityCoordinates: Record<string, [number, number]>;
}

const MapY: React.FC<MapYProps> = ({
  mapData,
  selectedShopCoordinates,
  onCityChange,
  selectedCity,
  cityCoordinates,
}) => {
  const [zoom, setZoom] = useState(10);

  const mapState = useMemo(
    () => ({
      center: selectedShopCoordinates ||
        cityCoordinates[selectedCity] || [53.902284, 27.561831],
      zoom,
    }),
    [selectedShopCoordinates, selectedCity, cityCoordinates, zoom]
  );

  useEffect(() => {
    if (selectedShopCoordinates) {
      setZoom(15);
    } else {
      setZoom(10);
    }
  }, [selectedShopCoordinates]);

  const handleCityChange = useCallback(
    (city: string) => {
      onCityChange(city);
      setZoom(10);
    },
    [onCityChange]
  );

  const filteredShops = mapData.filter(
    (shop) => shop.acf.city === selectedCity
  );

  return (
    <div className={styles.mapSection}>
      <Dropdown
        options={Object.keys(cityCoordinates)}
        className={styles.mapHeader}
        selectedOption={selectedCity}
        setSelectedOption={handleCityChange}
      />
      <YMaps>
        <Map state={mapState} className={styles.map}>
          {filteredShops.map((shop) => {
            const [lat, lon] = shop.acf.coordinates.split(",").map(Number);
            return <Placemark key={shop.id} geometry={[lat, lon]} />;
          })}
        </Map>
      </YMaps>
    </div>
  );
};

export default MapY;
