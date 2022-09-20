import {Appearance} from 'react-native';
const colorScheme = Appearance.getColorScheme();

let theme = {
  background: {
    lightest: '#ffffff',
    light: '#9999A5',
    normal: '#3d3d3d',
    dark: '#1a1a1a',
    darkest: '#0E0C0E',
    black: '#000000',
    transparent: 'transparent',
    purple: '#4A25B3',
  },
  text: {
    white: '#ffffff',
    light: '#d4d4d8',
    normal: '#9999A5',
    dark: '#27272a',
    black: '#000000',
    'solana-green': '#14f195',
    approved: '#00ac64',
    pending: '#d27d00',
    link: '#0066cc',
    awaiting: '#d27d00',
    purple: '#6F6CD9',
  },
};
// if (colorScheme === 'dark') {
//   theme = {
//     black: '#353333',
//   };
// }

export const Colors = theme;
