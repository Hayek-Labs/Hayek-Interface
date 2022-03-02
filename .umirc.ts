import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/Main',
      routes: [{ path: '/', component: '@/pages/Home' }],
    },
  ],
  fastRefresh: {},
});
