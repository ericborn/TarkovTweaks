# -*- coding: utf-8 -*-
"""
Created on Fri Sep 15 17:51:56 2023

@author: Eric
"""
import os
import json
import shutil

def load_json(file_path):
    item_file = open(file_path, 'r', encoding='utf8')
    item_data = json.loads(item_file.read())
    item_file.close()
    return item_data

def save_json(item_data, file_path):
    json_obj = json.dumps(item_data, indent=4)
    with open(file_path, 'w') as outfile:
        outfile.write(json_obj)
    outfile.close()

install_drive = 'E:/'
eft_version = 'SPT/'

base_file_name = 'base.json'
assort_file_name = 'assort.json'
case_id = '5795f317245977243854e041'

bag_parent = '5448e53e4bdc2d60728b4567'
key_parent = '5c99f98d86f7745c314214b3'
rig_parent = '5448e5284bdc2dcb718b4567'
mag_parent = '5448bc234bdc2d3c308b4569'
ammo_parent = '5485a8684bdc2da71d8b4567'
key_tool_id = '59fafd4b86f7745ca07e1232'

medical_parent = '5448f39d4bdc2d0a728b4568'
headwear_parent = '5a341c4086f77401f2541505'
body_armor_parent = '5448e54d4bdc2dcc718b4568'
armored_equipment_parent = '57bef4c42459772e8d35a53b'

skier_id = '58330581ace78e27b8b10cee'
fence_id = '579dc571d53a0658a154fbec'
prapor_id = '54cb50c76803fa8b248b4571'
ragman_id = '5ac3b934156ae10c4430e83c'
jaeger_id = '5c0647fdd443bc2504c2d371'
mechanic_id = '5a7c2eca46aef81a7ca2145d'
therapist_id = '54cb57776803fa99248b456e'
peacekeeper_id = '5935c25fb3acc3127c3d8cd9'

mod_trader_img_path = 'C:/eft mods/traders/'
player_profile_path = install_drive + eft_version + 'user/profiles/'
bot_path = install_drive + eft_version + 'Aki_Data/Server/configs/bot.json'

map_path = install_drive + eft_version + 'Aki_Data/Server/database/locations/'
trader_path = install_drive + eft_version + 'Aki_Data/Server/database/traders/'
weather_path = install_drive + eft_version + 'Aki_Data/Server/configs/weather.json'

trader_img_path = install_drive + eft_version + 'Aki_Data/Server/images/traders/'
ragfair_path = install_drive + eft_version + 'Aki_Data/Server/configs/ragfair.json'
global_path = install_drive + eft_version + 'Aki_Data/Server/database/globals.json'
location_path = install_drive + eft_version + 'Aki_Data/Server/configs/location.json'
bot_types_path = install_drive + eft_version + 'Aki_Data/Server/database/bots/types/'
quest_config_path = install_drive + eft_version + 'Aki_Data/Server/configs/quest.json'
insurance_path = install_drive + eft_version + 'Aki_Data/Server/configs/insurance.json'
chat_path = install_drive + eft_version + 'Aki_Data/Server/configs/pmcchatresponse.json'
item_path = install_drive + eft_version + 'Aki_Data/Server/database/templates/items.json'
quest_path = install_drive + eft_version + 'Aki_Data/Server/database/templates/quests.json'
bear_bot_path = install_drive + eft_version + 'Aki_Data/Server/database/bots/types/bear.json'
usec_bot_path = install_drive + eft_version + 'Aki_Data/Server/database/bots/types/usec.json'
locales_path = install_drive + eft_version + 'Aki_Data/Server/database/locales/global/en.json'
profiles_path = install_drive + eft_version + 'Aki_Data/Server/database/templates/profiles.json'
hideout_areas_path = install_drive + eft_version + 'Aki_Data/Server/database/hideout/areas.json'
hideout_workout_path = install_drive + eft_version + 'Aki_Data/Server/database/hideout/qte.json'
hideout_settings_path = install_drive + eft_version + 'Aki_Data/Server/database/hideout/settings.json'
hideout_scav_case_path = install_drive + eft_version + 'Aki_Data/Server/database/hideout/scavcase.json'
hideout_production_path = install_drive + eft_version + 'Aki_Data/Server/database/hideout/production.json'

skier_base_path = trader_path + skier_id + '/' + base_file_name
fence_base_path = trader_path + fence_id + '/' + base_file_name
prapor_base_path = trader_path + prapor_id + '/' + base_file_name
ragman_base_path = trader_path + ragman_id + '/' + base_file_name
jaeger_base_path = trader_path + jaeger_id + '/' + base_file_name
mechanic_base_path = trader_path + mechanic_id + '/' + base_file_name
therapist_base_path = trader_path + therapist_id + '/' + base_file_name
peacekeeper_base_path = trader_path + peacekeeper_id + '/' + base_file_name

skier_assort_path = trader_path + skier_id + '/' + assort_file_name
prapor_assort_path = trader_path + prapor_id + '/' + assort_file_name
ragman_assort_path = trader_path + ragman_id + '/' + assort_file_name
jaeger_assort_path = trader_path + jaeger_id + '/' + assort_file_name
mechanic_assort_path = trader_path + mechanic_id + '/' + assort_file_name
therapist_assort_path = trader_path + therapist_id + '/' + assort_file_name
peacekeeper_assort_path = trader_path + peacekeeper_id + '/' + assort_file_name

bot_data = load_json(bot_path)
chat_data = load_json(chat_path)
item_data = load_json(item_path)
quest_data = load_json(quest_path)
global_data = load_json(global_path)
bear_data = load_json(bear_bot_path)
usec_data = load_json(usec_bot_path)
locales_data = load_json(locales_path)
ragfair_data = load_json(ragfair_path)
weather_data = load_json(weather_path)
profiles_data = load_json(profiles_path)
location_data = load_json(location_path)
insurance_data = load_json(insurance_path)
quest_config_data = load_json(quest_config_path)
hideout_areas_data = load_json(hideout_areas_path)
hideout_workout_data = load_json(hideout_workout_path) 
hideout_settings_data = load_json(hideout_settings_path)
hideout_scav_case_data = load_json(hideout_scav_case_path)
hideout_production_data = load_json(hideout_production_path)

skier_base_data = load_json(skier_base_path)
fence_base_data = load_json(fence_base_path)
prapor_base_data = load_json(prapor_base_path)
ragman_base_data = load_json(ragman_base_path)
jaeger_base_data = load_json(jaeger_base_path)
mechanic_base_data = load_json(mechanic_base_path)
therapist_base_data = load_json(therapist_base_path)
peacekeeper_base_data = load_json(peacekeeper_base_path)

skier_assort_data = load_json(skier_assort_path)
prapor_assort_data = load_json(prapor_assort_path)
ragman_assort_data = load_json(ragman_assort_path)
jaeger_assort_data = load_json(jaeger_assort_path)
mechanic_assort_data = load_json(mechanic_assort_path)
therapist_assort_data = load_json(therapist_assort_path)
peacekeeper_assort_data = load_json(peacekeeper_assort_path)

profile_list = os.listdir(player_profile_path)
bot_type_list = os.listdir(bot_types_path)

# money list
money_list = ['5449016a4bdc2d6f028b456f', '5696686a4bdc2da3298b456a',
              '569668774bdc2da2298b4568']

# secure containers
# alpha, beta, epsilon, gamma, Kappa, waist pouch
container_list = ['544a11ac4bdc2d470e8b456a', '5857a8b324597729ab0a0e7d',
                  '59db794186f77448bc595262', '5857a8bc2459772bad15db29',
                  '5c093ca986f7740a1867ab12', '5732ee6a24597719ae0c0281']

