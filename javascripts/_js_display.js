	x=1;
	document.write("<table id='ras' border='1' cellpadding='0' cellspacing='0' width='100%'>");
	document.write("<tr><td class='unique' align='center'>Current Level</td>");
	document.write("<td class='unique' align='center'>Ability Name</td>");
	document.write("<td class='unique' align='center'>Type</td>");
	document.write("<td class='unique' align='center' colspan='5'>Training Cost</td>");
	//document.write("<td class='unique' align='center' width='150'>Required Skill</td>");
	//document.write("<td class='unique' align='center'>Level</td>");
	document.write("<td class='unique' align='center'>Description</td>");
	document.write("</tr>");
	
	/*	moo = arrData.length - 1;	*/
	
	moo = arrClass[classID].arrList.length - 1;
	while (x<=moo)	{
		raID = arrClass[classID].arrList[x];
		document.write("<tr>");
		document.write("<td align='center'><input readonly='readonly' name='frm"+raID+"' class='frmtext2' size='2' value='"+arrData[raID].level+"'>");
		
		document.write("&nbsp;&nbsp;<a href='javascript:void(0)' onclick='decRA("+raID+");'><img src='../images/minus.jpg' border='0'></a>");
		document.write("&nbsp;&nbsp;<a href='javascript:void(0)' onclick='incRA("+raID+");'><img src='../images/plus.jpg' border='0'></a></td>");
		if (arrData[raID].indent)	{document.write("<td>&nbsp;&nbsp;&nbsp;&nbsp;"+arrData[raID].name+"</td>");}
		else {document.write("<td class='grey'><b>"+arrData[raID].name+"</b></td>");}
		document.write("<td align='center'>"+arrData[raID].type+"</td>");
		count=1;
		while (count<=5) {
			if (arrData[raID].cost[count]==0)	{document.write("<td align='right' width='20'>-</td>");}
			else {
				check=override(classID,raID);
				if (check==0)	{document.write("<td align='right' width='20'>"+arrData[raID].cost[count]+"</td>");}
				else	{document.write("<td align='right' width='20'>"+check+"</td>");}
			}
			count=count+1;
			}
		/*
		temp=arrData[raID].req;
		if (temp==0)	{
			document.write("<td>&nbsp;</td><td>&nbsp;</td>");
			}
		else	{
			
			if(arrData[temp].name=="Augmented Constitution") {
			document.write("<td align='right'><i>Augmented Con.</i></td>");
			document.write("<td align='center'>"+arrData[raID].reqlvl+"</td>");}
			
			else {
			
			document.write("<td align='right'><i>"+arrData[temp].name+"</i></td>");
			document.write("<td align='center'>"+arrData[raID].reqlvl+"</td>");}
			}
			*/
		extraDesc = arrData[raID].evalue ? "<span>"+arrData[raID].evalue+" / lvl</span>":"";
		document.write("<td>"+arrData[raID].description+extraDesc+"</td>");
		document.write("</tr>");
		x=x+1;
		}
	document.write("</table>")

	
