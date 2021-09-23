function buildClass(name,icon,arrList)	{
	this.name=name
	this.icon=icon
	this.arrList=arrList
}
arrClass=new Array(39);
arrClass[1]=new buildClass("Animist","ra_null.html",new Array(0,1,3,13,15,18,21,22,23,24,26,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,56,57,58,59,93));
arrClass[2]=new buildClass("Bard","ra_bard.html",new Array(0,1,2,3,4,5,13,15,16,18,19,21,22,23,25,29,30,32,36,37,38,39,40,41,42,43,49,50,56,57,58,59,74));
arrClass[3]=new buildClass("Blademaster","ra_blademaster.html",new Array(0,1,2,3,4,6,7,10,11,12,13,15,17,18,19,36,37,38,39,40,41,42,43,46,47,48,49,50,51,52,53,56,90,99));
arrClass[4]=new buildClass("Champion","ra_champion.html",new Array(0,1,2,3,4,5,6,7,13,14,15,18,21,22,24,32,36,37,38,39,40,41,42,43,49,50,51,52,53,56,57,58,59,76,100));
arrClass[5]=new buildClass("Druid","ra_druid.html",new Array(0,1,3,5,13,15,16,18,21,22,23,25,26,29,30,32,34,36,37,38,39,40,41,42,43,56,57,58,59,69,92));
arrClass[6]=new buildClass("Eldritch","ra_eldritch.html",new Array(0,1,3,13,15,18,21,22,23,24,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,49,56,57,58,59,79));
arrClass[7]=new buildClass("Enchanter","ra_enchanter.html",new Array(0,1,3,13,15,18,21,22,23,26,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,49,56,57,58,59,83));
arrClass[8]=new buildClass("Hero","ra_hero.html",new Array(0,1,2,3,4,5,6,7,13,14,15,16,17,18,36,37,38,39,40,41,42,43,46,47,48,49,50,51,52,53,56,91,99));
arrClass[9]=new buildClass("Mentalist","ra_mentalist.html",new Array(0,1,3,13,15,18,21,22,23,24,25,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,56,57,58,59,84));
arrClass[10]=new buildClass("Nightshade","ra_nightshade.html",new Array(0,1,3,4,7,10,11,12,13,14,15,18,19,20,21,24,36,37,38,39,40,41,42,43,45,49,51,52,53,56,59,61));
arrClass[11]=new buildClass("Ranger","ra_ranger.html",new Array(0,1,2,3,4,8,9,11,12,13,14,15,18,19,21,32,36,37,38,39,40,41,42,43,44,49,50,54,55,56,59,62));
arrClass[12]=new buildClass("Valewalker","ra_null.html",new Array(0,1,2,3,4,6,7,13,15,18,19,21,22,24,28,36,37,38,39,40,41,42,43,49,50,51,52,53,56,57,58,59,95,100));
arrClass[13]=new buildClass("Warden","ra_warden.html",new Array(0,1,2,3,4,5,6,13,15,16,17,18,21,22,23,25,30,32,36,37,38,39,40,41,42,43,49,50,51,52,53,56,57,58,59,80));

