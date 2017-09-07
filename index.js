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

var borde = [
    "Ja",
    "Nej"
];

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

var skott;
var pistolLaddad = false;
var weekNumber = (new Date()).getWeek();
var widthSchema = "600"
var heightSchema = "600"

bot.on("message", (message) => {
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    
    //console.log(test);
    
    var split = message.content.substring(prefix.length).split(' ');
    
    switch (split[0].toLowerCase()) {
        case "h":
        case "help":
            message.channel.send({
                embed: new Discord.RichEmbed()
                    .setAuthor("Kommandon:", bot.user.avatarURL)
                    .addField("Allmäna kommandon:", "!help - visar denna meny\n!dab - sprid cancer\n!poll <fråga> - Starta en ja eller nej fråga\n!pinpoll - samma som !poll fast den pinnar också\n!borde - låt boten svara på livets svåra frågor\n!ryss - spela rysk roulette")
                    .addField("Skolrelaterade kommandon:", "!schema - visar veckans schema\n!schemavecka <vecka> - visar schemat från en viss vecka\n!vecka - visar veckan\n!wikipedia <sida> - låter dig gå till en viss Wikipedia hemsida\n!wikise <sida> - låter dig gå till en svenska Wikipedia sida\n!wikisök <sök> - söker på Wikipedia\n!google <sök> - söker på google")
                    .addField("Discord kommandon:", "!hex - ger dig en slumpmässig färg\n!hexdisplay <hex> - visar fägen som det inskrivna hex nummret ger\n!github - skickar länken till botens github repo\n!ping - visar botens internal ping (för felsökning)\n!getid - visar ditt user id")
                    .setColor("0x111111")
            });
            break;
        case "vecka":
            message.channel.send(weekNumber);
            break;
        case "s":
        case "schema":
            var valfriVecka = message.content.substring(8)
            if (valfriVecka === "") {
                valfriVecka = weekNumber;
            }
            
            message.channel.send({
                embed: new Discord.RichEmbed()
                    .setAuthor("Schema v."+valfriVecka+":")
                    .setImage("http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=80220/sv-se&type=1&id={EA17E85E-CBFC-4836-935C-04780337F6D5}&period=&week="+valfriVecka+
                    "&mode=0&printer=0&colors=32&head=0&clock=0&foot=0&day=0&width="+widthSchema+"&height="+heightSchema+"&maxwidth=1883&maxheight=847")
                    .setColor("0x"+("000000"+Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6))
            });
            break;
        case "github":
            message.author.send("https://github.com/ChilladeChillin/ITGDiscordBot");
            break;
        case "dab":
            message.channel.send(dabRespond[Math.floor(Math.random() * dabRespond.length)]);
            break;
        case "säg":
        case "say":
            var textFromSender = message.content;
            message.delete(0);
            if (message.author.id==="164283691802165250") {
                message.channel.send(message.content.substring(5));
                break;
            }
            else {
                message.author.send("Du har inte tillåtelse att använda detta kommando");
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
            break;
        case "poll":
            var question = message.content.substring(6)
            message.delete(0);
            message.channel.send(question+"\n\n`👍=JA 👎=NEJ`")
                .then(function (message) {
                    message.react("👍")
                    message.react("👎")
                }).catch(function() {
                    console.log("Reaktionen gick inte hela vägen fram")
                   });
            break;
        case "pinpoll":
            var question = message.content.substring(9)
            message.delete(0);
            if (message.author.id==="164283691802165250" || "349987894171271178") {
                message.channel.send(question+"\n\n`👍=JA 👎=NEJ`")
                .then(function (message) {
                    message.react("👍")
                    message.pin()
                    //delay(10)
                    message.react("👎")
                }).catch(function() {
                    console.log("Reaktionen gick inte hela vägen fram (pinpoll)")
                    });
            }
            else {
                message.author.send("Du har inte tillåtelse att använda detta kommando");
            }
            break;
        case "hd":
        case "hexdisplay":
            var hexMessage = message.content.substring(12)
            if (hexMessage.substr(0, 1) === "#") {
                var hexMessageFix = hexMessage.substing(1)
            }
            else {
                var hexMessageFix = hexMessage
            }
            message.channel.send({
                embed: new Discord.RichEmbed()
                    .setAuthor("Hex:")
                    .setDescription("#"+hexMessageFix)
                    .setColor("0x"+hexMessageFix)
            });
            break;
        case "getid":
            message.channel.send(message.author.id);
            break;
        case "kommer":
        case "är":
        case "borde":
            message.channel.send(borde[Math.floor(Math.random()*borde.length)]+" "+message.author.toString());
            break;
        case "ryss":
            if (pistolLaddad === false) {
                message.channel.send("Laddar Pistolen");
                pistolLaddad = true;
                skott = Math.floor((Math.random() * 6) + 1);
            }
            else {
                if (skott === 1) {
                    message.channel.send("Du dog "+message.author.toString());
                    pistolLaddad = false;
                }
                else {
                    message.channel.send("Du överlevde "+message.author.toString());
                    skott -= 1;
                }
            }
            break;
        case "wikipedia":
            var wikiSearch = message.content.substring(11)
            message.channel.send("https://en.wikipedia.org/wiki/"+wikiSearch);
            break;
        case "wikise":
            var wikiSearch = message.content.substring(8)
            message.channel.send("https://sv.wikipedia.org/wiki/"+wikiSearch);
            break;
        case "wikisök":
            var wikiSearch = message.content.substring(9)
            message.channel.send("https://en.wikipedia.org/w/index.php?search="+wikiSearch);
            break;
        case "google":
            var googleSearch = message.content.substring(8)
            message.channel.send("https://www.google.se/search?q="+googleSearch);
            break;
        //case "test":
            //message.channel.send("https://itgappen.se/api/2/lunch");	
            //break;
        default:
            message.channel.send("```Detta kommando existerar inte (än)\nSkriv !help för att se de kommandon som faktiskt existerar```");
    }
});

bot.login(botToken);