const Discord = require("discord.js");
const fs = require("fs");
const date = require("date");
const bot = new Discord.Client();
const prefix = "!";
const botToken = require("./bottoken");


bot.on("ready", () => {
    console.log("Klar");
    bot.user.setGame("Skriv !help för hjälp.");
});

var dabRespond = [
    "Du kan inte tvinga mig",
    "Du kan inte tvinga mig",
    "Du kan inte tvinga mig",
    "Du kan inte tvinga mig",
    "Du kan inte tvinga mig",
    "Du kan inte tvinga mig",
    "Vad är det du inte förstår?",
    "Jävla människor ska alltid komma och tjata",
    "Okej då, ***DAB***"
];

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

var weekNumber = (new Date()).getWeek();
var widthSchema = "600"
var heightSchema = "600"

var schemaLink = "http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=80220/sv-se&type=1&id={EA17E85E-CBFC-4836-935C-04780337F6D5}&period=&week="+weekNumber+"&mode=0&printer=0&colors=32&head=0&clock=0&foot=0&day=0&width="+widthSchema+"&height="+heightSchema+"&maxwidth=1883&maxheight=847"

bot.on("message", (message) => {

    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    
    //console.log(test);
    
    var split = message.content.substring(prefix.length).split(' ');
    
    switch (split[0].toLowerCase()) {

        case "help":
            message.channel.send({
                embed: new Discord.RichEmbed()
                    .setAuthor("Kommandon:", bot.user.avatarURL)
                    .addField("Allmäna kommandon:", "!help - visar denna meny\n!github - skickar länken till botens github repo\n!ping - visar botens internal ping (för felsökning)")
                    .addField("Skolrelaterade kommandon:", "!schema - visar veckans schema\n!hex - ger dig en slumpmässig färg")
                    .setColor("0x111111")
            });
            break;
        case "schema":
            message.channel.send({
                embed: new Discord.RichEmbed()
                    .setAuthor("Schema v."+weekNumber+":")
                    .setImage(schemaLink)
                    .setColor("0x"+("000000"+Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6))
            });
            break;
        case "github":
            message.author.send("https://github.com/ChilladeChillin/ITGDiscordBot");
            break;
        case "dab":
            message.channel.send(dabRespond[Math.floor(Math.random() * dabRespond.length)]);
            break;
        case "say":
            var textFromSender = message.content;
            message.delete(0);
            if (message.author.id==="164283691802165250") {
                message.channel.send(message.content.substring(5));
                break;
            }
            else {
                break;
            }
        case "ping":
            message.channel.send(bot.ping+" ms");
            break;
        case "hex":
            var randomhex = ("000000"+Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
            message.channel.send({
                embed: new Discord.RichEmbed()
                    .setAuthor("Hex:")
                    .setDescription("#"+randomhex)
                    .setColor("0x"+randomhex)
            });
        //case "bordejag"
            //[Math.floor(Math.random() * bordejag.length)]
    }
});

bot.login(botToken);