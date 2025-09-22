export default {
  multipass: true,
  plugins: [
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'cleanupAttrs',
    'removeUselessDefs',
    'cleanupNumericValues',
    'removeUnknownsAndDefaults',
    'removeUnusedNS',
    'removeRasterImages',
    'removeDimensions',
    {
      name: 'removeAttrs',
      params: {
        attrs: ['id', 'class', 'style', 'xml:space'],
      },
    },
    {
      name: 'convertColors',
      params: {
        currentColor: true,
      },
    },
  ],
}
