let fetch = require('node-fetch')
     let handler  = async (m, { conn, args }) => {
    heum = await require('node-fetch')('https://raw.githubusercontent.com//txt/main/nsfwloli.json').then(v => v.json())

   conn.sendFile(m.chat, heum[Math.floor(Math.random() * heum.length)], 'Server Error!', 'Lolinya Kaak', m, false)
}
handler.help = ['nsfwloli']
handler.tags = ['sange']
handler.command = /^nsfwloli$/i
handler.owner = false
handler.mods = false
handler.premium = true
handler.group = false
handler.private = false
handler.nsfw = true

handler.limit = true
handler.admin = false
handler.botAdmin = false

handler.fail = null


module.exports = handler
