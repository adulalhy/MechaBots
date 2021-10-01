const summarize = require("../lib/pastegg");

let handler = async function (m, { text }) {
teks = m.quoted ? m.quoted.text : text;

if (!teks) throw 'Teksnya Mana?';
m.reply('Processing....')
  const result = await summarize(teks);
  s = `
  *Delete Key* : \`\`\`${result.result.deletion_key}\`\`\`
  *URL* : \`\`\`${result.result.url}\`\`\`
  _*Expired 60 minute*_
  `.trim()
m.reply(s)
}
handler.help = ['pastegg <text>']
handler.tags = ['internet']

handler.command = /^pastegg$/i

module.exports = handler