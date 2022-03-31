// Mod trader features

"use strict";

const config = require("../config/config.json");

class flea 
{
    static onLoad() 
    {

        const DB = DatabaseServer.tables
        const Ragfair = RagfairConfig
        const globals = DB.globals.config

        
        if (config.FleaMarket.FleaToggle) 
        {
            // chance to sell depending on price
            Ragfair.sell.chance.base = config.FleaMarket.SellBase;
            Ragfair.sell.chance.underpriced = config.FleaMarket.SellUnderPrice;
            Ragfair.sell.chance.overprices = config.FleaMarket.SellOverPrice;

            // flea rep gain/loss 
            Ragfair.sell.reputation.gain =  config.FleaMarket.ReputationGain;
            Ragfair.sell.reputation.loss =  config.FleaMarket.ReputationLoss;

            // min/max flea sell times
            Ragfair.sell.time.base = config.FleaMarket.Time.Base;
            Ragfair.sell.time.min = config.FleaMarket.Time.Min;
            Ragfair.sell.time.max = config.FleaMarket.Time.Max;

            // max flea offers
            globals.RagFair.maxActiveOfferCount[12].count = 69

            // toggle items being blacklisted from the flea
            Ragfair.dynamic.blacklist.enableBsgList = config.FleaMarket.BSGBlacklist;
            Logger.info("FleaMarket Adjustments Activated");
        }
    }
}

module.exports = flea;