import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import BundleLoader, {
  BundlePrompt,
  RunningMode,
} from 'react-native-bundle-loader';

const runningModeInfo = {
  LOCAL:
    'It means that the app version you are running is provided by the running metro server on your machine (from "yarn start" command)',
  REMOTE: 'The code you are running is remote 🎉',
};

export default function App() {
  const [runningMode, setRunningMode] = useState<RunningMode | null>(null);
  const [isPromptVisible, setPromptyAsVisible] = useState<boolean>(false);

  useEffect(() => {
    BundleLoader.runningMode().then((mode) => setRunningMode(mode));
  });

  function onPress() {
    setPromptyAsVisible(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BundleLoader example</Text>

      {runningMode && (
        <>
          <Text>
            Running mode: <Text style={styles.modeText}>{runningMode}</Text>
          </Text>
          <Text style={styles.tip}>{runningModeInfo[runningMode]}</Text>
        </>
      )}

      {runningMode === 'LOCAL' && (
        <>
          <Button title="Change" onPress={onPress} />
          {isPromptVisible && <BundlePrompt />}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modeText: {
    fontWeight: 'bold',
  },
  tip: {
    marginTop: 4,
    fontSize: 14,
    color: 'darkgray',
  },
  container: {
    flex: 1,
    padding: 24,
    marginTop: 64,
  },
});
