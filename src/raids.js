"use strict";

const config = require("../config/config.json");

class mod
{
    static onLoad()
    {
        const DB = DatabaseServer.tables
        const locations = DB.locations
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

module.exports = mod;