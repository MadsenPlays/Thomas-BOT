const Discord = require('discord.js');
const client = new Discord.Client();
const invites = {};
const db = require('quick.db')

client.on("ready", () => {
  console.log("Jeg er klar!");
});

// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
    // "ready" isn't really ready. We need to wait a spell.
    wait(1000);

    // Load all invites for all guilds and save them to the cache.
    client.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
        });
    });
});

client.on('guildMemberAdd', member => {
    // To compare, we need to load the current invite list.
    member.guild.fetchInvites().then(guildInvites => {
        // This is the *existing* invites for the guild.
        const ei = invites[member.guild.id];

        // Update the cached invites
        invites[member.guild.id] = guildInvites;

        // Look through the invites, find the one for which the uses went up.
        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

        console.log(invite.code)

        if (invite.code === "PBE7Qnc") {
            return member.addRole(member.guild.roles.find(role => role.name === "MEDLEM"));
        }
    });
});

client.on('message', message => {
    if (message.content === 'Hey') {
    	message.channel.send(message.author + ' - Heeey <:Love:537271965023731742>');
    }
});

client.on('message', message => {
    if (message.content === 'hey') {
    	message.channel.send(message.author + ' - Heeey <:Love:537271965023731742>');
    }
});

client.on('message', message => {
    if (message.content === 'Goddag') {
    	message.channel.send(message.author + ' - Goddag <:Love:537271965023731742>');
    }
});

client.on('message', message => {
    if (message.content === 'goddag') {
    	message.channel.send(message.author + ' - Goddag <:Love:537271965023731742>');
    }
});

client.on('message', message => {
    if (message.content === 'Godmorgen') {
    	message.channel.send(message.author + ' - Godmorgen <:Love:537271965023731742> - Har du sovet godt?');
    }
});

client.on('message', message => {
    if (message.content === 'godmorgen') {
    	message.channel.send(message.author + ' - Godmorgen <:Love:537271965023731742> - Har du sovet godt?');
    }
});

client.on('message', message => {
    if (message.content === 'Godaften') {
    	message.channel.send(message.author + ' - Godaften <:Love:537271965023731742> - Har du haft en god dag?');
    }
});

client.on('message', message => {
    if (message.content === 'godaften') {
    	message.channel.send(message.author + ' - Godaften <:Love:537271965023731742> - Har du haft en god dag?');
    }
});

exports.run = (bot, message, args, func) => {

    // Return Statements
    if (!message.member.roles.find('name', 'Owner')) return func.embed(message.channel, '**This command requires the Owner role**', 120000) // This returns if it CANT find the owner role on them. It then uses the function to send to message.channel, and deletes the message after 120000 milliseconds (2minutes)
    if (!args.join(" ") && args.join(" ").toUpperCase() !== 'NONE') return func.embed(message.channel, '**Please mention a channel**\n > *~setwelcome message*') // This returns if they don't message a channel, but we also want it to continue running if they want to disable the log

    // Fetch the new channel they mentioned
    let newMessage;
    if (args.join(" ").toUpperCase() === 'NONE') newMessage = ''; // If they wrote the word none, it sets newMessage as empty.
    else newMessage = args.join(" ").trim(); // If they didn't write none, set what they wrote as the message

    // This will update the .text of the joinMessageDM_guildID object.
    db.updateText(`joinMessage_${message.guild.id}`, newMessage).then(i => {
        func.embed(message.channel, `**Successfully updated welcome text to:**\n > *${args.join(" ").trim()}*`) // Finally, send in chat that they updated the channel.
    })

}

// THIS  MUST  BE  THIS  WAY 
client.login(process.env.BOT_TOKEN);
