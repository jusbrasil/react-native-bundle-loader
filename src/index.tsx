/** @format */

export type RunningMode = 'LOCAL' | 'REMOTE';

type BundleLoaderType = {
  load(url: string): Promise<void>;
  runningMode(): Promise<RunningMode>;
};

import React, { useState } from 'react';
import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  NativeModules,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';

const { BundleLoader } = NativeModules;

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#444',
  },
  input: {
    height: 48,
    marginTop: 8,
    paddingHorizontal: 8,
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#007AFF',
    marginTop: 16,
    height: 48,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18,
    alignContent: 'center',
  },
});

const defaultValue =
  'https://cdn.jsdelivr.net/gh/jusbrasil/react-native-bundle-loader/example/public/ios.min.js';

export function BundlePrompt() {
  const [url, setUrl] = useState<string>(defaultValue);

  function loadBundle() {
    if (url) {
      BundleLoader.load(url);
    } else {
      Alert.alert('Oops...', 'You need to provide an url');
    }
  }

  function changedInput(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    const nextUrl = e.nativeEvent.text.trim();
    setUrl(nextUrl);
  }

  return (
    <Modal>
      <View style={styles.container}>
        <TextInput
          keyboardType="url"
          onChange={changedInput}
          style={styles.input}
          defaultValue={defaultValue}
          clearButtonMode="always"
          autoFocus
        />
        <TouchableOpacity
          style={styles.button}
          onPress={loadBundle}
          accessibilityLabel="Reload entire app"
        >
          <Text style={styles.buttonText}>Reload</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default BundleLoader as BundleLoaderType;
