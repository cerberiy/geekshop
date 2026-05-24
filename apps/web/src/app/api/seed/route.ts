import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const RAW_CARDS = `\
1 Accursed Duneyard [DRC]
2 Accursed Marauder <retro> [MH3]
1 Ajani, Sleeper Agent [DMU]
2 All Will Be One [ONE]
1 Allosaurus Rider [CSP]
1 Ancestral Statue [DTK]
1 Angel of the Dire Hour [C14]
1 Angelic Field Marshal [CMM]
1 Anvil of Bogardan [VI]
1 Ao, the Dawn Sky [NEO]
1 Archfiend of Depravity [FRF]
1 Arena Rector [BBD]
1 Arwen, Weaver of Hope [LTC]
1 Atomize [PIP]
1 Back to Basics [UZ]
1 Betor, Kin to All [TDM]
1 Bloated Contaminator [ONE]
1 Bloodghast [DFT]
1 Blossoming Tortoise [WOE]
1 Body Count [NCC]
1 Boltwave [FDN]
1 Broodcaller Scourge <extended> [TDC]
1 Buster Sword [FIN]
1 Cephalid Constable [JUD]
1 City on Fire [MOM]
1 Coat of Arms [DDS]
1 Crawlspace [DMR]
1 Creeping Corrosion [MBS]
1 Crush of Wurms [JUD]
1 Damning Verdict [FIC]
1 Demonic Collusion [TSP]
1 Diabolic Tutor [M14]
1 Diminishing Returns [EMA]
1 Dimir Signet [NCC]
1 Disrupt Decorum [MKC]
1 Dolmen Gate [LRW]
1 Doomsday [WL]
1 Drowned Catacomb [DRC]
1 Drowner of Hope [M3C]
1 Elanor Gardner <extended> [LTR]
1 Elder Deep-Fiend [M3C]
1 Eldrazi Confluence [M3C]
1 Eldrazi Displacer [M3C]
1 Eldrazi Temple [M3C]
1 Elvish Mariner [LTR]
1 Endless Ranks of the Dead [ISD]
1 Endless Ranks of the Dead [MIC]
1 Ertai, Wizard Adept [EX]
1 Expressive Iteration <retro> [BRC]
1 Fanatic of Rhonas [MH3]
1 Fatespinner [MRD]
1 Flame of Anor [LTR]
1 Forsaken Monument [M3C]
1 Geth's Grimoire [DST]
1 Gishath, Sun's Avatar [XLN]
1 Goblin Game [PS]
1 God-Eternal Oketra [DRC]
1 Gogo, Master of Mimicry <extended> [FIN]
1 Goro-Goro and Satoru <prerelease> [MOC]
1 Grave Titan [C14]
1 Graveborn Muse [LGN]
1 Haakon, Stromgald Scourge [CSP]
1 Herald's Horn [C17]
1 Hollowmurk Siege [TDM]
1 Honden of Night's Reach [EMA]
1 Hypnotic Specter [4ED]
1 Iron Spider, Stark Upgrade [SPM]
1 Ixhel, Scion of Atraxa [ONC]
1 Jace, Unraveler of Secrets [SOI]
1 Jarad, Golgari Lich Lord [C15]
1 Jetmir's Garden [SNC]
1 Jin-Gitaxias, Progress Tyrant [NEO]
1 Joraga Warcaller [CMA]
1 Kaldra Compleat [MH2]
1 Kami of Whispered Hopes [MOM]
1 Karn Liberated [NPH]
1 Karrthus, Tyrant of Jund [2XM]
1 Kibo, Uktabi Prince [J22]
1 Laelia, the Blade Reforged [MH3]
1 Lathliss, Dragon Queen [M19]
1 Liliana, the Last Hope [EMN]
1 Lord of the Undead [PS]
1 Lost Monarch of Ifnir [DRC]
1 Magosi, the Waterveil [ZEN]
1 Mana Crypt [EMA]
1 Morophon, the Boundless [M3C]
1 Myr Retriever [2XM]
1 Nettlecyst [MKC]
1 Night of Souls' Betrayal [IMA]
1 Nissa, Voice of Zendikar [OGW]
1 Nissa, Who Shakes the World [WAR]
1 Niv-Mizzet, Dracogenius [RTR]
1 Noxious Ghoul [LGN]
1 Ohran Frostfang [CMM]
1 Pernicious Deed [A25]
1 Pinnacle Monk [MH3]
1 Propaganda [WHO]
1 Radstorm [PIP]
1 Ratadrabik of Urborg [DMU]
1 Rebuff the Wicked [PLC]
1 Recurring Insight [ROE]
1 Rhys the Redeemed [2XM]
1 Ringwraiths <extended> [LTR]
1 Rishkar's Expertise [AFC]
1 Rooftop Storm [MIC]
1 Samwise Gamgee [LTR]
1 Saradoc, Master of Buckland [LTR]
1 Seton, Krosan Protector [OD]
1 Shamanic Revelation [PLIST]
1 Shelob, Child of Ungoliant [LTR]
1 Silent Arbiter [CNS]
1 Sinister Concierge [NCC]
1 Six [MH3]
1 Skrelv, Defector Mite [ONE]
1 Spark Mage [OD]
1 Spawnbed Protector [M3C]
1 Spell Snare [DIS]
1 Staff of Domination [5DN]
1 Staff of Titania [BRC]
1 Starnheim Aspirant [KHM]
1 Stomping Ground [GPT]
1 Stuffy Doll [CLB]
1 Surgespanner [LRW]
1 Taurean Mauler [CM2]
1 The Eternal Wanderer [ONE]
1 The Scarab God [2XM]
1 There and Back Again [LTR]
1 Tinybones, Trinket Thief [JMP]
1 Tom Bombadil [LTR]
1 Traveling Chocobo [FIN]
1 Traverse the Outlands [C17]
1 Triumph of the Hordes [NPH]
1 Ugin's Insight [M3C]
1 Ugin, the Ineffable [M3C]
1 Undead Warchief [TSB]
1 Unwinding Clock [NPH]
1 Urza's Factory [PRM-CHP]
2 Urza's Incubator [MH3]
1 Vexing Bauble [MH3]
1 Victimize [CMR]
1 Visara the Dreadful [EMA]
1 Voidmage Prodigy [PRM-MPR]
1 Witch Enchanter [MH3]
1 World Shaper [NCC]
1 Wren's Run Packmaster [LRW]
1 Wrenn and Realmbreaker [MOM]
1 Ajani Vengeant [PRM-LPC] (F)
1 Anhelo, the Painter [NCC] (F)
1 Apprentice Necromancer [UMA] (F)
1 Azlask, the Swelling Scourge [M3C] (F)
1 Baeloth Barrityl, Entertainer <extended> [CLB] (F)
1 Bramblewood Paragon [MOR] (F)
1 Dion, Bahamut's Dominant [FIN] (F)
1 Door of Destinies [PRM-PRE] (F)
1 Enter the Infinite <retro> [RVR] (F)
1 Entish Restoration [LTR] (F)
1 Esper Origins [FIN] (F)
1 Excalibur, Sword of Eden [ACR] (F)
2 Flusterstorm <buy-a-box> [MH3] (F)
1 Galadriel's Dismissal <borderless> [LTC] (F)
1 Galadriel, Light of Valinor <borderless> [LTC] (F)
1 Geist of Saint Traft [PRM-WMCQ] (F)
1 Gimli's Reckless Might <borderless> [LTC] (F)
1 Harbinger of the Seas [MH3] (F)
1 Hunter's Bow [ACR] (F)
1 Inquisitive Glimmer <promo pack> [DSK] (F)
1 Ishai, Ojutai Dragonspeaker <Benedikta Harman> [FCA] (F)
1 Jace Beleren [SS1] (F)
1 Leyline Binding <prerelease> [DMU] (F)
1 Mutational Advantage [PIP] (F)
1 Neoform [WAR] (F)
1 Night's Whisper [DDM] (F)
1 Niv-Mizzet, the Firemind <retro> [RVR] (F)
1 Opt [XLN] (F)
1 Past in Flames [MM3] (F)
1 Petty Larceny [ACR] (F)
1 Portal to Phyrexia <planeswalker stamp> [BRO] (F)
1 Rampaging Baloths [PRM-PRE] (F)
1 Ravenous Squirrel <wpn promo> [BLB]
1 Samwise Gamgee [LTR] (F)
1 Sapphire Medallion [MH3] (F)
1 Shark Typhoon [IKO] (F)
1 Spinner of Souls [FDN] (F)
1 Teferi, Mage of Zhalfir [V11] (F)
1 Temur Battlecrier <prerelease> [TDM] (F)
1 Terrasymbiosis [EOE] (F)
1 The Masamune [FIN] (F)
1 Titania, Nature's Force [BRC] (F)
1 Tomik, Wielder of Law <prerelease> [MKM] (F)
1 Transmutation Font [BIG] (F)
1 Valley Floodcaller [BLB] (F)
1 Varina, Lich Queen [2X2] (F)
1 Vault Skirge [PRM-WPN] (F)
1 Zul Ashur, Lich Lord [FDN] (F)`

