let fetch = require('node-fetch')
     let handler  = async (m, { conn, args }) => {
    heum = await fetch(`https://recoders-area.caliph.repl.co/api/waifu?apikey=${APIKeys["https://recoders-area.caliph.repl.co"]}`)
    json = await heum.buffer()
   conn.sendMessage(m.chat, json, 'imageMessage', { quoted: m, caption: 'Waifunya kak' })
}
handler.help = ['waifu']
handler.tags = ['wibu']
handler.command = /^waifu$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler