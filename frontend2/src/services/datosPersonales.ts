import api from './api';

export const getDatosPersonales = async () => {
  const response = await api.get('/datos-personales');
  return response.data;
};

export const createDatosPersonales = async (data: any) => {
  const response = await api.post('/datos-personales', data);
  return response.data;
};