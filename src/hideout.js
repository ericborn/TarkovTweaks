"use strict";

const config = require("../config/config.json");

class trade 
{
    static onLoad() 
    {
		if (config.HideoutOptions.enabled) {
			if (config.HideoutOptions.StashOptions.enabled) {
				// Fix for ADHD.

				// stash area id 5d484fc0654e76006657e0ab
				// "_id": "566abbc34bdc2d92178b4576",
				// "_name": "Standard stash 10x28",
				// "_id": "5811ce572459770cba1a34ea",
				// "_name": "Left Behind stash 10x38",
				// "_id": "5811ce662459770f6f490f32",
				// "_name": "Prepare for escape stash 10x48",
				// "_id": "5811ce772459770e9e5f9532",
				// "_name": "Edge of darkness stash 10x68",

				if (config.HideoutOptions.StashOptions.BiggerStash.enabled) {
					try {
						items["566abbc34bdc2d92178b4576"]._props.Grids[0]._props.cellsV = 50
						items["5811ce572459770cba1a34ea"]._props.Grids[0]._props.cellsV = 100
						items["5811ce662459770f6f490f32"]._props.Grids[0]._props.cellsV = 150
						items["5811ce772459770e9e5f9532"]._props.Grids[0]._props.cellsV = 200
					} catch (error) {
						logger.warning("\nHideoutOptions.StashOptions.BiggerStash failed. Send bug report. Continue safely.")
						log(error)
					}
				}

				const originalStages = tables.hideout.areas.find((x) => x._id == "5d484fc0654e76006657e0ab").stages

				for (const stage in originalStages) {
					if (config.HideoutOptions.StashOptions.Easier_Loyalty.enabled == true) {
						try {
							originalStages[stage].requirements
								.filter((x) => x.loyaltyLevel != undefined)
								.forEach((x) => {
									x.loyaltyLevel -= 1
								})
						} catch (error) {
							logger.warning("\nHideoutOptions.StashOptions.Easier_Loyalty failed. Send bug report. Continue safely.")
							log(error)
						}
					}

					if (config.HideoutOptions.StashOptions.Less_Currency_For_Construction.enabled == true) {
						try {
							originalStages[stage].requirements
								.filter((x) => x.templateId == "5449016a4bdc2d6f028b456f" || x.templateId == "569668774bdc2da2298b4568")
								.forEach((x) => {
									x.count /= 10
								})
						} catch (error) {
							logger.warning("\nHideoutOptions.StashOptions.Less_Currency_For_Construction failed. Send bug report. Continue safely.")
							log(error)
						}
					}
				}

				try {
					tables.hideout.areas.find((x) => x._id == "5d484fc0654e76006657e0ab").stages = originalStages
				} catch (error) {
					logger.warning("\nHideoutOptions.StashOptions (Easier_Loyalty or Less_Currency_For_Construction) failed. Send bug report. Continue safely.")
					log(error)
				}

				if (config.HideoutOptions.StashOptions.Progressive_Stash.enabled == true) {
					const basicStashBonuses = [
						{
							id: "64f5b9e5fa34f11b380756c0",
							templateId: "566abbc34bdc2d92178b4576",
							type: "StashSize",
						},
					]
					for (const profile of profileList) {
						try {
							tables.templates.profiles[profile].bear.character.Hideout.Areas.find((x) => x.type == "3").level = 1
							tables.templates.profiles[profile].usec.character.Hideout.Areas.find((x) => x.type == "3").level = 1

							tables.templates.profiles[profile].bear.character.Inventory.items
								.filter((x) => x._tpl == "5811ce572459770cba1a34ea" || x._tpl == "5811ce662459770f6f490f32" || x._tpl == "5811ce772459770e9e5f9532")
								.forEach((element) => {
									element._tpl = "566abbc34bdc2d92178b4576"
								})
							tables.templates.profiles[profile].usec.character.Inventory.items
								.filter((x) => x._tpl == "5811ce572459770cba1a34ea" || x._tpl == "5811ce662459770f6f490f32" || x._tpl == "5811ce772459770e9e5f9532")
								.forEach((element) => {
									element._tpl = "566abbc34bdc2d92178b4576"
								})
							tables.templates.profiles[profile].bear.character.Bonuses = basicStashBonuses
							tables.templates.profiles[profile].usec.character.Bonuses = basicStashBonuses
						} catch (error) {
							logger.warning("\nconfig.HideoutOptions.BiggerStash.Progressive_Stash error")
							log(error)
						}
					}
				}
			}
			// 100x Faster hideout production, 10x superwater and moonshine production, bitcoins
			for (const prod in tables.hideout.production) {
				const endProduct = tables.hideout.production[prod].endProduct
				const productionTime = tables.hideout.production[prod].productionTime
				if (
					(endProduct == "5d1b376e86f774252519444e" || endProduct == "5d1b33a686f7742523398398") &&
					config.HideoutOptions.Faster_Moonshine_and_Purified_Water_Production.enabled
				) {
					// superwater and moonshine
					tables.hideout.production[prod].productionTime = Math.round(
						productionTime / config.HideoutOptions.Faster_Moonshine_and_Purified_Water_Production.Base_Moonshine_And_Water_Time_Multiplier
					)
				} else if (endProduct == "59faff1d86f7746c51718c9c" && config.HideoutOptions.Faster_Bitcoin_Farming.enabled == true) {
					// bitcoins
					tables.hideout.production[prod].productionTime = Math.round(
						productionTime / config.HideoutOptions.Faster_Bitcoin_Farming.Base_Bitcoin_Time_Multiplier
					)
					if (config.HideoutOptions.Faster_Bitcoin_Farming.Revert_Bitcoin_Price_To_v012 == true) {
						tables.templates.handbook.Items.find((x) => x.Id == "59faff1d86f7746c51718c9c").Price = 100000
					}
				} else if (config.HideoutOptions.Faster_Crafting_Time.enabled) {
					// all other crafts
					tables.hideout.production[prod].productionTime =
						Math.round(productionTime / config.HideoutOptions.Faster_Crafting_Time.Base_Crafting_Time_Multiplier) + 1
				}
			}

			if (config.HideoutOptions.Faster_Crafting_Time.enabled && config.HideoutOptions.Faster_Crafting_Time.Hideout_Skill_Exp_Fix.enabled) {
				// Buff to hideout exp rate, more testing needed
				hideoutConfig.hoursForSkillCrafting /= config.HideoutOptions.Faster_Crafting_Time.Hideout_Skill_Exp_Fix.Hideout_Skill_Exp_Multiplier
			}

			if (config.HideoutOptions.Faster_Bitcoin_Farming.enabled) {
				// Instead of modifing base farming time try this:
				tables.hideout.settings.gpuBoostRate = config.HideoutOptions.Faster_Bitcoin_Farming.GPU_Efficiency

				// TODO: replace getBTCSlots() in HideoutHelper to add bonus slots per farm level. lv2 - 4 slots, lv3 - 5, elite - 7

				// Vanilla: Base time (x1): 40h 17min (2417 min), GPU Boost (0.041225): x1, each GPU has only ~4.12% efficiency
				// 2× GPU: 38h 41min x1.04
				// 10× GPU: 29h 23min x1.37
				// 25× GPU: 20h 15min x1.99
				// 50× GPU: 13h 20min x3.02

				// Softcore v0.1: Base time (x10): 4h 2min, GPU Boost (0.041225): x1
				// 2× GPU: 3h 52min x1.04
				// 10× GPU: 2h 56min x1.37
				// 25× GPU: 2h 1min x1.99
				// 50× GPU: 1h 20min x3.02

				// Softcore v0.2: Base time (x2): 20h 8min, GPU Boost(0.5): x12.13, each GPU has ~50% efficiency
				// 2× GPU: 13h 26min x1.5
				// 10× GPU: 3h 40min x5.5
				// 25× GPU: 1h 33min x13
				// 50× GPU: 0h 47min x25.5

				// Linear: Base time (x1): 40h 17min, GPU Boost (1): x24.26, each GPU is 100% efficient
				// 2× GPU: 20h 8min x2
				// 10× GPU: 4h 2min x10
				// 25× GPU: 1h 37min x25
				// 50× GPU: 0h 48min x50
			}

			if (config.HideoutOptions.Faster_Hideout_Construction.enabled) {
				// 100x Faster hideout construction
				for (const area in tables.hideout.areas) {
					for (const stage in tables.hideout.areas[area].stages) {
						tables.hideout.areas[area].stages[stage].constructionTime = Math.round(
							tables.hideout.areas[area].stages[stage].constructionTime / config.HideoutOptions.Faster_Hideout_Construction.Hideout_Construction_Time_Multiplier
						)
					}
				}
			}

			if (config.HideoutOptions.Increased_Fuel_Consumption.enabled) {
				// 10x faster fuel draw
				tables.hideout.settings.generatorFuelFlowRate *= config.HideoutOptions.Increased_Fuel_Consumption.Fuel_Consumption_Multiplier
			}
		}

		if (config.AdditionalCraftingRecipes.enabled == true) {
			try {
				// 63da4dbee8fa73e225000001
				// 63da4dbee8fa73e225000002
				// 63da4dbee8fa73e225000003
				// 63da4dbee8fa73e225000004
				// 63da4dbee8fa73e225000005
				// 63da4dbee8fa73e225000006
				// 63da4dbee8fa73e225000007
				// 63da4dbee8fa73e225000008
				// 63da4dbee8fa73e225000009
				// 63da4dbee8fa73e22500000a

				const Ophthalmoscope = {
					_id: "63da4dbee8fa73e225000001",

					areaType: 7,
					requirements: [
						{ areaType: 7, requiredLevel: 3, type: "Area" },
						{
							templateId: "5e2aedd986f7746d404f3aa4",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "619cc01e0a7c3a1a2731940c",
							count: 2,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "57d17c5e2459775a5c57d17d",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5b4391a586f7745321235ab2",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "57347c1124597737fb1379e3",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
					],
					productionTime: 105,
					boosters: null,
					endProduct: "5af0534a86f7743b6f354284",
					continuous: false,
					count: 1,
					productionLimitCount: 0,
				}
				const Zagustin = {
					_id: "63da4dbee8fa73e225000002",

					areaType: 7,
					requirements: [
						{ areaType: 7, requiredLevel: 3, type: "Area" },
						{
							templateId: "5c0e530286f7747fa1419862",
							count: 2,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5e8488fa988a8701445df1e4",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5ed515f6915ec335206e4152",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
					],
					productionTime: 105,
					boosters: null,
					endProduct: "5c0e533786f7747fa23f4d47",
					continuous: false,
					count: 3,
					productionLimitCount: 0,
				}
				const Obdolbos = {
					// Did you always want to run your own meth lab in Tarkov? Now you can.
					_id: "63da4dbee8fa73e225000003",

					areaType: 7,
					requirements: [
						{ areaType: 7, requiredLevel: 3, type: "Area" },
						{
							templateId: "5c0e531286f7747fa54205c2",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5b43575a86f77424f443fe62",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5e2af00086f7746d3f3c33f7",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "62a09f32621468534a797acb",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5d40407c86f774318526545a",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5d403f9186f7743cac3f229b",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5d1b376e86f774252519444e",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5d1b2f3f86f774252167a52c",
							type: "Tool",
						},
					],
					productionTime: 564,
					boosters: null,
					endProduct: "5ed5166ad380ab312177c100",
					continuous: false,
					count: 8,
					productionLimitCount: 0,
				}
				const CALOK = {
					_id: "63da4dbee8fa73e225000004",

					areaType: 7,
					requirements: [
						{ areaType: 7, requiredLevel: 2, type: "Area" },
						{
							templateId: "59e35abd86f7741778269d82", // Pack of sodium bicarbonate
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5755383e24597772cb798966", // Vaseline balm
							count: 1,
							isFunctional: false,
							type: "Item",
						},
					],
					productionTime: 48,
					boosters: null,
					endProduct: "5e8488fa988a8701445df1e4",
					continuous: false,
					count: 2,
					productionLimitCount: 0,
					// Granular nature? Check.
					// Stops blood with magical properties of pain-relieving Tarkov Vaseline? Check.
					// Fun and economically balanced recipe that includes underused items? Triple check.
				}
				const Adrenaline = {
					_id: "63da4dbee8fa73e225000005",

					areaType: 7,
					requirements: [
						{ areaType: 7, requiredLevel: 2, type: "Area" },
						{
							templateId: "5751496424597720a27126da",
							count: 3,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5755356824597772cb798962",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
					],
					productionTime: 23,
					boosters: null,
					endProduct: "5c10c8fd86f7743d7d706df3",
					continuous: false,
					count: 1,
					productionLimitCount: 0,
				}
				const ThreebTG = {
					_id: "63da4dbee8fa73e225000006",

					areaType: 7,
					requirements: [
						{ areaType: 7, requiredLevel: 3, type: "Area" },
						{
							templateId: "5c10c8fd86f7743d7d706df3",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "59e361e886f774176c10a2a5",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "57505f6224597709a92585a9",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
					],
					productionTime: 31,
					boosters: null,
					endProduct: "5ed515c8d380ab312177c0fa",
					continuous: false,
					count: 2,
					productionLimitCount: 0,
				}
				const AHF1 = {
					_id: "63da4dbee8fa73e225000007",

					areaType: 7,
					requirements: [
						{ areaType: 7, requiredLevel: 2, type: "Area" },
						{
							templateId: "590c695186f7741e566b64a2",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "544fb3f34bdc2d03748b456a",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
					],
					productionTime: 47,
					boosters: null,
					endProduct: "5ed515f6915ec335206e4152",
					continuous: false,
					count: 1,
					productionLimitCount: 0,
				}
				const OLOLO = {
					_id: "63da4dbee8fa73e225000008",

					areaType: 8,
					requirements: [
						{ areaType: 8, requiredLevel: 3, type: "Area" },
						{
							templateId: "57513f9324597720a7128161",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "57513fcc24597720a31c09a6",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "57513f07245977207e26a311",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "575062b524597720a31c09a1",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "544fb62a4bdc2dfb738b4568",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "544fb37f4bdc2dee738b4567",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5d1b385e86f774252167b98a",
							type: "Tool",
						},
						{
							templateId: "590de71386f774347051a052",
							type: "Tool",
						},
					],
					productionTime: 71,
					boosters: null,
					endProduct: "62a0a043cf4a99369e2624a5",
					continuous: false,
					count: 3,
					productionLimitCount: 0,
				}
				const L1 = {
					_id: "63da4dbee8fa73e225000009",

					areaType: 7,
					requirements: [
						{ areaType: 7, requiredLevel: 3, type: "Area" },
						{
							templateId: "5c10c8fd86f7743d7d706df3",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5c0e531d86f7747fa23f4d42",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
					],
					productionTime: 71,
					boosters: null,
					endProduct: "5ed515e03a40a50460332579",
					continuous: false,
					count: 1,
					productionLimitCount: 0,
				}
				const P22 = {
					_id: "63da4dbee8fa73e225000010",

					areaType: 7,
					requirements: [
						{ areaType: 7, requiredLevel: 3, type: "Area" },
						{
							templateId: "5c10c8fd86f7743d7d706df3",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "59e361e886f774176c10a2a5",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "57505f6224597709a92585a9",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
					],
					productionTime: 31,
					boosters: null,
					endProduct: "5ed515c8d380ab312177c0fa",
					continuous: false,
					count: 2,
					productionLimitCount: 0,
				}
				const Trimadol = {
					_id: "63da4dbee8fa73e225000011",

					areaType: 7,
					requirements: [
						{ areaType: 7, requiredLevel: 3, type: "Area" },
						{
							templateId: "5ed515c8d380ab312177c0fa",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5ed515e03a40a50460332579",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
					],
					productionTime: 52,
					boosters: null,
					endProduct: "637b620db7afa97bfc3d7009",
					continuous: false,
					count: 2,
					productionLimitCount: 0,
				}
				const Meldonin = {
					_id: "63da4dbee8fa73e225000012",

					areaType: 7,
					requirements: [
						{ areaType: 7, requiredLevel: 3, type: "Area" },
						{
							templateId: "5ed515e03a40a50460332579",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5ed51652f6c34d2cc26336a1",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
					],
					productionTime: 39,
					boosters: null,
					endProduct: "5ed5160a87bb8443d10680b5",
					continuous: false,
					count: 2,
					productionLimitCount: 0,
				}
				const PNB = {
					_id: "63da4dbee8fa73e225000013",

					areaType: 7,
					requirements: [
						{ areaType: 7, requiredLevel: 3, type: "Area" },
						{
							templateId: "5c10c8fd86f7743d7d706df3",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "59e361e886f774176c10a2a5",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "57505f6224597709a92585a9",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
					],
					productionTime: 31,
					boosters: null,
					endProduct: "5ed515c8d380ab312177c0fa",
					continuous: false,
					count: 2,
					productionLimitCount: 0,
				}
				const Perfotran = {
					_id: "63da4dbee8fa73e225000014",

					areaType: 7,
					requirements: [
						{ areaType: 7, requiredLevel: 3, type: "Area" },
						{
							templateId: "5c0e533786f7747fa23f4d47",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5fca138c2a7b221b2852a5c6",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "5c0e530286f7747fa1419862",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
					],
					productionTime: 45,
					boosters: null,
					endProduct: "637b6251104668754b72f8f9",
					continuous: false,
					count: 2,
					productionLimitCount: 0,
				}
				const SJ9 = {
					_id: "63da4dbee8fa73e225000015",

					areaType: 7,
					requirements: [
						{ areaType: 7, requiredLevel: 3, type: "Area" },
						{
							templateId: "5c10c8fd86f7743d7d706df3",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "59e361e886f774176c10a2a5",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "57505f6224597709a92585a9",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
					],
					productionTime: 31,
					boosters: null,
					endProduct: "5ed515c8d380ab312177c0fa",
					continuous: false,
					count: 2,
					productionLimitCount: 0,
				}
				const SJ12 = {
					_id: "63da4dbee8fa73e225000016",

					areaType: 7,
					requirements: [
						{ areaType: 7, requiredLevel: 3, type: "Area" },
						{
							templateId: "5c10c8fd86f7743d7d706df3",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "59e361e886f774176c10a2a5",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
						{
							templateId: "57505f6224597709a92585a9",
							count: 1,
							isFunctional: false,
							type: "Item",
						},
					],
					productionTime: 31,
					boosters: null,
					endProduct: "5ed515c8d380ab312177c0fa",
					continuous: false,
					count: 2,
					productionLimitCount: 0,
				}
				tables.hideout.production.push(ThreebTG, Adrenaline, L1, AHF1, CALOK, Ophthalmoscope, Zagustin, Obdolbos, OLOLO, Perfotran, Trimadol, Meldonin)
			} catch (error) {
				logger.warning("\nAdditionalCraftingRecipes failed. Send bug report. Continue safely.")
				log(error)
			}
		}
    }
}

module.exports = trade;