# car, Salewa, grizzly, IFAK, AI-2, AFAK, sanitar ifak
med_kit_ids = ['590c661e86f7741e566b646a', '544fb45d4bdc2dee738b4568',
               '590c657e86f77412b013051d', '5755356824597772cb798962',
               '590c678286f77426c9660122', '60098ad7c2240c0fe85c570a',
               '5e99711486f7744bfc4af328']

# bleed, surg kits, pain meds
other_med_ids = ['5751a25924597722c463c472', '5d02778e86f774203e7dedbe', 
                 '5d02797c86f774203f38e30a', '5e8488fa988a8701445df1e4',
                 '5af0548586f7743a532b7e99', '5af0454c86f7746bf20992e8']

repair_key_ids = ['591094e086f7747caa7bb2ef', '5910968f86f77425cf569c32']

bag_keys = []
key_keys = []
rig_keys = []
mag_keys = []
ammo_keys = []
case_keys = []
armor_keys = []
helmet_keys = []
armored_equipment_keys = []
all_keys = list(item_data.keys())

# max durability no longer works since plates were introduced
for key in item_data.keys():  
    # armor
    # if item_data[key]['_parent'] == body_armor_parent:
    #     armor_keys.append(key)
    # if item_data[key]['_parent'] == rig_parent and \
    #     item_data[key]['_props']['MaxDurability'] > 0:
    #     rig_keys.append(key)
    # if item_data[key]['_parent'] == headwear_parent and \
    #     item_data[key]['_props']['MaxDurability'] > 0 and \
    #     item_data[key]['_props']['ArmorType'] != 'None':
    #     helmet_keys.append(key)
    # if item_data[key]['_parent'] == armored_equipment_parent:
    #     armored_equipment_keys.append(key)
    
    # bags
    if item_data[key]['_parent'] == bag_parent:
        bag_keys.append(key)
    
    # keys
    if item_data[key]['_parent'] == key_parent:
        key_keys.append(key)
    
    # mags
    if item_data[key]['_parent'] == mag_parent:
        mag_keys.append(key)
        
    # ammo
    if item_data[key]['_parent'] == ammo_parent:
        ammo_keys.append(key)
        
    # containers
    if item_data[key]['_parent'] == case_id:
        case_keys.append(key)

# # all items to mod durability     
# mod_keys = armor_keys + rig_keys + helmet_keys + armored_equipment_keys

# multiply all durabilities
# durability_adjustment = 3
# for key in mod_keys:
#     try:
#         item_data[key]['_props']['Durability'] *= durability_adjustment 
#         item_data[key]['_props']['MaxDurability'] *= durability_adjustment 
#     except:
#         pass

# created to rollback making all mag loading speed 
# positive when it should've been negative
# original_values = {}
# for key in mag_keys:
#     try:
#         original_values[item_data[key]['_id']] = item_data[key]['_props']['LoadUnloadModifier']
#     except:
#         pass

# for key in original_values:
#     item_data[key]['_props']['LoadUnloadModifier'] = original_values[key]

###
# mag reloading changes
###
# fixed range adjustments
# negative values increase loading speed
# need to figure out the formula for diminishing returns
if item_data['59d625f086f774661516605d']['_props']['Cartridges'][0]['_max_count'] == 30:
    for key in mag_keys:
        try:
            # static load/unload mod to -35
            item_data[key]['_props']['LoadUnloadModifier'] = -35
            
            # tiered list, needs refinement
            # if item_data[key]['_props']['LoadUnloadModifier'] >= 0:
            #     item_data[key]['_props']['LoadUnloadModifier'] = -20
            # if item_data[key]['_props']['LoadUnloadModifier'] <= -1 and \
            #     item_data[key]['_props']['LoadUnloadModifier']>= -15:
            #         item_data[key]['_props']['LoadUnloadModifier'] = -35
            # if item_data[key]['_props']['LoadUnloadModifier'] <= -16:
            #     item_data[key]['_props']['LoadUnloadModifier'] = -45
            
            # static check mod to -20
            item_data[key]['_props']['CheckTimeModifier'] = -20
            
            # increase all mags ammo capacity by 1.5
            item_data[key]['_props']['Cartridges'][0]['_max_count'] *= 1.5
            
            # if mags are 1 wide and more than 2 tall make 2 tall
            # prevents p90 mags from being mis-scaled
            if item_data[key]['_props']['Width'] == 1 and item_data[key]['_props']['Height'] > 2:
                item_data[key]['_props']['Height'] = 2
                
            # makes extra tall mags only make weapons 1 cell taller instead of 2
            if item_data[key]['_props']['ExtraSizeDown'] == 2:
                item_data[key]['_props']['ExtraSizeDown'] = 1
    
        except:
            pass
        
    

# set 
# default 0.85 and 0.3
global_data['config']['BaseLoadTime'] = 0.4
global_data['config']['BaseUnloadTime'] = 0.15

# cut base load/unload times in half
# global_data['config']['BaseLoadTime'] *= 0.5
# global_data['config']['BaseUnloadTime'] *= 0.5

# adjust max number of flea offers to 100 from -10000 to 10000 rep
# global_data['config']['RagFair']['maxActiveOfferCount'][0]['count'] = 100
# global_data['config']['RagFair']['maxActiveOfferCount'][0]['to'] = 10000
# global_data['config']['RagFair']['youSellOfferMaxStorageTimeInHour'] = 600,
# global_data['config']['RagFair']['yourOfferDidNotSellMaxStorageTimeInHour'] = 600
# global_data['config']['RagFair']['isOnlyFoundInRaidAllowed'] = False

# larger money stack size
for money in money_list:
    item_data[money]['_props']['StackMaxSize'] = 999999

# max money in raid
global_data['config']['RestrictionsInRaid'][0]['MaxInLobby'] = 999999
global_data['config']['RestrictionsInRaid'][0]['MaxInRaid'] = 999999

global_data['config']['RestrictionsInRaid'][1]['MaxInLobby'] = 999999
global_data['config']['RestrictionsInRaid'][1]['MaxInRaid'] = 999999

global_data['config']['RestrictionsInRaid'][2]['MaxInLobby'] = 999999
global_data['config']['RestrictionsInRaid'][2]['MaxInRaid'] = 999999

# # expand bags
# for bags in bag_keys:
#     item_data[bags]['_props']['Grids'][0]['_props']['cellsH'] += 2
#     item_data[bags]['_props']['Grids'][0]['_props']['cellsV'] += 2

# # expand secure containers
# for container in container_list:
#     item_data[container]['_props']['Grids'][0]['_props']['cellsH'] += 2
#     item_data[container]['_props']['Grids'][0]['_props']['cellsV'] += 2
    
#     item_data[container]['_props']['Grids'][0]['_props']['filters'] = []

# # expand cases
# # make all cases 2x2 larger and remove item filter
# for case in case_keys:
#     item_data[case]['_props']['Grids'][0]['_props']['cellsH'] += 2
#     item_data[case]['_props']['Grids'][0]['_props']['cellsV'] += 2
    
#     item_data[case]['_props']['Grids'][0]['_props']['filters'] = []

# manually set the keytool to be 6x6
# item_data[key_tool_id]['_props']['Grids'][0]['_props']['cellsH'] = 6
# item_data[key_tool_id]['_props']['Grids'][0]['_props']['cellsV'] = 6

# set all keys to unlimited uses
for key in key_keys:
    item_data[key]['_props']['MaximumNumberOfUsage'] = 0