type CardEntry = {
  qty: number
  name: string
  set: string
  variant: string | null
  foil: boolean
}

function parseCardLine(line: string): CardEntry | null {
  let s = line.trim()
  if (!s) return null

  const foil = s.endsWith('(F)')
  if (foil) s = s.slice(0, -3).trim()

  const setMatch = s.match(/\[([^\]]+)\]$/)
  if (!setMatch) return null
  const set = setMatch[1]
  s = s.slice(0, s.lastIndexOf('[')).trim()

  const variantMatch = s.match(/<([^>]+)>/)
  let variant: string | null = null
  if (variantMatch) {
    variant = variantMatch[1]
    s = s.replace(/<[^>]+>/, '').replace(/\s+/g, ' ').trim()
  }

  const qtyMatch = s.match(/^(\d+)\s+(.+)$/)
  if (!qtyMatch) return null

  return { qty: parseInt(qtyMatch[1]), name: qtyMatch[2].trim(), set, variant, foil }
}

function slug(str: string) {
  return str.toLowerCase().replace(/[',\.]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function makeSlug(c: CardEntry) {
  let s = slug(c.name) + '-' + slug(c.set)
  if (c.variant) s += '-' + slug(c.variant)
  if (c.foil) s += '-foil'
  return s
}

function makeTitle(c: CardEntry) {
  let t = c.name
  if (c.variant) t += ` (${c.variant})`
  t += ` [${c.set}]`
  if (c.foil) t += ' — Foil'
  return t
}

function makeDescription(c: CardEntry) {
  const parts = [`Set: ${c.set}`]
  if (c.variant) parts.push(`Edition: ${c.variant}`)
  if (c.foil) parts.push('Foil')
  return parts.join(' | ')
}

export async function POST(req: NextRequest) {
  if (!process.env.SEED_SECRET || req.headers.get('x-seed-token') !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config: configPromise })
  const entries = RAW_CARDS.split('\n').map(parseCardLine).filter((c): c is CardEntry => c !== null)

  let created = 0
  let skipped = 0
  const errors: string[] = []

  for (const entry of entries) {
    const entrySlug = makeSlug(entry)
    try {
      const existing = await payload.find({ collection: 'products', where: { slug: { equals: entrySlug } }, limit: 1 })
      if (existing.docs.length > 0) { skipped++; continue }

      await payload.create({
        collection: 'products',
        data: {
          title: makeTitle(entry),
          slug: entrySlug,
          description: makeDescription(entry),
          price: 0,
          stock: entry.qty,
        },
      })
      created++
    } catch (e) {
      errors.push(`${entrySlug}: ${e instanceof Error ? e.message : String(e)}`)
    }
  }

  return NextResponse.json({ created, skipped, total: entries.length, errors })
}
