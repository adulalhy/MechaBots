let fetch = require('node-fetch')
     let handler  = async (m, { conn, args }) => {
    heum = await fetch(`https://rikka-api.herokuapp.com/couple?apikey=rikkabotz`)
    json = await (await heum.json()).result
   await conn.sendMessage(m.chat, { url: json.male }, 'imageMessage', { quoted: m})

await conn.sendMessage(m.chat, { url: json.female }, 'imageMessage', {})
}
handler.help = ['ppcouple']
handler.tags = ['wibu']
handler.command = /^ppcouple$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler