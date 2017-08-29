const Discord = require("discord.js");
const fs = require('fs');
const date = require('date');
const bot = new Discord.Client();
const prefix = "!";
const botToken = "Skriv_Token_Här"

bot.on('ready', () => {
    bot.user.setGame('Skriv !help för hjälp.');
});

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

var weekNumber = (new Date()).getWeek();

var schemaLink = "http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=80220/sv-se&type=1&id={EA17E85E-CBFC-4836-935C-04780337F6D5}&period=&week="+weekNumber+"&mode=0&printer=0&colors=32&head=0&clock=0&foot=0&day=0&width=1883&height=847&maxwidth=1883&maxheight=847"

bot.on('message', (message) => {

    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    
    //console.log(schemaLink);
    
    var split = message.content.substring(prefix.length).split(' ');
    
    switch (split[0].toLowerCase()) {

        case 'help':
            message.channel.send({
                embed: new Discord.RichEmbed()
                    .setAuthor("Kommandon:", bot.user.avatarURL)
                    .addField("Allmäna kommandon:", "!help - visar denna meny")
                    .addField("Skolrelaterade kommandon:", "!schema - visar veckans schema")
                    .setColor("0x111111")
            });
            break;
        case 'schema':
        message.channel.send({
            embed: new Discord.RichEmbed()
                .setAuthor("Schema:", bot.user.avatarURL)
                .setImage(schemaLink)
                .setColor("0x"+("000000"+Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6))
        });
        break;
    }
});

bot.login(botToken);