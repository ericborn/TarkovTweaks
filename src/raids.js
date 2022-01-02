// mods pertaining to raid features

"use strict";

const config = require("../config/config.json");

class raid
{
    static onLoad()
    {
        // initalize constants
        const DB = DatabaseServer.tables
        const locations = DB.locations

        // enable extended raid if true and raidTime is a number
        if (config.Raids.EnableExtendedRaid && typeof config.Raids.raidTimer === 'number')
        {
            // for all maps if the map is not a base
            for (let map in locations) 
            {
                if (map !== "base") 
                {
                    // set exit and escape time to raidTimer
                    locations[map].base.exit_access_time = config.Raids.raidTimer
                    locations[map].base.escape_time_limit = config.Raids.raidTimer
                    
                }
            }
            Logger.info("Extended Raid activated")
        }

        // enable increased boss spawn if true and spawn percent is a number
        if (config.Raids.IncreasedBossChance && typeof config.Raids.BossSpawnPercent === 'number')
        {
            // for all locations
            for (let i in locations) 
            {
                // if not equal to base
                if (i !== "base") 
                {
                    // if boss spawn location is not empty
                    if (locations[i].base.BossLocationSpawn !== []) 
                    {
                        // set spawn chance
                        for (let x in locations[i].base.BossLocationSpawn) 
                        {
                            locations[i].base.BossLocationSpawn[x].BossChance = config.Raids.BossSpawnPercent
                        }
                        
                    }
                }
            }
            Logger.info("Increased Boss Spawn activated") 
        }
    }
}

module.exports = raid;