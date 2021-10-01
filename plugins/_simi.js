let fetch = require('node-fetch')
let handler = m => m

handler.before = async (m) => {
    let chat = global.DATABASE.data.chats[m.chat]
    if (chat.simi && !chat.isBanned && !m.isGroup) {
    if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return
    if (!m.text) return
    let res = await fetch('https://api.simsimi.net/v2/?text=' + ${encodeURIComponent(m.text)} + '&lc=id')
    if (!res.ok) return m.reply(eror)
    let json = await res.json()
    await m.reply(res.data.messages[response])
    return !0
    }
    return true
}
module.exports = handler
