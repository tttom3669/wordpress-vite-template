import { defineConfig, toEscapedSelector as e } from 'unocss';
import presetUno from '@unocss/preset-uno';

export default defineConfig({
  presets: [
    presetUno(), // 默認預設 (相容 Tailwind CSS和 Windi CSS)
  ],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        'assets/**/*.{js,ts}',
      ],
    },
    filesystem: ['**/*.php', 'assets/**/*.{js,ts}'],
  },
  theme: {},
  shortcuts: {},
  rules: [],
});
