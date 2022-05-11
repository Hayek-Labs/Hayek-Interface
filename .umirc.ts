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
        { path: '/mint-redeem', component: '@/pages/MintRedeem' },
        { path: '/exchange', component: '@/pages/Exchange' },
        {
          path: '/swap',
          component: '@/pages/BuybackRecollat',
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
