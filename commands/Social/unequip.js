const text = require('../../util/string');
const profile = require('../../models/Profile');
const market = require('../../assets/json/market.json');
const em = require('../../assets/json/emojis.json');
module.exports = {
  name: 'unequip',
  aliases: [ ],
  rankcommand: true,
  clientPermissions: [ 'MANAGE_MESSAGES' ],
  group: 'Social',
  description: 'Unequip a certain item.',
  requiresDatabase: true,
  parameters: [ 'item type' ],
  examples: [
    'unequip wreath',
    'unequip background'
  ],
  run: (client, message, [type] ) => profile.findById(message.author.id, async (err, doc) => {

    if (err){
      return message.channel.send(`${em.error} | \`[DATABASE_ERR]:\` The database responded with error: ${err.name}`);
    } else if (!doc){
      doc = new profile({ _id: message.author.id });
    };

    const types = ['background','pattern','emblem','hat','wreath'];
    if (!types.includes(type.toLowerCase())){
      return message.channel.send(`${em.error} | **${message.author.tag}**, Please select one of the following: \`${types.join('`, `')}\``);
    };

    doc.data.profile[type.toLowerCase()] = null;

    return doc.save()
    .then(() => message.channel.send(`${em.success} | **${message.author.tag}**, successfully unequipped **${type}!**`))
    .catch(() => message.channel.send(`${em.error} | \`[DATABASE_ERR]:\` Unable to save the document to the database, please try again later!`));
  })
};