blacklist_keys = ["59136f6f86f774447a1ed173", #Folding car key
                  "5a0f045e86f7745b0f0d0e42", #Gas station safe key
                  "5a0ea69f86f7741cd5406619", #Health Resort east wing office room 108 key
                  "5a0ee72c86f77436955d3435", #Health Resort east wing room 213 key
                  "5a0ee76686f7743698200d5c", #Health Resort east wing room 216 key
                  "5a0eedb386f77403506300be", #Health Resort east wing room 322 key
                  "5a0ec70e86f7742c0b518fba", #Health Resort west wing room 207 key
                  "5a0eeb1a86f774688b70aa5c", #Health Resort west wing room 303 key
                  "5a0eeb8e86f77461257ed71a", #Health Resort west wing room 309 key
                  "5a13ee1986f774794d4c14cd", #Health Resort west wing room 323 key
                  "5a0eebed86f77461230ddb3d", #Health Resort west wing room 325 key
                  "63a39f18c2d53c2c6839c1d3", #Pinewood hotel room 206 key
                  "6391fcf5744e45201147080f", #Primorsky Ave apartment key
                  "5d80cb8786f774405611c7d9", #RB-PP key
                  "5a0f006986f7741ffd2fe484"] #Weather station safe key


# blacklist/mark all useless keys
for key in blacklist_keys:
    item_data[key]['_props']['BackgroundColor'] = 'red'

# TODO
# !!!current code doesnt work!!!
# examples found in RaiRaiTheRaichu-UselessKeyBlacklist-1.2.1 mod
# # remove keys from bots spawn
# for bot in bot_type_list:
#     keys_to_delete = []
#     bot_data = load_json(bot_types_path+bot)
#     #print(bot_data['inventory']['items']['Pockets'])
#     for loot in bot_data['inventory']['items']['Pockets']:
#         if loot in blacklist_keys:
#             print("found")
#             keys_to_delete.append((bot, loot))
    
#     for bot, loot in keys_to_delete:
#         del bot_data['inventory']['items']['Pockets'][loot]


# keys_to_delete = []

# for bot in bot_type_list:
#     bot_data = load_json(bot_types_path + bot)
#     for loot in bot_data['inventory']['items']['Pockets']:
#         if loot in blacklist_keys:
#             keys_to_delete.append((bot, loot))

# # Delete the keys outside the loop
# for bot, loot in keys_to_delete:
#     del load_json(bot_types_path + bot)['inventory']['items']['Pockets'][loot]

            
    # :
    #     print(bot_data['health']['BodyParts'][0][bodyParts]['min'])
    #     bot_data['health']['BodyParts'][0][bodyParts]['min'] *= bot_health_mod_multi
    #     bot_data['health']['BodyParts'][0][bodyParts]['max'] *= bot_health_mod_multi 
    
    # save_json(bot_data, bot_types_path+bot)  

# add extra items that can be stored in the sicc pouch
sicc_item_list = ['573474f924597738002c6174', '5734758f24597738025ee253',
                  '62a09cfe4f842e1bd12da3e4', '59faf7ca86f7740dbe19f6c2',
                  '62a09cb7a04c0c5c6e0a84f8', '590c651286f7741e566b6461',
                  '62a091170b9d3c46de5b6cf2', '5bc9bdb8d4351e003562b8a1']

item_data['5d235bb686f77443f4331278']['_props']['Grids'][0]['_props']['filters'][0]['Filter'].extend(sicc_item_list)

###
# stamina/inertia changes
###

# shouldn't need adjusting due to changes to all item weight
# global_data['config']['Stamina']['BaseOverweightLimits']['x']
# global_data['config']['Stamina']['BaseOverweightLimits']['y']
# global_data['config']['Stamina']['BaseOverweightLimits']['z']

# stamina changes
# default {'x': 0.17, 'y': 0.7, 'z': 0}
global_data['config']['Stamina']['CrouchConsumption']['x'] = 0.0
global_data['config']['Stamina']['CrouchConsumption']['y'] = 0.0

global_data['config']['Stamina']['JumpConsumption'] = 7

if global_data['config']['Stamina']['FallDamageMultiplier'] > 3: 
    global_data['config']['Stamina']['FallDamageMultiplier'] *= 0.25

# default {'x': -3, 'y': -2, 'z': 0}
global_data['config']['Stamina']['OverweightConsumptionByPose']['x'] = 0
global_data['config']['Stamina']['OverweightConsumptionByPose']['y'] = 0

global_data['config']['Stamina']['ProneConsumption'] = 0

if global_data['config']['Stamina']['SprintDrainRate'] > 3:
    global_data['config']['Stamina']['SprintDrainRate'] *= 0.5
    global_data['config']['Stamina']['SprintOverweightLimits']['x'] *= 1.25
    global_data['config']['Stamina']['SprintOverweightLimits']['y'] *= 1.25

global_data['config']['Stamina']['SitToStandConsumption'] = 0
global_data['config']['Stamina']['StandupConsumption']['x'] = 0
global_data['config']['Stamina']['StandupConsumption']['y'] = 0

# inertia changes
inertia_multi = 0.6

# 'SideTime': {'x': 2, 'y': 1, 'z': 0}
global_data['config']['Inertia']['SideTime']['x'] = 0.0
global_data['config']['Inertia']['SideTime']['y'] = 0.0

# default "x": 0.1, "y": 0.45
global_data['config']['Inertia']['MoveTimeRange']['x'] = 0
global_data['config']['Inertia']['MoveTimeRange']['y'] = 0

# default 0.15
global_data['config']['Inertia']['MinDirectionBlendTime'] *= inertia_multi

# default "x": 0.05, "y": 0.4675
if global_data['config']['Inertia']['WalkInertia']['x'] == 0.05:
    global_data['config']['Inertia']['WalkInertia']['x'] *= inertia_multi
    global_data['config']['Inertia']['WalkInertia']['y'] *= inertia_multi
    
    # 0.3
    global_data['config']['Inertia']['BaseJumpPenalty'] *= inertia_multi
    
    # 0.4
    global_data['config']['Inertia']['BaseJumpPenaltyDuration'] *= inertia_multi
    
    # 'x': 4
    global_data['config']['Inertia']['SpeedLimitAfterFallMax']['x'] *= inertia_multi
    
    # default  {'x': 0, 'y': 55, 'z': 0}
    global_data['config']['Inertia']['SprintBrakeInertia']['y'] *= inertia_multi

# tilt is inverted where a larger number is faster/less inertia effect
# 'x': 0.6, 'y': 0.5
if global_data['config']['Inertia']['TiltInertiaMaxSpeed']['x'] == 0.6:
    global_data['config']['Inertia']['TiltInertiaMaxSpeed']['x'] *= 1.3
    global_data['config']['Inertia']['TiltInertiaMaxSpeed']['y'] *= 1.3
    
    # 'x': 1.2, 'y': 0.8
    global_data['config']['Inertia']['TiltMaxSideBackSpeed']['x'] *= 1.3
    global_data['config']['Inertia']['TiltMaxSideBackSpeed']['y'] *= 1.3
    
    # 'x': 0.8, 'y': 0.5
    global_data['config']['Inertia']['TiltStartSideBackSpeed']['x'] *= 1.3
    global_data['config']['Inertia']['TiltStartSideBackSpeed']['y'] *= 1.3

# {'x': 0, 'y': 65, 'z': 0.5}
# global_data['config']['Inertia']['InertiaLimits']['y'] = 65
# global_data['config']['Inertia']['InertiaLimits']['z'] = 0.5

#######
# XP changes
#######
# global_data['config']['WeaponSkillProgressRate'] = 3
# global_data['config']['SkillsSettings']['WeaponSkillProgressRate'] = 3

# xp for door breach/unlock
global_data['config']['exp']['expForLockedDoorBreach'] = 100
global_data['config']['exp']['expForLockedDoorOpen'] = 100

# I think this increases loot exp on subsequent items, no idea
global_data['config']['exp']['loot_attempts'][1] = {'k_exp': 0.5}
global_data['config']['exp']['loot_attempts'][2] = {'k_exp': 0.5}

