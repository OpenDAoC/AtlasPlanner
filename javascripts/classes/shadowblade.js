sSTR[999] = 0;
sCON[999] = 0;
sDEX[999] = 0;
sQUI[999] = 0;
sINT[999] = 0;
sPIE[999] = 0;
sEMP[999] = 0;
sCHA[999] = 0;
sSTR[998] = 0;
sCON[998] = 0;
sDEX[998] = 0;
sQUI[998] = 0;
sINT[998] = 0;
sPIE[998] = 0;
sEMP[998] = 0;
sCHA[998] = 0;
sSTR[18] = 55;
sCON[18] = 55;
sDEX[18] = 55;
sQUI[18] = 60;
sINT[18] = 60;
sPIE[18] = 75;
sEMP[18] = 60;
sCHA[18] = 60;
sSTR[10] = 50;
sCON[10] = 50;
sDEX[10] = 70;
sQUI[10] = 70;
sINT[10] = 60;
sPIE[10] = 60;
sEMP[10] = 60;
sCHA[10] = 60;
sSTR[11] = 70;
sCON[11] = 70;
sDEX[11] = 50;
sQUI[11] = 50;
sINT[11] = 60;
sPIE[11] = 60;
sEMP[11] = 60;
sCHA[11] = 60;
sSTR[15] = 55;
sCON[15] = 45;
sDEX[15] = 65;
sQUI[15] = 75;
sINT[15] = 60;
sPIE[15] = 60;
sEMP[15] = 60;
sCHA[15] = 60;

Abilities = new Array(19)
Abilities[1] = new abilityPT("Staff", 0, 83, 5, 0, 0, 0)
Abilities[2] = new abilityPT("Cloth Armor", 0, 99, 7, 0, 0, 0)
Abilities[3] = new abilityPT("Leather Armor", 0, 100, 7, 0, 0, 0)
Abilities[4] = new abilityPT("Evade I", 0, 113, 4, 0, 0, 0)
Abilities[5] = new abilityPT("Stealth", 5, 119, 2, 1, 0, 0)
Abilities[6] = new abilityPT("Sword", 0, 130, 5, 1, 0, 0)
Abilities[7] = new abilityPT("Shields (Small)", 5, 102, 7, 0, 0, 0)
Abilities[8] = new abilityPT("Evade II", 5, 114, 4, 0, 0, 0)
Abilities[9] = new abilityPT("Axe", 5, 131, 5, 1, 0, 0)
Abilities[10] = new abilityPT("Left Axe", 5, 132, 5, 1, 0, 0)
Abilities[11] = new abilityPT("Thrown Weapons", 5, 140, 4, 0, 0, 0)
Abilities[12] = new abilityPT("Critical Strike", 5, 142, 5, 1, 0, 0)
Abilities[13] = new abilityPT("Envenom", 5, 143, 2, 1, 0, 0)
Abilities[14] = new abilityPT("Distractions", 5, 144, 4, 0, 0, 0)
Abilities[15] = new abilityPT("Evade III", 10, 115, 4, 0, 0, 0)
Abilities[16] = new abilityPT("Evade IV", 20, 116, 4, 0, 0, 0)
Abilities[17] = new abilityPT("Evade V", 30, 157, 4, 0, 0, 0)
Abilities[18] = new abilityPT("Evade VI", 40, 158, 4, 0, 0, 0)
Abilities[19] = new abilityPT("Evade VII", 50, 159, 4, 0, 0, 0)

