let config = require('../config.json');
const Discord = require('discord.js');
let PlayerCount = require('../server/players');


module.exports = {
    name: 'ip',
    description: 'See server status',
    execute(msg, args){
        PlayerCount.getPlayerCount().then((result) => {

            if(result.status === 200){
                const onlineEmbed = new Discord.MessageEmbed()
                .setColor('#03fc41')
                .setTitle(config.SERVER_NAME)
                .setDescription(`**IP:** ${config.SERVER_URL}`)
                .setThumbnail(config.SERVER_LOGO)
                .addFields(
                    { name: 'Prisijungę nariai', value: result.data.length, inline: true  },
		    { name: 'Maks žaidėjų', value:32},
                    { name: 'Serverio Statusas', value: '✅ Veikia', inline: true },
		    

                   
                )
                .setTimestamp(new Date())
                .setFooter('Sent by: '+msg.author.tag, `${config.SERVER_LOGO}`);
                msg.channel.send(onlineEmbed);
           }
           

        })
           .catch(function(){
            const offlineEmbed = new Discord.MessageEmbed()
            .setColor('#fc0303')
            .setTitle(config.SERVER_NAME)
            .setDescription('IP: `unavailable`')
            .setThumbnail(config.SERVER_LOGO)
            .addFields(
              { name: 'Prisijungę nariai', value: 'NONE', inline: true  },
              { name: 'Serverio Statusas', value: '❌ Neveikia', inline: true },
             
          )
            .setTimestamp(new Date())
            .setFooter('Sent by: '+msg.author.tag, `${config.SERVER_LOGO}`);
            msg.channel.send(offlineEmbed);
           })
         
       
    }, 
};