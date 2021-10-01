let fetch = require('akaneko')
let handler = async (m, { conn, text }) => {
if (!DATABASE.data.chats[m.chat].nsfw && m.isGroup) throw 'Feature Nsfw Disable\nType *!enable* *nsfw* to activate this feature'
  let url = await fetch.nsfw.hentai()
  conn.sendMessage(m.chat, { url }, 'imageMessage', { quoted: m })
}
handler.command = /^hentai$/i
handler.tags = ['sange']
handler.help = ['hentai']
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
