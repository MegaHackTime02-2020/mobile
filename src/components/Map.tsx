import React, { useRef, useState } from 'react';
import { StyleSheet, Dimensions, View, Text, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import Direction from './Direction';

import { getPixelSize } from '../utils';
import MapMarker from '../images/MapMarker.png';
import marker from '../images/marker.png';

interface Props {
  currentRegion: {
    latitude: number;
    longitude: number;
    title: string;
  },
  destination?: {
    latitude: number;
    longitude: number;
    title: string;
  },
  changeDestination: () => void,
}

const Map: React.FC<Props> = ({ currentRegion, destination, changeDestination }) => {
  const mapRef = useRef<MapView>(null);

  const [duration, setDuration] = useState<Number>()

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: currentRegion.latitude,
        longitude: currentRegion.longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0143,
      }}
      showsUserLocation
      loadingEnabled
      showsMyLocationButton={false}
      ref={mapRef}
    >
      {destination && (
        <>
          <Direction
            origin={currentRegion}
            destination={destination}
            onReady={result => {
              setDuration(Math.round(result.duration))
              mapRef.current?.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: getPixelSize(50),
                  left: getPixelSize(50),
                  top: getPixelSize(50),
                  bottom: getPixelSize(350),
                }
              })
            }}
          />

          <Marker
            coordinate={destination}
            anchor={{ x: 0, y: 0 }}
            icon={marker}
            onPress={changeDestination}
          >
            <View
              style={Platform.OS === 'android' ? styles.locationBoxAndroid : styles.locationBoxApple}
            >
              <Text style={styles.locationText}>{destination.title}</Text>
              <Feather name="chevron-right" size={25} color="#ccc" style={{ marginLeft: -10 }} />
            </View>
          </Marker>
          
          <Marker
            coordinate={currentRegion}
            anchor={{ x: 0.5, y: 0 }}
          >
            <View
              style={Platform.OS === 'android' ? styles.locationBoxAndroid : styles.locationBoxApple}
            >
              <View style={styles.timeBox}>
                <Text style={styles.timeText}>{duration}</Text>
                <Text style={styles.timeTextSmall}>MIN</Text>
              </View>
              <Text style={styles.locationText}>{currentRegion.title}</Text>
            </View>
          </Marker>
        </>
      )}
      
      <Marker
        flat
        tracksViewChanges={false}
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
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  locationBoxAndroid: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },

  locationBoxApple: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    flexDirection: 'row',
    marginTop: 20
  },

  locationText: {
    marginVertical: 8,
    marginHorizontal: 10,
    fontSize: 14,
    color: '#333',
  },

  timeBox: {
    backgroundColor: '#222',
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  
  timeText: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
  },
  
  timeTextSmall: {
    color: '#FFF',
    fontSize: 10,
    textAlign: 'center',
  },

})

export default Map;