arrClass[14]=new buildClass("Berserker","ra_null.html",new Array(0,1,2,3,4,6,10,11,12,13,14,15,18,19,36,37,38,39,40,41,42,43,46,47,48,49,50,51,52,53,56,89,99));
arrClass[15]=new buildClass("Bonedancer","ra_null.html",new Array(0,1,3,13,15,18,21,22,23,24,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,56,57,58,59,98));
arrClass[16]=new buildClass("Healer","ra_null.html",new Array(0,1,3,5,13,15,16,18,21,22,23,24,25,29,30,32,34,36,37,38,39,40,41,42,43,56,57,58,59,70,92));
arrClass[17]=new buildClass("Hunter","ra_null.html",new Array(0,1,2,3,4,7,8,9,13,14,15,18,19,21,26,32,36,37,38,39,40,41,42,43,44,49,50,54,55,56,59,62));
arrClass[18]=new buildClass("Runemaster","ra_null.html",new Array(0,1,3,13,15,18,21,22,23,24,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,49,56,57,58,59,78));
arrClass[19]=new buildClass("Savage","ra_null.html",new Array(0,1,2,3,4,6,7,10,11,12,13,15,18,19,36,37,38,39,40,41,42,43,46,47,48,49,50,51,52,53,56,97));
arrClass[20]=new buildClass("Shadowblade","ra_null.html",new Array(0,1,2,3,4,7,10,11,12,13,15,18,19,20,36,37,38,39,40,41,42,43,45,49,51,52,53,56,59,72));
arrClass[21]=new buildClass("Shaman","ra_null.html",new Array(0,1,3,5,13,15,16,18,21,22,23,24,25,29,30,32,34,36,37,38,39,40,41,42,43,49,50,56,57,58,59,82));
arrClass[22]=new buildClass("Skald","ra_null.html",new Array(0,1,2,3,4,5,6,13,14,15,16,18,21,22,32,36,37,38,39,40,41,42,43,49,50,51,52,53,56,57,58,59,75));
arrClass[23]=new buildClass("Spiritmaster","ra_null.html",new Array(0,1,3,13,15,18,21,22,23,24,26,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,56,57,58,59,67,68));
arrClass[24]=new buildClass("Thane","ra_null.html",new Array(0,1,2,3,4,5,6,7,13,15,16,18,21,22,23,36,37,38,39,40,41,42,43,49,50,51,52,53,56,57,59,86,100));
arrClass[25]=new buildClass("Warrior","ra_null.html",new Array(0,1,2,3,4,5,6,7,13,14,15,17,18,36,37,38,39,40,41,42,43,46,47,48,49,50,51,52,53,56,88,99));

arrClass[26]=new buildClass("Armsman","ra_null.html",new Array(0,1,2,3,4,5,6,7,13,14,15,17,18,36,37,38,39,40,41,42,43,46,47,48,49,50,51,52,53,56,63,99));
arrClass[27]=new buildClass("Cabalist","ra_null.html",new Array(0,1,3,13,15,18,21,22,23,24,26,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,56,57,58,59,85));
arrClass[28]=new buildClass("Cleric","ra_null.html",new Array(0,1,3,13,14,15,16,18,21,22,23,25,29,30,31,32,34,35,36,37,38,39,40,41,42,43,56,57,58,59,64,92));
arrClass[29]=new buildClass("Friar","ra_null.html",new Array(0,1,2,3,4,6,7,13,15,16,18,19,21,22,30,32,34,36,37,38,39,40,41,42,43,47,49,50,56,57,58,59,60));
arrClass[30]=new buildClass("Infiltrator","ra_null.html",new Array(0,1,2,3,4,10,11,12,13,15,18,19,20,36,37,38,39,40,41,42,43,45,49,51,52,53,56,59,71));
arrClass[31]=new buildClass("Mercenary","ra_null.html",new Array(0,1,2,3,4,6,7,10,11,13,15,18,19,36,37,38,39,40,41,42,43,46,47,48,49,50,51,52,53,56,87,99));
arrClass[32]=new buildClass("Minstrel","ra_null.html",new Array(0,1,2,3,4,5,7,13,14,15,18,19,21,22,23,32,36,37,38,39,40,41,42,43,49,50,51,52,53,56,57,58,59,73));
arrClass[33]=new buildClass("Necromancer","ra_null.html",new Array(0,1,3,13,15,18,21,22,23,24,26,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,56,57,58,59,96));
arrClass[34]=new buildClass("Paladin","ra_null.html",new Array(0,1,2,3,4,5,6,7,13,14,15,16,17,18,21,32,36,37,38,39,40,41,42,43,47,48,49,50,51,52,53,56,59,66,100));
arrClass[35]=new buildClass("Reaver","ra_null.html",new Array(0,1,2,3,4,5,6,7,13,15,16,18,21,22,24,36,37,38,39,40,41,42,43,49,50,51,52,53,56,59,94,100));
arrClass[36]=new buildClass("Scout","ra_null.html",new Array(0,1,3,4,5,7,8,9,13,15,18,19,20,36,37,38,39,40,41,42,43,44,49,50,51,52,53,54,55,56,59,62));
arrClass[37]=new buildClass("Sorcerer","ra_null.html",new Array(0,1,3,13,15,18,21,22,23,24,26,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,56,57,58,59,81));
arrClass[38]=new buildClass("Theurgist","ra_null.html",new Array(0,1,3,13,15,18,21,22,23,24,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,49,56,57,58,59,65));
arrClass[39]=new buildClass("Wizard","ra_null.html",new Array(0,1,3,13,15,18,21,22,23,24,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,49,56,57,58,59,77));