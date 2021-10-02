	/*
this.name=name - Name of RA
this.type=type - Type of RA (P=Passive, I=Instant, D=Duration based)
this.req=req - Prerequisite RA array number
this.reqlvl=reqlvl - Prerequisite RA level required
this.cost=new Array(0,cost1,cost2,cost3,cost4,cost5) - Cost array, 5 levels.. 0 = not available
this.description=description - Text description of the RA
this.level=level - current level.. if 0 not given by default
this.indent=indent - if this RA should be indented
this.evalue=evalue - Value of this RA
this.edesc=edesc - short description after value
this.epre=epre - pre-value tag.. like + or -
this.enomath=enomath - should we do math when calculating the total?
this.classra=classra - is this a R5L0 class RA?
*/

function buildRA(name,type,req,reqlvl,cost1,cost2,cost3,cost4,cost5,description,level,indent,evalue,edesc,epre,enomath){
	this.name=name
	this.type=type
	this.req=req
	this.reqlvl=reqlvl
	this.cost=new Array(0,cost1,cost2,cost3,cost4,cost5)
	this.description=description
	this.level=level
	this.indent=indent
	this.evalue=evalue
	this.evalue1=evalue
	this.evalue2=evalue*2;
	this.evalue3=evalue*3;
	this.evalue4=evalue*4;                                    
	this.evalue5=evalue*5;
	this.edesc=edesc
	this.epre=epre
	this.enomath=enomath
}

arrData=new Array();

arrData[1] = new buildRA('Augmented Strength','P',0,0,1,3,6,10,14,'Increased Strength',0,false,6,'str','+',false);
arrData[2] = new buildRA('Mastery of Arms','P',1,3,1,3,6,10,14,'Increased Attack Speed',0,true,3,'% melee attack delay (min 1.5)','-',false);

arrData[3] = new buildRA('Augmented Dexterity','P',0,0,1,3,6,10,14,'Increased Dexterity',0,false,6,'dex','+',false);
arrData[4] = new buildRA('Mastery of Pain','P',3,2,1,3,6,10,14,'Increased Critical Hit%',0,true,5,'% chance of critical hit','+',false);
arrData[5] = new buildRA('Mastery of Blocking','P',3,2,1,3,6,10,14,'Increased Block %',0,true,3,'% chance to block','+',false);
arrData[6] = new buildRA('Mastery of Parrying','P',3,2,1,3,6,10,14,'Increased Parry %',0,true,3,'% chance to parry','+',false);
arrData[7] = new buildRA('Hail of Blows','A',3,3,3,6,10,0,0,'Duration based (60s) Increased Attack Speed - 15min RUT',0,true,'5','% attack delay, 15min timer, 60sec duration','-',false);
arrData[8] = new buildRA('Mastery of Archery','P',3,3,1,3,6,10,14,'Increased attack Speed',0,true,3,'% bow attack delay (min 1.5)','-',false);
arrData[9] = new buildRA('Falcon\'s Eye','P',3,2,1,3,6,10,14,'Increased Critical Hit %',0,true,5,'% chance of bow critical','+',false);
arrData[10]= new buildRA('Dualist\'s Reflexes','P',3,2,1,3,6,10,14,'Increased Dual Wield %',0,true,3,'% dual wield chance/dual wield damage','+',false);
arrData[11]= new buildRA('Whirling Dervish','A',3,3,3,6,10,0,0,'Duration based (60s) Increased Dual Wield % - 15min RUT',0,true,5,'% dual wield chance, 15min timer, 60sec duration','+',false);
arrData[12]= new buildRA('Bladedance','A',3,3,14,0,0,0,0,'Point-blank area effect attack - 30min RUT',0,true,'','PBAE DD, 30min timer','',true);

