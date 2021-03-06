import React, { useState } from 'react';
import { Platform } from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete
} from 'react-native-google-places-autocomplete';

import googleApiKey from '../config/googleApiKey';

interface Props {
  onLocationSelected: (data: GooglePlaceData, detail: GooglePlaceDetail | null) => void;
  inputFocused: boolean;
  setInputFocused: (focused: boolean) => void;
}

const Input: React.FC<Props> = ({ onLocationSelected, inputFocused, setInputFocused }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Para onde?"
      onPress={onLocationSelected}
      query={{
        key: googleApiKey,
        language: 'pt',
        components: 'country:br',
      }}
      listViewDisplayed='auto'
      fetchDetails
      textInputProps={{
        autoCapitalize: 'words',
        autoCorrect: false,
        onFocus: () => setInputFocused(true),
        onBlur: () => setInputFocused(false),
        placeholderTextColor: "#030303",
      }}
      enablePoweredByContainer={false}
      styles={{
        container: {
          position: 'absolute',
          top: inputFocused ? Platform.select({ ios: 60, android: 40}) : undefined,
          bottom: inputFocused ? undefined : 40,
          width: '100%'
        },
        textInputContainer: {
          flex: 1,
          backgroundColor: 'transparent',
          height: 54,
          marginHorizontal: 20,
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        textInput: {
          backgroundColor: '#E9E9E9',
          height: 54,
          margin: 0,
          borderRadius: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          elevation: inputFocused ? 5 : undefined,
          shadowColor: inputFocused ? '#000' : undefined,
          shadowOpacity: inputFocused ? 0.1 : undefined,
          shadowOffset: inputFocused ? { x: 0, y: 0 } : undefined,
          shadowRadius: inputFocused ? 15 : undefined,
          borderWidth: inputFocused ? 1 : undefined,
          borderColor: inputFocused ? '#DDD' : undefined,
          fontSize: 18,
          color: '#030303',
        },
        listView: {
          borderWidth: 1,
          borderColor: '#DDD',
          backgroundColor: '#E9E9E9',
          marginHorizontal: 20,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { x: 0, y: 0 },
          shadowRadius: 15,
          marginTop: 5,
        },
        description: {
          fontSize: 16,
          color: '#030303',
        },
        row: {
          backgroundColor: '#E9E9E9',
          padding: 20,
          height: 58,
        },

      }}
    />
  );
}

export default Input;