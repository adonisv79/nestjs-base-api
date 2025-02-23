export type APIConfigurations = {
  health: {
    gracefulShutdownTimeoutMs: number;
    httpCheckUri: string;
    memoryHeapThreshold: number;
    memoryRSSThreshold: number;
    storagePath: string;
    storageWarnThreshold: number;
  };
  port: number;
  secret: string;
  security: {
    cors: { allowedorigins?: string };
  };
  showDocs: boolean;
  url: string;
};

export type AuthConfigurations = {
  domainUri: string;
};

const aMegabyteInBytes = 1024 * 1024;

export default (): { api: APIConfigurations; auth: AuthConfigurations } => ({
  api: {
    port: parseInt(process.env.API_PORT ?? '5000', 10),
    secret: process.env.API_SECRET ?? '',
    security: {
      cors: {
        allowedorigins: process.env.API_CORS_ALLOWED_ORIGINS,
      },
    },
    showDocs: process.env.DEV_SHOW_API_DOCS?.toLowerCase() === 'true' || false,
    health: {
      gracefulShutdownTimeoutMs:
        parseInt(
          process.env.TERMINUS_GRACEFUL_SHUTDOWN_DELAY_SECONDS ?? '10',
          10,
        ) * 1000,
      httpCheckUri:
        process.env.TERMINUS_HEALTHCHECK_HTTP_CHECK_URI ?? 'http://localhost',
      memoryHeapThreshold:
        parseInt(
          process.env.TERMINUS_HEALTHCHECK_HEAP_THRESHOLD_MB ?? '50',
          10,
        ) * aMegabyteInBytes,
      memoryRSSThreshold:
        parseInt(
          process.env.TERMINUS_HEALTHCHECK_RSS_THRESHOLD_MB ?? '50',
          10,
        ) * aMegabyteInBytes,
      storagePath: process.env.TERMINUS_HEALTHCHECK_STORAGE_PATH ?? '/',
      storageWarnThreshold: parseFloat(
        process.env.TERMINUS_HEALTHCHECK_STORAGE_THRESHOLD ?? '0.5',
      ),
    },
    url: process.env.API_URL ?? 'http://localhost:5000',
  },
  auth: {
    domainUri: `https://${process.env.AUTH0_DOMAIN}`,
  },
});