arrData[13]= new buildRA('Augmented Constitution','P',0,0,1,3,6,10,14,'Increased Constitution',0,false,6,'con','+',false);
arrData[14]= new buildRA('Avoid Pain','A',13,3,3,6,10,0,0,'Duration based (60s) Increased Absorb % - 15min RUT',0,true,10,'% absorb, 15min timer, 60sec duration','+',false);
arrData[15]= new buildRA('Second Wind','A',13,3,10,0,0,0,0,'Full Endurance Recovery - 15min RUT',0,true,'','100% endurance restored, 15min timer','',true);
arrData[16]= new buildRA('Armor of Faith','A',13,3,3,6,10,14,0,'Duration based (60s) increase to Armor - 15min RUT',0,true,'50',' AF, 15min timer, 60sec duration','+',false);
arrData[17]= new buildRA('Battle Yell','A',13,3,3,6,10,0,0,'Point-blank area effect taunt - 15min RUT',0,true,'','PBAE taunt, 15min timer','',true);

arrData[18]= new buildRA('Augmented Quickness','P',0,0,1,3,6,10,14,'Increased Quickness',0,false,6,'qui','+');
arrData[19]= new buildRA('Dodger','P',18,2,1,3,6,10,14,'Increased Evade %',0,true,3,'% chance to evade','+',false);
arrData[20]= new buildRA('Mastery of Stealth','P',18,2,3,6,10,0,0,'Increased move speed while stealthed',0,true,5,'% stealthed movement speed','+',false);

arrData[21]= new buildRA('Augmented Acuity','P',0,0,1,3,6,10,14,'Increased Acuity',0,false,6,'int','+');
arrData[22]= new buildRA('Serenity','P',21,2,1,3,6,10,14,'Increased Power Regen',0,true,'1','value','',true);
arrData[23]= new buildRA('Ethereal Bond','P',21,2,1,3,6,10,14,'Increased Maximum Power',0,true,3,'% max power','+',false);
arrData[24]= new buildRA('Wild Arcana','P',21,2,1,3,6,10,14,'Increased Critical Spell %',0,true,5,'% chance of duration spell critical','+',false);
arrData[25]= new buildRA('Wild Healing','P',21,2,1,3,6,10,14,'% Chance for Double Heal effect',0,true,5,'% double effect heal','+',false);
arrData[26] = new buildRA('Wild Minion','P',21,2,1,3,6,10,14,'Increased Pet Critical Hit %',0,true,5,'% pet critical hit','+',false);
arrData[27]= new buildRA('Minion Control','P',26,1,1,3,6,10,14,'Reduced Experience taken by pets',0,true,3,'% pet xp taken','-',false);
arrData[28]= new buildRA('Wild Power','P',21,2,1,3,6,10,14,'Increased Damage Spell Critical %',0,true,5,'% damage spell critical','+',false);
arrData[29]= new buildRA('Mastery of the Art','P',21,3,1,3,6,10,14,'Increased Casting Speed',0,true,3,'% casting delay (min 2.0)','-',false);
arrData[30]= new buildRA('Mastery of Healing','P',21,2,1,3,6,10,14,'Increased effect of Healing based spells',0,true,3,'% healing effect','+',false);
arrData[31]= new buildRA('Mastery of Magery','P',21,2,1,3,6,10,14,'Increased effect of Damage based spells',0,true,3,'% DD damage','+',false);
arrData[32]= new buildRA('Mastery of the Arcane','P',21,2,1,3,6,10,14,'Increased effect of Duration based spells',0,true,3,'% chance of buff spell critical','+',false);
arrData[33]= new buildRA('Concentration','A',21,3,10,0,0,0,0,'Resets Quickcast timer - 15min RUT',0,true,'','Reset quickcast timer, 15min timer','',true);
arrData[34]= new buildRA('Mastery of Concentration','A',21,3,14,0,0,0,0,'Reduced Interruption Chance during 15s - 30min RUT',0,true,'','Immune to interruption, 30min timer, 15sec duration','',true);
arrData[35]= new buildRA('Majestic Will','A',21,3,6,10,14,0,0,'Short Duration (60s) Reduced resist % - 30min RUT',0,true,5,'% resist debuff, 30min timer, 60sec duration','-',false);

