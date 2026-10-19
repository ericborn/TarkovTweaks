using System.Reflection;
using SPTarkov.Common.Models.Logging;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers.Server;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Enums;
using SPTarkov.Server.Core.Models.Enums.Hideout;
using SPTarkov.Server.Core.Models.Spt.Mod;
using SPTarkov.Server.Core.Models.Spt.Tables;
using SPTarkov.Server.Core.Utils;
using Path = System.IO.Path;
//using SPTarkov.Common.Extensions;
//using System.Numerics;
//using SPTarkov.Server.Core.Models.Eft.Common.Tables;
//using SPTarkov.Server.Core.Models.Eft.Hideout;
//using SPTarkov.Server.Core.Models.Spt.Config;
//using SPTarkov.Server.Core.Models.Eft.Common;

namespace TushonkaTweaks;

/// <summary>
/// Required metadata for every SPT 4.0 mod.
/// Read by the mod loader when this mod is loaded.
/// </summary>
public sealed record ModData : IModMetadata
{
    public string ModGuid { get; init; } = "com.brohammer.tarkovtweaks";
    public string Name { get; init; } = "TarkovTweaks";
    public string Author { get; init; } = "Brohammer";
    public List<string> Contributors { get; init; } = ["Brohammer"];
    public SemanticVersioning.Version Version { get; init; } = new("1.0.0");
    public SemanticVersioning.Range SptVersion { get; init; } = new(">=4.1.6");
    public List<string> Incompatibilities { get; init; }
    public string Url { get; init; } = "https://github.com/ericborn/TarkovTweaks";
    public string License { get; init; } = "MIT";
    public bool HasPrepatcher { get; init; } = false;
    public Dictionary<string, SemanticVersioning.Range>? ModDependencies { get; init; } = [];
}

