import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      outlined: {
        margin: '2em 1em',
      },
    },
  },
});

export default theme;
