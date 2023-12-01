import { useCallback, useEffect, useState } from 'react';
import Map, { MapLayerMouseEvent, Marker } from 'react-map-gl';
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from './firebase';

interface Location {
  Lat: number;
  Long: number;
}

interface Quest {
  [key: string]: {
    Location: Location;
    Timestamp: string;
    Next?: Quest | null;
  };
}

interface Marker {
  Location: Location
  Timestamp: Date,
  next?: Marker,
}

const db = getFirestore(app);
const currentDocRef = doc(db, 'map', 'markers')

function App() {
  const [markers, setMarkers] = useState<Marker[]>([{
    Location: { Lat: 51.3233379650232, Long: -0.481747846041145 },
    Timestamp: new Date()
  }]);
  const [markerObj, setMarkerObj] = useState<Quest | null>(null)

  const onClick = useCallback((e: MapLayerMouseEvent) => {
    const { lat, lng } = e.lngLat;

    const isIncludeMarker = Boolean(markers.find(({ Location }) => Location.Lat + Location.Long === lat + lng));

    if (!isIncludeMarker) {
      setMarkers(state => [...state, { Location: { Lat: lat, Long: lng }, Timestamp: new Date() }]);
    }
  }, [markers]);

  useEffect(() => {
    setMarkerObj(convertToQuests(markers));
  }, [markers]);

  useEffect(() => {
    updateDoc(currentDocRef, {
      ...markerObj,
    });
  }, [markerObj]);

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoidjFtZXIyMTA5IiwiYSI6ImNscGxmdGdzYjA1MXYyam1yeDdqZmRnZzAifQ.rqHAj27Or6zU03KJKL_lUA"
      style={{ width: '100wh', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onClick={onClick}
    >
      {markers.map((marker, i) => (
        <Marker
          longitude={marker.Location.Long}
          latitude={marker.Location.Lat}
        >
          <img src={`https://marker.nanoka.fr/map_pin-CC0000-FFF-333-${i + 1}-40.svg`} alt="" />
        </Marker>
      ))}
    </Map>
  );
}

export default App;

const convertToQuests = (markers: Marker[], questNumber = 1): Quest | null => {
  if (markers.length === 0) {
    return null;
  }

  const quest: Quest = {
    [`Quest ${questNumber}`]: {
      Location: {
        Lat: markers[0].Location.Lat,
        Long: markers[0].Location.Long,
      },
      Timestamp: markers[0].Timestamp.toLocaleString(),
      Next: convertToQuests(markers.slice(1), questNumber + 1),
    },
  };

  return quest;
};
