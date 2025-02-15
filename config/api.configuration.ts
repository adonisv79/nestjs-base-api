export type APIConfigurations = {
  logLevel: string;
  port: number;
  secret: string;
  showDocs: boolean;
};

export default (): { api: APIConfigurations } => ({
  api: {
    logLevel: process.env.LOG_LEVEL ?? 'info',
    port: parseInt(process.env.API_PORT ?? '5000', 10),
    secret: process.env.API_SECRET ?? '',
    showDocs: process.env.API_SHOW_DOCS?.toLowerCase() === 'true' || false,
  },
});
