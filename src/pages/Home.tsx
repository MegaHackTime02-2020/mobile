import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';

import Map from '../components/Map';
import Input from '../components/Input';
import Modal from '../components/Modal';
import googleApiKey from '../config/googleApiKey';

interface Region {
  latitude: number;
  longitude: number;
  title: string;
}

const Home: React.FC = () => {
  const [currentRegion, setCurrentRegion] = useState<Region>();
  const [destination, setDestination] = useState<Region>();

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Oooops...',
          'Precisamos de permissão para obter a sua localização'
        );

        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      const { latitude, longitude } = location.coords;

      Location.setGoogleApiKey(googleApiKey);

      const titleArray = await Location.reverseGeocodeAsync({ latitude, longitude }, {
        useGoogleMaps: true,
      })

      const title = titleArray[0].name || titleArray[0].street || 'Origem';

      setCurrentRegion({
        latitude,
        longitude,
        title
      });
    }

    loadPosition();
  }, []);
  
  function handleLocationSelected(data: GooglePlaceData, detail: GooglePlaceDetail | null) {
    if (detail) {
      const { lat: latitude, lng: longitude } = detail.geometry.location;

      setDestination({
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
      });
    }
  }

  return (
    <View style={styles.container}>
      {currentRegion &&
        <Map
          currentRegion={currentRegion}
          destination={destination}
          changeDestination={() => setDestination(undefined)}
        />
      }
      {destination ? (
        <Modal changeDestination={() => setDestination(undefined)}/> 
      ) : (
        <Input onLocationSelected={handleLocationSelected} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 48,
    paddingLeft: 24,

    elevation: 5,
  },

  inputFocused: {
    position: 'absolute',
    left: 24,
    right: 24,
    top: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 48,
    paddingLeft: 24,

    elevation: 5,
  },
})

export default Home;