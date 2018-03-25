import React from 'react';
import { Hidden } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const style = {
  background: {
    position: 'absolute',
    left: 0,
    top: -64,
    width: '20%',
    height: 'calc(100% + 64px)',
    zIndex: 100,
  },
};

export default withStyles(style)((props) => {
  const { classes, mainColor, secondColor } = props;
  const main = `linear-gradient(to right top, ${mainColor} 50%, transparent 50%)`;
  const second = `linear-gradient(135deg, ${secondColor} 20%, transparent 20%)`;

  return (
    <Hidden smDown>
      <div className={classes.background} style={{ background: [main, second].join(',') }} />
    </Hidden>
  );
});