//Styles = new Array(61);
//Styles[1]=new stylePT(131,"Splitter",2,"","High","Starter","","","","",0,"")
//Styles[2]=new stylePT(131,"Cleave",4,"Slowed","Low","Medium","Medium Bonus","","","You parry",0,"Decreases the target\'s combat speed.  Duration 20 seconds")
//Styles[3]=new stylePT(131,"Plague",6,"Taunt","Medium","Low","Medium Bonus","","Medium&nbsp;Penalty","",0,"")
//Styles[4]=new stylePT(131,"Thrym's Strength",8,"","Medium","Medium","Medium Bonus","","","[*] Cleave",0,"")
//Styles[5]=new stylePT(131,"Pillager",10,"Slowed","High","Medium","Low Bonus","","","",0,"Decreases the target\'s combat speed.  Duration 20 seconds")
//Styles[6]=new stylePT(131,"Hoarfrost",12,"Detaunt","Medium","","Low Bonus","Medium&nbsp;Bonus","","",0,"")
//Styles[7]=new stylePT(131,"Evernight",15,"Bleeding","Low","Medium","Medium Bonus","","","Behind target",0,"Does damage to a target over a period of time.  Damage per tick (every 4 seconds) 6 Damage type Body Duration 35 seconds")
//Styles[8]=new stylePT(131,"Plunderer",18,"Hindered","Medium","Medium","Medium Bonus","","","[*] Pillager",0,"Reduces the target\'s movement speed.  Value 100% Duration 11 seconds")
//Styles[9]=new stylePT(131,"Valkyrie's Shield",21,"","Low","Medium","","Medium&nbsp;Bonus","","You block",0,"")
//Styles[10]=new stylePT(131,"Raider",25,"Bleeding","Low","High","","","","You evade",0,"Does damage to a target over a period of time.  Damage per tick (every 4 seconds) 7 Damage type Body Duration 40 seconds")
//Styles[11]=new stylePT(131,"Havoc",29,"","Medium","High","Low Bonus","","Low&nbsp;Penalty","In front of target",0,"")
//Styles[12]=new stylePT(131,"Midnight Sun",34,"Stunned","Medium","Medium","High Bonus","","","[*] Valkyrie's Shield",0,"Stuns the target for a brief period of time.  Duration 6 seconds")
//Styles[13]=new stylePT(131,"Glacial Movement",39,"Slowed","Medium","Medium","Medium Bonus","","Low&nbsp;Penalty","To side of target",0,"Decreases the target\'s combat speed.  Duration 20 seconds")
//Styles[14]=new stylePT(131,"Arctic Rift",44,"","Low","High","Medium Bonus","","","[*] Evernight",0,"")
//Styles[15]=new stylePT(131,"Tyr's Fury",50,"Bleeding","Medium","High","High Bonus","","","[*] Havoc",0,"Does damage to a target over a period of time.  Damage per tick (every 4 seconds) 9 Damage type Body Duration 40 seconds")
//Styles[16]=new stylePT(142,"Backstab",2,"Stunned","Medium","Starter","Medium Bonus","","Medium&nbsp;Penalty","Stealthed. From Behind Target",0,"Stuns the target for a brief period of time.  Duration 2 seconds")
//Styles[17]=new stylePT(142,"Eviscerate",4,"Slowed","Medium","High","Low Bonus","","Low&nbsp;Penalty","[*] Backstab",0,"Decreases the target\'s combat speed.  Duration 20 seconds")
//Styles[18]=new stylePT(142,"Kidney Rupture",6,"Bleeding","Low","High","Low Bonus","","Medium&nbsp;Penalty","[*] Eviscerate",0,"Does damage to a target over a period of time.  Damage per tick (every 4 seconds) 4 Damage type Body Duration 25 seconds")
//Styles[19]=new stylePT(142,"Pincer",8,"","Medium","High","High Bonus","","High&nbsp;Penalty","To side of target",0,"")
//Styles[20]=new stylePT(142,"Backstab II",10,"Stunned","High","High","High Bonus","","Medium&nbsp;Penalty","Stealthed. Behind Target",0,"Stuns the target for a brief period of time.  Duration 3 seconds")
//Styles[21]=new stylePT(142,"Hamstring",12,"Bleeding","Low","High","Medium Bonus","Medium&nbsp;Bonus","","You evade",0,"Does damage to a target over a period of time.  Damage per tick (every 4 seconds) 5 Damage type Body Duration 30 seconds")
//Styles[22]=new stylePT(142,"Thigh Cut",15,"","Medium","High","Medium Bonus","","Low&nbsp;Penalty","[*] Backstab II",0,"")
//Styles[23]=new stylePT(142,"Garrote",18,"Hindered","High","High","Medium Bonus","","Medium&nbsp;Penalty","",0,"Reduces the target\'s movement speed.  Value 100% Duration 12 seconds")
//Styles[24]=new stylePT(142,"Perforate Artery",21,"Bleeding","Medium","High","High Bonus","","Medium&nbsp;Penalty","Stealthed. In front of target",0,"Does damage to a target over a period of time.  Damage per tick (every 4 seconds) 7 Damage type Body Duration 40 seconds")
//Styles[25]=new stylePT(142,"Achilles' Heel",25,"Slowed","Medium","High","Medium Bonus","","","[*] Garrote",0,"Decreases the target\'s combat speed.  Duration 20 seconds")
//Styles[26]=new stylePT(142,"Leaper",29,"Bleeding","Medium","High","High Bonus","Low&nbsp;Bonus","","[*] Hamstring",0,"Does damage to a target over a period of time.  Damage per tick (every 4 seconds) 7 Damage type Body Duration 40 seconds")
//Styles[27]=new stylePT(142,"Creeping Death",34,"Stunned","Low","High","High Bonus","","","[*] Perforate Artery",0,"Stuns the target for a brief period of time.  Duration 7 seconds")
//Styles[28]=new stylePT(142,"Stunning Stab",39,"Bleeding","Low","High","Very High Bonus","Low&nbsp;Bonus","","[*] Creeping Death",0,"Does damage to a target over a period of time.  Damage per tick (every 4 seconds) 10 Damage type Body Duration 40 seconds")
//Styles[29]=new stylePT(142,"Rib Separation",44,"Hindered","Low","High","High Bonus","","","[*] Leaper",0,"Reduces the target\'s movement speed.  Value 100% Duration 27 seconds")
//Styles[30]=new stylePT(142,"Ripper",50,"Bleeding","Low","High","High Bonus","Low&nbsp;Bonus","","[*] Rib Separation",0,"Does damage to a target over a period of time.  Damage per tick (every 4 seconds) 11 Damage type Body Duration 40 seconds")
//Styles[31]=new stylePT(132,"Counter Slash",2,"","High","Starter","","","","",0,"")
//Styles[32]=new stylePT(132,"Doubler",4,"Bleeding","Medium","Low","Low Bonus","","Low&nbsp;Penalty","Behind target",0,"Does damage to a target over a period of time.  Damage per tick (every 4 seconds) 3 Damage type Body Duration 20 seconds")
//Styles[33]=new stylePT(132,"Ravager",6,"","Medium","Low","Low Bonus","","","",0,"")
//Styles[34]=new stylePT(132,"Polar Light",8,"Slowed","Low","Low","High Bonus","Low&nbsp;Bonus","","You parry",0,"Decreases the target\'s combat speed.  Duration 20 seconds")
//Styles[35]=new stylePT(132,"Snowblind",10,"Taunt","Medium","Low","Low Bonus","","Medium&nbsp;Penalty","",0,"")
//Styles[36]=new stylePT(132,"Atrophy",12,"Hindered","Medium","Low","Low Bonus","","","[*] Ravager",0,"Reduces the target\'s movement speed.  Value 100% Duration 12 seconds")
//Styles[37]=new stylePT(132,"Frost Shadow",15,"","Medium","Low","Medium Bonus","Low&nbsp;Bonus","","[*] Polar Light",0,"")
//Styles[38]=new stylePT(132,"Comeback",18,"","Low","Low","Medium Bonus","","","You evade",0,"")
//Styles[39]=new stylePT(132,"Scathing Blade",21,"Slowed","Medium","Medium","Medium Bonus","","Medium&nbsp;Penalty","[*] Atrophy",0,"Decreases the target\'s combat speed.  Duration 20 seconds")
//Styles[40]=new stylePT(132,"Decaying Rage",25,"Detaunt","Low","Low","Medium Bonus","High&nbsp;Bonus","","[*] Atrophy",0,"")
//Styles[41]=new stylePT(132,"Snowsquall",29,"","Medium","Medium","Medium Bonus","","","Behind target",0,"")
//Styles[42]=new stylePT(132,"Doublefrost",34,"","High","Low","Low Bonus","","","",0,"")
//Styles[43]=new stylePT(132,"Frosty Gaze",39,"Stunned","Medium","Low","Medium Bonus","","","[*] Comeback",0,"Stuns the target for a brief period of time.  Duration 7 seconds")
//Styles[44]=new stylePT(132,"Icy Brilliance",44,"Bleeding","Medium","Medium","High Bonus","","","[*] Snowsquall",0,"Does damage to a target over a period of time.  Damage per tick (every 4 seconds) 9 Damage type Body Duration 40 seconds")
//Styles[45]=new stylePT(132,"Aurora Borealis",50,"Slowed","Low","High","High Bonus","","","Target parried",0,"Decreases the target\'s combat speed.  Duration 20 seconds")
//Styles[46]=new stylePT(130,"Whirling Blade",2,"","High","Starter","","","","",0,"")
//Styles[47]=new stylePT(130,"Frost Cut",4,"Bleeding","Low","Medium","Low Bonus","","","You block",0,"Does damage to a target over a period of time.  Damage per tick (every 4 seconds) 4 Damage type Body Duration 25 seconds")
//Styles[48]=new stylePT(130,"Draw Out",6,"Taunt","Medium","Low","High Bonus","","Medium&nbsp;Penalty","",0,"")
//Styles[49]=new stylePT(130,"Northern Lights",8,"Slowed","Medium","Medium","Low Bonus","","","To side of target",0,"Decreases the target\'s combat speed.  Duration 20 seconds")
//Styles[50]=new stylePT(130,"Assault",10,"","Medium","Medium","Medium Bonus","","","",0,"")
//Styles[51]=new stylePT(130,"Temper",12,"Detaunt","Medium","","","Medium&nbsp;Bonus","","",0,"")
//Styles[52]=new stylePT(130,"Aurora",15,"Hindered","Medium","High","Medium Bonus","","","[*] Northern Lights",0,"Reduces the target\'s movement speed.  Value 100% Duration 15 seconds")
//Styles[53]=new stylePT(130,"Baldur's Fury",18,"Hindered","High","Medium","Medium Bonus","","","[*] Assault",0,"Reduces the target\'s movement speed.  Value 100% Duration 9 seconds")
//Styles[54]=new stylePT(130,"Reinforcement",21,"Bleeding","Low","Medium","Medium Bonus","","Low&nbsp;Penalty","You parry",0,"Does damage to a target over a period of time.  Damage per tick (every 4 seconds) 7 Damage type Body Duration 40 seconds")
//Styles[55]=new stylePT(130,"Ice Storm",25,"","Medium","High","Medium Bonus","","","You evade",0,"")
//Styles[56]=new stylePT(130,"Rush",29,"Slowed","Low","High","","","Medium&nbsp;Penalty","[*] Reinforcement",0,"Decreases the target\'s combat speed.  Duration 20 seconds")
//Styles[57]=new stylePT(130,"Polar Rift",34,"","High","Medium","Low Bonus","","","",0,"")
//Styles[58]=new stylePT(130,"Niord's Fury",39,"Stunned","Low","High","Medium Bonus","","","[*] Frost Cut",0,"Stuns the target for a brief period of time.  Duration 7 seconds")
//Styles[59]=new stylePT(130,"Sif's Revenge",44,"Bleeding","Medium","Medium","Medium Bonus","","","[*] Ice Storm",0,"Does damage to a target over a period of time.  Damage per tick (every 4 seconds) 10 Damage type Body Duration 40 seconds")
//Styles[60]=new stylePT(130,"Ragnarok",50,"Slowed","Medium","Medium","Medium Bonus","","Low&nbsp;Penalty","Behind target",0,"Decreases the target\'s combat speed.  Duration 20 seconds")

