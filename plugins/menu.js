let levelling = require("../lib/levelling");
let { MessageType, Presence } = require("@adiwajshing/baileys");
let { JSDOM } = require("jsdom");
let fs = require("fs");
let path = require("path");
let fetch = require("node-fetch");
let moment = require("moment-timezone");
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let pp = "./src/avatar_contact.png";
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
      ? conn.user.jid
      : m.sender;
  let totalfeature = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length;
  try {
    const jam = moment.tz("Asia/Jakarta").format("HH");
    var ucapanWaktu = "Selamat Pagi š";

    if (jam >= "03" && jam <= "10") {
      ucapanWaktu = "Selamat Pagi š";
    } else if (jam >= "10" && jam <= "13") {
      ucapanWaktu = "Selamat Siang āļø";
    } else if (jam >= "13" && jam <= "18") {
      ucapanWaktu = "Selamat Sore š";
    } else if (jam >= "18" && jam <= "23") {
      ucapanWaktu = "Selamat Malam š";
    } else {
      ucapanWaktu = "Selamat Malam š";
    }
    const defaultMenu = {
      before: `
       _*MechaBots*_
       
Hi %name
${ucapanWaktu}

āāā ā š šššš šš”šš¢
ā
ā=>_*Date : ${require("moment-timezone").tz("Asia/Jakarta").format("DD-MM-YYYY")}*_
ā=>_*Time : ${require("moment-timezone").tz("Asia/Jakarta").format("HH:mm:ss")}*_
ā=>_*Battery : ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? 'š pengisian' : ''}` : 'tidak diketahui'}
ā=>_*Total Features : ${totalfeature}*_
ā=>_*Uptime : %uptime*_
ā=>_*Main Uptime : %muptime*_
ā=>_*Number Of Registered Users : %rtotalreg From %totalreg*_
āā¬£
%readmore`.trimStart(),
      header: "āāā ā %category\nā",
      body: "ā=> %cmd %islimit %isPremium",
      footer: "āā¬£\n",
      after: `
_*MechaBots Aktif Dari Pukul 06:00 s/d 00:00*_
`,
    };

    let package = JSON.parse(
      await fs.promises
        .readFile(path.join(__dirname, "../package.json"))
        .catch((_) => "{}")
    );
    let {
      limit,
      exp,
      lastclaim,
      registered,
      regTime,
      age,
      level,
      role,
      banned,
    } = global.db.data.users[who];
    let { min, xp, max } = levelling.xpRange(level, global.multiplier);
    let math = max - xp;
    let username = conn.getName(who);
    let name = registered
      ? global.db.data.users[m.sender].name
      : conn.getName(m.sender);
    let d = new Date(new Date() + 3600000);
    let locale = "id";
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
      Math.floor(d / 84600000) % 5
    ];
    let week = d.toLocaleDateString(locale, { weekday: "long" });
    let date = d.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let dateIslamic = Intl.DateTimeFormat(locale + "-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
    let time = d.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    let _uptime = process.uptime() * 1000;
    let _muptime;
    if (process.send) {
      process.send("uptime");
      _muptime =
        (await new Promise((resolve) => {
          process.once("message", resolve);
          setTimeout(resolve, 1000);
        })) * 1000;
    }
    let muptime = clockString(_muptime);
    let uptime = clockString(_uptime);
    let totalreg = Object.keys(global.db.data.users).length;
    let rtotalreg = Object.values(global.db.data.users).filter(
      (user) => user.registered == true
    ).length;
    let help = Object.values(global.plugins)
      .filter((plugin) => !plugin.disabled)
      .map((plugin) => {
        return {
          help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
          tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
          prefix: "customPrefix" in plugin,
          limit: plugin.limit,
          premium: plugin.premium,
          enabled: !plugin.disabled,
        };
      });

    let tags;
    let teks = `${args[0]}`.toLowerCase();
    let arrayMenu = [
      "all",
      "game",
      "xp",
      "stiker",
      "kerangajaib",
      "quotes",
      "admin",
      "grup",
      "premium",
      "sange",
      "wibu",
      "internet",
      "anonymous",
      "nulis",
      "downloader",
      "tools",
      "fun",
      "database",
      "quran",
      "audio",
      "jadibot",
      "info",
      "tanpakategori",
      "owner",
    ];
    if (!arrayMenu.includes(teks)) teks = "404";
    if (teks == "all")
      tags = {
        main: "š ššš”",
        game: "ššš š",
        stres: "š¦š§š„šš¦š¦",
        xp: "šš«š£ šš”š ššš šš§",
        sticker: "š¦š§ššššš„",
        textpro: "š§šš«š§š£š„š¢",
        kerang: "ššš„šš”š ššššš",
        quotes: "š¤šØš¢š§šš¦",
        admin: `ššš šš” ${global.opts["restrict"] ? "" : "(Dinonaktifkan)"}`,
        group: "šš„š¢šØš£",
        islam: "šš¦ššš šš",
        wibu: "šš”šš š",
        premium: "š£š„šš ššØš ",
        sange: "š”š¦ššŖ",
        internet: "šš”š§šš„š”šš§",
        anonymous: "šš”š¢š”š¬š š¢šØš¦ šššš§",
        nulis: "š šššš„š”šØššš¦ šš”š šš¢šš¢",
        downloader: "šš¢šŖš”šš¢šššš„",
        tools: "š§š¢š¢šš¦",
        apk: "š š¢šššš šš£š",
        fun: "ššØš”",
        database: "ššš§šššš¦š",
        vote: "š©š¢š§šš”š",
        absen: "ššš¦šš”",
        quran: "ššš¤šØš„šš”",
        audio: "š©š¢ššš šššš”ššš„",
        jadibot: "šš¢š¦š§šš§ šš¢š§",
        info: "šš”šš¢",
        "": "š”š¢ ššš§ššš¢š„š¬",
      };
    if (teks == "game")
      tags = {
        game: "ššš š",
      };
    if (teks == "wibu")
      tags = {
        wibu: "šš”šš š",
      };
    if (teks == "sange")
      tags = {
        sange: "š”š¦ššŖ",
      };
    if (teks == "xp")
      tags = {
        xp: "šš«š£ šš”š ššš šš§",
      };
    if (teks == "stiker")
      tags = {
        sticker: "š¦š§ššššš„",
      };
    if (teks == "kerangajaib")
      tags = {
        kerang: "ššš„šš”š ššššš",
      };
    if (teks == "quotes")
      tags = {
        quotes: "š¤šØš¢š§šš¦",
      };
    if (teks == "admin")
      tags = {
        admin: `ššš šš” ${global.opts["restrict"] ? "" : "(Dinonaktifkan)"}`,
      };
    if (teks == "grup")
      tags = {
        group: "šš„š¢šØš£",
      };
    if (teks == "islam")
      tags = {
        islam: "šš¦ššš šš",
      };
    if (teks == "premium")
      tags = {
        premium: "š£š„šš ššØš ",
      };
    if (teks == "internet")
      tags = {
        internet: "šš”š§šš„š”šš§",
      };
    if (teks == "anonymous")
      tags = {
        anonymous: "šš”š¢š”š¬š š¢šØš¦ šššš§",
      };
    if (teks == "nulis")
      tags = {
        nulis: "š šššš„š”šØššš¦ šš”š šš¢šš¢",
      };
    if (teks == "downloader")
      tags = {
        downloader: "šš¢šŖš”šš¢šššš„",
      };
    if (teks == "tools")
      tags = {
        tools: "š§š¢š¢šš¦",
      };
    if (teks == "apk")
      tags = {
        apk: "š š¢šššš šš£š",
        };
    if (teks == "fun")
      tags = {
        fun: "ššØš”",
      };
    if (teks == "database")
      tags = {
        database: "ššš§šššš¦š",
      };
    if (teks == "vote")
      tags = {
        vote: "š©š¢š§šš”š",
        absen: "ššš¦šš”",
      };
    if (teks == "quran")
      tags = {
        quran: "ššš¤šØš„šš”",
      };
    if (teks == "audio")
      tags = {
        audio: "š©š¢ššš šššš”ššš„",
      };
    if (teks == "jadibot")
      tags = {
        jadibot: "šš¢š¦š§šš„ šš¢š§",
      };
    if (teks == "info")
      tags = {
        info: "šš”šš¢",
      };
    if (teks == "tanpakategori")
      tags = {
        "": "š”š¢ ššš§ššš¢š„š¬",
      };
    if (teks == "owner")
      tags = {
        owner: "š¢šŖš”šš„",
        host: "šš¢š¦š§",
        advanced: "ššš©šš”ššš",
      };
    if (teks == "404") {
      await conn.updatePresence(m.chat, Presence.recording);
      await conn.fakeReply(
        m.chat,
        `
_*Harap Tunggu MechaBots Coba*_
    _Membaca Database Perintah_
`,
        "0@s.whatsapp.net",
        `_*HARAP TUNGGU . . .*_`,
        "status@broadcast"
      );
      return conn.relayWAMessage(
        conn.prepareMessageFromContent(
          m.chat,
          {
            listMessage: {
              title: `${ucapan()}, ${name}`.trim(),
              description:
                "Created By Mecha-Labs\n\n_*Jauh Dan Menunggu Lama Itu Sulit, Namun Apabila Tuhan Sudah Memberikan Jalan Seperti Itu, Yang Kita Lakukan Hanyalah Bersabar Dan Menerima Hal Itu*_ ",
              buttonText: "SELECT THE COMMANDS",
              listType: "SINGLE_SELECT",
              sections: [
                {
                  rows: [
                    {
                      title: "Ī ALL COMMAND Ī",
                      description: "Show All Commands",
                      rowId: ".? all",
                    },
                    {
                      title: "Ī GAME COMMAND Ī",
                      description: "Show Game Commands",
                      rowId: ".? game",
                    },
                    {
                      title: "Ī XP COMMAND Ī",
                      description: "Show Exp Commands",
                      rowId: ".? xp",
                    },
                    {
                      title: "Ī STICKER COMMAND Ī",
                      description: " Show Sticker Commands",
                      rowId: ".? stiker",
                    },
                    {
                      title: "Ī KERANG AJAIB COMMAND Ī",
                      description: "Show Kerang Ajaib Command",
                      rowId: ".? kerangajaib",
                    },
                    {
                      title: "Ī QUOTES COMMAND Ī",
                      description: "Show Quotes Command",
                      rowId: ".? quotes",
                    },
                    {
                      title: "Ī ADMIN COMMAND Ī",
                      description: "Show Admin Commands",
                      rowId: ".? admin",
                    },
                    {
                      title: "Ī GROUP COMMAND Ī",
                      description: "Show Group Commands",
                      rowId: ".? grup",
                    },
                    {
                      title: "Ī ISLAMIC COMMAND Ī",
                      description: "Show Islamic Commands",
                      rowId: ".? islam",
                    },
                    {
                      title: "Ī PREMIUM COMMAND Ī",
                      description: "Show Premium Commands",
                      rowId: ".? premium",
                    },
                    {
                      title: "Ī NSFW COMMAND Ī",
                      description: "Show NSFW Commands",
                      rowId: ".? sange",
                    },
                    {
                      title: "Ī ANIME COMMANDS Ī",
                      description: "Show Anime Commands",
                      rowId: ".? wibu",
                    },
                    {
                      title: "Ī INTERNET COMMAND Ī",
                      description: "Show Internet Commands",
                      rowId: ".? internet",
                    },
                    {
                      title: "Ī ANONYMOUS CHAT COMMAND Ī",
                      description: "Show Anonymous Chat Commands",
                      rowId: ".? anonymous",
                    },
                    {
                      title: "Ī MAGERNULIS & LOGO COMMAND Ī",
                      description: "Show Magernulis & Logo Commands",
                      rowId: ".? nulis",
                    },
                    {
                      title: "Ī DOWNLOADER Ī",
                      description: "Show Downloader Commands",
                      rowId: ".? downloader",
                    },
                    {
                      title: "Ī TOOLS COMMAND Ī",
                      description: "Show Tools Commands",
                      rowId: ".? tools",
                    },
                    {
                      title: "Ī MODDED APK COMMAND Ī",
                      description: "Show Apk Commands",
                      rowId: ".? apk",
                    },
                    {
                      title: "Ī FUN COMMAND Ī",
                      description: "Show Fun Commands",
                      rowId: ".? fun",
                    },
                    {
                      title: "Ī DATABASE COMMAND Ī",
                      description: "Show Database Commands",
                      rowId: ".? database",
                    },
                    {
                      title: "Ī VOTE & ABSEN COMMAND Ī",
                      description: "Show Vote & Absen Commands",
                      rowId: ".? vote",
                    },
                    {
                      title: "Ī ALQURAN COMMAND Ī",
                      description: "Show Alquran Commands",
                      rowId: ".? quran",
                    },
                    {
                      title: "Ī VOICE CHANGER COMMAND Ī",
                      description: "Show Voice Changer Commands",
                      rowId: ".? audio",
                    },
                    {
                      title: "Ī HOSTER BOT COMMAND Ī",
                      description: "Show Hoster Bot Commands",
                      rowId: ".? jadibot",
                    },
                    {
                      title: "Ī INFO COMMAND Ī",
                      description: "Show Info Commands",
                      rowId: ".? info",
                    },
                    {
                      title: "Ī NO CATEGORY COMMAND Ī",
                      description: "Show No Category Commands",
                      rowId: ".? tanpakategori",
                    },
                    {
                      title: "Ī OWNER COMMAND Ī",
                      description: "Show Owner Commands",
                      rowId: ".? owner",
                    },
                  ],
                },
              ],
              contextInfo: {
                stanzaId: m.key.id,
                participant: m.sender,
                quotedMessage: m.message,
              },
            },
          },
          {}
        ),
        { waitForAck: true }
      );
    }

    let groups = {};
    for (let tag in tags) {
      groups[tag] = [];
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin);
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {};
    let before = conn.menu.before || defaultMenu.before;
    let header = conn.menu.header || defaultMenu.header;
    let body = conn.menu.body || defaultMenu.body;
    let footer = conn.menu.footer || defaultMenu.footer;
    let after =
      conn.menu.after ||
      (conn.user.jid == global.conn.user.jid
        ? ""
        : `Dipersembahkan oleh https://wa.me/${
            global.conn.user.jid.split`@`[0]
          }`) + defaultMenu.after;
    let _text = [
      before,
      ...Object.keys(tags).map((tag) => {
        return (
          header.replace(/%category/g, tags[tag]) +
          "\n" +
          [
            ...help
              .filter(
                (menu) => menu.tags && menu.tags.includes(tag) && menu.help
              )
              .map((menu) => {
                return menu.help
                  .map((help) => {
                    return body
                      .replace(/%cmd/g, menu.prefix ? help : "%p" + help)
                      .replace(/%islimit/g, menu.limit ? "(Limit)" : "")
                      .replace(/%isPremium/g, menu.premium ? "(Premium)" : "")
                      .trim();
                  })
                  .join("\n");
              }),
            footer,
          ].join("\n")
        );
      }),
      after,
    ].join("\n");
    text =
      typeof conn.menu == "string"
        ? conn.menu
        : typeof conn.menu == "object"
        ? _text
        : "";
    let replace = {
      "%": "%",
      p: _p,
      uptime,
      muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup:
        max - exp <= 0
          ? `Siap Untuk *${_p}Levelup*`
          : `${max - exp} XP Lagi Untuk Levelup`,
      github: package.homepage
        ? package.homepage.url || package.homepage
        : "[unknown github url]",
      level,
      limit,
      name,
      weton,
      week,
      date,
      dateIslamic,
      time,
      totalreg,
      rtotalreg,
      role,
      readmore: readMore,
    };
    text = text.replace(
      new RegExp(
        `%(${Object.keys(replace).sort((a, b) => b.length - a.length)
          .join`|`})`,
        "g"
      ),
      (_, name) => "" + replace[name]
    );
    await conn.updatePresence(m.chat, Presence.recording);
    await conn.send2ButtonLoc(
      m.chat,
      await (await fetch(fla)).buffer(),
      text.trim(),
      "Created By Mecha-Labs",
      "Mecha Owners\n*Jangan Lupa Buat Registrasi!*",
      ".owner",
      "Donasi",
      ".donasi",
      m
    );
  } catch (e) {
    conn.reply(m.chat, "Maaf, menu sedang error", m);
    throw e;
  }
};
handler.help = ["menu", "help", "?"];
handler.tags = ["main"];
handler.command = /^(menu|help|\?)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;

handler.admin = false;
handler.botAdmin = false;

handler.fail = null;
handler.exp = 2;

module.exports = handler;

const more = String.fromCharCode(1);
const readMore = more.repeat(1);

function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
function ucapan() {
  const time = moment.tz("Asia/Jakarta").format("HH");
  res = "Selamat Dinihari";
  if (time >= 4) {
    res = "Selamat Pagi";
  }
  if (time > 10) {
    res = "Selamat Siang";
  }
  if (time >= 15) {
    res = "Selamat Sore";
  }
  if (time >= 18) {
    res = "Selamat Malam";
  }
  return res;
}
