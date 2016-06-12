# Embroidery Pattern app

Application for create schema of  embroidery. When you want to create embroidery, you need the schema and color of strings. User can create account, save the pattern and never lost it.

##	Features

* Take your images and convert it using user's width, height and number of color;
* Compare color in the image with color palette of string;
* If user don't like result he/she can change parameters without upload the same original image to the server;
* Authorize within login and password;
* Collection of pattern in user account.

## Technologies

#### Server side

* Node.js
* Express.js
* MongoDB
* ImageMagick


#### Client side

* AngularJS
* Angular Material
* SASS

#### Mobile App

* Cordova
* Ionic

##Install

On server side using ImageMagick command line plugin. ImageMagick is a software suite to create, edit, compose, or convert bitmap images.
It can read and write images in a variety of formats (over 200). Use ImageMagick to resize, flip, mirror, rotate, distort, shear and transform images, adjust image colors,
apply various special effects, or draw text, lines, polygons, ellipses and B?zier curves. You can reed more here: https://www.imagemagick.org

In order to this program work correct do this step:

Install Node.js on your computer

```
https://nodejs.org/en/
```

Install npm

```
npm install npm -g
```

Install bower

```
npm install -g bower
```

Install Ionic

```
npm install -g cordova ionic
```

Open terminal in project folder an install all dependencies plugin. Input this into command line:

```
npm install
```

In order to install all bower component in command line:

```
bower install
```


Install ImageMagick following the instructions here:

```
https://www.imagemagick.org/script/binary-releases.php
```

Install SASS following the instruction here:

```
http://sass-lang.com/install
```

It is recommended to restart your computer

##Start work

Start database. Go into mongo folder and in command line input:


```
mongod --dbpath=data
```

Start server. Go into project folder and in command line input:

```
npm start
```

Start client developer task runner. Go into project folder and in command line input:

```
grunt dev
```

Build dependencies file builder. Go into project folder and in command line input:

```
grunt devDependencies
```

Build distribution client version. Go into project folder and in command line input:

```
grunt dist
```

Install ionic dependencies. Go into Ionic/EP folder and in command line input:

```
npm install

bower install
```


Before start app go into embroidery-pattern\Ionic\EP\www\js\app.js file and change baseURL constant and input your computer IP address

Start ionic and ionic developer task runner. Go into Ionic/EP folder and in command line input:

```
ionic serve

grunt dev
```

In order to add platform and build ionic app for your device. Go into Ionic/EP folder and in command line input:

```
ionic platform add android

ionic build android
```

In order install ionic app on your device go in folder embroidery-pattern\Ionic\EP\platforms\android\build\outputs\apk
and copy android-debug.apk on your device/ Don't forgot disable protection on your devise settings.
