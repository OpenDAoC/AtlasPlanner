function override(tempClassID,tempRAID)	{
	if (tempClassID==8||tempClassID==3||tempClassID==14||tempClassID==25||tempClassID==26||tempClassID==31||tempClassID==19)	{
		if (tempRAID==50)	{return 8;}	/* Ignore Pain */
		if (tempRAID==59)	{return 4;}	/* purge */
	}
	return 0;
}


