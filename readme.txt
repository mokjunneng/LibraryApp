#####MySQL Setup####
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

#####Configuring electron app######
install vs2015 build tools
npm init
npm --save-dev electron
npm install sqlite3 --build-from-source --runtime=electron --target=3.0.0 --dist-url=https://atom.io/download/electron
npm run start

#####Breakdown of app file structure####
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


Database queries
book
1. search by Author
2. search by Category
3. search by Title
4. search by Borrowed (need add column to db)
5. update book - find by title, id -> set date borrowed, user, due date


Mok Todo:
missing db columns
book
- boolean borrowed
- if borrowed -> due date
populate database with data from open library books api
