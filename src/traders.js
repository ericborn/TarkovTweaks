// Mod trader features

"use strict";

const config = require("../config/config.json");

class trade 
{
    static onLoad() 
    {

        const DB = DatabaseServer.tables
        const traders = DB.traders

        // min/max insurances return times
        if (config.Traders.InsuranceTime === true) 
        {
            traders["54cb50c76803fa8b248b4571"].base.insurance.min_return_hour = config.Traders.InsuranceMinTime;
            traders["54cb50c76803fa8b248b4571"].base.insurance.max_return_hour = config.Traders.InsuranceMaxTime;
            traders["54cb57776803fa99248b456e"].base.insurance.min_return_hour = config.Traders.InsuranceMinTime;
            traders["54cb57776803fa99248b456e"].base.insurance.max_return_hour = config.Traders.InsuranceMaxTime;
            Logger.info("Insurance Return Time Activated");
        }

        // the min/max time for insurance to be in the mailbox
        if (config.Traders.InsuranceStorage === true) {
            traders["54cb50c76803fa8b248b4571"].base.insurance.max_storage_time = config.Traders.InsuranceStorageTime;
            traders["54cb57776803fa99248b456e"].base.insurance.max_storage_time = config.Traders.InsuranceStorageTime;
            Logger.info("Insurance Storage Time Activated");
        }
    }
}

module.exports = trade;