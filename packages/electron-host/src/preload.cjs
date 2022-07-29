const { contextBridge, shell } = require("electron");

contextBridge.exposeInMainWorld("electronApi", {
  openExternalUrl: (url) => {
    shell.openExternal(url);
  },
});
