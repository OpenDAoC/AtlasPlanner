
function evalFree(){
	x=1;
	tempfree = eval(document.forms["frmdata"].elements["frmtotal"].value);
	temp = arrData.length - 1;
	while (x<=temp)	{
		if (arrData[x]&&arrData[x].level >= 1){
			count=1;
			while (count<=arrData[x].level)	{
				check=override(classID,x);
				if (check==0)	{tempfree=tempfree - arrData[x].cost[count];}
				else	{tempfree=tempfree - check;}
				count=count+1;	
			}
		}
		x=x+1;
	}
	document.forms["frmdata"].elements["frmfree"].value = tempfree;
}

function evalTotal(){
	
	
	if (eval(document.forms["frmdata"].elements["frmrank"].value)>13)	{document.forms["frmdata"].elements["frmrank"].value=13}
	if (eval(document.forms["frmdata"].elements["frmlevel"].value)>13) {document.forms["frmdata"].elements["frmlevel"].value=13}
	rr = eval(document.forms["frmdata"].elements["frmrank"].value) - 1;
	if (rr<0){rr=0}
	rl = eval(document.forms["frmdata"].elements["frmlevel"].value);
	total = (rr * 10) + rl;
	document.forms["frmdata"].elements["frmtotal"].value = total;
	
	evalFree();
}


function incRA(z)	{
	fix="frm"+z;
	temp=arrData[z].level +1;
	points=false;
	prereq=false;
	
	/* Make sure not Maxed */
	if (temp>5)	{
			window.alert(arrData[z].name+" can not be trained any higher.");
		}
	else	{
		if (arrData[z].cost[temp]!=0)	{
			/* Make sure prereqs are met */
			if (arrData[z].req>0)	{
				prereqvalue=arrData[arrData[z].req].level;
				if (prereqvalue>=arrData[z].reqlvl) {
					prereq=true;
					}
				else {window.alert("You must train "+arrData[arrData[z].req].name+" to level "+arrData[z].reqlvl+" before raising this skill.");}
				}
			else {prereq=true;}
		
			/* Make sure user has enough points to train */
			tempcost=0;
			check=override(classID,z);
			if (check==0)	{tempcost=arrData[z].cost[temp]}
			else	{tempcost=check}

			if (eval(document.forms["frmdata"].elements["frmfree"].value)>=tempcost)	{
				points=true;
				}
			else {window.alert("Insufficient Points to train this skill");}
			
			if (points){
			if (prereq)	{
					arrData[z].level = temp;
					document.forms["frmdata"].elements[fix].value = arrData[z].level;
					evalTotal();
					document.forms["frmdata"].elements[fix].style.backgroundColor="#FFFFFF";
					showskills();
				}
				}
		}
		else	{window.alert(arrData[z].name+" can not be trained any higher.");}

	}
}

function decRA(z)	{
	fix="frm"+z;
	temp = eval(document.forms["frmdata"].elements[fix].value) - 1;
	if (temp<0)	{temp=0}
	arrData[z].level = temp;
	document.forms["frmdata"].elements[fix].value = arrData[z].level;
	if (temp==0)	{document.forms["frmdata"].elements[fix].style.backgroundColor="#FFFFFF";}
	evalTotal();
	showskills();
}


function incRR()	{
	temp = eval(document.forms["frmdata"].elements["frmrank"].value) + 1; 
	rl = eval(document.forms["frmdata"].elements["frmlevel"].value);		
	if (temp>13){temp=13;} 
	if (temp==13){document.forms["frmdata"].elements["frmlevel"].value = 0;}
	document.forms["frmdata"].elements["frmrank"].value = temp; 
	if (temp<10){if (rl>9){document.forms["frmdata"].elements["frmlevel"].value=9;}}
	evalTotal(); 
	showskills();
	}

function decRR()	{
	temp = eval(document.forms["frmdata"].elements["frmrank"].value) - 1; 
	rl = eval(document.forms["frmdata"].elements["frmlevel"].value);		
	if (temp<1){temp=1;} 
	document.forms["frmdata"].elements["frmrank"].value = temp;
	if (temp==9){if (rl==10){document.forms["frmdata"].elements["frmlevel"].value=9;}}
	evalTotal(); 
	showskills();}

function incRL()	{
	temp = eval(document.forms["frmdata"].elements["frmlevel"].value) + 1; 
	rr= eval(document.forms["frmdata"].elements["frmrank"].value);
	rl = eval(document.forms["frmdata"].elements["frmlevel"].value);	
	if (rr==13){temp = 0;}
	if (temp==10){
		if (rr==13){document.forms["frmdata"].elements["frmlevel"].value = 0;}
		else {
			document.forms["frmdata"].elements["frmlevel"].value = 0;
			document.forms["frmdata"].elements["frmrank"].value = rr+1;
			}
		}
	else {document.forms["frmdata"].elements["frmlevel"].value = temp;}

	evalTotal(); 
	showskills();
	}
	
function decRL()	{temp = eval(document.forms["frmdata"].elements["frmlevel"].value) - 1; if (temp<0){if(eval(document.forms["frmdata"].elements["frmrank"].value)>1){temp=9;document.forms["frmdata"].elements["frmrank"].value = document.forms["frmdata"].elements["frmrank"].value-1; }} if(document.forms["frmdata"].elements["frmrank"].value==1){if(temp<1)temp=0;} document.forms["frmdata"].elements["frmlevel"].value=temp; evalTotal(); showskills();}