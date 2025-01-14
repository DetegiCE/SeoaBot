/**
 * @name Seoa:helps
 * @description Help Command
 */

/** File System: File Reader */
const fileReader = require('fs')
const { resolve: pathAppend } = require('path')
const locale = {
  en: require('../locales/en.json'),
  kor: require('../locales/kor.json'),
  pt: require('../locales/pt.json')
}

exports.run = (seoa, msg, settings) => {
  const help = {
    fields: [
      {
        name: locale[settings.servers[msg.guild.id].lang].CommandBook,
        value: locale[settings.servers[msg.guild.id].lang].Prefix + ' >'
      }
    ],
    description: locale[settings.servers[msg.guild.id].lang].BETAMSG
  }

  fileReader.readdir(settings.commands, (err, files) => {
    if (err) console.error(err)
    files.forEach((v) => {
      const temp = require(pathAppend(__dirname, '../', settings.commands, v))
        .helps
      const inline = true
      if (temp) {
        help.fields.push({
          name: temp.description,
          value: '> ' + temp.uses,
          inline
        })
      }
    })
    msg.channel.send(locale[settings.servers[msg.guild.id].lang].DMSEND)
    msg.author.send({ embed: help })
  })
}

exports.callSign = ['help', 'Help', '도움', '도움말']
exports.helps = {
  description: '도움말을 보여줍니다',
  uses: '>help'
}
