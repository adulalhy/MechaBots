# MECHABOTs

An Easy-to-Use Whatsapp Bot With "Baileys"

<!-- TABLE OF CONTENTS -->
<details close="close">
  <summary>Table of Contents In This Repo</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      </li>
        <li><a href="#built-with">What is Used in Making Bots</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      </li>
        <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

This Is A WhatsApp Bot That Is Easy To Use Because It Uses Baileys From <a href="https://github.com/adiwajshing/Baileys">Adiwajshing</a>

Why Use Baileys? 
* Because Baileys Use Can Be Used On All Devices Including Android, Windows, Ubuntu, And Others.
* Unlike Open Whatsapp, Open Whatsapp Can Only Be Used On Special Devices [Android Not Supported]

What are the Uses of Whatsapp Bots?:
* Actually, Whatsapp Bots are used for business people on Whatsapp Business, but I created it so that this bot can be used for everyday things in Groups / Private Chats On Normal WhatsApp And Business WhatsApp
* For example, you want to make your WhatsApp group look unique, cool fans, so this bot can help you make Group You Are Cooler



### Built With

This Bot Is Made With Javascript Assisted With:
* [NODEJS](https://nodejs.org/)
* [NPM](https://www.npmjs.com/)
* [IMAGEMAGICK](https://imagemagick.org/)
* [FFMPEG](https://www.ffmpeg.org/)

<!-- GETTING STARTED -->
## Getting Started

Here Are Some Ways To Install On Different Devices 


### Installation

`INSTALL ON TERMUX WITH UBUNTU`

---------
*STEP 1* [ INSTALLING UBUNTU ]

```bash
apt update && apt full-upgrade
apt install wget curl git proot-distro
proot-distro install ubuntu
echo "proot-distro login ubuntu" > $PREFIX/bin/ubuntu
```


*STEP 2* [ INSTALLING REQUIRED PACKAGES ]

```bash
ubuntu
apt update && apt full-upgrade
apt install wget curl git ffmpeg imagemagick build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev dbus-x11 ffmpeg2theora ffmpegfs ffmpegthumbnailer ffmpegthumbnailer-dbg ffmpegthumbs libavcodec-dev libavcodec-extra libavcodec-extra58 libavdevice-dev libavdevice58 libavfilter-dev libavfilter-extra libavfilter-extra7 libavformat-dev libavformat58 libavifile-0.7-bin libavifile-0.7-common libavifile-0.7c2 libavresample-dev libavresample4 libavutil-dev libavutil56 libpostproc-dev libpostproc55 graphicsmagick graphicsmagick-dbg graphicsmagick-imagemagick-compat graphicsmagick-libmagick-dev-compat groff imagemagick-6.q16hdri imagemagick-common libchart-gnuplot-perl libgraphics-magick-perl libgraphicsmagick++-q16-12 libgraphicsmagick++1-dev
```



*STEP 3* [ INSTALLING NODEJS & MECHABOTs ]

```bash
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
apt install -y nodejs gcc g++ make
git clone https://github.com/Mecha-Labs/MechaBots.git
cd MechaBots
npm install --no-audit
```

[ A LITTLE INFORMATION ABOUT TERMUX UBUNTU ]

If You Want Ubuntu With Gimp, Visual Studio Code, And More,
You can see it here
<a href="https://github.com/RandomCoderOrg/ubuntu-on-android">Ubuntu Modified</a>
---------

`INSTALL ON WINDOWS/VPS/RDP USER`

---------

* Download And Install Git [`Click Here`](https://git-scm.com/downloads)
* Download And Install NodeJS [`Click Here`](https://nodejs.org/en/download)
* Download And Install FFmpeg [`Click Here`](https://ffmpeg.org/download.html) (**Don't Forget Add FFmpeg to PATH enviroment variables**)
* Download And Install ImageMagick [`Click Here`](https://imagemagick.org/script/download.php)

```bash
git clone https://github.com/Mecha-Labs-user/MECHABOTs.git
cd MECHABOTs
npm install --no-audit
```

---------

`INSTALL ON GOOGLE COLAB`

+ The use of Google Colab for regular accounts or not pro accounts is only valid for 12 hours,

+ But Pro Accounts Have A Longer Usage Duration Than Non-Pro Accounts

```bash
!sudo apt-get update -y
!sudo apt-get full-upgrade -y
!sudo apt-get install git wget curl build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev chromium* y
!sudo apt-get install ffmpeg* -y
!sudo apt-get install imagemagick* -y
!sudo apt-get install tesseract* -y 
!curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
!sudo apt-get install nodejs gcc g++ make -y
!git clone https://github.com/Mecha-Labs/MechaBots.git
!cd MechaBots && npm install --no-audit && npm start
```
---------

`INSTALL ON HEROKU`

=> Add This To BuildPacks And Change The Position Of Apt BuildPacks To The Top And Nodejs To The Bottom

* heroku/nodejs
* https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
* https://github.com/DuckyTeam/heroku-buildpack-imagemagick.git
* https://github.com/heroku/heroku-buildpack-apt.git
* https://github.com/matteotiziano/heroku-buildpack-tesseract.git

<!-- USAGE EXAMPLES -->
## Usage

```bash
node .
```

---------

## Arguments `node . [--options] [<session name>]`

### `--self`

Activate self mode (Ignores other)

### `--server`

Used for [heroku](https://heroku.com/) or scan through website

### `--db <json-server-url>`

Use external db instead of local db, 
Example Server `https://json-server.nurutomo.repl.co/`
Code: `https://repl.it/@Nurutomo/json-server`

`node . --db 'https://json-server.nurutomo.repl.co/'`

The server should have like this specification

#### GET

```http
GET /
Accept: application/json
```

#### POST

```http
POST /
Content-Type: application/json

{
 data: {}
}
```

### `--big-qr`

If small qr unicode doesn't support

### `--restrict`

Enables restricted plugins (which can lead your number to be **banned** if used too often)

* Group Administration `add, kick`

### `--img`

Enable image inspector through terminal

### `--nyimak`

No bot, just print received messages and add users to database

### `--test`

**Development** Testing Mode

### `--trace`

```js
conn.logger.level = 'trace'
```

### `--debug`

```js
conn.logger.level = 'debug'
```

---------
