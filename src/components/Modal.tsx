import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import uberX from '../images/uberx.png';

interface Props {
  changeDestination: () => void;
}

const Modal: React.FC<Props> = ({ changeDestination }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={changeDestination} style={styles.backButton}>
        <Feather name="arrow-left" size={25} color="#222" />
      </TouchableOpacity>
      <Text style={styles.typeTitle}>Popular</Text>
      <Text style={styles.typeDescription}>Viagens baratas para o dia a dia</Text>

      <Image source={uberX} style={styles.typeImage} />
      <Text style={styles.typeTitle}>UberX</Text>
      <Text style={styles.typeDescription}>R$ 11,27</Text>

      <TouchableOpacity onPress={() => {}} style={styles.requestButton}>
        <Text style={styles.requestButtonText}>SOLICITAR UBERX</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: 300,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    padding: 20,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: -10,
  },

  typeTitle: {
    fontSize: 20,
    color: '#222',
  },

  typeDescription: {
    fontSize: 14,
    color: '#666',
  },

  typeImage: {
    height: 80,
    marginVertical: 10,
  },

  requestButton: {
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    alignSelf: 'stretch',
    marginTop: 10,
  },

  requestButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },
})

export default Modal;