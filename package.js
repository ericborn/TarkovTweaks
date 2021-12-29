/* package.js
 * authors: Brohammer
 */

const Raids = require('./src/raids.js');
let config;
class Loadmods
{
    constructor()
    {
        try {
            config = require('./config/config.json');
        }
        catch(message)
        {
            Logger.error('Shits broke');
            Logger.log(message.message);
            return
        }
        this.mod = 'Brohammers mod';
        Logger.info(`Loading: ${this.mod}`);
        ModLoader.onLoad['TarkovTweaks'] = Raids.load;
    }
}

module.exports = new Loadmods();
