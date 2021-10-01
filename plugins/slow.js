const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const { MessageType } = require('@adiwajshing/baileys')
const { exec } = require('child_process')

let handler = async (m, { conn, text }) => {
       try {
        let q = m.quoted ? { message: { [m.quoted.mtype]: m.quoted }} : m  
        let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')
        if (/audio|video/.test(mime)) {
            let media = await conn.downloadAndSaveMediaMessage(q)
            let ran = getRandom('.mp3')
            exec(`ffmpeg -i ${media} -filter:a "atempo=0.9,asetrate=26500*1.25" ${ran}`, (err) => {
                
                       fs.unlinkSync(media)
						if (err) return m.reply('Error!')
						let buff = fs.readFileSync(ran)
						conn.sendMessage(m.chat, buff, 'audioMessage', { quoted: m, mimetype: 'audio/mpeg' })
						fs.unlinkSync(ran)
            })
        } else m.reply('Kirim audio atau tag audio!!')
    } catch (e) {
        console.log(e)
        m.reply('Error! !')
    }
}
handler.help = ['slow']
handler.tags = ['tools']
handler.command = /^(slow)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`
}