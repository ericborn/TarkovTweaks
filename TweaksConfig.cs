using System.Text.Json.Serialization;

namespace TushonkaTweaks;

public record TweaksConfig
{
/// <summary>
    /// edit mag size
    /// </summary>
    [JsonPropertyName("botNames")] 
    public bool EditBotNames { get; set; }

    /// <summary>
    /// edit mag size
    /// </summary>
    [JsonPropertyName("magSize")] 
    public bool EditMagSize { get; set; }

    /// <summary>
    /// edit LoadSpeed
    /// </summary>
    [JsonPropertyName("loadSpeed")] 
    public bool EditLoadSpeed { get; set; }

    /// <summary>
    /// edit MoneyStackSize
    /// </summary>
    [JsonPropertyName("moneyStackSize")] 
    public bool EditMoneyStackSize { get; set; }

    /// <summary>
    /// edit MoneyOnCharacter
    /// </summary>
    [JsonPropertyName("moneyOnCharacter")] 
    public bool EditMoneyOnCharacter { get; set; }

    /// <summary>
    /// edit KeyUsage
    /// </summary>
    [JsonPropertyName("keyUsage")] 
    public bool EditKeyUsage { get; set; }

    /// <summary>
    /// edit Stamina
    /// </summary>
    [JsonPropertyName("stamina")] 
    public bool EditStamina { get; set; }

    /// <summary>
    /// edit Inertia
    /// </summary>
    [JsonPropertyName("inertia")] 
    public bool EditInertia { get; set; }

    /// <summary>
    /// edit Exp
    /// </summary>
    [JsonPropertyName("exp")] 
    public bool EditExp { get; set; }

    /// <summary>
    /// edit Meds
    /// </summary>
    [JsonPropertyName("meds")] 
    public bool EditMeds { get; set; }

    /// <summary>
    /// edit Ammo
    /// </summary>
    [JsonPropertyName("ammo")] 
    public bool EditAmmo { get; set; }

    /// <summary>
    /// edit Hideout
    /// </summary>
    [JsonPropertyName("hideout")] 
    public bool EditHideout { get; set; }

    /// <summary>
    /// edit ItemWeight
    /// </summary>
    [JsonPropertyName("itemWeight")] 
    public bool EditItemWeight { get; set; }

    /// <summary>
    /// edit RaidTime
    /// </summary>
    [JsonPropertyName("raidTime")] 
    public bool EditRaidTime { get; set; }

    /// <summary>
    /// edit BossSpawnChance
    /// </summary>
    [JsonPropertyName("bossSpawnChance")] 
    public bool EditBossSpawnChance { get; set; }
}