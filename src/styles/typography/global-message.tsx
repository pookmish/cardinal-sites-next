module.exports = function () {
  return function ({addComponents, theme}) {
    const components = {
      '.global-message': {
        'a': {
          color: theme('colors.white'),
        },
        'a:hover, a:focus': {
          color: theme('colors.black'),
        }
      },
    };
    addComponents(components);
  };
};