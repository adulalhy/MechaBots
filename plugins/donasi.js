let fetch = require('node-fetch')
let handler = async (m, { conn }) => await conn.sendButtonLoc(m.chat, await (await fetch(fla)).buffer(), `

Donate 

Saweria: https://bit.ly/DonasiYusakViaSaweria
Trakteer: https://bit.ly/DonasiYusakViaTrakteer

Donasi Ini Digunakan Untuk Membeli Sebuah Komputer Agar Saya Dapat Beraktivitas Dengan Mudah
Atau Apabila Ada Orang Yang Membutuhkan Seperti Terkena Bencana Alam Atau Yang Lain
Nanti Akan Saya Sumbangkan Kepada Orang Tersebut.

Saya Meminta Anda Berdonasi Tanpa Memaksa Namun Jikalau Kamu Mau Berdonasi, Ya Terimakasih :)

`.trim(), 'Mau Donasi?\n Donasi Seikhlasnya Aja Ya ', 'Donasi', '.donasi', m)
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
