import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/Main',
      routes: [
        { path: '/', component: '@/pages/Home' },
        { path: '/mint', component: '@/pages/Mint' },
        { path: '/redeem', component: '@/pages/Redeem' },
        {
          path: '/buyback-recollateralize',
          component: '@/pages/BuybackRecollat',
        },
      ],
    },
  ],
  fastRefresh: {},
});
