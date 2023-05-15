/**
 * Centered container.
 */
module.exports = function () {
  return function ({addComponents, theme}) {
    // Find and set the padding based on the screen margins
    const screens = theme('screens');

    const gutterWidth = parseInt(theme(`decanter.screenMargins.xs`))
    const maxWdiths = {
      maxWidth: 'calc(100vw - ' + (gutterWidth * 2) + 'px)',
    };

    // Create padding for each screen size which equals to the screen margin setting.
    const keys = Object.keys(screens);
    keys.forEach((key) => {
      if (theme(`decanter.screenMargins.${key}`)) {
        const gutterWidth = parseInt(theme(`decanter.screenMargins.${key}`));

        maxWdiths[`@screen ${key}`] = {
          maxWidth: 'calc(100vw - ' + (gutterWidth * 2) + 'px)',
          paddingLeft: 0,
          paddingRight: 0
        };
      }
    });

    const components = {
      // Center an element horizontally.
      '.centered-container, .cc': {
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
        ...maxWdiths,
        '@media only screen and (min-width: 1700px)': {
          paddingLeft: 0,
          paddingRight: 0,
          maxWidth: '1500px'
        },
      },
    };

    addComponents(components);
  };
};
