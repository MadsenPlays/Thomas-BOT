const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
    
});

// Initialize the invite cache
const invites = {};

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
    	message.channel.send(message.author + ' - Heeey, min ven!');
  	    }
});

client.on('message', message => {
    if (message.content === 'hey') {
    	message.channel.send(message.author + ' - Heeey, min ven!');
  	    }
});

client.on('message', message => {
    if (message.content === 'Goddag') {
    	message.channel.send(message.author + ' - Goddag, min ven!');
  	    }
});

client.on('message', message => {
    if (message.content === 'goddag') {
    	message.channel.send(message.author + ' - Goddag, min ven!');
  	    }
});

client.on('message', message => {
    if (message.content === 'Godmorgen') {
    	message.channel.send(message.author + ' - Godmorgen, har du sovet godt?');
  	    }
});

client.on('message', message => {
    if (message.content === 'godmorgen') {
    	message.channel.send(message.author + ' - Godmorgen, har du sovet godt?');
  	    }
});

client.on('message', message => {
    if (message.content === 'Godaften') {
    	message.channel.send(message.author + ' - Godaften, har du haft en god dag?');
  	    }
});

client.on('message', message => {
    if (message.content === 'godaften') {
    	message.channel.send(message.author + ' - Godaften, har du haft en god dag?');
  	    }

client.on('message', message => {
    if (message.content === '!cam') {
    	message.channel.send(message.author + ' - Thomas' kamera: Logitech C920.');
        }
});

client.on('message', message => {
    if (message.content === '!headset') {
    	message.channel.send(message.author + ' - Thomas' headset: Audio Technica ATH-M50X.');
        }
});

client.on('message', message => {
    if (message.content === '!mic') {
    	message.channel.send(message.author + ' - Thomas' mikrofon: Røde NT-USB.');
        }
});

client.on('message', message => {
    if (message.content === '!micarm') {
    	message.channel.send(message.author + ' - Thomas' mikrofonarm: Røde PSA-1.');
  	    }
});

client.on('message', message => {
    if (message.content === '!mus') {
    	message.channel.send(message.author + ' - Thomas' mus: Logitech G502.');
        }
});
    
client.on('message', message => {
    if (message.content === '!keyboard') {
    	message.channel.send(message.author + ' - Thomas' tastatur: Black Pulse - The Commander in Chief. | Sponsoreret af: Black Pulse!');}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
