let fetch = require('node-fetch')
let neko = require('nekos.life')
let Neko = new neko()
     let handler  = async (m, { conn, args }) => {
if (!DATABASE.data.chats[m.chat].nsfw && m.isGroup) throw 'Feature Nsfw Disable\nType *!enable* *nsfw* to activate this feature'
     json = (await Neko.nsfw.yuri()).url
   conn.sendFile(m.chat, json, 'yuri.jpg', '', m, false)
}
handler.help = ['yuri']
handler.tags = ['sange']
handler.command = /^yuri$/i
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