# increase xp for a headshot kill
global_data['config']['exp']['kill']['pmcHeadShotMult'] = 3

# reduce distance needed to be considered a longshot
global_data['config']['exp']['kill']['longShotDistance'] = 50

# increase xp at the end of match for different outcomes
# lower requirements for survived status to 10 xp or 60 seconds
global_data['config']['exp']['match_end']['killedMult'] = 3

global_data['config']['exp']['match_end']['miaMult'] = 3
global_data['config']['exp']['match_end']['mia_exp_reward'] = 300

global_data['config']['exp']['match_end']['runnerMult'] = 3
global_data['config']['exp']['match_end']['runner_exp_reward'] = 300

global_data['config']['exp']['match_end']['survivedMult'] = 5
global_data['config']['exp']['match_end']['survived_exp_requirement'] = 10
global_data['config']['exp']['match_end']['survived_exp_reward'] = 600
global_data['config']['exp']['match_end']['survived_seconds_requirement'] = 60

# # modify skill progression
# global_data['config']['SkillMinEffectiveness'] = 0.001
# global_data['config']['SkillPointsBeforeFatigue'] = 10

# # Aim drills
# global_data['config']['SkillsSettings']['AimDrills']['WeaponShotAction'] = 0.6

# # Assault
# global_data['config']['SkillsSettings']['Assault']['WeaponChamberAction'] = 0.25
# global_data['config']['SkillsSettings']['Assault']['WeaponFixAction'] = 0.25
# global_data['config']['SkillsSettings']['Assault']['WeaponReloadAction'] = 0.25
# global_data['config']['SkillsSettings']['Assault']['WeaponShotAction'] = 0.25

# # Attention
# global_data['config']['SkillsSettings']['Attention']['DependentSkillRatios'][0]['Ratio'] = 0.0001
# global_data['config']['SkillsSettings']['Attention']['FindActionFalse'] = 0.6
# global_data['config']['SkillsSettings']['Attention']['FindActionTrue'] = 0.3

# # Charisma
# global_data['config']['SkillsSettings']['Charisma']['BonusSettings']['EliteBonusSettings']['RepeatableQuestExtraCount'] = 3
# global_data['config']['SkillsSettings']['Charisma']['BonusSettings']['EliteBonusSettings']['ScavCaseDiscount'] = 0.25
# global_data['config']['SkillsSettings']['Charisma']['BonusSettings']['LevelBonusSettings']['InsuranceDiscount'] = 0.01
# global_data['config']['SkillsSettings']['Charisma']['BonusSettings']['LevelBonusSettings']['InsuranceTraderDiscount'] = 0.01
# global_data['config']['SkillsSettings']['Charisma']['BonusSettings']['LevelBonusSettings']['PaidExitDiscount'] = 0.01
# global_data['config']['SkillsSettings']['Charisma']['BonusSettings']['LevelBonusSettings']['RepeatableQuestChangeDiscount'] = 0.01
# global_data['config']['SkillsSettings']['Charisma']['SkillProgressAtn'] = 1
# global_data['config']['SkillsSettings']['Charisma']['SkillProgressInt'] = 1
# global_data['config']['SkillsSettings']['Charisma']['SkillProgressPer'] = 1

# # Covert Movement
# global_data['config']['SkillsSettings']['CovertMovement']['MovementAction'] = 0.075 

# # Crafting
# global_data['config']['SkillsSettings']['Crafting']['CraftTimeReductionPerLevel'] = 1.5
# global_data['config']['SkillsSettings']['Crafting']['CraftingCycleHours'] = 4
# global_data['config']['SkillsSettings']['Crafting']['CraftingPointsToInteligence'] = 5
# global_data['config']['SkillsSettings']['Crafting']['EliteExtraProductions'] = 3
# global_data['config']['SkillsSettings']['Crafting']['PointsPerCraftingCycle'] = 10
# global_data['config']['SkillsSettings']['Crafting']['PointsPerUniqueCraftCycle'] = 10
# global_data['config']['SkillsSettings']['Crafting']['ProductionTimeReductionPerLevel'] = 2
# # unsure what this means, 1 is default
# # global_data['config']['SkillsSettings']['Crafting']['UniqueCraftsPerCycle'] = 1

# # Endurance
# global_data['config']['SkillsSettings']['Endurance']['DependentSkillRatios'][0]['Ratio'] = 0.01
# global_data['config']['SkillsSettings']['Endurance']['GainPerFatigueStack'] = 0.1
# global_data['config']['SkillsSettings']['Endurance']['MovementAction'] = 0.01
# global_data['config']['SkillsSettings']['Endurance']['QTELevelMultipliers'] = {'10': {'Multiplier': 3},
#                                                                                '20': {'Multiplier': 2},
#                                                                                '30': {'Multiplier': 1}}
# global_data['config']['SkillsSettings']['Endurance']['SprintAction'] = 0.1

# # Health
# global_data['config']['SkillsSettings']['Health']['SkillProgress'] = 1.25

# TODO
# finish the rest of the skills

#######
# repair durability costs
#######
global_data['config']['RepairSettings']['durabilityPointCostArmor'] = 0.01
global_data['config']['RepairSettings']['durabilityPointdurabilityPointCostGunsCostArmor'] = 0.01

# increase repair kit max duability and reduce durability loss on items
for key in repair_key_ids:
    item_data[key]['MaxRepairResource'] = 10000
    item_data[key]['RepairQuality'] = 0

for material in global_data['config']['ArmorMaterials']:
    global_data['config']['ArmorMaterials'][material]['MinRepairDegradation'] = 0.001
    global_data['config']['ArmorMaterials'][material]['MinRepairKitDegradation'] = 0.001
    global_data['config']['ArmorMaterials'][material]['MaxRepairDegradation'] = 0.001
    global_data['config']['ArmorMaterials'][material]['MaxRepairKitDegradation'] = 0.001

#######
# health items mods
#######
def mod_med_item(item_id, max_uses, hp_recovery_rate, stim_buff=''):
    item_data[item_id]['_props']['MaxHpResource'] = max_uses
    item_data[item_id]['_props']['hpResourceRate'] = hp_recovery_rate
    item_data[item_id]['_props']['StimulatorBuffs'] = stim_buff

# car, Salewa, grizzly, AI-2, IFAK, AFAK, sanitar ifak
# mod_med_item(med_kit_ids[0], 30, 0, 'BuffsCarKit')
# mod_med_item(med_kit_ids[1], 50, 0, 'BuffsSalewa')
# mod_med_item(med_kit_ids[2], 100, 0, 'BuffsGrizzly')
mod_med_item(med_kit_ids[3], 500, 125)
mod_med_item(med_kit_ids[4], 1250, 175)
mod_med_item(med_kit_ids[5], 2000, 225)
mod_med_item(med_kit_ids[6], 2000, 225)

# item_data[med_kit_ids[3]]['_props']

# def add_med_buff(buff_name, duration, heal_amt):
#     global_data['config']['Health']['Effects']['Stimulator']['Buffs'][buff_name] = [{
#                                                                                         "AbsoluteValue": "true",
#                                                                                         "BuffType": "HealthRate",
#                                                                                         "Chance": 1,
#                                                                                         "Delay": 1,
#                                                                                         "Duration": duration,
#                                                                                         "SkillName": "",
#                                                                                         "Value": heal_amt
#                                                                                     }] 

# add_med_buff('BuffsCarKit', 300, 5)
# add_med_buff('BuffsSalewa', 300, 10)
# add_med_buff('BuffsGrizzly', 600, 20)
if item_data['5751a25924597722c463c472']['_props']['MaxHpResource'] == 2:
    for med in other_med_ids:
        item_data[med]['_props']['MaxHpResource'] *= 3

