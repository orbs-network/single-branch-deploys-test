export interface AppConfig {
  name: string;
  version: string;
  port: number;
  host: string;
}

export interface DatabaseConfig {
  connectionTimeout: number;
  maxConnections: number;
  ssl: boolean;
}

export interface Config {
  app: AppConfig;
  database: DatabaseConfig;
}