arrData[36]= new buildRA('Long Wind','P',0,0,1,3,6,10,14,'Reduced Endurance cost of Sprinting',0,false,-1,' endurance used per second','',false);
arrData[37]= new buildRA('Tireless','P',0,0,1,3,6,10,14,'Increased Endurance Regen',0,false,'','?','',true);
arrData[38]= new buildRA('Regeneration','P',0,0,1,3,6,10,14,'Increased Health Regen',0,false,'','?','',true);
arrData[39]= new buildRA('Toughness','P',0,0,1,3,6,10,14,'Increased Maximum Health',0,false,3,'% max hp','+');
arrData[40]= new buildRA('Mastery of Water','P',0,0,1,3,6,10,14,'Increase swimspeed',0,false,3,'% swim speed','+',false);
arrData[41]= new buildRA('Avoidance of Magic','P',0,0,1,3,6,10,14,'Increase All Resists',0,false,3,'% to all magic resists','+',false);
arrData[42]= new buildRA('Lifter','P',0,0,1,3,6,10,14,'Increase Maximum Carried Weight',0,false,20,'% max carried weight','+',false);
arrData[43]= new buildRA('Veil Recovery','P',0,0,1,3,6,10,14,'Reduced Res Sickness Duration',0,false,10,'% res sick duration','-',false);

arrData[44]= new buildRA('Arrow Salvaging','P',0,0,1,3,6,10,14,'Chance to not expend an arrow when firing',0,false,10,'% chance to save arrow','+',false);
arrData[45]= new buildRA('See Hidden','P',0,0,8,0,0,0,0,'Detect stealthed characters',0,false,'','Auto detect stealthed','',true);
arrData[46]= new buildRA('Determination','P',0,0,1,2,3,6,10,'Reduced duration of mesmerize, stun and snare',0,false,15,'% mez/stun/root duration','-',false);

arrData[47]= new buildRA('Trip','A',0,0,10,0,0,0,0,'Point-blank area effect 12s Snare - 15min RUT',0,false,'','PBAE snare, 15min timer, 12sec duration','',true);
arrData[48]= new buildRA('Grapple','A',47,1,14,0,0,0,0,'Point-blank, small radius, area effect root - 30min RUT',0,true,'','PBAE root, 30min timer, 12sec duration','',true);

arrData[49]= new buildRA('First Aid','A',0,0,3,6,10,0,0,'Minor % based Self Heal',0,false,30,'% heal, 15min timer, not in combat','+',false);
arrData[50]= new buildRA('Ignore Pain','A',49,2,14,0,0,0,0,'Self Heal',0,true,100,'100% heal, 30min timer, any time','',true);
	
arrData[51]= new buildRA('Rain of Fire','A',0,0,3,6,10,0,0,'Heat based damage add - 15min RUT',0,false,10,'% heat damage, 15min timer','+',false);
arrData[52]= new buildRA('Rain of Ice','A',0,0,3,6,10,0,0,'Cold based damage add - 15min RUT',0,false,10,'% cold damage, 15min timer','+',false);
arrData[53]= new buildRA('Rain of Annihilation','A',0,0,3,6,10,0,0,'Spirit based damage add - 15min RUT',0,false,10,'% spirit damage, 15min timer','+',false);

arrData[54]= new buildRA('Longshot','A',0,0,10,0,0,0,0,'Non-crit shot, long range - 10min RUT',0,false,'','150% range bow attack, no bonus damage, 10min timer','',true);
arrData[55]= new buildRA('Volley','A',54,1,14,0,0,0,0,'Area-targetted archery attack - 15min RUT',0,true,'','Area target bow attack, max 5 attacks, 15min timer','',true);
arrData[56]= new buildRA('The Empty Mind','A',0,0,3,6,10,0,0,'Short Duration Increase to all Resistances - 30min RUT',0,false,10,'% to magic resists, 30min timer, 60sec duration','+',false);
arrData[57]= new buildRA('Mystic Crystal Lore','A',0,0,3,6,10,0,0,'Minor Mana Restoration - 5min RUT',0,false,30,'% power, 5min timer','+',false);
arrData[58]= new buildRA('Raging Power','A',57,2,10,0,0,0,0,' Major Mana Restoration - 30min RUT',0,true,100,'% power restored, 30min timer','',true);

