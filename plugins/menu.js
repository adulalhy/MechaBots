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
    var ucapanWaktu = "Selamat Pagi 🌄";

    if (jam >= "03" && jam <= "10") {
      ucapanWaktu = "Selamat Pagi 🌄";
    } else if (jam >= "10" && jam <= "13") {
      ucapanWaktu = "Selamat Siang ☀️";
    } else if (jam >= "13" && jam <= "18") {
      ucapanWaktu = "Selamat Sore 🌅";
    } else if (jam >= "18" && jam <= "23") {
      ucapanWaktu = "Selamat Malam 🌙";
    } else {
      ucapanWaktu = "Selamat Malam 🌙";
    }
    const defaultMenu = {
      before: `
       _*MechaBots*_
       
Hi %name
${ucapanWaktu}

┏━━ ⚑ 𝗠𝗘𝗖𝗛𝗔 𝗜𝗡𝗙𝗢
┃
┃=>_*Date : ${require("moment-timezone").tz("Asia/Jakarta").format("DD-MM-YYYY")}*_
┃=>_*Time : ${require("moment-timezone").tz("Asia/Jakarta").format("HH:mm:ss")}*_
┃=>_*Battery : ${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 pengisian' : ''}` : 'tidak diketahui'}
┃=>_*Total Features : ${totalfeature}*_
┃=>_*Uptime : %uptime*_
┃=>_*Main Uptime : %muptime*_
┃=>_*Number Of Registered Users : %rtotalreg From %totalreg*_
┗⬣
%readmore`.trimStart(),
      header: "┏━━ ⚑ %category\n┃",
      body: "┃=> %cmd %islimit %isPremium",
      footer: "┗⬣\n",
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
        main: "𝗠𝗔𝗜𝗡",
        game: "𝗚𝗔𝗠𝗘",
        stres: "𝗦𝗧𝗥𝗘𝗦𝗦",
        xp: "𝗘𝗫𝗣 𝗔𝗡𝗗 𝗟𝗜𝗠𝗜𝗧",
        sticker: "𝗦𝗧𝗜𝗖𝗞𝗘𝗥",
        textpro: "𝗧𝗘𝗫𝗧𝗣𝗥𝗢",
        kerang: "𝗞𝗘𝗥𝗔𝗡𝗚 𝗔𝗝𝗔𝗜𝗕",
        quotes: "𝗤𝗨𝗢𝗧𝗘𝗦",
        admin: `𝗔𝗗𝗠𝗜𝗡 ${global.opts["restrict"] ? "" : "(Dinonaktifkan)"}`,
        group: "𝗚𝗥𝗢𝗨𝗣",
        islam: "𝗜𝗦𝗟𝗔𝗠𝗜𝗖",
        wibu: "𝗔𝗡𝗜𝗠𝗘",
        premium: "𝗣𝗥𝗘𝗠𝗜𝗨𝗠",
        sange: "𝗡𝗦𝗙𝗪",
        internet: "𝗜𝗡𝗧𝗘𝗥𝗡𝗘𝗧",
        anonymous: "𝗔𝗡𝗢𝗡𝗬𝗠𝗢𝗨𝗦 𝗖𝗛𝗔𝗧",
        nulis: "𝗠𝗔𝗚𝗘𝗥𝗡𝗨𝗟𝗜𝗦 𝗔𝗡𝗗 𝗟𝗢𝗚𝗢",
        downloader: "𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥",
        tools: "𝗧𝗢𝗢𝗟𝗦",
        apk: "𝗠𝗢𝗗𝗗𝗘𝗗 𝗔𝗣𝗞",
        fun: "𝗙𝗨𝗡",
        database: "𝗗𝗔𝗧𝗔𝗕𝗔𝗦𝗘",
        vote: "𝗩𝗢𝗧𝗜𝗡𝗚",
        absen: "𝗔𝗕𝗦𝗘𝗡",
        quran: "𝗔𝗟𝗤𝗨𝗥𝗔𝗡",
        audio: "𝗩𝗢𝗜𝗖𝗘 𝗖𝗛𝗔𝗡𝗚𝗘𝗥",
        jadibot: "𝗛𝗢𝗦𝗧𝗘𝗧 𝗕𝗢𝗧",
        info: "𝗜𝗡𝗙𝗢",
        "": "𝗡𝗢 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗬",
      };
    if (teks == "game")
      tags = {
        game: "𝗚𝗔𝗠𝗘",
      };
    if (teks == "wibu")
      tags = {
        wibu: "𝗔𝗡𝗜𝗠𝗘",
      };
    if (teks == "sange")
      tags = {
        sange: "𝗡𝗦𝗙𝗪",
      };
    if (teks == "xp")
      tags = {
        xp: "𝗘𝗫𝗣 𝗔𝗡𝗗 𝗟𝗜𝗠𝗜𝗧",
      };
    if (teks == "stiker")
      tags = {
        sticker: "𝗦𝗧𝗜𝗖𝗞𝗘𝗥",
      };
    if (teks == "kerangajaib")
      tags = {
        kerang: "𝗞𝗘𝗥𝗔𝗡𝗚 𝗔𝗝𝗔𝗜𝗕",
      };
    if (teks == "quotes")
      tags = {
        quotes: "𝗤𝗨𝗢𝗧𝗘𝗦",
      };
    if (teks == "admin")
      tags = {
        admin: `𝗔𝗗𝗠𝗜𝗡 ${global.opts["restrict"] ? "" : "(Dinonaktifkan)"}`,
      };
    if (teks == "grup")
      tags = {
        group: "𝗚𝗥𝗢𝗨𝗣",
      };
    if (teks == "islam")
      tags = {
        islam: "𝗜𝗦𝗟𝗔𝗠𝗜𝗖",
      };
    if (teks == "premium")
      tags = {
        premium: "𝗣𝗥𝗘𝗠𝗜𝗨𝗠",
      };
    if (teks == "internet")
      tags = {
        internet: "𝗜𝗡𝗧𝗘𝗥𝗡𝗘𝗧",
      };
    if (teks == "anonymous")
      tags = {
        anonymous: "𝗔𝗡𝗢𝗡𝗬𝗠𝗢𝗨𝗦 𝗖𝗛𝗔𝗧",
      };
    if (teks == "nulis")
      tags = {
        nulis: "𝗠𝗔𝗚𝗘𝗥𝗡𝗨𝗟𝗜𝗦 𝗔𝗡𝗗 𝗟𝗢𝗚𝗢",
      };
    if (teks == "downloader")
      tags = {
        downloader: "𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥",
      };
    if (teks == "tools")
      tags = {
        tools: "𝗧𝗢𝗢𝗟𝗦",
      };
    if (teks == "apk")
      tags = {
        apk: "𝗠𝗢𝗗𝗗𝗘𝗗 𝗔𝗣𝗞",
        },
    if (teks == "fun")
      tags = {
        fun: "𝗙𝗨𝗡",
      };
    if (teks == "database")
      tags = {
        database: "𝗗𝗔𝗧𝗔𝗕𝗔𝗦𝗘",
      };
    if (teks == "vote")
      tags = {
        vote: "𝗩𝗢𝗧𝗜𝗡𝗚",
        absen: "𝗔𝗕𝗦𝗘𝗡",
      };
    if (teks == "quran")
      tags = {
        quran: "𝗔𝗟𝗤𝗨𝗥𝗔𝗡",
      };
    if (teks == "audio")
      tags = {
        audio: "𝗩𝗢𝗜𝗖𝗘 𝗖𝗛𝗔𝗡𝗚𝗘𝗥",
      };
    if (teks == "jadibot")
      tags = {
        jadibot: "𝗛𝗢𝗦𝗧𝗘𝗥 𝗕𝗢𝗧",
      };
    if (teks == "info")
      tags = {
        info: "𝗜𝗡𝗙𝗢",
      };
    if (teks == "tanpakategori")
      tags = {
        "": "𝗡𝗢 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗬",
      };
    if (teks == "owner")
      tags = {
        owner: "𝗢𝗪𝗡𝗘𝗥",
        host: "𝗛𝗢𝗦𝗧",
        advanced: "𝗔𝗗𝗩𝗔𝗡𝗖𝗘𝗗",
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
                      title: "Ξ ALL COMMAND Ξ",
                      description: "Show All Commands",
                      rowId: ".? all",
                    },
                    {
                      title: "Ξ GAME COMMAND Ξ",
                      description: "Show Game Commands",
                      rowId: ".? game",
                    },
                    {
                      title: "Ξ XP COMMAND Ξ",
                      description: "Show Exp Commands",
                      rowId: ".? xp",
                    },
                    {
                      title: "Ξ STICKER COMMAND Ξ",
                      description: " Show Sticker Commands",
                      rowId: ".? stiker",
                    },
                    {
                      title: "Ξ KERANG AJAIB COMMAND Ξ",
                      description: "Show Kerang Ajaib Command",
                      rowId: ".? kerangajaib",
                    },
                    {
                      title: "Ξ QUOTES COMMAND Ξ",
                      description: "Show Quotes Command",
                      rowId: ".? quotes",
                    },
                    {
                      title: "Ξ ADMIN COMMAND Ξ",
                      description: "Show Admin Commands",
                      rowId: ".? admin",
                    },
                    {
                      title: "Ξ GROUP COMMAND Ξ",
                      description: "Show Group Commands",
                      rowId: ".? grup",
                    },
                    {
                      title: "Ξ ISLAMIC COMMAND Ξ",
                      description: "Show Islamic Commands",
                      rowId: ".? islam",
                    },
                    {
                      title: "Ξ PREMIUM COMMAND Ξ",
                      description: "Show Premium Commands",
                      rowId: ".? premium",
                    },
                    {
                      title: "Ξ NSFW COMMAND Ξ",
                      description: "Show NSFW Commands",
                      rowId: ".? sange",
                    },
                    {
                      title: "Ξ ANIME COMMANDS Ξ",
                      description: "Show Anime Commands",
                      rowId: ".? wibu",
                    },
                    {
                      title: "Ξ INTERNET COMMAND Ξ",
                      description: "Show Internet Commands",
                      rowId: ".? internet",
                    },
                    {
                      title: "Ξ ANONYMOUS CHAT COMMAND Ξ",
                      description: "Show Anonymous Chat Commands",
                      rowId: ".? anonymous",
                    },
                    {
                      title: "Ξ MAGERNULIS & LOGO COMMAND Ξ",
                      description: "Show Magernulis & Logo Commands",
                      rowId: ".? nulis",
                    },
                    {
                      title: "Ξ DOWNLOADER Ξ",
                      description: "Show Downloader Commands",
                      rowId: ".? downloader",
                    },
                    {
                      title: "Ξ TOOLS COMMAND Ξ",
                      description: "Show Tools Commands",
                      rowId: ".? tools",
                    },
                    {
                      title: "Ξ MODDED APK COMMAND Ξ",
                      description: "Show Apk Commands",
                      rowId: ".? apk",
                    },
                    {
                      title: "Ξ FUN COMMAND Ξ",
                      description: "Show Fun Commands",
                      rowId: ".? fun",
                    },
                    {
                      title: "Ξ DATABASE COMMAND Ξ",
                      description: "Show Database Commands",
                      rowId: ".? database",
                    },
                    {
                      title: "Ξ VOTE & ABSEN COMMAND Ξ",
                      description: "Show Vote & Absen Commands",
                      rowId: ".? vote",
                    },
                    {
                      title: "Ξ ALQURAN COMMAND Ξ",
                      description: "Show Alquran Commands",
                      rowId: ".? quran",
                    },
                    {
                      title: "Ξ VOICE CHANGER COMMAND Ξ",
                      description: "Show Voice Changer Commands",
                      rowId: ".? audio",
                    },
                    {
                      title: "Ξ HOSTER BOT COMMAND Ξ",
                      description: "Show Hoster Bot Commands",
                      rowId: ".? jadibot",
                    },
                    {
                      title: "Ξ INFO COMMAND Ξ",
                      description: "Show Info Commands",
                      rowId: ".? info",
                    },
                    {
                      title: "Ξ NO CATEGORY COMMAND Ξ",
                      description: "Show No Category Commands",
                      rowId: ".? tanpakategori",
                    },
                    {
                      title: "Ξ OWNER COMMAND Ξ",
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
