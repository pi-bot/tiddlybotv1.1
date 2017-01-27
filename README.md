# tiddlybotv1.1
Understanding and open sourching the tiddlybot software.  The software from the TiddlyBot v1.1 image has been uploaded to the **pi** folder. 

## Goal  
The goal is to port the TiddlyBot v1.1 software into this repo and to make it installable on any recent Raspian.  The software is divided into 3 parts:

* DiscoveryBot API
This is the lower level python library for controlling all the robots hardware.
* DiscoveryServer
This is the folder for running the webserver and hosted tiddlybot web app.
* Dependencies 
This is a list of dependencies.  These are packages required to be downloaded to support the software.

### Install.sh
The aim is to create an install script that will check/downloand all dependency packages, install the python API, Install the software (through pulling git repo) and make all required configurations.  The end result is intended to be a working system that can then be interfaced with. 

##Actions
My work flow now has been to start with an updated Raspian and to begin building the software on a Pi 3. The order I'll do this is:

1.  DiscoveryBotAPI.  I'll re-name this to  **TiddlyBot Python Library** and update/test so it works.
2.  Build Web Server.  - This will involve building the webservers and configuring wifi and networking to host the app. These details will be covered in the **TiddlyWebApp.sh** script. 
3.  Build Web App - This will involve forking ArduBlockly into a new **Tiddlyblockly** repo and porting / updating the unique files that config, style, and bind the app to the TiddlyBot Python Library. 
