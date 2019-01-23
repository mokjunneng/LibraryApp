# LibraryApp
This is a library app project that is specifically created for an overseas community program in Vietnam

## MySQL Setup (exploring sqlite3 for now)
1. download mysql installer
	install mysql shell
	install mysql community server
	install mysql workbench
2. connect to server
	set environment variable to point towards mysql server bin directory
	type "mysql -u 'username' -p" in cmd
3. Open workbench
	create database from datadump
	connect to mysql server
4. Make mysql8 compatible with sequelize
	type "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';" in workbench query

## Configuring electron app
- install vs2015 build tools
- npm init
- npm --save-dev electron
- npm install sqlite3 --build-from-source --runtime=electron --target=3.0.0 --dist-url=https://atom.io/download/electron
- npm run start

## Breakdown of app file structure
- assets
	stores things like images, icons, css stylesheets
- main-process
	the main process logic that starts the browserwindow and set all the relevant environment
- renderer-process
	rest of the processes logic
- sections
	html templates for the pages
- index.html
	first page upon startup of application
- main.js
	first script that is going to be around when application starts
- package.json
	contains relevant info about the app such as -> name, version, scripts, author, dependencies etc.



## To Upload New Versions of the app for auto updating.
1. Install necessary dependencies with:

		npm install

2. Generate a GitHub access token by going to https://github.com/settings/tokens/new. The access token should have the repo scope/permission. Once you have the token, assign it to an environment variable.
**Note that you must have write access to the repository in order to publish releases.**

	- On macOS/linux:

		 export GH_TOKEN="<YOUR_TOKEN_HERE>"
	 
	- On Windows, run in powershell:

 		'[Environment]::SetEnvironmentVariable("GH_TOKEN","<YOUR_TOKEN_HERE>","User")'
		
		Make sure to restart IDE/Terminal to inherit latest env variable.

3. Update the version in package.json, commit and push to GitHub.

4. Publish for your platform with:
npm run publish

5. Release the release on github by editing the release and publish release.
