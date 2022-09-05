import { getEnv } from '/@/app-shared/services/util/env';
export const useGlobalSetting = () => {
  const envVars = getEnv();
  console.log(envVars);
  const global = {
    apiUrl: envVars.VITE_API_BASE_URL,
    amapKey: envVars.VITE_AMAP_KEY,
  };
  return global;
};