arrData[59]= new buildRA('Purge','A',0,0,10,0,0,0,0,'Dispel All Negative Effects - 30min RUT',0,false,'','Dispel Negative Effects, 30min timer','',true);
arrData[60]= new buildRA('Reflex Attack','A',0,0,14,0,0,0,0,'Short Duration counter all melee attacks',0,false,'','?','',true);
arrData[61]= new buildRA('Viper','A',0,0,14,0,0,0,0,'Short Duration (30s) double damage from all DOTs - 30min RUT',0,false,'','Double damage from poisons, 30min timer, 30sec duration','',true);
arrData[62]= new buildRA('True Sight','A',0,0,10,0,0,0,0,'Short Duration (60s) detect all Hidden - 30min RUT',0,false,'','Detect all stealthed, 30min timer, 60sec duration','',true);
arrData[63]= new buildRA('Soldier\'s Barricade','A',0,0,10,0,0,0,0,'Short Duration (30s) bonus to Group Armor - 30min RUT',0,false,'','Large bonus to group\'s armor factor, 30min timer, 30sec duration, range 1500','',true);
arrData[64]= new buildRA('Bunker of Faith','A',0,0,10,0,0,0,0,'Short Duration bonus to Group Absorb',0,false,'','?','',true);
arrData[65]= new buildRA('Siege Bolt','A',0,0,10,0,0,0,0,'Powerful Bolt vs Doors and Siege',0,false,'','?','',true);
arrData[66]= new buildRA('Faith Healing','A',0,0,14,0,0,0,0,'Group Heal',0,false,'','?','',true);
arrData[67]= new buildRA('Whip of Encouragement','A',0,0,6,0,0,0,0,'Short Duration Increased Pet Run Speed',0,false,'','?','',true);
arrData[68]= new buildRA('Excited Frenzy','A',0,0,6,0,0,0,0,'Short Duration Increased Pet Attack Speed',0,false,'','?','',true);
arrData[69]= new buildRA('Group Purge','A',0,0,14,0,0,0,0,'Purge all negative effects from Group',0,false,'','?','',true);
arrData[70]= new buildRA('Perfect Recovery','A',0,0,14,0,0,0,0,'Resurrection with high health and no sickness',0,false,'','?','',true);
arrData[71]= new buildRA('Vanish','A',0,0,10,0,0,0,0,'Immediately Stealth',0,false,'','?','',true);
arrData[72]= new buildRA('Shadow Run','A',0,0,10,0,0,0,0,'Short Duration Increased Stealth Run Speed',0,false,'','?','',true);
arrData[73]= new buildRA('Speed of Sound','A',0,0,10,0,0,0,0,'Short Duration Increased Group Run Speed',0,false,'','?','',true);
arrData[74]= new buildRA('Ameliorating Melodies','A',0,0,14,0,0,0,0,'Short Duration (30s) Increased Health Regen - 30min RUT',0,false,'','Massive group health regen, 30min timer, 30sec duration','',true);
arrData[75]= new buildRA('Fury of the Gods','A',0,0,14,0,0,0,0,'Short Duration Damage Add',0,false,'','?','',true);
arrData[76]= new buildRA('Wrath of the Champion','A',0,0,10,0,0,0,0,'Point-blank Area Effect Direct Damage - 150min RUT',0,false,'','PBAE DD, 15min timer','',true);
arrData[77]= new buildRA('Volcanic Pillar','A',0,0,14,0,0,0,0,'Area Effect Bolt',0,false,'','?','',true);
arrData[78]= new buildRA('Rune of Decimation','A',0,0,14,0,0,0,0,'Ground-targetted area effect trap',0,false,'','?','',true);
arrData[79]= new buildRA('Negative Maelstrom','A',0,0,14,0,0,0,0,'Area-targetted damage',0,false,'','?','',true);
arrData[80]= new buildRA('Thornweed Field','A',0,0,14,0,0,0,0,'Area-targetted 30s snare - 30min RUT',0,false,'','Area target damage/35% snare, 30min timer, 30sec duration','',true);
arrData[81]= new buildRA('Corporeal Disintegration','A',0,0,14,0,0,0,0,'Area effect DOT',0,false,'','?','',true);
arrData[82]= new buildRA('Ichor of the Deep','A',0,0,14,0,0,0,0,'Area effect root',0,false,'','?','',true);
arrData[83]= new buildRA('Brilliant Aura of Deflection','A',0,0,14,0,0,0,0,'Short Duration 30s Increase to all Resists - 30min RUT',0,false,'','Boost to all magic resists, 30min timer, 30sec duration','',true);
arrData[84]= new buildRA('Severing the Tether','I',0,0,10,0,0,0,0,'Dispell all summon and charm effects - 15min RUT',0,false,'','Area-target, turns all enemy pets on owner, 15min timer','',true);
arrData[85]= new buildRA('Juggernaut','A',0,0,14,0,0,0,0,'Short Duration Pet Summon',0,false,'','?','',true);
arrData[86]= new buildRA('Static Tempest','A',0,0,14,0,0,0,0,'Area-targetted damage spell',0,false,'','?','',true);
arrData[87]= new buildRA('Void Style','A',0,0,10,0,0,0,0,'Powerful Combat Style',0,false,'','?','',true);
arrData[88]= new buildRA('Doombringer Style','A',0,0,10,0,0,0,0,'Powerful Combat Style',0,false,'','?','',true);
arrData[89]= new buildRA('Tundra Style','A',0,0,10,0,0,0,0,'Powerful Combat Style',0,false,'','?','',true); 
arrData[90]= new buildRA('Winter Moon Style','A',0,0,10,0,0,0,0,'Powerful Combat Style - 10min RUT',0,false,'','Melee Style, 10min timer','',true);
arrData[91]= new buildRA('Razorback Style','A',0,0,10,0,0,0,0,'Powerful Combat Style - 10min RUT',0,false,'','Powerful combat style, 10min timer','',true);

