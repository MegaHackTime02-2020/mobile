import React from 'react';
import Directions from 'react-native-maps-directions';

import googleApiKey from '../config/googleApiKey';

interface Region {
  latitude: number;
  longitude: number;
}

interface Result {
  coordinates: Region[];
  duration: number;
}

interface Props {
  destination: Region;
  origin: Region;
  onReady: (result: Result) => void;
}

const Direction: React.FC<Props> = ({ destination, origin, onReady }) => (
  <Directions
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey={googleApiKey}
    strokeWidth={5}
    strokeColor="#222"
  />
)

export default Direction;