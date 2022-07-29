import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "land.circles.beta",
  appName: "Circles",
  webDir: "dist",
  bundledWebRuntime: false,
};

if (process.env.IS_DEV) {
  config["server"] = {
    url: "http://localhost:3000",
    cleartext: true,
  };
}

export default config;
