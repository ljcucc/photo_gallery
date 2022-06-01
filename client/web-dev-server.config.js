export default {
  open: true,
  watch: true,
  appIndex: 'index.html',
  rootDir:"./public/",
  nodeResolve: {
    exportConditions: ['development'],
    dedupe: true,
  },
  esbuildTarget: 'auto',
};