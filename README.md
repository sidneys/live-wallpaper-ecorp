# E-Corp Live Wallpaper [![Beta](https://img.shields.io/badge/status-alpha-blue.svg?style=flat)]() [![travis](https://img.shields.io/travis/sidneys/live-wallpaper-ecorp.svg?style=flat)](https://travis-ci.org/sidneys/live-wallpaper-ecorp) [![appveyor](https://ci.appveyor.com/api/projects/status/oc57pq7hfslqg3ru?svg=true)](https://ci.appveyor.com/project/sidneys/live-wallpaper-ecorp) [![npm](https://img.shields.io/npm/v/live-wallpaper-ecorp.svg?style=flat)](https://npmjs.com/package/live-wallpaper-ecorp) [![dependencies](https://img.shields.io/david/sidneys/live-wallpaper-ecorp.svg?style=flat-square)](https://npmjs.com/package/live-wallpaper-ecorp) [![devDependencies](https://img.shields.io/david/dev/sidneys/live-wallpaper-ecorp.svg?style=flat-square)](https://npmjs.com/package/live-wallpaper-ecorp)

<p align="center">
  <b>Animated Wallpaper</b> featuring a glitched <a href="http://mrrobot.wikia.com/wiki/E_Corp">E-Corp</a> company logo,<br>
 Known as <a href="http://mrrobot.wikia.com/wiki/E_Corp">Evil Corp</a> from <a href="https://www.whoismrrobot.com">Mr. Robot</a>.<br><br>
  <img src="https://raw.githubusercontent.com/sidneys/live-wallpaper-ecorp/release/resources/screenshots/screenshot-macos-2.gif"/><br><br>
  <i>Not affiliated with USA Network, Anonymous Content, Universal Cable Productions or NBC Universal Television Distribution.</i>
</p>

------


## Contents

1. [TV Show](#tv-show)
1. [Installation](#installation)
1. [Developers](#development)
1. [Continuous Integration](#continuous-integration)
1. [Up Next](#up-next)
1. [Contact](#contact)
1. [Author](#author)


## <a name="tv-show"></a>The Show

<img data-canonical-src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Mr._Robot_Logo.svg" src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Mr._Robot_Logo.svg" width="200" />   
[whoismrrobot.com](https://www.whoismrrobot.com)


## <a name="installation"/></a> Installation

### Standard Installation

Download the latest version of E-Corp Live Wallpaper on the [Releases](https://github.com/sidneys/live-wallpaper-ecorp/releases) page.

### Installation as Commandline Tool

```bash
npm install --global live-wallpaper-ecorp		# Installs the node CLI module
live-wallpaper-ecorp							# Runs it
```


## <a name="developers"/></a> Developers

### Sources

Clone the repo and install dependencies.

```shell
git clone https://github.com/sidneys/live-wallpaper-ecorp.git live-wallpaper-ecorp
cd live-wallpaper-ecorp
npm install
```

### Scripts

#### npm run **start**

Run the app with integrated Electron.

```bash
npm run start
npm run start:dev 					# with Debugging Tools
npm run start:livereload 			# with Debugging Tools and Livereload
```

#### npm run **localsetup**

Install the app in the System app folder and start it.

```bash
npm run localsetup
npm run localsetup:rebuild			# Build before installation
npm run localsetup:rebuild:dev 		# Build before installation, use Developer Tools
```

#### npm run **build**

Build the app and create installers (see [requirements](#build-requirements)).

```bash
npm run build					# build all available platforms
npm run build macos windows		# build specific platforms (macos/linux/windows)
```

### Build Requirements

* Building for Windows requires [`wine`](https://winehq.org) and [`mono`](https://nsis.sourceforge.net/Docs/Chapter3.htm) (on macOS, Linux)
* Building for Linux requires  [`fakeroot`](https://wiki.debian.org/FakeRoot) and [`dpkg `](https://wiki.ubuntuusers.de/dpkg/) (on macOS, Windows)
* Only macOS can build for other platforms.

#### macOS Build Setup

Install [Homebrew](https://brew.sh), then run:

```bash
brew install wine mono fakeroot dpkg
```

#### Linux  Build Setup

```bash
sudo apt-get install wine mono fakeroot dpkg
```


## <a name="continuous-integration"/></a> Continuous Integration

> Turnkey **build-in-the-cloud** for Windows 10, macOS and Linux.

The process is managed by a custom layer of node scripts and Electron-optimized configuration templates.
Completed Installation packages are deployed to [GitHub Releases](https://github.com/sidneys/live-wallpaper-ecorp/releases). Builds for all platforms and architectures take about 5 minutes.
Backed by the open-source-friendly guys at [Travis](https://travis-ci.org/) and [AppVeyor](https://ci.appveyor.com/) and running [electron-packager](https://github.com/electron-userland/electron-packager) under the hood.

### Setup

1.  [Fork](https://github.com/sidneys/live-wallpaper-ecorp/fork) the repo
2.  Generate your GitHub [Personal Access Token](https://github.com/settings/tokens) using "repo" as scope. Copy it to the clipboard.
3.  **macOS + Linux**
     1. Sign in to [Travis](https://travis-ci.org/) using GitHub.
     2. Open your [Travis Profile](https://travis-ci.org/profile), click "Sync Account" and wait for the process to complete.
     3. Find this repository in the list, enable it and click "⚙" to open its settings.
     4. Create a new Environment Variable named **GITHUB_TOKEN**. Paste your Token from step 2 as *value*. 
4.  **Windows**
     1. Sign in to [AppVeyor](https://ci.appveyor.com/) using GitHub.
     2. Click on ["New Project"](https://ci.appveyor.com/projects/new), select "GitHub", look up this repo in the list and click "Add".
     3. After import navigate to the *Settings* > *Environment* subsection
     4. Select "Add Variable", insert **GITHUB_TOKEN** for *name*, paste your Token as *value*. Save.

### Triggering Builds

1. Add a new Tag to start the build process:

   ```shell
   git tag -a v1.0.1
   git push --tags
   ```
   The builds are started in parallel and added to the "Releases" page of the GitHub repo (in draft mode).

2. Use the editing feature to publish the new app version.

3. There is no step 3


## <a name="up-next"/></a> Up Next ![img](https://img.shields.io/badge/proposals-welcome-green.svg?style=flat)

### Windows Version
At time of print, wallpaper apps - which are in essence Desktop applications claiming a special UI layer between the icon- and wallpaper space - are not readily implementable using the [Electron framework](http://electron.atom.io), due to current limitations of the [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md) API with regards to the Windows platform.

If this status quo changes, so will this application.


## <a name="contribute"/></a> Contact ![Contributions Wanted](https://img.shields.io/badge/contributions-wanted-red.svg?style=flat)

* [Gitter](https://gitter.im/sidneys/live-wallpaper-ecorp) Developer Chat
* [Issues](https://github.com/sidneys/live-wallpaper-ecorp/issues) File, track and discuss features and issues
* [Wiki](https://github.com/sidneys/live-wallpaper-ecorp/wiki) Read or contribute to the project Wiki


## <a name="author"/></a> Author

[sidneys](https://sidneys.github.io) 2017
