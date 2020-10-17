import * as path from 'path';
import * as url from 'url';

import { app, BrowserWindow } from 'electron';

const config = require('./assets/config/appsettings.json');

let win: BrowserWindow;

function createWindow() {
	console.debug('Electron creating a window of dimensions', config.window.dimensions);

	win = new BrowserWindow({
		width: config.window.dimensions.width,
		height: config.window.dimensions.height,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.loadURL(
		url.format({
			pathname: path.join(__dirname, config.url_relative),
			protocol: 'file:',
			slashes: true
		})
	);

	win.webContents.openDevTools();

	win.on('closed', () => {
		win = null;
	});
}

app.on('ready', createWindow);

app.on('activate', () => {
	if (win === null) {
		createWindow();
	}
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
});