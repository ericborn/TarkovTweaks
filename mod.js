"use strict";
/*import { DependencyContainer } from "tsyringe";

import { IPostSptLoadMod } from "@spt/models/external/IPostSptLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";*/

const config = require("./config/config.json");

class Mod {
    postDBLoad(container) {
        //const DB = DatabaseServer.tables
        const logger = container.resolve("WinstonLogger");
        const databaseServer = container.resolve("DatabaseServer");
        const configServer = container.resolve("ConfigServer");
        const tables = databaseServer.getTables();
        const locationConfig: ILocationConfig = configServer.getConfig<ILocationConfig>(ConfigTypes.LOCATION);
        const items = tables.templates.items;
        const globals = tables.globals.config;
        const armorMaterials = globals.ArmorMaterials;
        const bearNames = tables.bots.types.bear;
        const usecNames = tables.bots.types.usec;
        const hideout = tables.hideout.areas;
        //const quest = QuestConfig;

        logger.warning(configs);

        // unsure if this works
        //const chatValues = configServer.getConfig(ConfigTypes.ConfigTypes.PMCCHATRESPONSE);
        //const locationValues = configServer.getConfig(ConfigTypes.ConfigTypes.LOCATION);

        const bearNameList = ["15NUNDR","1STLINE","1V1IRL","2RETSGUY","360NSCP","5FNGRS",
                              "6969DKS","90S E","AGATHA","ALINWRE","ALXFACE","ANOOSE1",
                              "ARYNBNZ","ASS2MTH","ASSPLAY","AZNPSSY","BABYDCK","BALDRIK",
                              "BALHAIR","BALLPIT","BALLPLY","BEATOFF","BIRDUP","BLCKFCE",
                              "BLDWALL","BLKFMTR","BLL5GTS","BLPITSPK","BLWDUDES","BOITKLR",
                              "BOYBTTR","BOYLOVE","BRD1ST","BRNJWS","BRNTJEW","BRSTMLK",
                              "BUTTCHG","BYOCV19","CAMPR","CARADIN","CHNAVRS","CLPTRP",
                              "COCKSOX","COKENRG","COKERNG","COKLIFE","COKNWAY","COSBYD",
                              "CUMDUMP","CUMGUZL","CUMONME","CV19FUN","DADFCKR","DCKBERD",
                              "DCKCHCK","DCKHOLE","DCKNAIR","DCKPLS","DEZNUTZ","DIDLER",
                              "DIKCHSE","DOALINE","DOBABYS","DRAGQUN","DRTYVAG","DWNSHFT",
                              "EATSEED","EGLEYE6","EMEPAR","F4GSLYR","FATLINE","FCKDADS",
                              "FCKLKY","FCKTRMP","FLPYHAT","FNCEJMP","FNGRBST","FNGRME",
                              "FNGTRP","FTFJ247","FTFJ314","FTFJ365","GAGER69","GASCHBR",
                              "GAY4GOD","GAY4PAY","GAYFUEL","GITIKLD","GNKFERY","GOHMMEX",
                              "GOOFBLS","GOTKIDS","GOTPPR","GOTRAIL","GOTTOES","GRBPSSY",
                              "GRINDER","GRLAFNGR","GTDIDLD","GTRKDM8","GTTKLD","GTTKLED",
                              "H8BLCKS","HARDAF","HARDDIK","HEILHLR","HIPPYBS","HOGFEST",
                              "HOGFTHR","HOGMSTR","HRAMBE","HVCNDY","HWIBCOL","I(HEART)COKE",
                              "I(HEART)DRGS","I(HEART)ISIS","I(HEART)SLVS","IDOBLOW",
                              "IDOGUYS","IDOKIDS","IFKSLNTS","IH8GAYS","ISQUIRT","JELORPE",
                              "JEWBTCH","JEWSTAR","JEWTITS","JPJESUS","JSTREKX","KIDTKLR",
                              "KINDR","KLANKAR","KLANVAN","KUMLORD","LADYBOY","LINESFJ",
                              "LOTLZRD","LSD4ME","LTITHPN","MANLOVE","MDMABCH","MEATSPN",
                              "MSLMBAN","MSTRACE","MTHDOUT","NEDMEAT","NEEDRPE","NGGRDCK",
                              "NI69GR","NIGAFAG","NMBRSEC","NOGIRLS","NOMASKS","NOWIHRD",
                              "NZISTBL","OHCHUM","OLDPEDO","PAULWKR","PEPCOCK","PEWPEWW",
                              "PLANDMC","PLLCSBY","PNTMSTR","POPPERS","POUNDME","PSHROPE",
                              "PUTNCRTN","PWRBFST","PWRBTTM","RAILME","RCKGRME","RDNBIDN",
                              "SANDNGR","SANSBSH","SCKDADS","SHOOTER","SHTYBDY","SLKDADY",
                              "SNDBULL","SNDITM8","SPUNKME","STEPDON","STMPYRD","STROKIT",
                              "SWALWS","SWTYBLS","TBRODY","TEARBAG","TENSILE","TKLMSTR",
                              "TNKTNK","TOTS4ME","TRAPBAR","TRE50TY","TREKLLR","TRIGGRD",
                              "TROLL","TYRODND","UMADBRO","UNCLJON","USERVE","UWUTM8",
                              "VAXCHIP","WALMRT5","WARNI","WHTCLAW","WHTPWR","WHTRGHT",
                              "WIZZBNG","WOOLLEG"];

        const usecNameList = ["12YoSoaking","2Dudes1Butt","2DudesCuddling","2DudesSoaking",
                              "2YOAbortions","AbdulPussigap","Aborted12YO","AbortedLimbs",
                              "AbortYourTeen","aCowboysHeavyLoad","AllBeefWienerThief",
                              "AmeerAnaland","AnalAlpha","AnalAndy","AnalOmega",
                              "AngelHairMilfs","AssAssassin","assclampsncables",
                              "AuschwitzLarry","BabyHooker","BabyOilSprinkler","bagofagtits",
                              "Ballsdeep Invagina","BaronVonNiggerSnatch",
                              "beefcurtainfacemask","BigTireLips","bloodystoolsample",
                              "BloodyVag","bonerpills","bonerwind","BoofingBarbarian",
                              "boofroof","BootyBarbarian","BradyBunchBangBus",
                              "BrokeBackWetback","buttchopshop","ButterCreamDream",
                              "ChumBucket","ChumLee","coronatits","Cowboy3Way","CowboyDocking",
                              "CowboyNutJuice","CowboyNutMilk","CreekWaterSock","DadsBangingDads",
                              "DankBowels","DavidGobbleDicks","DeepSpaceDominican","deepStink",
                              "DeerCockWaterSock","DickPickles","DoorDashDildo","DoTheNeedful",
                              "DunlopLips","DynastyAssMaster","FagetFighter","fagetflounder",
                              "FatGrannyTits","FatTits","FillMeUpBottomCup","FillMeUpCowboy",
                              "FillMeWithCowboyLoads","FirestoneLips","FoolOfAGook",
                              "ForeskinSharPei","GagMeGrandpa","gat5cables","gayassnicknolte",
                              "gayassovertime","gaymechanics","GoodyearLips","GrampaThickFinger",
                              "grandpasfuckingdad","GrandPappysLappy","GrandpasGigglestick",
                              "GranpasGospelPipe","GrindrGearGayms","growsomeballs","handoffthegay",
                              "hotholes","InEachOther","JackFags","KeepinItBeefy","kriskilsonklan",
                              "LibsKillBabies","LooseCabooseAnoose","LSDSoakTrain","lvl99PwrBottom",
                              "lvl99RoidBottom","lvl99RoidMage","MammyThickFinger","MaPaMenageATrois",
                              "MeatMage","MeemawsMeatPocket","MeemawsMeatSock","MeemawsMerkin",
                              "MeemawsMustache","memawsmeatcliff","MexicansGetAbortions","MichelinLips",
                              "moistorpedo","MomsDirtyCarpet","MomsIntoGayDads","MotorcycleJesus",
                              "mrmonoclejesuspeanut","MuffMage","muffslammer69","mustybutts",
                              "mustysluts","myDADbangsDUDES","NiggerLipsPapa","NoseSprayGirlfriend",
                              "NotGayWithBros","notmypope","numbersecond","OutHouseHandy",
                              "PapaTickleStick","PaypalPoon","PipeSquasher","postgamecoitus",
                              "PR0lap5e","PR0lapse","ProlapsePapa","ProstateBoxer","PunjabBallsdeep",
                              "QueenSexPot","RamenTilapia","rapejayleno","RapeRogue","Rebups4Rape",
                              "Repubs4BabyRape","RepubsLike2Rape","rollcoal","SammyPickles",
                              "SlowFagBangerz","snowconeoverride","SoakingBedBounce","SoggyFupa",
                              "SoundingOldMen","sourstingraybuttblast","SSealant",
                              "StartedFromTheBottomNowImQueer","TamponBill","thatsdoughnuts",
                              "thx4servants","TioPepesChurro","toetikler","TotallyNotGay",
                              "TuBerculos1s2","VagrantNegrosSoftlySuckingAssholes",
                              "VenomousNarcsSellingSweetAmphetamines",
                              "VeryNiggardySexSwingsAdvertisements","VNSSAsofficialcunt",
                              "WangWarrior","WhiteClawAndCocaine","WhiteLineHighway",
                              "WienerWizard","YourDadsFuckToy","VagabonDuneCoon",
                              "antiqueboner","StevenHonkings","RainwaterCrank",
                              "SubsandwichDocking","BulgingTrashSack","fucksandwich",
                              "urinewhore","fuckglove","AfricanSimilac","DoubleAbort",
                              "BloatoFaggins","CondomStrike","trannyhosefest","gthinomath",
                              "hookemdano","KenyanBreastmilk","TransgenderApe","bostonshotgun"];

        const blacklistKeys = ["59136f6f86f774447a1ed173",  //Folding car key
                                "5a0f045e86f7745b0f0d0e42",  //Gas station safe key
                                "5a0ea69f86f7741cd5406619",  //Health Resort east wing office room 108 key
                                "5a0ee72c86f77436955d3435",  //Health Resort east wing room 213 key
                                "5a0ee76686f7743698200d5c",  //Health Resort east wing room 216 key
                                "5a0eedb386f77403506300be",  //Health Resort east wing room 322 key
                                "5a0ec70e86f7742c0b518fba",  //Health Resort west wing room 207 key
                                "5a0eeb1a86f774688b70aa5c",  //Health Resort west wing room 303 key
                                "5a0eeb8e86f77461257ed71a",  //Health Resort west wing room 309 key
                                "5a13ee1986f774794d4c14cd",  //Health Resort west wing room 323 key
                                "5a0eebed86f77461230ddb3d",  //Health Resort west wing room 325 key
                                "63a39f18c2d53c2c6839c1d3",  //Pinewood hotel room 206 key
                                "6391fcf5744e45201147080f",  //Primorsky Ave apartment key
                                "5d80cb8786f774405611c7d9",  //RB-PP key
                                "5a0f006986f7741ffd2fe484"]; //Weather station safe key

        // add extra items that can be stored in the sicc pouch
        const siccItemList = ["573474f924597738002c6174", "5734758f24597738025ee253",
                              "62a09cfe4f842e1bd12da3e4", "59faf7ca86f7740dbe19f6c2",
                              "62a09cb7a04c0c5c6e0a84f8", "590c651286f7741e566b6461",
                              "62a091170b9d3c46de5b6cf2", "5bc9bdb8d4351e003562b8a1"];

        // car, Salewa, grizzly, IFAK, AI-2, AFAK, sanitar ifak
        const medKitIds = ["590c661e86f7741e566b646a", "544fb45d4bdc2dee738b4568",
                           "590c657e86f77412b013051d", "5755356824597772cb798962",
                           "590c678286f77426c9660122", "60098ad7c2240c0fe85c570a",
                           "5e99711486f7744bfc4af328"];

        // bleed, surg kits, pain meds
        const otherMedIds = ["5751a25924597722c463c472", "5d02778e86f774203e7dedbe", 
                             "5d02797c86f774203f38e30a", "5e8488fa988a8701445df1e4",
                             "5af0548586f7743a532b7e99", "5af0454c86f7746bf20992e8"];

        // template IDs for money amount restricted on a character
        const moneyIDs = ["5449016a4bdc2d6f028b456f", "5696686a4bdc2da3298b456a",
                          "569668774bdc2da2298b4568"]
        
        // function to modify med items max uses, hp recovery and recovery effect
        function modMedItem(itemId, maxUses, hpRecoveryRate, stimBuff = "") {
            items[itemId]._props.MaxHpResource = maxUses;
            items[itemId]._props.hpResourceRate = hpRecoveryRate;
            items[itemId]._props.StimulatorBuffs = stimBuff;
        }

        // magazine reload, size, etc.
        if (config.Items.MagSizeToggle) 
        {
            try {
                for (const itemID in items)
                {
                    const item = items[itemID];
                    if (item?._parent == "5448bc234bdc2d3c308b4569")
                    {
                        try {
                            item._props.LoadUnloadModifier = -35;
                        } catch (error) {
                            logger.warning("\nError with LoadUnloadModifier");
                        }

                        try {
                            item._props.CheckTimeModifier = -20;
                        } catch (error) {
                            logger.warning("\nError with CheckTimeModifier");
                        }

                        try {
                            item._props.Cartridges[0]._max_count *= 1.5;
                        } catch (error) {
                            // ignore warnings coming from this as some mags have
                            //logger.warning("\nError with _max_count");
                        }
                        
                        // 3+ tall mags
                        try {
                            if (item._props.Width == 1 && item._props.Height > 2)
                            {
                                item._props.Height = 2;
                            }
                        } catch (error) {
                            logger.warning("\nError with Height");
                        }

                        // prevent weapons from taking 3+ rows
                        try {
                            if (item._props.ExtraSizeDown == 2)
                            {
                                item._props.Height = 1;
                            }
                        } catch (error) {
                            logger.warning("\nError with ExtraSizeDown");
                        }  
                    }
                }
            }
            catch (error) {
                logger.warning("\nError with mag size");
            }
        }

        // load/unload speed
        if (config.Items.LoadSpeed)
        {
            globals.BaseLoadTime = 0.4;
            globals.BaseUnloadTime = 0.15;
        }

        // money stacksize
        if (config.Items.MoneyStackSize) 
        {
            try {
                items["5449016a4bdc2d6f028b456f"]._props.StackMaxSize = 999999;
                items["5696686a4bdc2da3298b456a"]._props.StackMaxSize = 999999;
                items["569668774bdc2da2298b4568"]._props.StackMaxSize = 999999;
            }
            catch (error) {
                logger.warning("\nError with money stack size");
                
            }
        }

        // money on character in/out of raid
        if (config.Items.MoneyOnCharacter) 
        {
            try {
                for (let i in globals.restrictionsInRaid) {
                    if (moneyIDs.includes(globals.restrictionsInRaid[i].TemplateId)) {
                        restrictionsInRaid[i].MaxInLobby = 999999;
                        restrictionsInRaid[i].MaxInRaid  = 999999;
                    }
                }
            }   
            catch (error) {
                logger.warning("\nError with money on character");
            }
        }
        
        // key uses
        if (config.Items.UnlimitedKeyUse) 
        {
            try 
            {
                for (const itemID in items)
                {
                    const item = items[itemID];
                    if (item?._parent == "5c99f98d86f7745c314214b3")
                    {
                        item._props.MaximumNumberOfUsage = 0;
                    }
                }
            }
            catch (error) {
                logger.warning("\nError with key uses");
            }
            try 
            {
                for (const itemID in items)
                {
                    if(blacklistKeys.includes(itemID))
                    {
                        const item = items[itemID];
                        item._props.BackgroundColor = "red";
                    }
                }
            }
            catch (error) {
                logger.warning("\nError setting background of useless keys red");
            }
        }

        // money on character in/out of raid
        if (config.Items.Stamina) 
        {
            try {
                globals.Stamina.CrouchConsumption.x = 0;
                globals.Stamina.CrouchConsumption.y = 0;
                globals.Stamina.JumpConsumption = 7;
                
                if (globals.Stamina.FallDamageMultiplier > 3)
                {
                    globals.Stamina.FallDamageMultiplier *= 0.25;
                }

                globals.Stamina.OverweightConsumptionByPose.x = 0;
                globals.Stamina.OverweightConsumptionByPose.y = 0;
                globals.Stamina.ProneConsumption = 0;

                if (globals.Stamina.SprintDrainRate > 3)
                {
                    globals.Stamina.SprintDrainRate *= 0.5;
                    globals.Stamina.SprintOverweightLimits.x *= 1.25;
                    globals.Stamina.SprintOverweightLimits.y *= 1.25;
                }

                globals.Stamina.SitToStandConsumption = 0;
                globals.Stamina.StandupConsumption.x = 0;
                globals.Stamina.StandupConsumption.y = 0;
            }
            catch (error) {
                logger.warning("\nError with stamina changes");
            } 
        }
        if (config.Items.Inertia)
        {
            const inertiaMulti = 0.6;
            try {
                // "SideTime": {"x": 2, "y": 1, "z": 0}
                globals.Inertia.SideTime.x = 0.0;
                globals.Inertia.SideTime.y = 0.0;

                // default "x": 0.1, "y": 0.45
                globals.Inertia.MoveTimeRange.x = 0;
                globals.Inertia.MoveTimeRange.y = 0;

                // default 0.15
                globals.Inertia.MinDirectionBlendTime *= inertiaMulti;

                // default "x": 0.05, "y": 0.4675
                globals.Inertia.WalkInertia.x *= inertiaMulti;
                globals.Inertia.WalkInertia.y *= inertiaMulti;

                // 0.3
                globals.Inertia.BaseJumpPenalty *= inertiaMulti;

                // 0.4
                globals.Inertia.BaseJumpPenaltyDuration *= inertiaMulti;

                // "x": 4
                globals.Inertia.SpeedLimitAfterFallMax.x *= inertiaMulti;

                // default  {"x": 0, "y": 55, "z": 0}
                globals.Inertia.SprintBrakeInertia.y *= inertiaMulti;

                // tilt is inverted where a larger number is faster/less inertia effect
                // "x": 0.6, "y": 0.5
                globals.Inertia.TiltInertiaMaxSpeed.x *= 1.3;
                globals.Inertia.TiltInertiaMaxSpeed.y *= 1.3;

                // "x": 1.2, "y": 0.8
                globals.Inertia.TiltMaxSideBackSpeed.x *= 1.3;
                globals.Inertia.TiltMaxSideBackSpeed.y *= 1.3;

                // "x": 0.8, "y": 0.5
                globals.Inertia.TiltStartSideBackSpeed.x *= 1.3;
                globals.Inertia.TiltStartSideBackSpeed.y *= 1.3;
            }
            catch (error) {
                logger.warning("\nError with inertia");
                
            }
        }

        if (config.Items.EXP)
        {
            try {
                //globals.exp.expForLockedDoorBreach = 100;
                //globals.exp.expForLockedDoorOpen = 100;

                //globals.exp.kill.pmcHeadShotMult = 3;
                globals.exp.kill.longShotDistance = 100;

                //globals.exp.match_end.survivedMult = 3;
                //globals.exp.match_end.survived_exp_reward = 600;
                globals.exp.match_end.survived_exp_requirement = 10;
                globals.exp.match_end.survived_seconds_requirement = 60;
            }
            catch (error) {
                logger.warning("\nError with EXP");
            }
        }

        /*if (config.Items.Armor)
        {
            try {
                for (const material in armorMaterials)
                {
                    armorMaterials.material.MinRepairDegradation = 0.01;
                    armorMaterials.material.MinRepairKitDegradation = 0.01;
                    armorMaterials.material.MaxRepairDegradation = 0.03;
                    armorMaterials.material.MaxRepairKitDegradation = 0.03;
                }
            }
            catch (error) {
                logger.warning("\nError with armor materials");
                
            }
        }*/

        if (config.Items.Meds)
        {
            try {
                modMedItem(medKitIds[3], 500, 125);
                modMedItem(medKitIds[4], 1250, 175);
                modMedItem(medKitIds[5], 2000, 225);
                modMedItem(medKitIds[6], 2000, 225);
            }
            catch (error) {
                logger.warning("\nError with medkit mod");
            }

            // increase uses for non-healing med items
            try {
                for (const itemID in items)
                {
                    const item = items[itemID];
                    if(otherMedIds.includes(itemID))
                    {
                        item._props.MaxHpResource *= 3;
                    }  
                }
            }
            catch (error) {
                logger.warning("\nError with med item use increase");
            }
        }

        // increase ammo stack size to 600
        if (config.Items.Ammo)
        {
            try {
                for (const itemID in items)
                {
                    const item = items[itemID];
                    if (item?._parent == "5485a8684bdc2da71d8b4567")
                    {
                        item._props.StackMaxSize = 600;
                    }
                }
            }
            catch (error) {
                logger.warning("\nError with ammo stack size");  
            }
        }

        // set hideout construction time to 1
        if (config.Items.Hideout)
        {
            // expand hideout stash per upgrade tier
            try {
                items["566abbc34bdc2d92178b4576"]._props.Grids[0]._props.cellsV = 30
                items["5811ce572459770cba1a34ea"]._props.Grids[0]._props.cellsV = 60
                items["5811ce662459770f6f490f32"]._props.Grids[0]._props.cellsV = 100
                items["5811ce772459770e9e5f9532"]._props.Grids[0]._props.cellsV = 150
            } catch (error) {
                logger.warning("\nHideoutOptions.StashOptions.BiggerStash failed. Send bug report. Continue safely.")
                
                    }
            // reduce loyalty level by 1
            const originalStages = tables.hideout.areas.find((x) => x._id == "5d484fc0654e76006657e0ab").stages
                for (const stage in originalStages) {
                    try {
                        originalStages[stage].requirements
                            .filter((x) => x.loyaltyLevel != undefined)
                            .forEach((x) => {
                                x.loyaltyLevel -= 1
                            })
                    } catch (error) {
                        logger.warning("\nHideoutOptions.StashOptions.Easier_Loyalty failed. Send bug report. Continue safely.")
                        
                    }
                }
            // set construction time to 1 if the time is greater than 0
            try {
                for (const area in tables.hideout.areas) 
                {
                    for (const stage in tables.hideout.areas[area].stages) 
                    {
                        if (tables.hideout.areas[area].stages[stage].constructionTime > 0)
                        {
                            tables.hideout.areas[area].stages[stage].constructionTime = 1
                        } 
                    }
                }
            }
            catch (error) {
                logger.warning("\nError with Hideout construction time");  
            }
            // make stash increase costs 1/10th
            try {
                originalStages[stage].requirements
                    .filter((x) => x.templateId == "5449016a4bdc2d6f028b456f" || x.templateId == "569668774bdc2da2298b4568")
                    .forEach((x) => {
                        x.count /= 10
                    })
            } catch (error) {
                logger.warning("\nHideoutOptions.StashOptions.Less_Currency_For_Construction failed. Send bug report. Continue safely.")
                
            }
        }
        // decrease weight of all items by 35%
        if (config.Items.ItemWeight)
        {
            try {
                for (const itemID in items)
                {
                    if (typeof items[itemID]._props.Weight === "number")
                    {
                        items[itemID]._props.Weight *= 0.65;
                    }
                }
            }
            catch (error) {
                logger.warning("\nError with item weight");  
            }
        }

        if (config.Items.BotNames)
        {
            try 
            {
                bearNames.firstName = bearNameList;
                usecNames.firstName = usecNameList;
            }
            catch (error) {
                logger.warning("\nError with bot names");
            }
        }

        // disable snarky chat responses from bots
        try
        {
            chatValues.victim.responseChancePercent = 0;
            chatValues.killer.responseChancePercent = 0;
        }
        catch (error) {
            logger.warning("\nError with chatValues");
        }

        try
        {
            for (const location in tables.locations) {
                if (location == "base") continue;

                this.ref.tables.locations[location].base.EscapeTimeLimit =
                  modConfig.Raid.TimeLimit * 3;
                this.ref.tables.locations[location].base.EscapeTimeLimitCoop =
                  modConfig.Raid.TimeLimit * 3;
            }
        }
        catch (error) {
            logger.warning("\nError with EscapeTimeLimit");
        }
        try
        {
            for (const location in locationValues.customWaves.boss)
            {
                const spawn = locationValues.customWaves.boss[location]
                for(const i = 0; i < spawn.length; i++)
                {
                    spawn[i].BossChance = 5;
                }
            }
        }
        catch (error) {
            logger.warning("\nError with Boss spawn %");
        }

/*        if (config.Items.Loot)
        {
            try
            {
                globals.GlobalLootChanceModifier *= 1.5;
            }
            catch (error) {
                logger.warning("\nError with loot changes"); 
            }
        }*/
        // set collector quest to become available at level 5
        tables.templates.quests["5c51aac186f77432ea65c552"].conditions.AvailableForFinish.push(
            tables.templates.quests["5c51aac186f77432ea65c552"].conditions.AvailableForStart[0])
        tables.templates.quests["5c51aac186f77432ea65c552"].conditions.AvailableForStart = [
            {
                "compareMethod": ">=",
                "conditionType": "Level",
                "dynamicLocale": false,
                "globalQuestCounterId": "",
                "id": "5d777f5d86f7742fa901bc77",
                "index": 0,
                "parentId": "",
                "value": 5,
                "visibilityConditions": [],
                "target": ""
            }
        ]
    }
}

//module.exports.Mod = new Mod();
module.exports = { mod: new Mod() };