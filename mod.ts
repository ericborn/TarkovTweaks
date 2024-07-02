import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { BaseClasses } from "@spt/models/enums/BaseClasses";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { ILocationConfig } from "@spt/models/spt/config/ILocationConfig";

class Mod implements IPostDBLoadMod
{
   public postDBLoad(container: DependencyContainer): void
    {
        // get logger
        const logger = container.resolve<ILogger>("PrimaryLogger");

        const databaseServer: DatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const configServer: ConfigServer = container.resolve<ConfigServer>("ConfigServer");
        
		// Request the map location config
        // Required - ConfigTypes.LOCATION is the enum of the config we want, others include ConfigTypes.AIRDROP/ConfigTypes.IN_RAID/ConfigTypes.BOT
        const locationConfig: ILocationConfig = configServer.getConfig<ILocationConfig>(ConfigTypes.LOCATION);
        
        const tables = databaseService.getTables();
        const items = databaseService.getItems();

        const globals = tables.globals.config;
        const armorMaterials = globals.ArmorMaterials;
        const bearNames = tables.bots.types.bear;
        const usecNames = tables.bots.types.usec;
        const hideout = tables.hideout.areas;

        
        // Log the original customs loose loot multipler
        logger.info(`Here is the original customs map loose loot multipler: ${locationConfig.looseLootMultiplier.bigmap}`);

        // Adjust the multipler (BSGs internal name for `Customs` is `bigmap`)
        locationConfig.looseLootMultiplier.bigmap = 10;

        // Log the new multipler
        logger.info(`Here is the altered customs map loose loot multipler: ${locationConfig.looseLootMultiplier.bigmap}`);
    }
}

export const mod = new Mod();