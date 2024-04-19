// Mod item features

"use strict";

const config = require("../config/config.json");

class item 
{
    postDBLoad(container)
    {

        //const DB = DatabaseServer.tables
        const logger = container.resolve("WinstonLogger");
        const databaseServer = container.resolve("DatabaseServer");
        const configServer = container.resolve("ConfigServer");
        const tables = databaseServer.getTables();
        const items = tables.templates.items;
        const globals = tables.globals.config;
        const armorMaterials = globals.ArmorMaterials;
        const bearNames = tables.bots.types.bear;
        const usecNames = tables.bots.types.usec;
        //const quest = QuestConfig;

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
                  "grandpa'sfuckingdad","GrandPappysLappy","GrandpasGigglestick",
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

        // magazine reload, size, etc.
        if (config.Items.MagSizeToggle) 
        {
            try {
                for (const itemID in items)
                {
                    const item = items[itemID];
                    if (item?._parent == "5448bc234bdc2d3c308b4569")
                    {
                        item._props.LoadUnloadModifier = -35;
                        item._props.CheckTimeModifier = -20;
                        item._props.Cartridges[0]._max_count *= 1.5;

                        if (item._props.Width == 1 && item._props.Height > 2)
                        {
                            item._props.Height = 2;
                        }

                        if (item._props.ExtraSizeDown == 2)
                        {
                            item._props.Height = 1;
                        }
                    }
                }
            }
            catch (error) {
                logger.warning("\nError with mag size");
                log(error);
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
                item["5449016a4bdc2d6f028b456f"]._props.StackMaxSize = 999999;
                item["5696686a4bdc2da3298b456a"]._props.StackMaxSize = 999999;
                item["569668774bdc2da2298b4568"]._props.StackMaxSize = 999999;
            }
            catch (error) {
                logger.warning("\nError with money stack size");
                log(error);
            }
            
        }

        // money on character in/out of raid
        if (config.Items.MoneyOnCharacter) 
        {
            try {
                globals.RestrictionsInRaid[0].MaxInLobby = 999999;
                globals.RestrictionsInRaid[0].MaxInRaid = 999999;

                globals.RestrictionsInRaid[1].MaxInLobby = 999999;
                globals.RestrictionsInRaid[1].MaxInRaid = 999999;

                globals.RestrictionsInRaid[2].MaxInLobby = 999999;
                globals.RestrictionsInRaid[2].MaxInRaid = 999999;
            } 
            catch (error) {
                logger.warning("\nError with money on character");
                log(error);
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
                log(error);
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
                log(error);
            } 
        }
        if (config.Items.Inertia)
        {
            try {
                // 'SideTime': {'x': 2, 'y': 1, 'z': 0}
                globals.Inertia.SideTime.x = 0.0;
                globals.Inertia.SideTime.y = 0.0;

                // default "x": 0.1, "y": 0.45
                globals.Inertia.MoveTimeRange.x = 0;
                globals.Inertia.MoveTimeRange.y = 0;

                // default 0.15
                globals.Inertia.MinDirectionBlendTime *= inertia_multi;

                // default "x": 0.05, "y": 0.4675
                globals.Inertia.WalkInertia.x *= inertia_multi;
                globals.Inertia.WalkInertia.y *= inertia_multi;

                // 0.3
                globals.Inertia.BaseJumpPenalty *= inertia_multi;

                // 0.4
                globals.Inertia.BaseJumpPenaltyDuration *= inertia_multi;

                // 'x': 4
                globals.Inertia.SpeedLimitAfterFallMax.x *= inertia_multi;

                // default  {'x': 0, 'y': 55, 'z': 0}
                globals.Inertia.SprintBrakeInertia.y *= inertia_multi;

                // tilt is inverted where a larger number is faster/less inertia effect
                // 'x': 0.6, 'y': 0.5
                globals.Inertia.TiltInertiaMaxSpeed.x *= 1.3;
                globals.Inertia.TiltInertiaMaxSpeed.y *= 1.3;

                // 'x': 1.2, 'y': 0.8
                globals.Inertia.TiltMaxSideBackSpeed.x *= 1.3;
                globals.Inertia.TiltMaxSideBackSpeed.y *= 1.3;

                // 'x': 0.8, 'y': 0.5
                globals.Inertia.TiltStartSideBackSpeed.x *= 1.3;
                globals.Inertia.TiltStartSideBackSpeed.y *= 1.3;
            }
            catch (error) {
                logger.warning("\nError with inertia");
                log(error);
            }
        }

        if (config.Items.EXP)
        {
            try {
                globals.exp.expForLockedDoorBreach = 100;
                globals.exp.expForLockedDoorOpen = 100;

                globals.exp.kill.pmcHeadShotMult = 3;
                globals.exp.kill.longShotDistance = 50;

                globals.exp.match_end.survivedMult = 3;
                globals.exp.match_end.survived_exp_requirement = 10;
                globals.exp.match_end.survived_exp_reward = 600;
                globals.exp.match_end.survived_seconds_requirement = 60;
            }
            catch (error) {
                logger.warning("\nError with EXP");
                log(error);
            }
        }

        if (config.Items.Armor)
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
                log(error);
            }
        }
        if (config.Items.ItemWeight)
        {
            try {
                for (const itemID in items)
                {
                    items[itemId]._props.Weight *= 0.65;
                }
            }
            catch (error) {
                logger.warning("\nError with item weight");
                log(error);
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
                log(error);
            }
        }

        if (config.Items.Loot)
        {
            try
            {
                globals.GlobalLootChanceModifier *= 1.5;
            }
            catch (error) {
                logger.warning("\nError with loot changes");
                log(error);
            }
        }
    }
}

module.exports = item;