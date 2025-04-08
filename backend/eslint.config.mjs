// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Permitir el uso de 'any'
      '@typescript-eslint/no-floating-promises': 'off', // Desactivar advertencias sobre promesas flotantes
      '@typescript-eslint/no-unsafe-argument': 'off', // Permitir argumentos inseguros
      'prettier/prettier': 'off', // Desactivar reglas de Prettier
      'no-console': 'off', // Permitir el uso de console.log
      'no-unused-vars': 'warn', // Cambiar errores de variables no usadas a advertencias
    },
  },
);