###
# ammo adjusts
###
# distinct_ammo = []
# for key in ammo_keys:
#     distinct_ammo.append(item_data[key]['_props']['StackMaxSize'])

# distinct_ammo = set(distinct_ammo)

for key in ammo_keys:
    # set all ammo max stack to 600
    item_data[key]['_props']['StackMaxSize'] = 600
    
    # # set max ammo stack by ammo type
    # if item_data[key]['_props']['StackMaxSize'] in [15, 20]:
    #     item_data[key]['_props']['StackMaxSize'] = 100
    # if item_data[key]['_props']['StackMaxSize'] in [30, 40, 50, 70]:
    #     item_data[key]['_props']['StackMaxSize'] = 300

# Adjust weight of all items
# check against tank battery
weight_modifier = 0.65
if item_data['5d03794386f77420415576f5']['_props']['Weight'] > 40:
    for key in all_keys:
        try:
            item_data[key]['_props']['Weight'] *= weight_modifier
        except:
            pass
####
# buy/sell all items on flea
# make all items be discardable without deleting the item during raid
####
# for item in item_data:
#     item_data[item]['_props']['CanSellOnRagfair'] = True
#     item_data[item]['_props']['CanRequireOnRagfair'] = True
#     item_data[item]['_props']['DiscardLimit'] = -1

# ragfair_data['sell']['simulatedSellHours'] = 1
# ragfair_data['sell']['chance']['base'] = 100
# ragfair_data['sell']['chance']['overpriced'] = 10
# ragfair_data['sell']['chance']['underpriced'] = 10
# ragfair_data['sell']['time']['base'] = 0.1
# ragfair_data['sell']['time']['max'] = 0.1

# # disable packs of items which messes up average price display in flea
# ragfair_data['dynamic']['pack']['enable'] = False

# ragfair_data['dynamic']['purchasesAreFoundInRaid'] = True
# ragfair_data['dynamic']['blacklist']['enableBsgList'] = False
# ragfair_data['dynamic']['offerAdjustment']['adjustPriceWhenBelowHandbookPrice'] = True
# ragfair_data['dynamic']['offerAdjustment']['maxPriceDifferenceBelowHandbookPercent'] = 0.01
# ragfair_data['dynamic']['offerAdjustment']['handbookPriceMultipier'] = 5
# ragfair_data['dynamic']['offerAdjustment']['priceThreshholdRub'] = 999999

# ####
# # hideout
# ####
# # smaller is better
# # 'generatorFuelFlowRate': 0.001319444444444,
# # 'airFilterUnitFlowRate': 0.004722222222222,
# # larger is better
# # 'gpuBoostRate': 0.041225
# hideout_settings_data['generatorFuelFlowRate'] = 0.00065972
# hideout_settings_data['airFilterUnitFlowRate'] = 0.002361
# hideout_settings_data['gpuBoostRate'] = 0.041225

# set construction of any hideout areas to 1
# iterate through areas looking for bitcoin farm id 5d494a445b56502f18c98a10
# iterate through stages of the farm looking for bonus attributes with
# a filter for the graphics card id 57347ca924597744596b4e71
# multiply the bonus by 10
for area in hideout_areas_data:
    if area['_id'] == '5d494a445b56502f18c98a10':
        for key in area['stages'].keys():
            if area['stages'][key]['bonuses']:
                if area['stages'][key]['bonuses'][0]['filter'][0] == '57347ca924597744596b4e71':
                    area['stages'][key]['bonuses'][0]['value'] += 10   
    for key in area['stages'].keys():
        area['stages'][key]['constructionTime'] = 1

# # set production of all items to 1 
# for items in hideout_production_data:
#     items['productionTime'] = 1

# # set workout speed and success range to the same values for each stage    
# for workout in range(0, len(hideout_workout_data[0]['quickTimeEvents'])):
#     hideout_workout_data[0]['quickTimeEvents'][workout]['successRange'] = {'x': 0.50, 'y': 0.15}
#     hideout_workout_data[0]['quickTimeEvents'][workout]['speed'] = 2

# # set all scav case runs to 30 min
# # add 1 extra min and max products for common, rare and super rare
# # values stored as a string in the json so conversion between types was needed
# for scav in range(0, len(hideout_scav_case_data)):
#     hideout_scav_case_data[scav]['ProductionTime'] = 1800
#     for product in hideout_scav_case_data[scav]['EndProducts']:
#         min_value = int(hideout_scav_case_data[scav]['EndProducts'][product]['min'])
#         min_value += 1
        
#         max_value = int(hideout_scav_case_data[scav]['EndProducts'][product]['max'])
#         max_value += 1
        
#         hideout_scav_case_data[scav]['EndProducts'][product]['min'] = str(min_value)
#         hideout_scav_case_data[scav]['EndProducts'][product]['max'] = str(max_value)

# ####
# # insurance changes
# ####
# insurance_data['insuranceMultiplier'][prapor_id] = 0.15
# insurance_data['insuranceMultiplier'][therapist_id] = 0.15

# insurance_data['returnChancePercent'][prapor_id] = 75
# insurance_data['returnChancePercent'][therapist_id] = 75
# insurance_data['runIntervalSeconds'] = 60

# # gather all trader folders
# trader_list = os.listdir(trader_path)
# trader_list.remove('ragfair')

# # iterate through the traders change their nameds
# # try setting their repair quality to 1, instant insurance return time and 
# # longer equipment storage. convert all avatars to .png as some are .jpg
# for trader in trader_list:
#     trader_data = load_json(trader_path+'/'+trader+'/'+base_file_name)
    
#     # Mechanic
#     if trader_data['_id'] == '5a7c2eca46aef81a7ca2145d':
#        trader_data['nickname'] = 'Green Top'
    
#     # Ragman
#     if trader_data['_id'] == '5ac3b934156ae10c4430e83c':
#        trader_data['nickname'] = 'Quiet'
       
#     # Jager
#     if trader_data['_id'] == '5c0647fdd443bc2504c2d371':
#        trader_data['nickname'] = 'Cock Squat'
       
#     # Prapor
#     if trader_data['_id'] == '54cb50c76803fa8b248b4571':
#        trader_data['nickname'] = 'Red Yoga'
    
#     # Therapist
#     if trader_data['_id'] == '54cb57776803fa99248b456e':
#        trader_data['nickname'] = 'Nurse'
       
#     # Skier
#     if trader_data['_id'] == '579dc571d53a0658a154fbec':
#        trader_data['nickname'] = 'Green Pastures'
       
#     # Peacekeeper
#     if trader_data['_id'] == '638f541a29ffd1183d187f57':
#        trader_data['nickname'] = 'Sexy Blue'
       
#     # Fence
#     if trader_data['_id'] == '5935c25fb3acc3127c3d8cd9':
#        trader_data['nickname'] = 'Grey Tats'
       
#     # Lightkeeper
#     if trader_data['_id'] == '58330581ace78e27b8b10cee':
#        trader_data['nickname'] = 'Caged Grey'
       
#     trader_data['avatar'] = trader_data['avatar'][:-3] + 'png'
#     try:
#         # 0 quality makes the reapir take no max durability, smaller is better
#         trader_data['repair']['quality'] = 0
#         trader_data['insurance']['min_return_hour'] = 0
#         trader_data['insurance']['max_return_hour'] = 0
#         trader_data['insurance']['max_storage_time'] = 6000
#     except:
#         pass

#     save_json(trader_data, trader_path +'/'+ trader +'/'+ base_file_name)

# locales_data.update({'54cb50c76803fa8b248b4571 Nickname': 'Red Yoga'})
# locales_data.get('54cb50c76803fa8b248b4571 Nickname')

