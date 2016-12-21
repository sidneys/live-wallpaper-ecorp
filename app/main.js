'use strict';


/**
 * Modules
 * Node
 * @global
 * @constant
 */
const path = require('path');
const url = require('url');
const util = require('util');

/**
 * Modules
 * Electron
 * @global
 * @constant
 */
const electron = require('electron');
const { app, BrowserWindow, ipcMain, Menu, Tray } = electron;

/**
 * Modules
 * External
 * @global
 * @constant
 */
const appRootPath = require('app-root-path').path;

/**
 * Modules
 * Internal
 * @global
 * @constant
 */
const packageJson = require(path.join(appRootPath, 'package.json'));
const platformHelper = require(path.join(appRootPath, 'lib', 'platform-helper'));


/**
 * App
 * @global
 * @constant
 */
const appProductName = packageJson.productName || packageJson.name;
const appVersion = packageJson.version;

/**
 * Debug
 * @global
 * @constant
 */
const devMode = ((process.env.NODE_ENV === 'dev') || (process.env.NODE_ENV === 'development') || (Boolean(process.env.DEBUG) === true));

/**
 * Paths
 * @global
 * @constant
 */
const appTrayIconEnabled = path.join(appRootPath, 'icons', platformHelper.type, 'icon-tray-enabled' + platformHelper.templateImageExtension(platformHelper.name));


/**
 * @global
 */
let appTray;
let displayWindowList;


/**
 * @listens app#ready
 */
app.on('ready', () => {
    // Create window for each display
    let displayWindowList = electron.screen.getAllDisplays();
    displayWindowList.forEach(function(display) {
        let displayWindow = new BrowserWindow({
            frame: false,
            hasShadow: false,
            height: display.bounds.height,
            movable: false,
            resizable: false,
            show: false,
            type: 'desktop',
            width: display.bounds.width,
            x: display.workArea.x,
            y: display.workArea.y
        });

        // Set HTML
        displayWindow.loadURL(url.format({ protocol: 'file:', pathname: path.join(appRootPath, 'app', 'html', 'wallpaper.html') }));

        // Show window
        displayWindow.webContents.on('dom-ready', () => {
            displayWindow.show();

            // DEBUG
            if (global.devMode) {
                this.webContents.openDevTools({ mode: 'undocked' });
            }
        });
    });

    // Create Tray
    appTray = new Tray(appTrayIconEnabled);
    appTray.setImage(appTrayIconEnabled);
    appTray.setToolTip(appProductName);
    appTray.setContextMenu(Menu.buildFromTemplate([
        {
            label: `${appProductName} v${appVersion}`,
            type: 'normal',
            enabled: false
        },
        {
            type: 'separator'
        },
        {
            label: `Quit ${appProductName}`,
            click() {
                app.quit();
            }
        }
    ]));

    // Hide Dock / Taskbar
    if (platformHelper.isMacOS) {
        app.dock.hide();
    } else {
        BrowserWindow.getAllWindows()[0].setSkipTaskbar(true);
    }
});
