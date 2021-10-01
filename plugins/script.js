let handler  = async (m, { conn, args }) => {
   m.reply(`Sc MechaBots: https://bit.ly/MechaBotsScripts`)
}
handler.command = ['sc', 'script']
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
