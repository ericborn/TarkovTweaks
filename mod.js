"use strict";

const mod = require("./src/raids.js");

class Mod {
    constructor() {
        Logger.info("Loading: Tarkov Tweaks");
        ModLoader.onLoad["TarkovTweaks"] = mod.onLoad;
    }
}

module.exports.Mod = new Mod();