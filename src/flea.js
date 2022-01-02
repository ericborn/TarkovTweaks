// Mod trader features

"use strict";

const config = require("../config/config.json");

class flea 
{
    static onLoad() 
    {

        const DB = DatabaseServer.tables
        const Ragfair = DB.Ragfair

        // min/max insurances return times
        if (config.FleaMarket.FleaToggle) 
        {
            Ragfair.sell.chance.base = config.FleaMarket.SellBase;
            Ragfair.sell.chance.underpriced = config.FleaMarket.SellUnderPrice;
            Ragfair.sell.chance.overprices = config.FleaMarket.SellOverPrice;
            Logger.info("FleaMarket Adjustments Activated");
        }
    }
}

module.exports = flea;