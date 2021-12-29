const database = DatabaseServer.tables
const locations = database.locations
const modFolder = `${ModLoader.getModPath(module.filename.split('\\')[module.filename.split('\\').length - 3])}`
let config = require('../config/config.json')

class raidMods
{
    constructor()
    {
        this.modname = 'Brohammer\'s Raid Mods';
        Logger.info(`Loading: ${this.modname}`);
        if (!ModLoader.onLoad[this.modname])
			ModLoader.onLoad[this.modname] = this.load.bind(this);
		else
		{
			this.modname += '_Alt'
			ModLoader.onLoad[this.modname] = this.load.bind(this)
		}
		HttpRouter.onStaticRoute['/client/game/start'][this.modname] = Mod.runOnGameStart //DOES NOT REPLACE the AKI function
    }

    static setExtendedRaid()
    {
        if (config.raidTimer.extendedRaid === true && typeof config.raidTimer.raidTimer === 'number'){
            for (let map in locations) {
                if (map !== "base") {
                    locations[map].base.exit_access_time = config.raids.RaidTimer
                    locations[map].base.escape_time_limit = config.raids.RaidTimer
                }
            }
        }
    }
}

module.exports.raidMods = raidMods;