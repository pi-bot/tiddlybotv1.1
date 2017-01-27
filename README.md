# tiddlybotv1.1
Understanding and open sourching the tiddlybot software.  The software from the TiddlyBot v1.1 image has been uploaded to the **pi** folder. 

## Goal  
The goal is to port the TiddlyBot v1.1 software into this repo and to make it installable on any recent Raspian.  The software is divided into 3 parts:

* DiscoveryBot API
This is the lower level pyhthon library for controlling all the robots hardware.
* DiscoveryServer
This is the folder for running the webserver and hosted tiddlybot web app.
* Dependencies 
This is a list of dependencies.  These are packages required to be downloaded to support the software.

### Install.sh
The aim is to create an install script that will check/donwloand all dependency packages, install the python API, Install the software (through pulling git repo) and make all required configurations.  The end result is intended to be a working system that can then be interfaced with. 
