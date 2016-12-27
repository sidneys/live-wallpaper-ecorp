'use strict';


/**
 * Modules
 * Node
 * @constant
 */
const path = require('path');
const url = require('url');

/**
 * Modules
 * Electron
 * @constant
 */
const electron = require('electron');
const { app, BrowserWindow, ipcMain, Menu, Tray } = electron;

/**
 * Modules
 * External
 * @constant
 */
const appRootPath = require('app-root-path');
const EventEmitter = require('events');

/**
 * Modules
 * Configuration
 */
EventEmitter.defaultMaxListeners = Infinity;
appRootPath.setPath(path.join(__dirname, '..', '..', '..', '..'));

/**
 * Modules
 * Internal
 * @constant
 */
const isDebug = require(path.join(appRootPath.path, 'lib', 'is-env'))('debug');
const logger = require(path.join(appRootPath.path, 'lib', 'logger'))({ write: true });
const packageJson = require(path.join(appRootPath.path, 'package.json'));
const platformHelper = require(path.join(appRootPath.path, 'lib', 'platform-helper'));
const configurationManager = require(path.join(appRootPath.path, 'app', 'scripts', 'main', 'managers', 'configuration-manager')); // jshint ignore:line
const updaterService = require(path.join(appRootPath.path, 'app', 'scripts', 'main', 'services', 'updater-service')); // jshint ignore:line
const debugService = require(path.join(appRootPath.path, 'app', 'scripts', 'main', 'services', 'debug-service')); // jshint ignore:line

/**
 * Application
 * @constant
 * @default
 */
const appProductName = packageJson.productName || packageJson.name;
const appVersion = packageJson.version;

/**
 * Filesystem
 * @constant
 * @default
 */
const appTrayIcon = path.join(appRootPath.path, 'icons', platformHelper.type, `icon-tray${platformHelper.templateImageExtension(platformHelper.type)}`);
const wallpaperUrl = url.format({ protocol: 'file:', pathname: path.join(appRootPath.path, 'app', 'html', 'main.html') });


/**
 * @instance
 */
let trayMenu = {};
let appWindowList;

/**
 * Tray Menu Template
 * @function
 */
let getTrayMenuTemplate = () => {
    return [
        {
            id: 'productName',
            label: `${appProductName}`,
            enabled: false
        },
        {
            id: 'appVersion',
            label: `Version ${appVersion}`,
            type: 'normal',
            enabled: false
        },
        {
            type: 'separator'
        },
        {
            id: 'windowVisible',
            label: 'Hide Wallpaper',
            icon: path.join(appRootPath.path, 'app', 'images', `icon-window-visible${platformHelper.menuItemImageExtension}`),
            type: 'checkbox',
            checked: !configurationManager('windowVisible').get(),
            click(menuItem) {
                configurationManager('windowVisible').set(!menuItem.checked);
            }
        },
        {
            type: 'separator'
        },
        {
            id: 'launchOnStartup',
            label: 'Launch on Startup',
            icon: path.join(appRootPath.path, 'app', 'images', `icon-launch-on-startup${platformHelper.menuItemImageExtension}`),
            type: 'checkbox',
            checked: configurationManager('launchOnStartup').get(),
            click(menuItem) {
                configurationManager('launchOnStartup').set(menuItem.checked);
            }
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
    ];
};


/**
 * @listens app#ready
 */
app.on('ready', () => {
    // Create window for each display
    let appWindowList = electron.screen.getAllDisplays();
    appWindowList.forEach(function(display) {
        let wallpaperWindow = new BrowserWindow({
            backgroundColor: '#000000',
            enableLargerThanScreen: true,
            frame: false,
            hasShadow: false,
            movable: false,
            resizable: false,
            show: false,
            transparent: false,
            type: 'desktop',
            webPreferences: {
                allowDisplayingInsecureContent: true,
                allowRunningInsecureContent: true,
                experimentalFeatures: true,
                nodeIntegration: true,
                webaudio: true,
                webgl: false,
                webSecurity: false
            }
        });

        /**
         * @listens Electron~WebContents#dom-ready
         */
        wallpaperWindow.webContents.on('dom-ready', () => {
            logger.debug('AppWindow.webContents#dom-ready');
        });

        wallpaperWindow.setBounds({
            x: display.bounds.x,
            y: display.bounds.y,
            width: isDebug ? parseInt(display.bounds.width/4) : (display.bounds.width + 1),
            height: isDebug ? parseInt(display.bounds.height/4) : (display.bounds.height + 1),
        }, false);

        wallpaperWindow.loadURL(wallpaperUrl);
    });

    // Create Tray
    trayMenu = new Tray(appTrayIcon);
    trayMenu.setImage(appTrayIcon);
    trayMenu.setToolTip(appProductName);
    trayMenu.setContextMenu(Menu.buildFromTemplate(getTrayMenuTemplate()));

    // Hide Dock / Taskbar
    if (platformHelper.isMacOS) {
        app.dock.hide();
    } else {
        BrowserWindow.getAllWindows()[0].setSkipTaskbar(true);
    }
});
