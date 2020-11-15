import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { Marker } from 'react-native-maps';

import Map from '../components/Map';
import Input from '../components/Input';

interface Region {
  latitude: number;
  longitude: number;
  title: string;
}

interface RouteParams {
  currentRegion: Region;
}

const Parks: React.FC = () => {
  const navigation = useNavigation();
  const { currentRegion } = useRoute().params as RouteParams;

  const [destination, setDestination] = useState<Region>();
  const [inputFocused, setInputFocused] = useState(false);

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
      <Map
        currentRegion={currentRegion}
        goToDestination={destination}
      >
        {destination && (
          <>
            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
            >
              <FontAwesome5 name="map-marker-alt" size={30} color="#FB1111" />
            </Marker>
            <Marker
              coordinate={{
                latitude: destination.latitude + 0.002,
                longitude: destination.longitude,
              }}
            >
              <FontAwesome5 name="map-marker-alt" size={30} color="#FB1111" />
            </Marker>
            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude + 0.002,
              }}
            >
              <FontAwesome5 name="map-marker-alt" size={30} color="#FB1111" />
            </Marker>
          </>
        )}
      </Map>

      <Input
        onLocationSelected={handleLocationSelected}
        inputFocused={true}
        setInputFocused={(focused) => setInputFocused(focused)}
      />

      {!inputFocused && (
        <ScrollView style={styles.info}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={25} color="#FCFCFC" />
          </TouchableOpacity>

          <Text style={styles.infoTitle}>Olá, João</Text>
          {destination ? (
            <>
              <View style={styles.row}>
                <View style={styles.dot} />
                <Text style={styles.infoText}>
                  {destination.title}{'\n'}(0 vagas disponíveis)
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.dot} />
                <Text style={styles.infoText}>
                  Estacionamento MultiPark{'\n'}(12 vagas disponíveis)
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.dot} />
                <Text style={styles.infoText}>
                  Estacionamento High Park{'\n'}(5 vagas disponíveis)
                </Text>
              </View>
            </>
          ) : (
            <Text style={styles.infoText}>
              Localizaremos os Estacionamentos disponíveis próximo ao seu destino
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  info: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#0C0C0C',
    borderWidth: 1,
    borderColor: '#707070',
    padding: 10,
    maxHeight: 200,
    overflow: 'scroll',
  },

  infoTitle: {
    color: '#FCFCFC',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 25,
  },

  infoText: {
    color: '#FCFCFC',
    fontSize: 18,
    lineHeight: 30,
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  dot: {
    width: 18,
    height: 18,
    backgroundColor: '#D80909',
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 9,
    marginRight: 5,
    marginTop: 9,
  }
})

export default Parks;