Spells = new Array(41)

Lines = new Array(6);

Lines[143154] = new linePT('Damage over Time Poisons', 'Inflicts damage to the target repeatedly over a given time period.', 143, 0)
Spells[1] = new spellPT("Minor Lethal Poison", 1, 143154, 143, "9  D x 4 ", 143, "", '', '', '', '', '20s', 'Body')
Spells[2] = new spellPT("Lesser Lethal Poison", 5, 143154, 143, "12  D x 4 ", 143, "", '', '', '', '', '20s', 'Body')
Spells[3] = new spellPT("Lethal Poison", 10, 143154, 143, "16  D x 4 ", 143, "", '', '', '', '', '20s', 'Body')
Spells[4] = new spellPT("Major Lethal Poison", 15, 143154, 143, "21  D x 4 ", 143, "", '', '', '', '', '20s', 'Body')
Spells[5] = new spellPT("Greater Lethal Poison", 20, 143154, 143, "26  D x 4 ", 143, "", '', '', '', '', '20s', 'Body')
Spells[6] = new spellPT("Minor Lethal Venom", 25, 143154, 143, "31  D x 4 ", 143, "", '', '', '', '', '20s', 'Body')
Spells[7] = new spellPT("Lesser Lethal Venom", 30, 143154, 143, "37  D x 4 ", 143, "", '', '', '', '', '20s', 'Body')
Spells[8] = new spellPT("Major Lethal Venom", 35, 143154, 143, "43  D x 4 ", 143, "", '', '', '', '', '20s', 'Body')
Spells[9] = new spellPT("Greater Lethal Venom", 40, 143154, 143, "50  D x 4 ", 143, "", '', '', '', '', '20s', 'Body')
Spells[10] = new spellPT("Insidious Lethal Venom", 45, 143154, 143, "57  D x 4 ", 143, "", '', '', '', '', '20s', 'Body')
Spells[11] = new spellPT("Lifebane", 50, 143154, 143, "64  D x 4 ", 143, "", '', '', '', '', '20s', 'Body')
Lines[143155] = new linePT('Debuff (Strength) Poisons', 'Decreases the target\'s Strength, which will cause it to both do less damage in melee combat.', 143, 0)
Spells[12] = new spellPT("Minor Weakening Poison", 2, 143155, 143, "-18 STR ", 143, "", '', '', '', '', '60s', '')
Spells[13] = new spellPT("Lesser Weakening Poison", 6, 143155, 143, "-24 STR ", 143, "", '', '', '', '', '60s', '')
Spells[14] = new spellPT("Major Weakening Poison", 11, 143155, 143, "-33 STR ", 143, "", '', '', '', '', '60s', '')
Spells[15] = new spellPT("Greater Weakening Poison", 17, 143155, 143, "-44 STR ", 143, "", '', '', '', '', '60s', '')
Lines[143157] = new linePT('Snare Poisons', 'Target moves slower for the spell\'s duration.', 143, 0)
Spells[16] = new spellPT("Minor Imbalance Poison", 3, 143157, 143, "40% 35 sec ", 143, "", '', '', '', '', '35s', 'Body')
Spells[17] = new spellPT("Lesser Imbalance Poison", 8, 143157, 143, "40% 44 sec ", 143, "", '', '', '', '', '44s', 'Body')
Spells[18] = new spellPT("Major Imbalance Poison", 13, 143157, 143, "40% 52 sec ", 143, "", '', '', '', '', '52s', 'Body')
Spells[19] = new spellPT("Greater Imbalance Poison", 18, 143157, 143, "40% 61 sec ", 143, "", '', '', '', '', '61s', 'Body')
Spells[20] = new spellPT("Minor Crippling Poison", 23, 143157, 143, "40% 70 sec ", 143, "", '', '', '', '', '70s', 'Body')
Spells[21] = new spellPT("Lesser Crippling Poison", 27, 143157, 143, "40% 77 sec ", 143, "", '', '', '', '', '77s', 'Body')
Spells[22] = new spellPT("Major Crippling Poison", 31, 143157, 143, "40% 84 sec ", 143, "", '', '', '', '', '84s', 'Body')
Spells[23] = new spellPT("Greater Crippling Poison", 42, 143157, 143, "40% 103 sec ", 143, "", '', '', '', '', '103s', 'Body')
Lines[143156] = new linePT('Disease (Debuffs STR, speed, and healing rate) Poisons', 'Decreases the target\'s Strength, speed, and healing rate, which will cause it to do less damage in melee combat, move at a much slower rate, and reduce its total hitpoints.', 143, 0)
Spells[24] = new spellPT("Minor Infectious Serum", 4, 143156, 143, "60 sec ", 143, "", '', '', '', '', '60s', '')
Spells[25] = new spellPT("Lesser Infectious Serum", 16, 143156, 143, "90 sec ", 143, "", '', '', '', '', '90s', '')
Spells[26] = new spellPT("Infectious Serum", 26, 143156, 143, "120 sec ", 143, "", '', '', '', '', '120s', '')
Spells[27] = new spellPT("Major Infectious Serum", 38, 143156, 143, "150 sec ", 143, "", '', '', '', '', '150s', '')
Spells[28] = new spellPT("Greater Infectious Serum", 48, 143156, 143, "180 sec ", 143, "", '', '', '', '', '180s', '')
Lines[143158] = new linePT('Debuff (Weapon Skill, Constitution) Poisons', 'Decreases the target\'s Weapon Skill and Constitution, which will cause it to both do less damage in melee combat and reduce its total hitpoints.', 143, 0)
Spells[29] = new spellPT("Minor Enervating Poison", 22, 143158, 143, "-46 WS/CON ", 143, "", '', '', '', '', '60s', '')
Spells[30] = new spellPT("Lesser Enervating Poison", 29, 143158, 143, "-60 WS/CON ", 143, "", '', '', '', '', '60s', '')
Spells[31] = new spellPT("Major Enervating Poison", 37, 143158, 143, "-77 WS/CON ", 143, "", '', '', '', '', '60s', '')
Spells[32] = new spellPT("Greater Enervating Poison", 47, 143158, 143, "-100 WS/CON ", 143, "", '', '', '', '', '60s', '')