# # grab all key and values from the locales json
# key_list = list(locales_data.keys())
# value_list = list(locales_data.values())
# new_value_list = []

# # find and replace all values related to the trader name
# for word in value_list:
#     new_value_list.append(word.replace('Mechanic', 'Green Top').replace('Ragman', 'Nurse')
#                     .replace('Jager', 'Cock Squat').replace('Prapor', 'Red Yoga')
#                     .replace('Therapist', 'Nurse').replace('Skier', 'Green Pastures')
#                     .replace('Peacekeeper', 'Sexy Blue').replace('Lightkeeper', 'Caged Grey')
#                     .replace('Fence', 'Grey Tats'))

# # build a new dict with the changed data
# locales_data = {}
# for key in key_list:
#     for value in new_value_list:
#         locales_data[key] = value
#         new_value_list.remove(value)
#         break

# prapor_base_data['insurance']['min_return_hour'] = 0
# prapor_base_data['insurance']['max_return_hour'] = 0
# prapor_base_data['insurance']['max_storage_time'] = 6000
# therapist_base_data['insurance']['min_return_hour'] = 0
# therapist_base_data['insurance']['max_return_hour'] = 0
# therapist_base_data['insurance']['max_storage_time'] = 6000

#global_data['config']['Insurance']['MaxStorageTimeInHour'] = 600

####
# bot name changes
####

bear_name_list = ["15NUNDR","1STLINE","1V1IRL","2RETSGUY","360NSCP","5FNGRS",
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
                  "WIZZBNG","WOOLLEG"]

usec_name_list = ["12YoSoaking","2Dudes1Butt","2DudesCuddling","2DudesSoaking",
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
                  "hookemdano","KenyanBreastmilk","TransgenderApe","bostonshotgun"]

bear_data['firstName'] = bear_name_list
usec_data['firstName'] = usec_name_list

# weap/armor durability for all non-pmc bots
for bot in bot_data['durability']:
    if bot_data['durability'][bot] != 'pmc':
        # set armor values
        bot_data['durability'][bot]['armor']['maxDelta'] = 10
        
        # set weapon values
        bot_data['durability'][bot]['weapon']['lowestMax'] = 80
        bot_data['durability'][bot]['weapon']['minDelta'] = 0
        bot_data['durability'][bot]['weapon']['maxDelta'] = 20
        
global_data['config']['Malfunction']['AllowMalfForBots'] = True

########
# map changes
########
map_list = os.listdir(map_path)
remove_list = ['develop','hideout','privatearea','suburbs','terminal',
               'town','base.json']

for items in remove_list:
    map_list.remove(items)

for map_name in map_list:
    full_path = map_path + map_name + '/' + base_file_name
    map_data = load_json(full_path)
    
    if map_data['EscapeTimeLimit'] < 120:
        map_data['EscapeTimeLimit'] = 120
        #map_data['MinDistToExitPoint'] = 1
        #map_data['MinDistToFreePoint'] = 1
        map_data['BotStop'] *= 2
        map_data['GlobalContainerChanceModifier'] *= 1.5
        map_data['GlobalLootChanceModifier'] *= 1.5
    
    # # create a list of all spawn points that either pmc or all players can spawn at
    # spawn_list = []
    # for spawn in range(0, len(map_data['SpawnPointParams'])):
    #     if map_data['SpawnPointParams'][spawn]['Sides'][0] in ['Pmc', 'All']:
    #         spawn_list.append(map_data['SpawnPointParams'][spawn]['Infiltration'])
    
    # # turn the list into a set to keep only unique values
    # spawn_list = set(spawn_list)
    
    # # convert it into a comma seperated string
    # spawn_string = ''
    
    # for spawn in spawn_list:
    #     spawn_string += spawn+','
    
    # # remove the extra comma at the end of the last location
    # spawn_string = spawn_string[0:-1]
    
    # # set chance of exit to 100 and append all spawn locations as valid
    # # starting points for that exit to appear
    # for exits in range(0,len(map_data['exits'])):
    #     map_data['exits'][exits]['Chance'] = 100
    #     map_data['exits'][exits]['EntryPoints'] = spawn_string
        
    save_json(map_data, full_path)

# loot modifiers
if location_data['looseLootMultiplier']['bigmap'] < 4:
    for location in location_data['looseLootMultiplier']:
        location_data['looseLootMultiplier'][location] *= 1.5
        location_data['staticLootMultiplier'][location] *= 1.5


# global loot modifier
if global_data['config']['GlobalLootChanceModifier'] < 0.3:
    global_data['config']['GlobalLootChanceModifier'] *= 1.5

# lower boss spawn rate to 15% where it was greater than 15% before
for location in location_data['customWaves']['boss']:
    for spawn in range(0, len(location_data['customWaves']['boss'][location])):
        if location_data['customWaves']['boss'][location][spawn]['BossChance'] > 15:
            location_data['customWaves']['boss'][location][spawn]['BossChance'] = 15

# remove requirements to drop armor, have red rebel and paracord on reserve cliff exit
global_data['config']['RequirementReferences']['Alpinist'] = []

# [{'Count': 1,
#   'Id': '5c12688486f77426843c7d32',
#   'RequiredSlot': 'FirstPrimaryWeapon',
#   'Requirement': 'HasItem',
#   'RequirementTip': 'EXFIL_NEED_ITEM {0}'},
#  {'Count': 1,
#   'Id': '5c0126f40db834002a125382',
#   'RequiredSlot': 'FirstPrimaryWeapon',
#   'Requirement': 'HasItem',
#   'RequirementTip': 'EXFIL_NEED_ITEM {0}'},
#  {'Count': 0,
#   'Id': '',
#   'RequiredSlot': 'ArmorVest',
#   'Requirement': 'Empty',
#   'RequirementTip': 'EXFIL_ARMOR_TIP'}]

###
# quest changes
###
# quest with availableAfter time for testing
#quest_data['625d6ffaf7308432be1d44c5']['conditions']['AvailableForStart'][0]

# remove wait time until quest can be started
for quest in quest_data:
    for start in quest_data[quest]['conditions']['AvailableForStart']:
        try:
            if start['availableAfter'] > 0 and start['conditionType'] == 'Quest':
                start['availableAfter'] = 0
        except:
            pass

# 8 hour daily quests
quest_config_data['repeatableQuests'][0]['resetTime'] = 28880
quest_config_data['repeatableQuests'][0]['numQuests'] = 4
#quest_config_data['repeatableQuests'][0]['rewardScaling']['levels'] = [1, 10, 20, 30]
quest_config_data['repeatableQuests'][0]['rewardScaling']['experience'] = [2000, 4000, 8000, 16000, 24000, 36000, 54000]
quest_config_data['repeatableQuests'][0]['rewardScaling']['roubles'] = [11000, 20000, 32000, 48000, 72000, 108000, 162000]
quest_config_data['repeatableQuests'][0]['rewardScaling']['items'] = [2, 3, 4, 5, 7, 7, 8]
quest_config_data['repeatableQuests'][0]['rewardScaling']['reputation'] = [0.01, 0.01, 0.02, 0.02, 0.03, 0.04, 0.05]
quest_config_data['repeatableQuests'][0]['rewardScaling']['rewardSpread'] = 0.1
quest_config_data['repeatableQuests'][0]['rewardScaling']['skillRewardChance'] = [0.01, 0.03, 0.05, 0.10, 0.15, 0.20, 0.25]
quest_config_data['repeatableQuests'][0]['rewardScaling']['skillPointReward'] = [10, 15, 20, 30, 50, 60, 75]

