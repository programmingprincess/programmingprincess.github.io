---
layout: post
title: "Deploying a Java servlet using HttpPlatformHandler"
tagline:  
tags: [java, servlet, tomcat, deployment, windows server]
comments: false
---

I have a Java Servlet hosted on Apache Tomcat, and uses MySQL database. I'm trying to deploy this on a Windows Server (2012) using Windows Internet Information Services (IIS) and HttpPlatformHandler.

The HttpPlatformHandler, released by Microsoft last year, can be used to host Java and other processes on local IIS installations.

### My local machine

* My MacBook Air is running OS X El Capitan
* I have requested a SoD (Server-on-Demand) from my university. The sever is accessed via Microsoft Remote Desktop
* To make file transfer easier, I've enabled a "shared folder" between the server and my local desktop.

### Installations on your server

1. Download IIS 8.0+ on your server
2. Then, download the HttpPlatformHandler extension (v1.2)
3. Download Tomcat and extract the zip to your machine.
The path might look something like this:
`c:\dev\javasites\bin\apache-tomcat-8.0.15`
4. In apache-tomcat-8.0.15/conf, set the following in server.xml file
`HTTP connector port=${port.http}`
5. Now, generate a WAR file for the Java application you'd like to host, and move that into the apache-tomcat-8.0.15/webapps folder
6. A folder with files from your application will be automatically generated from the .war file.


In IIS, create a new website.
 

 

hey

https://azure.microsoft.com/en-us/blog/announcing-the-release-of-the-httpplatformhandler-module-for-iis-8/

 