Lines[123456] = new linePT('Stealth', 'Ability to hide', 119, 0)
Spells[33] = new spellPT("Distraction", 5, 123456, 119, "Distraction", 119, "", '', '', '', '', '', '')
Spells[34] = new spellPT("Dangersense", 8, 123456, 119, "Dangersense", 119, "", '', '', '', '', '', '')
Spells[35] = new spellPT("Safefall1", 10, 123456, 119, "Safefall1", 119, "", '', '', '', '', '', '')
Spells[36] = new spellPT("Detect hidden", 16, 123456, 119, "Detect Hidden", 119, "", '', '', '', '', '', '')
Spells[37] = new spellPT("Safefall2", 20, 123456, 119, "Safefall2", 119, "", '', '', '', '', '', '')
Spells[38] = new spellPT("Climb walls", 25, 123456, 119, "Climb walls", 119, "", '', '', '', '', '', '')
Spells[39] = new spellPT("Safefall3", 30, 123456, 119, "Safefall3", 119, "", '', '', '', '', '', '')
Spells[40] = new spellPT("Safefall4", 40, 123456, 119, "Safefall4", 119, "", '', '', '', '', '', '')
Spells[41] = new spellPT("Safefall5", 50, 123456, 119, "Safefall5", 119, "", '', '', '', '', '', '')