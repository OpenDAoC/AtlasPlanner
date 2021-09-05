function checkclassra(raID) {
        	moo = arrClass[classID].arrList.length - 1;
		x=1;
        	while (x<=moo)  {

                	if (raID==arrClass[classID].arrList[x]) {
				return 1;
			}
			x=x+1;
		}
		return 0;
	}	
function showskills(){

	count = 1;
	arrHib = new Array('Wayfarer', 'Savant', 'Cosantoir', 'Brehon', 'Grove Protector', 'Raven Ardent', 'Silver Hand', 'Thunderer', 'Gilded Spear', 'Tiarna', 'Emerald Ridere', 'Barun/Banbharun', 'Ard Tiarna/Ard Bantiarna', 'Ciann/Cath');
	arrMid = new Array('null', 'Skiltvakten', 'Isen Vakten', 'Flammen Vakten', 'Elding Vakten', 'Stormur Vakten', 'Isen Herra', 'Flammen Herra', 'Elding Herra', 'Stormur Herra', 'Einherjar', 'Herra/Fru', 'Hersir/Baronsfru', 'Vicomte/Vicomtessa');
	arrAlb = new Array('null', 'Guardian', 'Warder', 'Myrmidon', 'Gryphon Knight', 'Eagle Knight', 'Phoenix Knight', 'Unicorn Knight', 'Lion Knight', 'Dragon Knight', 'Lord/Lady', 'Baronet/Baronetess', 'Baron/Baroness');
	
	if (classID <= 13) {
		arrTitle = arrHib;
	}
	if (classID >= 14 && classID <= 25) {
		arrTitle = arrMid;
	}
	if (classID >= 26) {
		arrTitle = arrAlb;
	}
	
	tempstring = "";
	tempstring = tempstring + "" + arrTitle[document.forms["frmdata"].elements["frmrank"].value] + "\040\040\040";
	tempstring = tempstring + "(R" + document.forms["frmdata"].elements["frmrank"].value + "\040\040";
	tempstring = tempstring + "L" + document.forms["frmdata"].elements["frmlevel"].value + ")\012";
	
	tempstring = tempstring + "Total Points: " + document.forms["frmdata"].elements["frmtotal"].value + "\011";
	tempstring = tempstring + "Unused Points: " + document.forms["frmdata"].elements["frmfree"].value + "\012\012";
	check = arrData.length - 1;
	
	while (count <= check) {
		
		if (arrData[count]&&arrData[count].level >= 1 && checkclassra(count)) {
			
				tempname = arrData[count].name;
				
				while (tempname.length < 27) {
					tempname = tempname + "\040";
				}
				
				if (arrData[count].enomath) {
					tempe = ""
				}
				else {
					//tempe=arrData[count].evalue * arrData[count].level
					switch (arrData[count].level) {
						case (0):
							tempe = ""
							break
						case (1):
							tempe = arrData[count].evalue1
							break
						case (2):
							tempe = arrData[count].evalue2
							break
						case (3):
							tempe = arrData[count].evalue3
							break
						case (4):
							tempe = arrData[count].evalue4
							break
						case (5):
							tempe = arrData[count].evalue5
							break
					}
				}
				
				if (arrData[count].indent) {
					tempstring = tempstring + "\040\040\040\040\040";
				}
				addString = "(" + arrData[count].level + ")\040" + tempname + "\011\011" + arrData[count].epre + "" + tempe + "\040" + arrData[count].edesc + "\012";
				if(addString.indexOf("Tireless")>-1){
				tempstring = tempstring + addString;}
				else if(addString.indexOf("R5L0 RA")>-1){
				 if(tempstring.indexOf("R5")>-1 | tempstring.indexOf("R6")>-1 | tempstring.indexOf("R7")>-1 | tempstring.indexOf("R8")>-1 | tempstring.indexOf("R9")>-1 | tempstring.indexOf("R10")>-1 | tempstring.indexOf("R11")>-1| tempstring.indexOf("R12")>-1| tempstring.indexOf("R13")>-1){tempstring = tempstring + addString;}
				}
				else {tempstring = tempstring + addString;}
			}
			count = count + 1;
		
	}
	

		document.forms["frmdata"].elements["frmskills"].innerText=tempstring;
		document.forms["frmdata"].elements["frmskills"].value=tempstring;
	}