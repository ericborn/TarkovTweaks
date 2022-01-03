// Mod trader features

"use strict";

const config = require("../config/config.json");

class flea 
{
    static onLoad() 
    {

        const DB = DatabaseServer.tables
        const Ragfair = RagfairConfig

        // min/max insurances return times
        if (config.FleaMarket.FleaToggle) 
        {
            Ragfair.sell.chance.base = config.FleaMarket.SellBase;
            Ragfair.sell.chance.underpriced = config.FleaMarket.SellUnderPrice;
            Ragfair.sell.chance.overprices = config.FleaMarket.SellOverPrice;
            Ragfair.sell.reputation.gain =  config.FleaMarket.ReputationGain;
            Ragfair.sell.reputation.loss =  config.FleaMarket.ReputationLoss;
            Ragfair.sell.time.base = config.FleaMarket.Time.Base;
            Ragfair.sell.time.min = config.FleaMarket.Time.Min;
            Ragfair.sell.time.max = config.FleaMarket.Time.Max;
            Logger.info("FleaMarket Adjustments Activated");
        }
    }
}

module.exports = flea;