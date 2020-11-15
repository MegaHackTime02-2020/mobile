import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Marker } from 'react-native-maps';

import Map from '../components/Map';
import Input from '../components/Input';
import Modal from '../components/Modal';

import googleApiKey from '../config/googleApiKey';
import MapMarker from '../images/MapMarker.png';

interface Region {
  latitude: number;
  longitude: number;
  title: string;
}

const Home: React.FC = () => {
  const [currentRegion, setCurrentRegion] = useState<Region>();
  const [destination, setDestination] = useState<Region>();
  const [inputFocused, setInputFocused] = useState(false);

  const navigation = useNavigation();

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

  function handleNavigationToParks() {
    navigation.navigate('Parks', {
      currentRegion,
    })
  }

  return (
    <View style={styles.container}>
      {currentRegion &&
        <Map
          currentRegion={currentRegion}
          destination={destination}
          changeDestination={() => setDestination(undefined)}
        >
          <Marker
            icon={MapMarker}
            anchor={{ x: 0.5, y: 0.5 }}
            coordinate={{
              latitude: currentRegion.latitude + 0.005,
              longitude: currentRegion.longitude + 0.005,
            }}
          />
          <Marker
            icon={MapMarker}
            anchor={{ x: 0.5, y: 0.5 }}
            coordinate={{
              latitude: currentRegion.latitude - 0.005,
              longitude: currentRegion.longitude - 0.005,
            }}
          />      
          <Marker
            icon={MapMarker}
            anchor={{ x: 0.5, y: 0.5 }}
            coordinate={{
              latitude: currentRegion.latitude + 0.005,
              longitude: currentRegion.longitude - 0.005,
            }}
          />      
          <Marker
            icon={MapMarker}
            anchor={{ x: 0.5, y: 0.5 }}
            coordinate={{
              latitude: currentRegion.latitude - 0.005,
              longitude: currentRegion.longitude + 0.005,
            }}
          />      
          <Marker
            icon={MapMarker}
            anchor={{ x: 0.5, y: 0.5 }}
            coordinate={{
              latitude: currentRegion.latitude + 0.002,
              longitude: currentRegion.longitude + 0.002,
            }}
          />
        </Map>
      }
      {destination ? (
        <>
        <View style={styles.blueBarModal}>
          <Text style={styles.blueBarModalText}>
            Você economizará 15 minutos por não precisar procurar por vagas.
          </Text>
        </View>

        <Modal changeDestination={() => setDestination(undefined)}/> 
      </>
      ) : (
        <>
          {!inputFocused && (
            <>
              <TouchableOpacity onPress={handleNavigationToParks} style={styles.blueBar}>
                <FontAwesome5 name="car-alt" size={38} color="#F8F5F5" />
                <Text style={styles.blueBarText}>
                  Verifique aqui vagas de Estacionamento mais próximo de seu destino.
                </Text>
              </TouchableOpacity>

              <View style={styles.inputWrapper} />
            </>
          )}

          <Input
            onLocationSelected={handleLocationSelected}
            inputFocused={inputFocused}
            setInputFocused={(focused) => setInputFocused(focused)}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  blueBar: {
    position: 'absolute',
    bottom: 109,
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#0119F1',
    padding: 10,
  },

  blueBarModal: {
    position: 'absolute',
    bottom: 280,
    width: '100%',

    backgroundColor: '#0119F1',
  },

  blueBarModalText: {
    color: '#FBFBFB',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 8,
  },

  blueBarText: {
    color: '#FBFBFB',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 8,
    maxWidth: 300,
  },

  inputWrapper: {
    position: 'absolute',
    bottom: 25,
    width: '100%',
    height: 84,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
})

export default Home;