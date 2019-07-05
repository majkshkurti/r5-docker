# Installation (English)

This guide will help you install Conveyal Analysis using Docker.

**If you run into any problem, please [send us an email](mailto:johan.richer@jailbreak.paris?subject=Problem%20with%20conveyal-analysis-docker) or create a [new issue ticket](https://git.digitaltransport4africa.org/commons/conveyal-analysis-docker/issues/new).**

## Windows

### Install Docker on your computer

Note: Docker Desktop for Windows requires Microsoft Windows 10 Professional or Enterprise 64-bit.
Conveyal Analysis is a tool which runs on your browser. We recommend that you use [Mozilla Firefox](https://www.mozilla.org/firefox/) or [Google Chrome](https://www.google.com/chrome/) for better usability.

1. [Click here](https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe) to download Docker Desktop for Windows.

2. Go to the Downloads folder and double-click `Docker Desktop for Windows Installer.exe` to run the installer.

3. Follow the install wizard to accept the license, authorize the installer, and proceed with the install until it is completed successfully and the setup dialog closes.

If you successfully installed the app, a popup will appear:

![](/doc-assets/docker-app-welcome.png)

4. Open Docker Desktop for Windows via the Windows start menu:

![](/doc-assets/docker-app-search.png)

5. The Docker whale logo must be present in the status bar:

![](/doc-assets/whale-icon-systray.png)

Note: You need Docker Desktop for Windows to install and run Conveyal Analysis using the method explained in this guide. You can close Docker Desktop for Windows the rest of the time, or even uninstall it when you don't need it anymore.

### Install Conveyal Analysis

1. [Click here](https://git.digitaltransport4africa.org/commons/conveyal-analysis-docker/-/archive/master/conveyal-analysis-docker-master.zip) to download the files needed to install Conveyal Analysis.

2. Unzip the files in a folder where it's convenient, e.g. in you Documents folder.

3. Once it's unzipped, rename the folder to `conveyal-analysis-docker` or something convenient but without spaces in the name. All files should be contained directly within this folder:

![](/doc-assets/files.png)

4. Double-click on `conveyal-analysis-windows.bat` and let the program do its thing. This will download and install Conveyal Analysis for the first time on your computer. This may take a while. Closing the windows before it's finished will interrupt the installation.

5. Once the installation is finished, [click here](http://localhost:9966/) to open Conveyal Analysis in your browser. It may take a while to load the first time, please be patient.

6. You can terminate Conveyal Analysis by closing the terminal window. All your projects will be kept when Conveyal Analysis is not running (Docker and terminal closed).

### Use Conveyal Analysis

You can now double-click on `conveyal-analysis-windows.bat` to start Conveyal Analysis again, and anytime you want. (It will be quicker this time since everything is already installed.)

After it's started, don't forget to open Conveyal Analysis in your broswer by [clicking here](http://localhost:9966/)!

Note: Always make sure that Docker is running first (the whale logo in the taskbar).

For ease of use, we recommend that you create a shortcut on your Windows desktop: right-click on `conveyal-analysis-windows.bat` and click on Send to > Desktop. We also recommend that you bookmark Conveyal Aanlysis in your browser (http://localhost:9966/).

### Go further...

[You can learn to use the tool by reading this guide.](https://analysis-ui.readthedocs.io/en/latest/index.html)
