// Mod trader features

"use strict";

const config = require("../config/config.json");

class insurance 
{
    static onLoad() 
    {

        const DB = DatabaseServer.tables
        const globals = DB.globals.config
        const insurance = InsuranceConfig

        // insurance return chance
        if (config.Insurance.InsuranceReturnToggle) 
        {
            insurance.returnChance = config.Insurance.ReturnChance;		
            Logger.info("Insurance Return Chance Activated");
        }

        // insurance cost multiplier
        if (config.Insurance.InsurancePriceToggle) 
        {
            insurance.priceMultiplier = config.Insurance.InsuranceMulti;
            Logger.info("Insurance Price Multiplier Activated");
        }
    }
}

module.exports = insurance;