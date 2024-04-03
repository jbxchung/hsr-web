interface Map {
  [key: string]: string | undefined
}

const HOST_ENV_MAP: Map = {
  'localhost': 'local',
  'hsr.uat.jbxchung.dev': 'uat',
  'hsr.jbxchung.dev': 'prod'
};

const ENV_BASE_URL_MAP: Map = {
  local: 'http://localhost:8080',
  uat: 'https://hsr.uat.jbxchung.dev',
  prod: 'https://hsr.jbxchung.dev',
}

export function getEnv(): string {
  return HOST_ENV_MAP[window.location.hostname] || HOST_ENV_MAP.localhost as string;
}

export function getApiBaseUrl(): string {
  return `${ENV_BASE_URL_MAP[getEnv()] as string}/hsr-service`;
}