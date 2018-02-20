import { createTheme } from 'react-native-theming';

const defaultIcon = require('../icons/defaultIcon.png');
const darkIcon = require('../icons/darkIcon.png');

const themes = {
  light: createTheme({
    backgroundColor: 'white',
    textColor: 'black',
    buttonColor: 'blue',
    buttonText: 'white',
    icon: defaultIcon,
    statusBar: 'dark-content',
  }, 'Light'),
  dark: createTheme({
    backgroundColor: 'black',
    textColor: 'white',
    buttonColor: 'yellow',
    buttonText: 'black',
    icon: darkIcon,
    statusBar: 'light-content',
  }, 'Dark'),
};

export default themes;
