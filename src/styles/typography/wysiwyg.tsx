// @ts-nocheck
module.exports = function () {
  return function ({addComponents, theme}) {

    const components = {
      '.wysiwyg': {
        'a h2, h2 a, a h3, h3 a, a h4, h4 a, a h5, h5 a': {
          color: theme('colors.digital-red'),
          textDecoration: 'none',
        },
        'a:hover h2, h2 a:hover, a:hover h3, h3 a:hover, a:hover h4, h4 a:hover, a:hover h5, h5 a:hover, a:focus h2, h2 a:focus, a:focus h3, h3 a:focus, a:focus h4, h4 a:focus, a:focus h5, h5 a:focus': {
          color: theme('colors.black'),
          textDecoration: 'underline',
        },
        pre: {
          whiteSpace: 'normal',
        }
      },
    };

    addComponents(components);
  };
};