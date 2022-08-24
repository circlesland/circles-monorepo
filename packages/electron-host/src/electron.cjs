const path = require("path");
const { app, BrowserWindow } = require("electron");
const { Deeplink } = require("electron-deeplink");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const isDev = process.env.IS_DEV === "true";

const protocol = isDev ? "dev-app" : "prod-app";

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: true,
    },
  });

  // Open the DevTools.
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    // mainWindow.removeMenu();
    mainWindow.loadFile(path.join(__dirname, "build", "index.html"));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  new Deeplink({ app, mainWindow, protocol, isDev });

  // Get the deep link data and inject it into localStorage
  // deeplink.on("received", (link) => {
  //   const _url = new URL(link);
  //   const userData = _url.searchParams.get("user_data");
  //   console.log("opened", link);

  //   if (mainWindow)
  //     mainWindow.webContents.executeJavaScript(`window.authApi.processAuth("${userData}")`, true).then((result) => {
  //       mainWindow.reload();
  //     });
  // });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("open-url", (event, url) => {
  console.log("opened", url);
  const _url = new URL(url);
  const userData = _url.searchParams.get("user_data");

  if (mainWindow)
    mainWindow.webContents.executeJavaScript(`window.authApi.processAuth("${userData}")`, true).then((result) => {
      mainWindow.reload();
    });
});
