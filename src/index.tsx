import { NativeModules } from 'react-native';

type BundleLoaderType = {
  multiply(a: number, b: number): Promise<number>;
};

const { BundleLoader } = NativeModules;

export default BundleLoader as BundleLoaderType;
