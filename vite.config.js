import dotenv from 'dotenv'
import expandDotenv from 'dotenv-expand'
import { homedir } from 'os'
import fs from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Markdown from 'vite-plugin-vue-markdown'
import Shiki from 'markdown-it-shiki'
import Anchor from 'markdown-it-anchor'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'

const env = expandDotenv.expand(dotenv.config()).parsed

export default defineConfig(({ command }) => {
  return {
    plugins: [
      laravel({
        input: 'resources/js/app.js',
        ssr: 'resources/js/ssr.js',
        refresh: true,
      }),
      Vue({
        include: [/\.vue$/, /\.md$/],
        template: {
          transformAssetUrls: {
            base: null,
            includeAbsolute: false,
          },
        },
      }),
      Markdown({
        markdownItOptions: {
          html: true,
          linkify: true,
          typographer: true,
        },
        markdownItSetup(md) {
          // for example
          md.use(Anchor)
          md.use(Shiki, {
            theme: {
              light: JSON.parse(fs.readFileSync('./resources/js/Shiki/light.json', 'utf-8')),
              dark: JSON.parse(fs.readFileSync('./resources/js/Shiki/dark.json', 'utf-8')),
            },
          })
        },
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
      }),
      AutoImport({
        include: [
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          'vuex',
          '@vueuse/core',
          {
            '@inertiajs/inertia': ['Inertia'],
            '@inertiajs/inertia-vue3': ['router', 'useForm', 'usePage', 'useRemember'],
            composable: ['useTrans', 'useRoutes', 'useDayjs'],
          },
        ],
        dts: 'auto-imports.d.ts',
      }),
      Components({
        dirs: ['resources/js/Components'],
        resolvers: [
          HeadlessUiResolver(),
          IconsResolver({
            prefix: 'icon',
            enabledCollections: ['heroicons-outline', 'heroicons-solid'],
            alias: {
              outline: 'heroicons-outline',
              solid: 'heroicons-solid',
            },
          }),
        ],
        dts: 'components.d.ts',
      }),
    ],
    ssr: {
      noExternal: ['@inertiajs/server'],
    },
    optimizeDeps: {
      include: [
        'vue',
        'vuex',
        '@inertiajs/inertia',
        '@inertiajs/inertia-vue3',
        '@inertiajs/progress',
        '@headlessui/vue',
        'axios',
      ],
    },
    resolve: {
      alias: {
        vue: resolve(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js'),
        '@/storage': resolve(__dirname, 'storage/app/public'),
        ziggy: resolve(__dirname, 'vendor/tightenco/ziggy/dist/vue.es.js'),
        zora: resolve(__dirname, 'vendor/jetstreamlabs/zora/dist/vue.js'),
        'zora-js': resolve(__dirname, 'vendor/jetstreamlabs/zora/dist/index.js'),
        tableTranslations: resolve(__dirname, 'resources/js/translations.js'),
        composable: resolve(__dirname, 'resources/js/Composable/index.js'),
      },
    },
    server: command === 'serve' ? makeServer(command) : null,
  }
})

export const makeServer = (command) => {
  if (env.VITE_HTTPS == 'true') {
    const certPath = resolve(homedir(), env.VITE_CERTPATH)

    return {
      https: {
        key: fs.readFileSync(resolve(certPath, `${env.VITE_DOMAIN}.key`)),
        cert: fs.readFileSync(resolve(certPath, `${env.VITE_DOMAIN}.crt`)),
      },
      host: env.VITE_DOMAIN,
    }
  } else {
    return {
      https: false,
      server: {
        hmr: {
          host: '0.0.0.0',
        },
        watch: {
          usePolling: true,
        },
      },
    }
  }
}
