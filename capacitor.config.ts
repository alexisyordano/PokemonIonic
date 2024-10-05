import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myapp',
  appName: 'MyApp',
  webDir: 'www',

  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      // launchFadeOutDuration: 3000,
      backgroundColor: '#A34C04',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
      useDialog: true,
    },
  },
};

export default config;
