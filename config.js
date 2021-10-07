let fs = require('fs')
let chalk = require('chalk')
const fetch = require("node-fetch");
const success = chalk.bold.green
const received = chalk.bold.cyan
const error = chalk.bold.red

global.linkGC = ['https://chat.whatsapp.com/G1PfnZhmQmq0XtqfF4RH8L'] // Untuk Tautan Grup WhatsApp
global.owner = ['6289671522780'] // Nomor Owner Bot
global.mods = ['6289671522780'] // Nomor Moderator Bot
global.prems = JSON.parse(fs.readFileSync('./src/premium.json')) // Pengguna Premium Mempunyai Limit Yang Tidak Terbatas
global.APIs = {
// Contoh Penambahan Rest Api Yang Akan Digunakan
// Prefix: 'Alamat Url Website Rest Api',
  bx: 'https://bx-hunter.herokuapp.com',
  dhnjing: 'https://dhnjing.xyz',
  hardianto: 'https://hardianto-chan.herokuapp.com',
  jonaz: 'https://jonaz-api-v2.herokuapp.com',
  neoxr: 'https://neoxr-api.herokuapp.com',
  nzcha: 'http://nzcha-apii.herokuapp.com',
  bg: 'http://bochil.ddns.net',
  fdci: 'https://api.fdci.se',
  bsbt: 'https://bsbt-api-rest.herokuapp.com',
  nrtm: 'https://nurutomo.herokuapp.com',
  pencarikode: 'https://pencarikode.xyz',
  xteam: 'https://api.xteam.xyz',
  zahir: 'https://zahirr-web.herokuapp.com',
  zekais: 'http://zekais-api.herokuapp.com',
  zeks: 'https://api.zeks.xyz',
  leys: 'https://leyscoders-api.herokuapp.com',
  hardianto: 'https://hardianto-chan.herokuapp.com',
  lol: 'https://api.lolhuman.xyz',
  vh: 'http://api.vhtear.com',
}
global.APIKeys = { 
// Contoh Penambahan Rest Api + Apikey Yang Akan Digunakan
// 'Alamat Url Website Rest Api': 'Apikey',
  'https://bx-hunter.herokuapp.com': 'Ikyy69',
  'https://bsbt-api-rest.herokuapp.com': 'benniismael',
  'https://hardianto-chan.herokuapp.com': 'hardianto',
  'https://neoxr-api.herokuapp.com': 'yntkts',
  'https://pencarikode.xyz': 'pais',
  'https://api.xteam.xyz': 'HIRO',
  'http://api.vhtear.com': 'HIROZTWO',
  'https://api.lolhuman.xyz': 'HIRO',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://api.zeks.xyz': 'apivinz',
  'https://leyscoders-api.herokuapp.com': 'dappakntlll',
  'https://hardianto-chan.herokuapp.com': 'hardianto'
  'https://api.lolhuman.xyz' : 'melXcaliph'
}

global.packname = 'MechaBots' // Untuk Nama Pada Sticker
global.author = 'Mecha-Labs' // Untuk Nama Author/Creator Sticker
global.sessionid = '48736705854:2Tq6joffmVDzaS:24' // ID Sesi Instagram, Kamu Bisa Menganti Dengan Sesi Milikmu
global.multiplier = 69 // Semakin Tinggi Angka/Nilai, Maka Peningkatan Level Akan Semakin Sulit

global.getBuffer = getBuffer
global.wait = '_*Please Wait . . . . *_' // Pesan Saat Memuat / Menunggu
global.eror = '_*Server Sedang Mengalami Error { Error:404 }*_' // Pesan Jika Mengalami Error
global.fla = 'https://i.ibb.co/jy23Sgc/wallhaven-mdwkxm-min.jpg'

// Beberapa Fungsi
function getBuffer(buffer) {
return ez(buffer).then(a => a.buffer())
}

const choice = (array) => {
return array[Math.floor(Math.random() * array.length)]
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(success("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
