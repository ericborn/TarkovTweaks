"use strict";

const flea = require("./src/flea.js");
const insurance = require("./src/insurance.js");
const raid = require("./src/raids.js");
const trade = require("./src/traders.js");

class Mod {
    constructor() {
        Logger.info("Loading: Tarkov Tweaks");
        ModLoader.onLoad["TarkovTweaks Flea"] = flea.onLoad;
        ModLoader.onLoad["TarkovTweaks Insurance"] = insurance.onLoad;
        ModLoader.onLoad["TarkovTweaks Trade"] = trade.onLoad;
        ModLoader.onLoad["TarkovTweaks Raid"] = raid.onLoad;
    }
}

module.exports.Mod = new Mod();