const Discord = require('discord.js');
const {Client, RichEmbed} = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    const args = message.content.split(' ');
    if (message.content.startsWith('!ping')) {
        const embed = new RichEmbed()
            .setTitle("Answer")
            .setColor(0x00FF00)
            .setDescription("Pong!")
            .setFooter('Response to !ping');

        message.channel.send(embed);
    } else if (message.content.startsWith('!clean')) {
        if (args[1]) {

            args[1] = Number(args[1]);
            message.channel.bulkDelete(args[1])
                .then(function () {
                    const embed = new RichEmbed()
                        .setTitle("Answer")
                        .setColor(0x00FF00)
                        .setDescription("Successful cleaned the channel!")
                        .setFooter('Response to !clean');
                    message.channel.send(embed);
                })
                .catch(() => {
                    const embed = new RichEmbed()
                        .setTitle("Error")
                        .setColor(0xFF0000)
                        .setDescription("You can only bulkdelete messages, that are under 14 days old!")
                        .setFooter('Response to !clean');
                    message.channel.send(embed);
                });
        } else {
            const embed = new RichEmbed()
                .setTitle("Error")
                .setColor(0xFF0000)
                .setDescription("Usage: !clean [number]")
                .setFooter('Response to !clean');
            message.channel.send(embed);
        }
    } else if (message.content.startsWith('!game')) {
        if (args[1]) {
            client.user.setActivity(args[1]);
            const embed = new RichEmbed()
                .setTitle("Answer")
                .setColor(0x00FF00)
                .setDescription(`Successful set game to ${args[1]}`)
                .setFooter('Response to !game');
            message.channel.send(embed);
        } else {
            client.user.setActivity('');
            const embed = new RichEmbed()
                .setTitle("Answer")
                .setColor(0x00FF00)
                .setDescription("Successful cleaned the game!")
                .setFooter('Response to !game');
            message.channel.send(embed);
        }
    } else if (message.content.startsWith('!clear')) {
        let position = message.channel.position;
        let parent = message.channel.parent;
        message.channel.clone()
            .then((newChannel) => {
                newChannel.setParent(parent);
                newChannel.setPosition(position);
            });
        message.channel.delete();
    } else if (message.content.startsWith('!avatar')) {
        if (!args[1]) {
            const embed = new RichEmbed()
                .setTitle("Answer")
                .setColor(0x00FF00)
                .setImage(message.author.avatarURL)
                .setFooter('Response to !avatar');
            message.channel.send(embed);
        } else {
            const embed = new RichEmbed()
                .setTitle("Answer")
                .setColor(0x00FF00)
                .setImage(message.mentions.users.first().avatarURL)
                .setFooter('Response to !avatar');
            message.channel.send(embed);}
    } else if (message.content.toLowerCase().includes("hi")) {
        if (message.author !== client.user) {
            const embed = new RichEmbed()
                .setTitle("GIF - Hi")
                .setColor(0x00FF00)
                .setImage("http://giphygifs.s3.amazonaws.com/media/ASd0Ukj0y3qMM/giphy.gif")
                .setFooter('Response to hi');
            message.channel.send(embed);
        }
    }
});

const bot = client.login('NjEyOTgxNTc4MDQ1NTg3NDU2.XVqRsA.D4jmpF4FOkpXo_eSLCkE0qRCg44');
bot.catch(err => {
    console.log(err);
});