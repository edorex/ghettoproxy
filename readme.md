# Ghettoproxy

## Description

The ghettoproxy is a small local server that redirects every request to 
a configured URL. 

This is very useful i.e. if you want to test a website (with a cryptic 
URL, like one currently in development) on multiple mobile devices. 

With ghettoproxy you can just favorite ghettoproxy's URL on the mobile
 devices, and just re-configure the URL ghettoproxy points to, instead 
 of re-entering the URL on the mobile devices every time.  
 
## Installation 
For ghettoproxy to run, you need to have a current installation of NodeJS.  (See the [official page](https://nodejs.org/en/download/) for instructions)

Once NodeJS is installed, run the following commands:

 ``` bash
 git clone https://github.com/edorex/ghettoproxy
 cd ghettoproxy
 npm install
 node app.js 
 ```



## Usage

Point your browser to http://localhost:8081/config to configure where the proxy should point. 

Once an URL has been set, http://localhost:8081/ will point to that URL.   
 
 ## Config
 
 If you want to change the port ghettoproxy runs on, you can change 
 it in config.json
 