# set peacekeeper to 30% and mechanic to 35% weap reward, turn jaeger weap reward on at 20%
quest_config_data['repeatableQuests'][0]['traderWhitelist'][3]['weaponRewardChancePercent'] = 30
quest_config_data['repeatableQuests'][0]['traderWhitelist'][4]['weaponRewardChancePercent'] = 35
quest_config_data['repeatableQuests'][0]['traderWhitelist'][-1]['rewardCanBeWeapon'] = True
quest_config_data['repeatableQuests'][0]['traderWhitelist'][-1]['weaponRewardChancePercent'] = 20

# set exploration and completion tasks
quest_config_data['repeatableQuests'][0]['questConfig']['Exploration']['maxExtracts'] = 2
quest_config_data['repeatableQuests'][0]['questConfig']['Exploration']['specificExits']['probability'] = 0
quest_config_data['repeatableQuests'][0]['questConfig']['Completion']['maxRequestedAmount'] = 3
quest_config_data['repeatableQuests'][0]['questConfig']['Completion']['minRequestedBulletAmount'] = 1
quest_config_data['repeatableQuests'][0]['questConfig']['Completion']['maxRequestedBulletAmount'] = 1

# set elimination tasks for level range 1-15 and 16-100, set 3rd range out of scope
#quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][0]['levelRange']['max'] = 15
quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][0]['bodyPartProb'] = 0
quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][0]['specificLocationProb'] = 0
quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][0]['distProb'] = 0
quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][0]['minKills'] = 1
quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][0]['weaponCategoryRequirementProb'] = 0

quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][1]['levelRange']['max'] = 100
quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][1]['bodyPartProb'] = 0
quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][1]['specificLocationProb'] = 0
quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][1]['distProb'] = 0
quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][1]['minKills'] = 2
quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][1]['maxKills'] = 6
quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][1]['weaponCategoryRequirementProb'] = 0

quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][2]['levelRange']['min'] = 999
quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][2]['levelRange']['max'] = 999

# set all boss probabilities to 0
for key in range(2, 9):
    quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][1]['targets'][key]['relativeProbability'] = 0

# 3 day weekly quests
quest_config_data['repeatableQuests'][1]['resetTime'] = 259200
quest_config_data['repeatableQuests'][1]['numQuests'] = 2
#quest_config_data['repeatableQuests'][1]['rewardScaling']['levels'] = [1, 10, 20, 30]
quest_config_data['repeatableQuests'][1]['rewardScaling']['experience'] = [5000, 15000, 30000, 80000, 142000, 220000, 330000]
quest_config_data['repeatableQuests'][1]['rewardScaling']['roubles'] = [20000, 50000, 175000, 350000, 540000, 810000, 1215000 ]
quest_config_data['repeatableQuests'][1]['rewardScaling']['items'] = [4, 5, 6, 6, 7, 8, 9]
quest_config_data['repeatableQuests'][1]['rewardScaling']['reputation'] = [0.02, 0.03, 0.04, 0.05, 0.06, 0.06, 0.07]
quest_config_data['repeatableQuests'][1]['rewardScaling']['rewardSpread'] = 0.1
quest_config_data['repeatableQuests'][1]['rewardScaling']['skillRewardChance'] = [0.02, 0.07, 0.12, 0.17, 0.22, 0.25, 0.3]
quest_config_data['repeatableQuests'][1]['rewardScaling']['skillPointReward'] = [30, 40, 50, 60, 65, 70, 75, 80]

# set peacekeeper to 35% and mechanic to 40% weap reward, turn jaeger weap reward on at 25%
quest_config_data['repeatableQuests'][1]['traderWhitelist'][3]['weaponRewardChancePercent'] = 35
quest_config_data['repeatableQuests'][1]['traderWhitelist'][4]['weaponRewardChancePercent'] = 40
quest_config_data['repeatableQuests'][0]['traderWhitelist'][-1]['rewardCanBeWeapon'] = True
quest_config_data['repeatableQuests'][0]['traderWhitelist'][-1]['weaponRewardChancePercent'] = 25

# set exploration and completion tasks
quest_config_data['repeatableQuests'][1]['questConfig']['Exploration']['maxExtracts'] = 4
quest_config_data['repeatableQuests'][1]['questConfig']['Exploration']['specificExits']['probability'] = 0
quest_config_data['repeatableQuests'][1]['questConfig']['Completion']['maxRequestedAmount'] = 5
quest_config_data['repeatableQuests'][1]['questConfig']['Completion']['minRequestedBulletAmount'] = 1
quest_config_data['repeatableQuests'][1]['questConfig']['Completion']['maxRequestedBulletAmount'] = 1

# set elimination tasks for level range 1-15 and 16-100, set 3rd range out of scope
#quest_config_data['repeatableQuests'][1]['questConfig']['Elimination'][0]['levelRange']['max'] = 15
quest_config_data['repeatableQuests'][1]['questConfig']['Elimination'][0]['bodyPartProb'] = 0
quest_config_data['repeatableQuests'][1]['questConfig']['Elimination'][0]['specificLocationProb'] = 0
quest_config_data['repeatableQuests'][1]['questConfig']['Elimination'][0]['distProb'] = 0
quest_config_data['repeatableQuests'][1]['questConfig']['Elimination'][0]['minKills'] = 5
quest_config_data['repeatableQuests'][1]['questConfig']['Elimination'][0]['weaponCategoryRequirementProb'] = 0

quest_config_data['repeatableQuests'][0]['questConfig']['Elimination'][1]['levelRange']['max'] = 100
quest_config_data['repeatableQuests'][1]['questConfig']['Elimination'][1]['bodyPartProb'] = 0
quest_config_data['repeatableQuests'][1]['questConfig']['Elimination'][1]['specificLocationProb'] = 0
quest_config_data['repeatableQuests'][1]['questConfig']['Elimination'][1]['distProb'] = 0
quest_config_data['repeatableQuests'][1]['questConfig']['Elimination'][1]['minKills'] = 5
quest_config_data['repeatableQuests'][1]['questConfig']['Elimination'][1]['maxKills'] = 10
quest_config_data['repeatableQuests'][1]['questConfig']['Elimination'][1]['weaponCategoryRequirementProb'] = 0

quest_config_data['repeatableQuests'][1]['questConfig']['Elimination'][2]['levelRange']['min'] = 999
quest_config_data['repeatableQuests'][1]['questConfig']['Elimination'][2]['levelRange']['max'] = 999

# set all boss probabilities for daily/weekly quests to 0
for key in range(2, 9):
    quest_config_data['repeatableQuests'][1]['questConfig']['Elimination'][1]['targets'][key]['relativeProbability'] = 0

# # therapist barters
# for trade in therapist_assort_data['barter_scheme']:
#     for item in therapist_assort_data['barter_scheme'][trade]:
#         for subitem in item:
#             # LedX for Thicc Case
#             if subitem['_tpl'] == '5c0530ee86f774697952d952':
#                 subitem['count'] = 5
#             # Moonshine for Thicc Case
#             if subitem['_tpl'] == '5d1b376e86f774252519444e':
#                 subitem['count'] = 10
#             # Euro for Itemcase
#             if subitem['_tpl'] == '569668774bdc2da2298b4568':
#                 subitem['count'] = 7256
#             # Ophthalmoscope for Itemcase
#             if subitem['_tpl'] == '5af0534a86f7743b6f354284':
#                 subitem['count'] = 8    
#             # Dogtags for Itemcase
#             if subitem['_tpl'] == '59f32c3b86f77472a31742f0' and subitem['count'] == 80:
#                 subitem['count'] = 20
#             # Dogtags for Scav Junk Box
#             if subitem['_tpl'] == '59f32c3b86f77472a31742f0' and subitem['count'] == 40:
#                 subitem['count'] = 15           
#             # Roubles for Scav Junk Box
#             if subitem['_tpl'] == '5449016a4bdc2d6f028b456f' and subitem['count'] == 1106138:
#                 subitem['count'] = 961138
#             # Roubles for Medcase
#             if subitem['_tpl'] == '5449016a4bdc2d6f028b456f' and subitem['count'] == 548610:
#                 subitem['count'] = 290610
#             # Dogtags for LedX
#             if subitem['_tpl'] == '59f32c3b86f77472a31742f0' and subitem['count'] == 140:
#                 subitem['count'] = 20