arrData[92]= new buildRA('Battery of Life','A',0,0,10,0,0,0,0,'Battery Heal',0,false,'','','',true);
arrData[93]= new buildRA('Forestheart Ambusher','A',0,0,10,0,0,0,0,'Summons Pet for 3mn',0,false,'','Ground target pet, 3min duration','',true);
arrData[94]= new buildRA('Unquenchable Thirst of Souls','A',0,0,10,0,0,0,0,'PBAE Life tap',0,false,'','','',true);
arrData[95]= new buildRA('Defender of the Vale','A',0,0,10,0,0,0,0,'Group health buffer',0,false,'','Absorbs 50% damage, 500hp max','',true);
arrData[96]= new buildRA('Strike the Soul','A',0,0,10,0,0,0,0,'Resist debuff',0,false,'','25% more difficult to resist caster\'s spells, 60sec duration','',true);
arrData[97]= new buildRA('Ravager','A',0,0,10,0,0,0,0,'Style',0,false,'','???','',true);
arrData[98]= new buildRA('Resilience of Death','A',0,0,10,0,0,0,0,'AE Pet Buff',0,false,'','+100 Con, 500 radius','',true);
arrData[99]= new buildRA('Prevent Flight','A',0,0,14,0,0,0,0,'Snare fleeing target',0,false,'','35% chance to 50% snare for 10secs','',true);

arrData[100]= new buildRA('Determination','P',0,0,1,2,3,0,0,'Reduced duration of mesmerize, stun and snare',0,false,15,'% mez/stun/root duration','-',false);
