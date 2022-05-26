import { defineConfig } from 'umi';

export default defineConfig({
  title: 'HAYEK',
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  tailwindcss: {
    tailwindCssFilePath: '@/tailwind.css',
    tailwindConfigFilePath: 'tailwind.config.js',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/Main',
      routes: [
        { path: '/', component: '@/pages/Home' },
        { path: '/mint', component: '@/pages/Mint' },
        { path: '/redeem', component: '@/pages/Redeem' },
        { path: '/exchange', component: '@/pages/Exchange' },
        {
          path: '/swap',
          component: '@/pages/Swap',
        },
        {
          path: '/vehas',
          component: '@/pages/VeHAS',
        },
        {
          path: '/gauge',
          component: '@/pages/Gauge',
        },
      ],
    },
  ],
  fastRefresh: {},
});
