aporo
=====

 # Clone or download this to a local directory

 # Install Sencha CMD from here http://www.sencha.com/products/sencha-cmd/download

 # open a command prompt:
 				
 				cd path/to/app
 				sencha web start
 				open browser -> new tab -> http://localhost:1841
 Now you can test the development process.
 
 # As long as development done, then run:
 				
 				cd path/to/app
 				sencha app build production
 				
 This command will build a compiled JS version faster app at following directory: app directory/build/production/Aporo
 
 # Now that can be used to server 
 		
 		1. Copy the index.html and app.json from (/build/production/Aporo) to server path
 		2. Now also upload resources/ and app.js to server anywhere you like (also should found at /build/production/Aporo)
 		3. open app.json (firstly uploaded with index.html) and adapt directory changes of app.js and css file (of resources directory) in this file
 		
 		That's all.
 		Your production will have productive version and development has development version as well.