# # peacekeeper barters
# for trade in peacekeeper_assort_data['barter_scheme']:
#     for item in peacekeeper_assort_data['barter_scheme'][trade]:
#         for subitem in item:
#             # Secure magnetic tape for Thicc Case
#             if subitem['_tpl'] == '61bf7c024770ee6f9c6b8b53':
#                 subitem['count'] = 7
#             # TerraGroup Blue Folders for Thicc Case
#             if subitem['_tpl'] == '6389c8c5dbfd5e4b95197e6b':
#                 subitem['count'] = 5

# # skier barters
# for trade in skier_assort_data['barter_scheme']:
#     for item in skier_assort_data['barter_scheme'][trade]:
#         for subitem in item:
#             # Moonshine for Weapon Case
#             if subitem['_tpl'] == '5d1b376e86f774252519444e':
#                 subitem['count'] = 4

# # mechanic barters
# for trade in mechanic_assort_data['barter_scheme']:
#     for item in mechanic_assort_data['barter_scheme'][trade]:
#         for subitem in item:
#             # Bitcoin for Weapon Case
#             if subitem['_tpl'] == '59faff1d86f7746c51718c9c' and subitem['count'] == 10:
#                 subitem['count'] = 5
#             # Bitcoin for Thicc Weap Case
#             if subitem['_tpl'] == '59faff1d86f7746c51718c9c' and subitem['count'] == 20:
#                 subitem['count'] = 10

# multiply the players current/max health for all game editions
# will only affect new profiles that are created
health_mod_multi = 3
team_list = ['bear', 'usec']
for edition in profiles_data:
    for team in team_list:
        if profiles_data[edition][team]['character']['Health']['BodyParts']['Chest']['Health']['Current'] == 85:
            for bodypart in profiles_data[edition][team]['character']['Health']['BodyParts']:
                profiles_data[edition][team]['character']['Health']['BodyParts'][bodypart]['Health']['Current'] *= health_mod_multi
                profiles_data[edition][team]['character']['Health']['BodyParts'][bodypart]['Health']['Maximum'] *= health_mod_multi

# mod player health for already created profiles
if len(profile_list) > 0:
    for profiles in profile_list:
        profile_data = load_json(player_profile_path+profiles)

        # buff current player max hp
        try:
            if profile_data['characters']['pmc']['Health']['BodyParts']['Chest']['Health']['Current'] == 85:
                for body_part in profile_data['characters']['pmc']['Health']['BodyParts']:
                    print(profile_data['characters']['pmc']['Health']['BodyParts'][body_part]['Health']['Current'])
                    profile_data['characters']['pmc']['Health']['BodyParts'][body_part]['Health']['Current'] *= health_mod_multi
                    profile_data['characters']['pmc']['Health']['BodyParts'][body_part]['Health']['Maximum'] *= health_mod_multi
                
                    save_json(profile_data, player_profile_path+profiles)
        except:
            pass

# mod bot health amounts to make gunfights longer
# bot_health_mod_multi = 1.5
# for bot in bot_type_list:
#     bot_data = load_json(bot_types_path+bot)
    
#     for bodyParts in bot_data['health']['BodyParts'][0]:
#         print(bot_data['health']['BodyParts'][0][bodyParts]['min'])
#         bot_data['health']['BodyParts'][0][bodyParts]['min'] *= bot_health_mod_multi
#         bot_data['health']['BodyParts'][0][bodyParts]['max'] *= bot_health_mod_multi 
    
#     save_json(bot_data, bot_types_path+bot)  

# change trader image paths from jpg to png
skier_base_data['avatar'] = skier_base_data['avatar'].replace('jpg', 'png')
fence_base_data['avatar'] = fence_base_data['avatar'].replace('jpg', 'png')
prapor_base_data['avatar'] = prapor_base_data['avatar'].replace('jpg', 'png')
ragman_base_data['avatar'] = ragman_base_data['avatar'].replace('jpg', 'png')
jaeger_base_data['avatar'] = jaeger_base_data['avatar'].replace('jpg', 'png')
mechanic_base_data['avatar'] = mechanic_base_data['avatar'].replace('jpg', 'png')
therapist_base_data['avatar'] = therapist_base_data['avatar'].replace('jpg', 'png')
peacekeeper_base_data['avatar'] = peacekeeper_base_data['avatar'].replace('jpg', 'png')

# remove snarky chat message banter from bots
chat_data['victim']['responseChancePercent'] = 0
chat_data['killer']['responseChancePercent'] = 0

# turn snow on
try:
    weather_data['forceWinterEvent'] = True
except:
    print("winter event not found")
    pass
    
##########
# save and close files
##########
save_json(bot_data, bot_path)
save_json(chat_data, chat_path)
save_json(item_data, item_path)
save_json(quest_data, quest_path)

save_json(global_data, global_path)
save_json(bear_data, bear_bot_path)
save_json(usec_data, usec_bot_path)
save_json(weather_data, weather_path)
save_json(ragfair_data, ragfair_path)
save_json(locales_data, locales_path)
save_json(location_data, location_path)
save_json(profiles_data, profiles_path)

save_json(insurance_data, insurance_path)
save_json(quest_config_data, quest_config_path)
save_json(hideout_areas_data, hideout_areas_path)
save_json(hideout_workout_data, hideout_workout_path)
save_json(hideout_settings_data, hideout_settings_path)
save_json(hideout_scav_case_data, hideout_scav_case_path)
save_json(hideout_production_data, hideout_production_path)

save_json(skier_base_data, skier_base_path)
save_json(fence_base_data, fence_base_path)
save_json(prapor_base_data, prapor_base_path)
save_json(jaeger_base_data, jaeger_base_path)
save_json(ragman_base_data, ragman_base_path)
save_json(mechanic_base_data, mechanic_base_path)
save_json(therapist_base_data, therapist_base_path)
save_json(peacekeeper_base_data, peacekeeper_base_path)

save_json(prapor_assort_data, prapor_assort_path)
save_json(ragman_assort_data, ragman_assort_path)
save_json(jaeger_assort_data, jaeger_assort_path)
save_json(mechanic_assort_data, mechanic_assort_path)
save_json(therapist_assort_data, therapist_assort_path)
save_json(peacekeeper_assort_data, peacekeeper_assort_path)

#####
# replace trader img files
#####
img_list = os.listdir(mod_trader_img_path)

for img in img_list:
    shutil.copy(mod_trader_img_path+img, trader_img_path+img)
    
#############
# mod bots
#############
bot_health_mod_amount = 1.25

file_path = install_drive + eft_version +'Aki_Data/Server/database/bots/types/'
file_list = os.listdir(file_path)

for files in file_list:
    file = open(file_path+files, 'r', encoding='utf8')
    data = json.loads(file.read())
    
    for bodyParts in data['health']['BodyParts'][0]:
        data['health']['BodyParts'][0][bodyParts]['min'] *= bot_health_mod_amount
        data['health']['BodyParts'][0][bodyParts]['max'] *= bot_health_mod_amount 
    
    json_obj = json.dumps(data, indent=4)
    
    with open(file_path+files, 'w') as outfile:
        outfile.write(json_obj)
        
    file.close()  
    outfile.close()