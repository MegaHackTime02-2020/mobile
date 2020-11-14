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
}

const Input: React.FC<Props> = ({ onLocationSelected }) => {
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <GooglePlacesAutocomplete
      placeholder="Para onde?"
      onPress={onLocationSelected}
      query={{
        key: googleApiKey,
        language: 'pt',
        components: 'country:br',
      }}
      listViewDisplayed={inputFocused}
      fetchDetails
      textInputProps={{
        autoCapitalize: 'words',
        autoCorrect: false,
        onFocus: () => setInputFocused(true),
        onBlur: () => setInputFocused(false)
      }}
      enablePoweredByContainer={false}
      styles={{
        container: {
          position: 'absolute',
          top: inputFocused ? Platform.select({ ios: 60, android: 40}) : undefined,
          bottom: inputFocused ? undefined : Platform.select({ ios: 60, android: 40}),
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
          height: 54,
          margin: 0,
          borderRadius: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { x: 0, y: 0 },
          shadowRadius: 15,
          borderWidth: 1,
          borderColor: '#DDD',
          fontSize: 18,
        },
        listView: {
          borderWidth: 1,
          borderColor: '#DDD',
          backgroundColor: '#fff',
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
        },
        row: {
          padding: 20,
          height: 58,
        },
      }}
    />
  );
}

export default Input;