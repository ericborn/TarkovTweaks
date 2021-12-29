"use strict";
class mainLoader
{
    static load()
    {
        const config = require('../config/config.json')
        const DB = DatabaseServer.tables;
        const locations = DB.locations;
        Logger.info(`Loading: Brohammers Raid Mods`);

        if (config.Raids.EnableExtendedRaid)
        {
            for (let map in locations) 
            {
                if (map !== "base") 
                {
                    locations[map].base.exit_access_time = 240
                    locations[map].base.escape_time_limit = 240
                }
            }
        }
    }
}

module.exports = mainLoader;