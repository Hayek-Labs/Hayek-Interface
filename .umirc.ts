import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  tailwindcss: {
    tailwindCssFilePath: '@/tailwind.css',
    tailwindConfigFilePath: 'tailwind.config.js', // Default value: tailwindConfigFilePath || join(process.env.APP_ROOT || api.cwd, 'tailwind.config.js'),
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
