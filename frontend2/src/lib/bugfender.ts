import { Bugfender } from '@bugfender/sdk';

export const initBugfender = () => {
  Bugfender.init({
    appKey: import.meta.env.VITE_BUGFENDER_API_KEY || '',
    overrideConsoleMethods: true, // Captura logs automáticamente
    registerErrorHandler: true, // Captura errores globales
  });

  Bugfender.log('Bugfender inicializado correctamente');
};