// Load after PostDBModLoader so the item database is fully populated.
[Injectable(TypePriority = OnLoadOrder.PostLoad + 1)]
public class TarkovTweaks(
    ISptLogger<TarkovTweaks> logger,
    JsonUtil jsonUtil,
    GlobalTable globalTable,
    BotTable botTable,
    //HideoutConfig hideoutConfig,
    LocationTable locationTable,
    HideoutTable hideoutTable,
    TemplateTable templateTable,
    ModHelper modHelper)
    : IOnLoad
{
    // ---------------------------------------------------------------
    // Config — replace with JSON-loaded config if you prefer
    // ---------------------------------------------------------------
    //private readonly ModConfig config = new();

    // ---------------------------------------------------------------
    // ID lists (unchanged from your JS mod)
    // ---------------------------------------------------------------
    private static readonly string[] BlacklistKeys =
    {
        "59136f6f86f774447a1ed173", // Folding car key
        "5a0f045e86f7745b0f0d0e42", // Gas station safe key
        "5a0ea69f86f7741cd5406619", // Health Resort east wing office room 108 key
        "5a0ee72c86f77436955d3435", // Health Resort east wing room 213 key
        "5a0ee76686f7743698200d5c", // Health Resort east wing room 216 key
        "5a0eedb386f77403506300be", // Health Resort east wing room 322 key
        "5a0ec70e86f7742c0b518fba", // Health Resort west wing room 207 key
        "5a0eeb1a86f774688b70aa5c", // Health Resort west wing room 303 key
        "5a0eeb8e86f77461257ed71a", // Health Resort west wing room 309 key
        "5a13ee1986f774794d4c14cd", // Health Resort west wing room 323 key
        "5a0eebed86f77461230ddb3d", // Health Resort west wing room 325 key
        "63a39f18c2d53c2c6839c1d3", // Pinewood hotel room 206 key
        "6391fcf5744e45201147080f", // Primorsky Ave apartment key
        "5d80cb8786f774405611c7d9", // RB-PP key
        "5a0f006986f7741ffd2fe484"  // Weather station safe key
    };

    // AI-2, car, IFAK, Salewa, AFAK, grizzly
    private static readonly string[] MedKitIds =
    {
        // name, MaxHpResource, hpResourceRate, LightBleeding.cost, HeavyBleeding.cost,
        "5755356824597772cb798962", // ai2 (cheese), 100, 50, n/a, n/a
        "590c661e86f7741e566b646a", // car, 220, 70, 50, n/a
        "590c678286f77426c9660122", // IFAK, 300, 50, 30, 210
        "544fb45d4bdc2dee738b4568", // Salewa, 400, 85, 45, 175
        "60098ad7c2240c0fe85c570a", // AFAK, 400, 60, 30, 170
        "590c657e86f77412b013051d", // Grizzly, 1800, 175, 40, 130, fracture 50
        // "5e99711486f7744bfc4af328"  // Sanitar's 3000, not an actual in-game item
    };

    // bleed, surg kits, pain meds
    private static readonly string[] OtherMedIds =
    {
        "5751a25924597722c463c472",
        "5d02778e86f774203e7dedbe",
        "5d02797c86f774203f38e30a",
        "5e8488fa988a8701445df1e4",
        "5af0548586f7743a532b7e99",
        "5af0454c86f7746bf20992e8"
    };

    // template IDs for money amount restricted on a character
    private static readonly string[] MoneyIds =
    {
        "5449016a4bdc2d6f028b456f", // roubles
        "5696686a4bdc2da3298b456a", // dollars
        "569668774bdc2da2298b4568"  // euros
    };

    private static readonly string[] StashIds =
    {
        "566abbc34bdc2d92178b4576", // standard
        "5811ce572459770cba1a34ea", // Left Behind
        "5811ce662459770f6f490f32", // Prepare for escape
        "5811ce772459770e9e5f9532", // Edge of darkness
        "6602bcf19cc643f44a04274b"  // Unheard
    };

    private static readonly List<string> BearNameList = new()
    { 
        "15NUNDR","1STLINE","1V1IRL","2RETSGUY","360NSCP","5FNGRS",
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
        "WIZZBNG","WOOLLEG"
    };

    private static readonly List<string> UsecNameList = new()
    {                   
        "12YoSoaking","2Dudes1Butt","2DudesCuddling","2DudesSoaking","2YOAbortions",
        "AbdulPussigap","Aborted12YO","AbortedLimbs","AbortYourTeen","aCowboysHeavyLoad",
        "AllBeefWienerThief","AmeerAnaland","AnalAlpha","AnalAndy","AnalOmega","AngelHairMilfs",
        "AssAssassin","assclampsncables","AuschwitzLarry","BabyHooker","BabyOilSprinkler",
        "bagofagtits","Ballsdeep Invagina","BaronVonNiggerSnatch","beefcurtainfacemask",
        "BigTireLips","bloodystoolsample","BloodyVag","BloodyVag","bonerwind","BoofingBarbarian",
        "boofroof","BootyBarbarian","BradyBunchBangBus","BrokeBackWetback","buttchopshop",
        "ButterCreamDream","ChumBucket","ChumLee","CoronaTits","Cowboy3Way","CowboyDocking",
        "CowboyNutJuice","CowboyNutMilk","CreekWaterSock","DadsBangingDads","DankBowels",
        "DavidGobbleDicks","DeepSpaceDominican","deepStink","DeerCockWaterSock","DickPickles",
        "DoorDashDildo","DoTheNeedful","DunlopLips","DynastyAssMaster","FagetFighter",
        "FagetFlounder","FatGrannyTits","FatTits","FillMeUpBottomCup","FillMeUpCowboy",
        "FillMeWithCowboyLoads","FirestoneLips","FoolOfAGook","ForeskinSharPei","GagMeGrandpa",
        "gat5cables","gayassnicknolte","gayassovertime","gaymechanics","GoodyearLips",
        "GrampaThickFinger","grandpa'sfuckingdad","GrandPappysLappy","GrandpasGigglestick",
        "GranpasGospelPipe","GrindrGearGayms","growsomeballs","handoffthegay","hotholes",
        "InEachOther","JackFags","KeepinItBeefy","kriskilsonklan","LibsKillBabies",
        "LooseCabooseAnoose","LSDSoakTrain","lvl99PwrBottom","lvl99RoidBottom","lvl99RoidMage",
        "MammyThickFinger","MaPaMenageATrois","MeatMage","MeemawsMeatPocket","MeemawsMeatSock",
        "MeemawsMerkin","MeemawsMustache","memawsmeatcliff","MexicansGetAbortions","MichelinLips",
        "moistorpedo","MomsDirtyCarpet","MomsIntoGayDads","MotorcycleJesus","mrmonoclejesuspeanut",
        "MuffMage","muffslammer69","mustybutts","mustysluts","myDADbangsDUDES","NiggerLipsPapa",
        "NoseSprayGirlfriend","NotGayWithBros","notmypope","numbersecond","OutHouseHandy",
        "PapaTickleStick","PaypalPoon","PipeSquasher","postgamecoitus","PR0lap5e","PR0lapse",
        "ProlapsePapa","ProstateBoxer","PunjabBallsdeep","QueenSexPot","RamenTilapia","rapejayleno",
        "RapeRogue","Rebups4Rape","Repubs4BabyRape","RepubsLike2Rape","rollcoal","SammyPickles",
        "SlowFagBangerz","snowconeoverride","SoakingBedBounce","SoggyFupa","SoundingOldMen",
        "sourstingraybuttblast","SSealant","StartedFromTheBottomNowImQueer","TamponBill",
        "thatsdoughnuts","thx4servants","TioPepesChurro","toetikler","TotallyNotGay",
        "TuBerculos1s2","VagrantNegrosSoftlySuckingAssholes","VenomousNarcsSellingSweetAmphetamines",
        "VeryNiggardySexSwingsAdvertisements","VNSSAsofficialcunt","WangWarrior","WhiteClawAndCocaine",
        "WhiteLineHighway","WienerWizard","YourDadsFuckToy","VagabonDuneCoon","antiqueboner",
        "StevenHonkings","RainwaterCrank","SubsandwichDocking","BulgingTrashSack","fucksandwich",
        "urinewhore","fuckglove","AfricanSimilac","DoubleAbort","BloatoFaggins","CondomStrike",
        "trannyhosefest","gthinomath","hookemdano","KenyanBreastmilk","TransgenderApe",
        "bostonshotgun","turbodong2000","JuanChalupaNBA","BiRacialTits","TransHands","MelonMuncher",
        "CharbroiledMonkey","BananaBandit","CottonGang","BigLipBaboon","KFCconnoisseur","WatermelonRavager",
        "BurntElbows","PopeyesPope","TarDonkey","AlabamaWindChime","PrehistoricMule","ExpiredNutella",
        "SmokeMonkey","CreamCrusader","BleachedBaboon","BleachDemon","DandruffDust","VanillaVulture",
        "RiceColoredRascal","DavidDuchmeat","AutisticWolf","johnnylongpants","influencerhole",
        "hairymouth","cumlongpisshort","pisshortcumlong","hairymouthgloryholeinfluencer",
        "gloryholeinfluencer","jewsoup","GeriatricCheeseCloth","hairymumps","SextingFeet","ForeskinBandit",
        "ForeskinThief","Forcedcircumcision","ForcedDikCut","gaymodemspot","saltchief","niceshotrob",
        "cokemaid","thundertoploader","coomceilingkids","purplepipewater","sconerape","HoboHandy",
        "weightednippletwist","Mr.Squirty","Britneysknife","AryanCurds","JGWentWorth","squeakyJunk",
        "BidensGroceries","PostholePlunger","MethMuffin","AggressiveDadShits","DirtyEnergy",
        "NudeRoadGuard","PreusedCalendar","AlfredShitcock","ReverseRepo","ReversePedo","GamGamsJuicyThighs",
        "DeonDonkeyFeet","WinoCyborg","PonderousCody","FlipPhoneIUD","MomsRatedE","SemenDemen","LilWeenie",
        "StinkyManHoles","MyPPsmells","DittyOil","PeteDitty","SansUtilityCloset","YeaaahHereWeGooo",
        "UncutToolShed","dicks4legs","CarmelAppleSutra","UncutDarkStaff","fulldarkstaff","WaxSounding",
        "DownsHunter","DownsTonight","WinkieDusts","MeltedNokia","TransGrandma","DeepUrineBoner","KimJongCoon",
        "CorduroyKids","HalfCutRabbi","FullyUncut","1fifthcut","RainbowDiddles","BouncyBootyOotyCheese",
        "TheNword","TismMobile","TouchOfTism","ChickenWife","AlabamaWhiteSauce","BonerSword","TannerFromchilis",
        "RobFromChilis","JoshFromChilis","DrewFromChilis","EricFromChilis","AlexFromChilis","KidFromChilis",
        "Analapex","ProstateOscillator","FuckHerBackwards","TraffickedArabianBush","TragicArabianBush","2InchMax",
        "DIYTolkien","MECHAGeorgeBush","WICKENFEET","wickenLaser","OnlyWiken","StraightKidGayDad","CabbageHead",
        "nostr8kids","JNips","yellowdribbler","DeepSquirt","UttersOut","DrunkhoesBlackCow","GayHotBox",
        "OneFloorCondominium","TrainDefense","ClayPotHandJob","EnIggers","DavidCopafeel","FleshBoxOn",
        "WildAthletes","AmishHayRoll","TripleWine","RanchHole","CrocPants","CarpetDiem","HornOff","SandFlippers",
        "ClearingBarrel","JPEGGED","ColonelCarp","TwoPronged","OnlyScout","Churches&Cankles","PewDown","Wrongtism",
        "Rawtism","FullFrontalRainbow","JohnWilkesBoof","UraniumGimpSuit","BlueManGooks","DirtyCatFeet",
        "CrisAngelBucks","DongDetonator","DongDestroyer","KnittedForeskin","KittenForeskin","AfricanBlowAttack",
        "JohnBlowDicks","JohnLore","JohnHammerCock","PeckerPleaser","TotallyNotMervil","ChipBags","BuildADong"
    };
    // ---------------------------------------------------------------
    // Entry point
    // ---------------------------------------------------------------
    public Task OnLoadAsync(CancellationToken cancellationToken)
    {
        // TODO 
        // ADD BOT RENAMER
        string path;
        string configPath;
        TweaksConfig config;

        try
        {
            path = modHelper.GetAbsolutePathToModFolder(Assembly.GetExecutingAssembly());
            configPath = Path.Combine(path, "config", "config.jsonc");
            config = jsonUtil.DeserializeFromFile<TweaksConfig>(configPath);
        }
        catch (Exception ex)
        {
            logger.Error("Exception caught when loading config, mod won't be loaded", ex);
            return Task.CompletedTask;
        }

        if (config == null)
        {
            logger.Error("Config was invalid after loading, mod won't be loaded");
            return Task.CompletedTask;
        }

        if (config.EditBotNames) EditBotNames();
        if (config.EditMagSize) EditMags();
        if (config.EditLoadSpeed) EditLoadSpeed();
        if (config.EditMoneyStackSize) EditMoneyStackSize();
        if (config.EditMoneyOnCharacter) EditMoneyOnCharacter();
        if (config.EditKeyUsage) EditKeyUsage();
        if (config.EditStamina) EditStamina();
        // if (config.EditInertia) EditInertia();
        if (config.EditExp) EditExp();
        if (config.EditMeds) EditMeds();
        if (config.EditAmmo) EditAmmo();
        if (config.EditHideout) EditHideout();
        if (config.EditItemWeight) EditItemWeight();
        if (config.EditRaidTime) EditRaidTime();
        if (config.EditBossSpawnChance) EditBossSpawnChance();
        // TODO
        // pmc hp

        logger.Success("[Tarkov Tweaks]: Successfully Loaded!");
        return Task.CompletedTask;
    }

    // ---------------------------------------------------------------
    // Bot Names
    // ---------------------------------------------------------------
    private void EditBotNames()
    {
        var targets = new (string Key, List<string> Names)[]
        {
            ("bear",    BearNameList),
            ("pmcbear", BearNameList),
            ("usec",    UsecNameList),
            ("pmcusec", UsecNameList),
        };

        try
        {
            foreach (var (key, names) in targets)
            {
                if (botTable.Types.TryGetValue(key, out var bot) && bot is not null)
                    bot.FirstNames = names;
                else
                    logger.Warning($"EditBotNames: bot type '{key}' not found in BotTable.Types");
            }
        }
        catch (Exception)
        {
            logger.Warning("Error with money stack size");
        }
    }

    // ---------------------------------------------------------------
    // Magazines
    // ---------------------------------------------------------------
    private void EditMags()
    {
        try
        {
            var items = templateTable.Items;
            var magParent = new MongoId("5448bc234bdc2d3c308b4569");

            foreach (var (itemId, item) in items)
            {
                if (item.Parent != magParent) continue;

                try { item.Properties.LoadUnloadModifier = -35; }
                catch (Exception) { logger.Warning("Error with LoadUnloadModifier"); }

                try { item.Properties.CheckTimeModifier = -20; }
                catch (Exception) { logger.Warning("Error with CheckTimeModifier"); }

                try
                {
                    var firstCartridge = item.Properties.Cartridges?.FirstOrDefault();
                    if (firstCartridge is not null)
                    {
                        // Safe to operate on it
                        firstCartridge.MaxCount *= 1.5;
                    }
                }
                catch (Exception) { /* silent, as in original */ }

                // Collapse 3+ tall 1-wide mags to 2 tall
                try
                {
                    if (item.Properties.Width == 1 && item.Properties.Height > 2)
                        item.Properties.Height = 2;
                }
                catch (Exception) { logger.Warning("Error with Height"); }

                // Prevent weapons from taking 3+ rows
                try
                {
                    if (item.Properties.ExtraSizeDown > 1)
                        item.Properties.Height = 1;
                }
                catch (Exception) { logger.Warning("Error with ExtraSizeDown"); }
            }
        }
        catch (Exception)
        {
            logger.Warning("Error with mag size");
        }
    }

    private void EditLoadSpeed()
    {
        globalTable.Configuration.BaseLoadTime = 0.4;
        globalTable.Configuration.BaseUnloadTime = 0.15;
    }

    // ---------------------------------------------------------------
    // Money
    // ---------------------------------------------------------------
    private void EditMoneyStackSize()
    {
        try
        {
            var items = templateTable.Items;
            foreach (var id in MoneyIds)
            {
                if (items.TryGetValue(new MongoId(id), out var item))
                    item.Properties.StackMaxSize = 999999;
            }
        }
        catch (Exception)
        {
            logger.Warning("Error with money stack size");
        }
    }

    private void EditMoneyOnCharacter()
    {
        try
        {
            foreach (var restriction in globalTable.Configuration.RestrictionsInRaid)
            {
                if (restriction.TemplateId != null && MoneyIds.Contains(restriction.TemplateId))
                {
                    restriction.MaxInLobby = 999999;
                    restriction.MaxInRaid = 999999;
                }
            }
        }
        catch (Exception)
        {
            logger.Warning("Error with money on character");
        }
    }

    // ---------------------------------------------------------------
    // Keys
    // TODO
    // remove lab keycard need
    // ---------------------------------------------------------------
    private void EditKeyUsage()
    {
        var items = templateTable.Items;
        try
        {
            var keyParent = new MongoId("5c99f98d86f7745c314214b3");
            foreach (var (_, item) in items)
            {
                if (item.Parent == keyParent)
                    item.Properties.MaximumNumberOfUsage = 0;
            }
        }
        catch (Exception)
        {
            logger.Warning("Error with key uses");
        }

        try
        {
            foreach (var id in BlacklistKeys)
            {
                if (items.TryGetValue(new MongoId(id), out var item))
                    item.Properties.BackgroundColor = "red";
            }
        }
        catch (Exception)
        {
            logger.Warning("Error setting background of useless keys red");
        }
    }

    // ---------------------------------------------------------------
    // Stamina / Inertia / EXP
    // need to copy all settings from svm, hands/legs
    // ---------------------------------------------------------------
    private void EditStamina()
    {
        try
        {
            var s = globalTable.Configuration.Stamina;
            // older method
            //s.CrouchConsumption = new Vector3(0f,0f,s.CrouchConsumption.Z);
            s.CrouchConsumption = s.CrouchConsumption with { X = 0f, Y = 0f };
            s.OverweightConsumptionByPose = s.OverweightConsumptionByPose with { X = 0f, Y = 0f };

            s.JumpConsumption = 7;

            if (s.FallDamageMultiplier > 3)
                s.FallDamageMultiplier *= 0.25;

            s.ProneConsumption = 0;

            if (s.SprintDrainRate > 3)
            {
                s.SprintDrainRate *= 0.5;
                float xValue = s.SprintOverweightLimits.X * 1.25f;
                float yValue = s.SprintOverweightLimits.Y * 1.25f;
                s.SprintOverweightLimits = s.SprintOverweightLimits with { X = xValue, Y = yValue };
            }

            s.SitToStandConsumption = 0;
            s.StandupConsumption = s.StandupConsumption with { X = 0f, Y = 0f };
        }
        catch (Exception)
        {
            logger.Warning("Error with stamina changes");
        }
    }

    // mod already installed for this
    // private void EditInertia()
    // {
    //     const double inertiaMulti = 0.6;
    //     try
    //     {
    //         var i = globalTable.Configuration.Inertia;

    //         i.SideTime.X = 0.0;
    //         i.SideTime.Y = 0.0;

    //         i.MoveTimeRange.X = 0;
    //         i.MoveTimeRange.Y = 0;

    //         i.MinDirectionBlendTime *= inertiaMulti;

    //         i.WalkInertia.X *= inertiaMulti;
    //         i.WalkInertia.Y *= inertiaMulti;

    //         i.BaseJumpPenalty *= inertiaMulti;
    //         i.BaseJumpPenaltyDuration *= inertiaMulti;

    //         i.SpeedLimitAfterFallMax.X *= inertiaMulti;
    //         i.SprintBrakeInertia.Y *= inertiaMulti;

    //         // tilt is inverted: larger = faster / less inertia effect
    //         i.TiltInertiaMaxSpeed.X *= 1.3;
    //         i.TiltInertiaMaxSpeed.Y *= 1.3;

    //         i.TiltMaxSideBackSpeed.X *= 1.3;
    //         i.TiltMaxSideBackSpeed.Y *= 1.3;

    //         i.TiltStartSideBackSpeed.X *= 1.3;
    //         i.TiltStartSideBackSpeed.Y *= 1.3;
    //     }
    //     catch (Exception)
    //     {
    //         logger.Warning("Error with inertia");
    //     }
    // }

    private void EditExp()
    {
        try
        {
            var exp = globalTable.Configuration.Exp;
            exp.Kill.LongShotDistance = 100;
            exp.MatchEnd.SurvivedExperienceRequirement = 10;
            exp.MatchEnd.SurvivedSecondsRequirement = 60;
        }
        catch (Exception)
        {
            logger.Warning("Error with EXP");
        }
    }

    // ---------------------------------------------------------------
    // Meds
    // ---------------------------------------------------------------
    private void EditMeds()
    {
        // (itemId, maxUses, hpRecoveryRate)
        try
        {
            // name, MaxHpResource, hpResourceRate, LightBleeding.cost, HeavyBleeding.cost,
            ModMedItem(MedKitIds[0], 1000, 150); // cheese ai2 100, 50, n/a, n/a
            ModMedItem(MedKitIds[1], 2200, 225, 10); // car 220, 70, 50, n/a
            ModMedItem(MedKitIds[2], 3000, 225, 5, 75); // IFAK 300, 50, 30, 210
            ModMedItem(MedKitIds[3], 4000, 275, 5, 50); // Salewa 400, 85, 45, 175
            ModMedItem(MedKitIds[4], 4500, 350, 1, 35); // AFAK 400, 60, 30, 170
            ModMedItem(MedKitIds[5], 18000, 500, 1, 25); // Grizzly 1800, 175, 40, 130, fracture 50
        }
        catch (Exception)
        {
            logger.Warning("Error with medkit mod");
        }

        // Increase uses for non-healing med items (bleed / surg / pain)
        try
        {
            var items = templateTable.Items;
            foreach (var id in OtherMedIds)
            {
                if (items.TryGetValue(new MongoId(id), out var item))
                    item.Properties.MaxHpResource *= 10;
            }
        }
        catch (Exception)
        {
            logger.Warning("Error with med item use increase");
        }
    }

    /// <summary>
    /// Modifies a med item's uses, hp recovery rate, and optional stim buff.
    /// </summary>
    private void ModMedItem(string itemId, int maxUses, int hpRecoveryRate, 
                            int lightBleedCost = 0, int heavyBleedCost = 0, string stimBuff = "")
    {
        var items = templateTable.Items;
        if (!items.TryGetValue(new MongoId(itemId), out var item)) return;

        item.Properties.MaxHpResource = maxUses;
        item.Properties.HpResourceRate = hpRecoveryRate;
        if (item.Properties?.EffectsDamage is not { } effects)

        if (item.Properties.EffectsDamage.TryGetValue(DamageEffectType.LightBleeding, out var lightBleed) && lightBleed is not null && lightBleedCost > 0)
            lightBleed.Cost = lightBleedCost;

        if (item.Properties.EffectsDamage.TryGetValue(DamageEffectType.HeavyBleeding, out var heavyBleed) && heavyBleed is not null && heavyBleedCost > 0)
            heavyBleed.Cost = heavyBleedCost;

        item.Properties.StimulatorBuffs = stimBuff;
    }

    // ---------------------------------------------------------------
    // Ammo
    // ---------------------------------------------------------------
    private void EditAmmo()
    {
        try
        {
            var items = templateTable.Items;
            var ammoParent = new MongoId("5485a8684bdc2da71d8b4567");
            foreach (var (_, item) in items)
            {
                if (item.Parent == ammoParent)
                    item.Properties.StackMaxSize = 600;
            }
        }
        catch (Exception)
        {
            logger.Warning("Error with ammo stack size");
        }
    }

    // ---------------------------------------------------------------
    // Hideout
    // ---------------------------------------------------------------
    private void EditHideout()
    {
        // --- Stash size per tier ---
        try
        {

            var items = templateTable.Items;
            foreach (var id in StashIds)
            {
                if (items.TryGetValue(new MongoId(id), out var stash))
                {
                    var firstGrid = stash.Properties.Grids?.FirstOrDefault();
                    if (firstGrid is not null)
                    {
                        firstGrid.Properties.CellsV *= 2;
                    }
                }
            }
        }
        catch (Exception)
        {
            logger.Warning("HideoutOptions.StashOptions.BiggerStash failed.");
        }

        // --- Reduce loyalty requirement by 1 and currency cost by 10x ---
        try
        {
            var area = hideoutTable.Areas.FirstOrDefault(a => a.Type == HideoutAreas.WaterCloset);
            // VERIFY: the original JS targeted area id "5d484fc0654e76006657e0ab".
            // Use the type above if IDs are exposed; otherwise match by ID.
            if (area != null)
            {
                foreach (var (_, stage) in area.Stages)
                {
                    foreach (var req in stage.Requirements)
                    {
                        if (req.LoyaltyLevel != null && req.LoyaltyLevel > 0)
                            req.LoyaltyLevel -= 1;

                        if (req.TemplateId != null &&
                            (req.TemplateId == "5449016a4bdc2d6f028b456f" ||
                             req.TemplateId == "569668774bdc2da2298b4568"))
                        {
                            req.Count /= 10;
                        }
                    }
                }
            }
        }
        catch (Exception)
        {
            logger.Warning("HideoutOptions.StashOptions.Easier_Loyalty failed.");
        }

        // --- Set all construction times to 1 second ---
        try
        {
            foreach (var area in hideoutTable.Areas)
            {
                foreach (var (_, stage) in area.Stages)
                {
                    if (stage.ConstructionTime > 0)
                        stage.ConstructionTime = 1;
                }
            }
        }
        catch (Exception)
        {
            logger.Warning("Error with Hideout construction time");
        }
    }

    // ---------------------------------------------------------------
    // Item weight
    // ---------------------------------------------------------------
    private void EditItemWeight()
    {
        try
        {
            var items = templateTable.Items;
            foreach (var (_, item) in items)
            {
                if (item.Properties?.Weight is double w)
                    item.Properties.Weight *= 0.01;
            }
        }
        catch (Exception)
        {
            logger.Warning("Error with item weight");
        }
    }

    // ---------------------------------------------------------------
    // Raid time (locations)
    // TODO
    // open all extracts
    // ---------------------------------------------------------------
    private void EditRaidTime()
    {
        try
        {
            var locations = locationTable.GetDictionary();
            foreach (var (_, location) in locations)
            {
                if (location?.Base == null) continue;
                var current =  location.Base.EscapeTimeLimit;
                if (current is null or 0 or 99999) continue;

                location.Base.EscapeTimeLimit *= 3;
                location.Base.EscapeTimeLimitCoop *= 3;
                location.Base.EscapeTimeLimitPVE *= 3;
            }
        }
        catch (Exception)
        {
            logger.Warning("Error with EscapeTimeLimit");
        }
    }

    // ---------------------------------------------------------------
    // Boss spawn chance — 5% (as in original)
    // ---------------------------------------------------------------
    private void EditBossSpawnChance()
    {
        try
        {
            var locations = locationTable.GetDictionary();
            foreach (var (_, location) in locations)
            {
                var bosses = location.Base?.BossLocationSpawn;
                if (bosses == null) continue;

                foreach (var boss in bosses)
                    boss.BossChance = 5;
            }
        }
        catch (Exception)
        {
            logger.Warning("Error with Boss spawn %");
        }
    }
}