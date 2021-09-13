function clear() {
    $("#BASE").val('30');
    $("#SPENT").val('0');
    $("#LEFT").val('0');
    $("#BONUS").val('0');
    $("#LEVEL").val('1');
    $("#SKILL").val('0');

}

function spellPT(name, lvl, line, ability, info, skill, power, range, cast, area, recast, duration, type) {
    this.name = name
    this.lvl = lvl
    this.line = line
    this.ability = ability
    this.info = info
    this.skill = skill
    this.power = power
    this.range = range
    this.cast = cast
    this.area = area
    this.recast = recast
    this.duration = duration
    this.type = type
}

function linePT(name, description, ability, current) {
    this.name = name
    this.description = description
    this.ability = ability
    this.current = current
}

function abilityPT(name, lvl, id, type, train, mastery, child, mo1, mo2) {
    this.name = name
    this.lvl = lvl
    this.id = id
    this.type = type
    this.train = train
    this.mastery = mastery // =id of parent base line
    this.child = child
}

function BuildStylePT(spec, lvl, name, opening, special, fat, dmg, abonus, defense, followup, specialdesc, gr) {
    var id = (spec == "Crush" ? 87:
        spec == "Slash" ? 85:
        spec == "Thrust" ? 89:
        spec == "Shield" ? 97:
        spec == "Polearm" ? 91:
        spec == "2-Hand" ? 93:
        spec == "Dual Wield" ? 118:
        spec == "Staff" ? 83:
        spec == "Crit Strike" ? 142:
        spec == "Flexible" ? 167:
        spec == "Blades" ? 123:
        spec == "Blunt" ? 122:
        spec == "Pierce" ? 125:
        spec == "Celtic Spear" ? 127:
        spec == "Celtic Dual" ? 147:
        spec == "Large Weapons" ? 128:
        spec == "Scythe" ? 168:
        spec == "HandToHand" ? 169:
        spec == "Sword" ? 130:
        spec == "Axe" ? 131:
        spec == "Hammer" ? 137:
        spec == "Left Axe" ? 132:
        spec == "Spear" ? 139:
        spec == "Bow" ? 129:
        -1
    );

    if (id == -1) {
        console.log('Error: unrecognized spec: ' + spec);
        return;
    }
    lvl = eval(lvl);
    if (specialdesc != "") specialdesc += "<br>";
    if (followup != "") specialdesc += "<b>Follow-up: </b>" + followup;
    dmg = (gr == "unknown" ? "not tested": " [GR:" + gr.replace(',', '.') + "]");
    dbonus = dpenalty = "";
    if (defense.toLowerCase().indexOf('bonus') == -1) {
        dpenalty = defense;
    } else {
        dbonus = defense;
    }
    return new stylePT(id, name, lvl, special, fat, dmg, abonus, dbonus, dpenalty, opening, 0, specialdesc);
}

function stylePT(id, name, lvl, special, fat, dmg, abonus, dbonus, dpenalty, opening, current, specialdesc, mo1, mo2) {
    this.id = id
    this.name = name
    this.lvl = lvl
    this.special = special
    this.fat = fat
    this.dmg = dmg
    this.abonus = abonus
    this.dbonus = dbonus
    this.dpenalty = dpenalty
    this.opening = opening
    this.specialdesc = specialdesc
}

function getDOMObj(obj) {
    return document.getElementById(obj);
}

function getIE4Obj(obj) {
    return document.all[obj];
}

function getNS4Obj(obj) {}

if (document.getElementById) myGetObject = getDOMObj
else if (document.all) myGetObject = getIE4Obj
else if (document.layers) myGetObject = getNS4Obj

if (document.layers) document.captureEvents(Event.MOUSEMOVE);
document.onmousemove = mtrack;
mousex = 0
mousey = 0

function mtrack(e) {
    if (document.layers) {
        mousex = e.pageX
        mousey = e.pageY
    } else {

    }
}

function showDoc(id, lineid) {
    if (document.all) {
        x = document.body.scrollLeft
        y = document.body.scrollTop
    } else {
        x = window.pageXOffset
        y = window.pageYOffset
    }
    mx = mousex - 10 + x
    my = mousey - 295 + y
    if (mx < 0) mx = 0;
    if (my < 0) my = 0;

    doc = myGetObject("DOCUMENTATION" + id);
    output = "<b bgcolor='lightgray'>" + Lines[lineid].name + "</b> - " + Lines[lineid].description
    output += "<hr><table bgcolor='lightgray'   >"

    for (x = 1; x <= Spells.length; x++) {
        if (Spells[x] == null) break;
        if (Spells[x].line == lineid) output += "<tr bgcolor='light' ><td>" + Spells[x].lvl + "</td><td bgcolor='lightgray'>" + Spells[x].name + "</td><td>" + Spells[x].info + "</td></tr>"
    }

    output += "</table>"

    doc.innerHTML = output;
    doc.style.visibility = 'visible'
    doc.style.left = mx
    doc.style.top = my
}

function calcSkill(skill, checkLimits) {
    olevel = myGetObject("LEVEL")
    oskill = myGetObject("SKILL" + skill)
    ocost = myGetObject("COST" + skill)
    ospent = myGetObject("SPENT" + skill)
    operc = myGetObject("PERC" + skill)

    skillCost = 0
    for (var i = 2; i <= oskill.value; i++) {
        if (skillCost + i > parseInt(myGetObject("LEFT").value) + parseInt(ospent.innerHTML)) break;
        if (i > olevel.value) break;
        skillCost += i
    }

    change = skillCost - ospent.innerHTML;

    ospent.innerHTML = skillCost;
    oskill.value = i - 1;
    ocost.innerHTML = i;

    myGetObject("SPENT").value = parseInt(myGetObject("SPENT").value) + change
    myGetObject("LEFT").value = myGetObject("LEFT").value - change

    for (i = 1; i < Abilities.length; i++) {
        if (Abilities[i].type == 3 || (Abilities[i].type == 2 && Abilities[i].lvl == 5)) showSpell(Abilities[i])
        if (Abilities[i].type == 5 && Abilities[i].train == 1) showStyle(Abilities[i])
    }
}


function moLine(line, id) {
    if (id > 0) {
        l1Revert = myGetObject("LINENAME" + line).innerHTML;
        l2Revert = myGetObject("LINEDESC" + line).innerHTML;
        l3Revert = myGetObject("LINEEFFECT" + line).innerHTML;
        output = "";
        output += "<div style='width:15em; border:2px solid #000000; background-color:lightgray; color:#000; z-index: 100000; position:absolute;   text-align: center; visibility:visible;'><b style='color:333333'>" + Spells[id].name + "</b><br/>";
        output += "<span bgcolor='lightgray' style='color:blue'>" + Spells[id].info + "&nbsp;</span><br/>";
        if (Spells[id].type != "") output += "<b style='color:666666'>" + Spells[id].type + " </b><br/>"
        if (Spells[id].power != "") output += "<b style='color:333333'>COST</b>&nbsp;" + Spells[id].power + "<br/> "
        if (Spells[id].range != "") output += "<b style='color:333333'>RANGE</b>&nbsp;" + Spells[id].range + "<br/> "
        if (Spells[id].area != "") output += "<b style='color:333333'>AREA</b>&nbsp;" + Spells[id].area + "<br/> "
        if (Spells[id].duration != "") output += "<b style='color:333333'>DURATION</b>&nbsp;" + Spells[id].duration + "<br/> "

        if (Spells[id].cast != "") output += "<b style='color:333333'>CAST TIME</b>&nbsp;" + Spells[id].cast + "<br/> "
        if (Spells[id].recast != "") output += "<b style='color:333333'>RECAST</b>&nbsp;" + Spells[id].recast + "<br/> "
        output += "</div>";
        myGetObject("LINENAME" + line).innerHTML = "";
        myGetObject("LINEEFFECT" + line).innerHTML = "";
        $(myGetObject("LINEDESC" + line)).show();
        myGetObject("LINEDESC" + line).innerHTML = output;
        return "blue"
    } else {
        myGetObject("LINENAME" + line).innerHTML = l1Revert;
        myGetObject("LINEDESC" + line).innerHTML = l2Revert;
        myGetObject("LINEEFFECT" + line).innerHTML = l3Revert;
        $(myGetObject("LINEDESC" + line)).hide();
        return ""
    }
}







function moStyle(abilityid, activeid) {
    if (activeid > 0) {

        s1Revert = myGetObject("STYLENAME" + abilityid).innerHTML;
        s2Revert = myGetObject("STYLEDESC" + abilityid).innerHTML;
        output = "<table bgcolor='lightgray' cellspacing=0 cellpadding=0 style='width:15em; border:2px solid #000000; background-color:lightgray; color:#000; z-index: 100000; position:absolute;   text-align: center; visibility:visible;'  ><tr><td width=100%  style='white-space: normal;'>" + "<b style='color:333333  '>" + Styles[activeid].name + "</b>";
        if (Styles[activeid].opening != "") output += "<br><b style='color:444444'>Opening:&nbsp;</b>" + Styles[activeid].opening + " ";
        output += "<br><b style='color:444444'>Fatigue:&nbsp;</b>" + Styles[activeid].fat + " ";
        if (Styles[activeid].dmg != "") output += "<br><b style='color:444444'>Damage:&nbsp;</b>" + Styles[activeid].dmg + " ";
        if (Styles[activeid].abonus != "") output += "<br><b style='color:444444'>Attack:&nbsp;</b>" + Styles[activeid].abonus + " ";
        if (Styles[activeid].dpenalty != "") output += "<br><b style='color:444444'>Defense:&nbsp;</b>" + Styles[activeid].dpenalty + " ";
        if (Styles[activeid].dbonus != "") output += "<br><b style='color:444444'>Defense:&nbsp;</b>" + Styles[activeid].dbonus + " ";
        if (Styles[activeid].special != "") output += "<br><b style='color:444444'>Special:&nbsp;</b>" + Styles[activeid].special + " ";
        if (Styles[activeid].specialdesc != "") output += "<br><b style='color:444444'></b>" + Styles[activeid].specialdesc + " ";





        output += "</td></tr></table>"

        myGetObject("STYLEDESC" + abilityid).innerHTML = output;
        $(myGetObject("STYLEDESC" + abilityid)).show();
        return "blue";
    } else {
        myGetObject("STYLENAME" + abilityid).innerHTML = s1Revert;
        myGetObject("STYLEDESC" + abilityid).innerHTML = s2Revert;
        $(myGetObject("STYLEDESC" + abilityid)).hide();
        if (activeid == -2) { return "blue" } else { return "" };
    }
}







function showStyle(ability) {
    activeid = 0;
    lvl = ability.lvl;
    iline = " ";
    l = parseInt(myGetObject("SKILL" + ability.id).value)
    for (x = 1; x < Styles.length; x++) {
        if (Styles[x]) {
            if (Styles[x].id == ability.id) {
                if (Styles[x].lvl > l) iline += "<span bgcolor='lightgray' style='position:relative; ' onmouseout='this.style.color=moStyle(" + ability.id + ",-1)' " +
                    "onclick='bQuickSkillTo(" + ability.id + "," + Styles[x].lvl + ")'" +
                    "onmouseover='this.style.color=moStyle(" + ability.id + "," + x + ");'>" + Styles[x].lvl + "</span> "
                else {
                    activeid = x;
                    iline += "<span bgcolor='lightgray' style='color:blue;position:relative;   ' onmouseout='this.style.color=moStyle(" + ability.id + ",-2);' " +
                        "onclick='bQuickSkillTo(" + ability.id + "," + Styles[x].lvl + ")'" +
                        "onmouseover='this.style.color=moStyle(" + ability.id + "," + x + "); '>" + Styles[x].lvl + "</span> "
                }
            }
        }
    }

    myGetObject("STYLE" + ability.id).innerHTML = iline
}



function showSpell(ability) {
    lvl = ability.lvl;
    oline = 0;
    curlinelvl = 0;
    activeid = 0;
    iline = " ";
    l = myGetObject("LEVEL").value;
    for (x = 1; x < Spells.length; x++) {
        if (Spells[x].skill == ability.id) {
            if (oline > 0 && oline != Spells[x].line) {
                if (curlinelvl != Lines[Spells[x - 1].line].current || l == 1) {
                    // if (lvl > l) iline = "<font bgcolor='lightgray'
                    // color='888888'>" + iline + "</font>";
                    myGetObject("LINE" + oline).innerHTML = iline;
                    if (activeid != 0) {
                        myGetObject("LINED" + oline).innerHTML = '&nbsp;' + Spells[activeid].info + '&nbsp;';
                    } else {
                        myGetObject("LINED" + oline).innerHTML = '&nbsp;';
                    }
                    Lines[Spells[x - 1].line].current = curlinelvl;
                    if (Lines[Spells[x - 1].line].description != '') {
                        $('#LINEINFO' + oline).html(Lines[Spells[x - 1].line].description);
                    } else {
                        $('#LINEINFO' + oline).html('No description available.');
                    }
                }
                iline = " ";
                curlinelvl = 0;
                activeid = 0;
            }
            if (ability.type == 2 && ability.train == 1) {
                skilllvl = parseInt(myGetObject("SKILL" + ability.id).value)
            } else skilllvl = l;
            oline = Spells[x].line
            if (Spells[x].lvl > l || lvl > l) iline += "<font bgcolor='lightgray' style=' ' onmouseout='this.style.color=moLine(" + oline + ",-1);' " +
                (ability.type == 3 ? "onclick='bQuickSkillTo(" + ability.mastery + "," + Spells[x].lvl + ")'": "") +
                "onmouseover='this.style.color=moLine(" + oline + "," + x + ")'>" + Spells[x].lvl + " </font>"
            else {
                if (ability.type == 3 && parseInt(myGetObject("SKILL" + ability.mastery).value) < Spells[x].lvl) iline += "<font bgcolor='lightgray' style='' onmouseout='moLine(" + oline + ",-1)' " +
                    "onclick='bQuickSkillTo(" + ability.mastery + "," + Spells[x].lvl + ")'" +
                    "onmouseover='moLine(" + oline + "," + x + ")'>" + Spells[x].lvl + " </font>"
                else {
                    if (ability.type == 2 && ability.child == 0 && skilllvl < Spells[x].lvl) iline += "<font bgcolor='lightgray' style='' onmouseout='moLine(" + oline + ",-1)' " +
                        "onmouseover='moLine(" + oline + "," + x + ")'>" + Spells[x].lvl + " </font>"
                    else {
                        curlinelvl = Spells[x].lvl;
                        activeid = x;
                        iline += "<font bgcolor='lightgray' style=' ' color=blue onmouseout='this.style.color=moLine(" + oline + ",-1)' " +
                            (ability.type == 3 ? "onclick='bQuickSkillTo(" + ability.mastery + "," + Spells[x].lvl + ")'": "") +
                            "onmouseover='this.style.color=moLine(" + oline + "," + x + ")'>" + Spells[x].lvl + " </font>"
                    }
                }
            }
        } else if (oline > 0) break;
    }
    if (iline != " ") {
        if (curlinelvl != Lines[Spells[x - 1].line].current || l == 1) {
            // if (lvl > l) iline = "<font bgcolor='lightgray' color='888888'>"
            // + iline + "</font>";
            myGetObject("LINE" + oline).innerHTML = iline;
            if (activeid != 0) {
                myGetObject("LINED" + oline).innerHTML = '&nbsp;' + Spells[activeid].info + '&nbsp;';
            } else {
                myGetObject("LINED" + oline).innerHTML = '&nbsp;';
            }
            Lines[Spells[x - 1].line].current = curlinelvl;
            if (Lines[Spells[x - 1].line].description != '') {
                $('#LINEINFO' + oline).html(Lines[Spells[x - 1].line].description);
            } else {
                $('#LINEINFO' + oline).html('No description available.');
            }
        }
    }
}

function calcSpec(lvl) {
    intLevel = Math.floor(lvl);
    lowLevel = lvl < 5 ? lvl: 5
    specTotal = 0;

    for (i = 2; i <= lowLevel; i++)
        specTotal += Math.floor(i * 1);
    for (i = 6; i <= intLevel; i++)
        specTotal += Math.floor(i * specMult);
    for (i = 40.5; i <= lvl; i++)
        specTotal += Math.floor(Math.floor(i) / 2 * specMult);

    p = eval('s' + pStat)
    s = eval('s' + sStat)
    t = eval('s' + tStat)

    if (parseInt(lvl) > 5) {
        p[998] = parseInt(lvl) - 5
        s[998] = Math.round((parseInt(lvl) - 5) / 2)
        t[998] = Math.round((parseInt(lvl) - 4) / 3)
    } else {
        p[998] = 0;
        s[998] = 0;
        t[998] = 0;
    }
    sRace(raceID)

    myGetObject("SKILL").value = Math.round(specTotal)
    myGetObject("LEFT").value = Math.round(specTotal) - parseInt(myGetObject("SPENT").value) + parseInt(myGetObject("BONUS").value);

    for (i = 1; i < Abilities.length; i++) {
        if (Abilities[i].train == 1) {
            if (parseInt(myGetObject("SKILL" + Abilities[i].id).value) > lvl) {
                var diff = parseInt(myGetObject("SKILL" + Abilities[i].id).value) - lvl;
                bSkill(Abilities[i].id, diff);
            }
        }

        var o = "nav" + Abilities[i].train + "t" + Abilities[i].id;
        var navo = $('#' + o);
        if (Abilities[i].lvl <= lvl || Abilities[i].id == 119) {
            navo.addClass('enabled');
            navo.next().addClass('enabled');
        } else {
            navo.removeClass('enabled');
            navo.next().removeClass('enabled');
        }
        if (Abilities[i].type == 2 || Abilities[i].type == 3) showSpell(Abilities[i]);
    }
}

function sdToggle(item, value) {
    for (x = 1; x < Spells.length; x++) {
        if (myGetObject("ABILITY" + item + Spells[x].ability)) {
            oTemp = myGetObject("ABILITY" + item + Spells[x].ability);
            if (value) {
                oTemp.style.position = 'relative';
                oTemp.style.visibility = 'visible';
            } else {
                oTemp.style.position = 'absolute';
                oTemp.style.visibility = 'hidden';
            }
        }
        if (myGetObject("LINE" + item + Spells[x].line)) {
            oTemp = myGetObject("LINE" + item + Spells[x].line);
            if (value) {
                oTemp.style.position = 'relative';
                oTemp.style.visibility = 'visible';
            } else {
                oTemp.style.position = 'absolute';
                oTemp.style.visibility = 'hidden';
            }
        }
    }
}

function bQuickLevelTo(l) {
    l = (l <= 40 ? l: 40 + (l - 40) * 2);
    if (l < 1) l = 1;
    if (l > 60) l = 60;
    l = l <= 40 ? l: 40 + (l - 40) / 2;
    myGetObject("LEVEL").value = l;
    calcSpec(l);
}

function bLevel(inc) {
    l = parseFloat(myGetObject("LEVEL").value);
    l = (l <= 40 ? l: 40 + (l - 40) * 2) + inc;
    if (l < 1) l = 1;
    if (l > 60) l = 60;
    l = l <= 40 ? l: 40 + (l - 40) / 2;
    myGetObject("LEVEL").value = l;
    calcSpec(l);
}

function bBonus(inc) {
    if (parseInt(myGetObject("BONUS").value) + inc >= 0) { myGetObject("BONUS").value = parseInt(myGetObject("BONUS").value) + inc; } else { myGetObject("BONUS").value = 0; }
    calcSpec(myGetObject("LEVEL").value);
}





function bQuickSkillTo(skill, target) {
    o = "SKILL" + skill;
    skillObj = myGetObject(o);
    skillObj.value = target;
    if (skillObj.value < 2) skillObj.value = 1;
    if (skillObj.value > 50) skillObj.value = 50;
    var l = myGetObject("LEVEL").value;
    if (l < target)
        bQuickLevelTo(target);
    calcSkill(skill);
}

function bSkill(skill, inc) {
    o = "SKILL" + skill;
    skillObj = myGetObject(o);
    skillObj.value = parseInt(skillObj.value) + inc;
    if (skillObj.value < 2) skillObj.value = 1;
    if (skillObj.value > 50) skillObj.value = 50;
    calcSkill(skill);
}

function bAttribute(attr, inc) {
    s = eval('s' + attr)
    shift = 0;
    if (inc == -1) shift = 1;
    if (s[999] < 10 + shift) cost = 1
    if (s[999] > 9 + shift && s[999] < 15 + shift) cost = 2
    if (s[999] > 14 + shift) cost = 3
    base = parseInt(myGetObject("BASE").value)
    if (s[999] + inc < 0) return
    if (base - cost * inc < 0) return
    s[999] += inc
    myGetObject("BASE").value = base - cost * inc
    myGetObject(attr).value = s[999] + s[raceID] + s[998]
    if (s[999] > 0) myGetObject(attr).style.color = "#006600"
    if (s[999] == 0) myGetObject(attr).style.color = "black"
}

function sRace(id) {
    raceID = id
    myGetObject("STR").value = sSTR[id] + sSTR[999] + sSTR[998];
    myGetObject("CON").value = sCON[id] + sCON[999] + sCON[998];
    myGetObject("DEX").value = sDEX[id] + sDEX[999] + sDEX[998];
    myGetObject("QUI").value = sQUI[id] + sQUI[999] + sQUI[998];
    myGetObject("INT").value = sINT[id] + sINT[999] + sINT[998];
    myGetObject("PIE").value = sPIE[id] + sPIE[999] + sPIE[998];
    myGetObject("EMP").value = sEMP[id] + sEMP[999] + sEMP[998];
    myGetObject("CHA").value = sCHA[id] + sCHA[999] + sCHA[998];
}

function init() {
    for (i = 1; i < Abilities.length; i++) {
        if (Abilities[i].mastery > 0) {
            for (x = 1; x < Abilities.length; x++) {
                if (Abilities[i].mastery == Abilities[x].id) {
                    Abilities[x].child = i;
                }
            }
        }
    }
    calcSpec(myGetObject("LEVEL").value);
}

var sSTR = new Array()
var sCON = new Array()
var sDEX = new Array()
var sQUI = new Array()
var sINT = new Array()
var sPIE = new Array()
var sEMP = new Array()
var sCHA = new Array()
var moRevert
var raceID

Styles = new Array();
var iStylePT = 1;
// -- Common Styles -- //
Styles[iStylePT++] = BuildStylePT("Shield", "3", "Numb", "Any", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 2 seconds.", "0,047");
Styles[iStylePT++] = BuildStylePT("Shield", "8", "Stun", "You Block", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 3 seconds.", "0,840");
Styles[iStylePT++] = BuildStylePT("Shield", "13", "Disable", "To side of target", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 4 seconds.", "0,645");
Styles[iStylePT++] = BuildStylePT("Shield", "18", "Incapacitate", "You Block", "Stun", "Very High", "Low", "No Bonus", "Medium Bonus", "", "Target cannot move or take any other action for 5 seconds.", "0,859");
Styles[iStylePT++] = BuildStylePT("Shield", "23", "Paralyze", "Behind target", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 6 seconds.", "0,683");
Styles[iStylePT++] = BuildStylePT("Shield", "29", "Bash", "You Block", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 7 seconds.", "0,850");
Styles[iStylePT++] = BuildStylePT("Shield", "35", "Mangle", "To side of target", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 8 seconds.", "0,730");
Styles[iStylePT++] = BuildStylePT("Shield", "42", "Slam", "Any", "Stun", "Very High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 9 seconds.", "0,759");
Styles[iStylePT++] = BuildStylePT("Shield", "50", "Brutalize", "You Block", "Stun", "Medium", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 10 seconds.", "0,850");
Styles[iStylePT++] = BuildStylePT("Crit Strike", "2", "Backstab", "Behind target, stealthed", "Stun", "Medium", "Very Low", "Medium Bonus", "Medium Penalty", "Eviscerate", "Target cannot move or take any other action for 2 seconds.", "0,000");
Styles[iStylePT++] = BuildStylePT("Crit Strike", "4", "Eviscerate", "Backstab", "Slowed", "Medium", "High", "Low Bonus", "Low Penalty", "Kidney Rupture", "Target's attack speed reduced by 16% for 20 seconds.", "0,617");
Styles[iStylePT++] = BuildStylePT("Crit Strike", "6", "Kidney Rupture", "Eviscerate", "Bleed", "Low", "High", "Low Bonus", "Medium Penalty", "", "Bleed for 4 body damage every 4.0 sec for 25 seconds.", "0,669");
Styles[iStylePT++] = BuildStylePT("Crit Strike", "8", "Pincer", "To side of target", "", "Medium", "High", "High Bonus", "High Penalty", "", "", "0,877");
Styles[iStylePT++] = BuildStylePT("Crit Strike", "10", "Backstab II", "Behind target, stealthed", "Stun", "High", "High", "High Bonus", "Medium Penalty", "Thigh Cut", "Target cannot move or take any other action for 3 seconds.", "0,000");
Styles[iStylePT++] = BuildStylePT("Crit Strike", "12", "Hamstring", "You Evade", "Bleed", "Low", "High", "Medium Bonus", "Medium Bonus", "Leaper", "Bleed for 5 body damage every 4.0 sec for 30 seconds.", "1,100");
Styles[iStylePT++] = BuildStylePT("Crit Strike", "15", "Thigh Cut", "Backstab II", "", "Medium", "High", "Medium Bonus", "Low Penalty", "", "", "1,040");
Styles[iStylePT++] = BuildStylePT("Crit Strike", "18", "Garrote", "Any", "Snare", "High", "High", "Medium Bonus", "Medium Penalty", "Achille Heel", "Target moves 60% slower for 12 seconds.", "0,721");
Styles[iStylePT++] = BuildStylePT("Crit Strike", "21", "Perforate Artery", "In front of target, stealthed", "Bleed", "Medium", "High", "High Bonus", "Medium Penalty", "Creeping Death", "Bleed for 7 body damage every 4.0 sec for 40 seconds.", "0,000");
Styles[iStylePT++] = BuildStylePT("Crit Strike", "25", "Achilles Heel", "Garrote", "Slowed", "Medium", "High", "Medium Bonus", "No Bonus", "", "Target's attack speed reduced by 22% for 20 seconds.", "1,003");
Styles[iStylePT++] = BuildStylePT("Crit Strike", "29", "Leaper", "Harmstring", "Bleed", "Medium", "High", "High Bonus", "Low Bonus", "Rib Separation", "Bleed for 7 body damage every 4.0 sec for 40 seconds.", "1,306");
Styles[iStylePT++] = BuildStylePT("Crit Strike", "34", "Creeping Death", "Perforate Artery", "Stun", "Low", "High", "High Bonus", "No Bonus", "Stunning Stab", "Target cannot move or take any other action for 7 seconds.", "1,070");
Styles[iStylePT++] = BuildStylePT("Crit Strike", "39", "Stunning Stab", "Creeping Death", "Bleed", "Low", "High", "Very High Bonus", "Low Bonus", "", "Bleed for 10 body damage every 4.0 sec for 40 seconds.", "1,204");
Styles[iStylePT++] = BuildStylePT("Crit Strike", "44", "Rib Separation", "Leaper", "Snare", "Low", "High", "High Bonus", "No Bonus", "Ripper", "Target moves 60% slower for 27 seconds.", "1,289");
Styles[iStylePT++] = BuildStylePT("Crit Strike", "50", "Ripper", "Rib Separation", "Bleed", "Low", "High", "High Bonus", "Low Bonus", "", "Bleed for 11 body damage every 4.0 sec for 40 seconds.", "1,072");

// -- Albion Styles -- //
Styles[iStylePT++] = BuildStylePT("Crush", "2", "Daze", "Any", "", "High", "None", "No bonus", "No bonus", "", "", "0,034");
Styles[iStylePT++] = BuildStylePT("Crush", "4", "Back Crush", "Behind target", "Stun", "Low", "Medium", "Medium Bonus", "No Bonus", "Bruiser", "Target cannot move or take any other action for 2 seconds.", "0,604");
Styles[iStylePT++] = BuildStylePT("Crush", "6", "Maul", "Any", "", "High", "High", "High Bonus", "Low Penalty", "Blackjack", "", "0,361");
Styles[iStylePT++] = BuildStylePT("Crush", "8", "Bludgeon", "Any", "Taunt", "Low", "Low", "Medium Bonus", "Medium Penalty", "Contusions", "Increases your threat to monster target by 17 damage.", "0,576");
Styles[iStylePT++] = BuildStylePT("Crush", "10", "Bruiser", "Back Crush", "Bleed", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "Bleed for 3 body damage every 4.0 sec for 20 seconds.", "0,633");
Styles[iStylePT++] = BuildStylePT("Crush", "12", "Concussion", "You Parry", "Slowed", "Medium", "High", "High Bonus", "No Bonus", "Bone Crusher", "Taget's attack speed reduced by 18% for 20 seconds", "0,424");
Styles[iStylePT++] = BuildStylePT("Crush", "15", "Contusions", "Bludgeon", "Stun", "Medium", "Low", "Medium Bonus", "No Bonus", "", "Target cannot move or take any other action for 6 seconds.", "0,649");
Styles[iStylePT++] = BuildStylePT("Crush", "18", "Blackjack", "Maul", "Stun", "High", "Medium", "Medium Bonus", "No Bonus", "", "Target cannot move or take any other action for 2 seconds.", "0,649");
Styles[iStylePT++] = BuildStylePT("Crush", "21", "Protector", "", "Detaunt", "Medium", "Medium", "No bonus", "No Bonus", "", "Decrease you threat to monster targets by 19 damage", "0,000");
Styles[iStylePT++] = BuildStylePT("Crush", "25", "Divine Hammer", "Behind target", "", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "", "0,700");
Styles[iStylePT++] = BuildStylePT("Crush", "29", "Skull Breaker", "You Block", "", "Low", "High", "High Bonus", "Low Penalty", "Body Masher", "", "0,898");
Styles[iStylePT++] = BuildStylePT("Crush", "34", "Side Crush", "To Side of target", "Bleed", "Medium", "Medium", "Medium Bonus", "No Bonus", "Devastate", "Bleed for 8 body damage every 4.0 seconds for 40 seconds.", "0,751");
Styles[iStylePT++] = BuildStylePT("Crush", "39", "Bone Crusher", "Concussion", "Snare", "Low", "Medium", "Medium Bonus", "Medium Bonus", "", "Target moves 60% slower for 23 seconds", "0,854");
Styles[iStylePT++] = BuildStylePT("Crush", "44", "Body Masher", "Skull Breaker", "Slowed", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "Taget's attack speed reduced by 34% for 20 seconds.", "0,740");
Styles[iStylePT++] = BuildStylePT("Crush", "50", "Devastate", "Side Crush", "", "High", "High", "High Bonus", "Medium Penalty", "", "", "0,864");
Styles[iStylePT++] = BuildStylePT("Slash", "2", "Ruby Slash", "Any", "", "High", "Very Low", "No Bonus", "No Bonus", "", "", "0,035");
Styles[iStylePT++] = BuildStylePT("Slash", "4", "Cross slash", "To side of target", "", "Low", "Medium", "Medium Bonus", "Medium Bonus", "Bloodletter", "", "0,595");
Styles[iStylePT++] = BuildStylePT("Slash", "6", "Uppercut", "Any", "", "Medium", "Medium", "Low Bonus", "No Bonus", "Opal Slash, Cleave", "", "0,341");
Styles[iStylePT++] = BuildStylePT("Slash", "8", "Enrage", "Any", "Taunt", "Medium", "Medium", "No Bonus", "Medium Penalty", "Sapphire Slash", "Increase your target threat to monster targets by 17 damage.", "0,572");
Styles[iStylePT++] = BuildStylePT("Slash", "10", "Bloodletter", "Cross Slash", "Bleed", "Medium", "Medium", "High Bonus", "Medium Bonus", "", "Bleed for 3 body damage every 4.0 sec for 20 seconds.", "0,474");
Styles[iStylePT++] = BuildStylePT("Slash", "12", "Reflect", "Any", "Detaunt", "Medium", "None", "No Bonus", "Medium Bonus", "", "Decreases your target threat to monster targets by 19 damage.", "0,000");
Styles[iStylePT++] = BuildStylePT("Slash", "15", "Opal Slash", "Uppercut", "Bleed", "Medium", "Very Low", "Medium Bonus", "No Bonus", "", "Bleed for 4 body damage every 4.0 sec for 25 seconds.", "0,457");
Styles[iStylePT++] = BuildStylePT("Slash", "18", "Riposte", "You Block", "", "Low", "Low", "Medium Bonus", "Medium Bonus", "Befuddler", "", "0,882");
Styles[iStylePT++] = BuildStylePT("Slash", "21", "Side Slicer", "To side of target", "Snare", "Low", "Low", "No Bonus", "No Bonus", "", "Target moves 60% slower for 12 seconds.", "0,572");
Styles[iStylePT++] = BuildStylePT("Slash", "25", "Cleave", "Uppercut", "", "Low", "Low", "Medium Bonus", "No Bonus", "", "", "0,855");
Styles[iStylePT++] = BuildStylePT("Slash", "29", "Amethyst Slash", "Any", "", "Medium", "Low", "Very High Bonus", "No Bonus", "Diamond Slash", "", "0,555");
Styles[iStylePT++] = BuildStylePT("Slash", "34", "Befuddler", "Riposte", "Stun", "Medium", "Low", "Medium Bonus", "No Bonus", "", "Target cannot move or take any other action for 5 seconds", "0,882");
Styles[iStylePT++] = BuildStylePT("Slash", "39", "Back Slash", "Behind target", "", "High", "Low", "High Bonus", "No Bonus", "", "", "0,815");
Styles[iStylePT++] = BuildStylePT("Slash", "44", "Sapphire Slash", "Enrage", "Bleed", "Low", "Low", "Medium Bonus", "High Penalty", "", "Bleed for 7 body damage every 4.0 sec for 40 seconds", "0,867");
Styles[iStylePT++] = BuildStylePT("Slash", "50", "Diamond Slash", "Amethyst Slash", "", "High", "Low", "Very High Bonus", "No Bonus", "", "", "0,844");
Styles[iStylePT++] = BuildStylePT("Thrust", "2", "Thistle", "Any", "", "High", "Very Low", "No Bonus", "No Bonus", "", "", "0,044");
Styles[iStylePT++] = BuildStylePT("Thrust", "4", "Raftfang", "You Evade", "Stun", "Low", "Low", "Medium Bonus", "Low Bonus", "Wolftooth", "Target cannot move or take any other action for 2 seconds.", "0,874");
Styles[iStylePT++] = BuildStylePT("Thrust", "6", "Puncture", "Any", "Bleed", "High", "Very Low", "Medium Bonus", "No Bonus", "Bloody Dance, Lunge", "Bleed for 3 body damage every 4.0 sec for 20 seconds.", "0,309");
Styles[iStylePT++] = BuildStylePT("Thrust", "8", "Sting", "Any", "Taunt", "Medium", "Low", "Medium Bonus", "High Penalty", "", "Increases your threat to monster targets by 17 damage.", "0,573");
Styles[iStylePT++] = BuildStylePT("Thrust", "10", "Wolftooth", "Raftfang", "Snare", "Medium", "Low", "Medium Bonus", "No Bonus", "Liontooth", "Target moves 60% slower for 12 seconds", "0,871");
Styles[iStylePT++] = BuildStylePT("Thrust", "12", "Bloody Dance", "Puncture", "Bleed", "Medium", "Low", "Medium Bonus", "Low Penalty", "", "Bleed for 4 body damage every 4.0 sec for 25 seconds", "0,649");
Styles[iStylePT++] = BuildStylePT("Thrust", "15", "Beartooth", "You Block", "Stun", "Low", "Low", "High Bonus", "No Bonus", "", "Target cannot move or take any other action for 6 seconds.", "0,871");
Styles[iStylePT++] = BuildStylePT("Thrust", "18", "Tranquilize", "Any", "Detaunt", "Medium", "None", "No Bonus", "Medium Bonus", "Wyvernfang", "Decreases your taget threat to monster by 19 damage.", "0,000");
Styles[iStylePT++] = BuildStylePT("Thrust", "21", "Lunge", "Puncture", "", "Medium", "Low", "High Bonus", "No Bonus", "", "", "0,680");
Styles[iStylePT++] = BuildStylePT("Thrust", "25", "Ricochet", "Target Blocks", "Bleed", "Low", "Low", "Medium Bonus", "No Bonus", "", "Bleed for 5 body damage every 4.0 sec for 30 seconds.", "0,874");
Styles[iStylePT++] = BuildStylePT("Thrust", "29", "Pierce", "Behind target", "Bleed", "Medium", "Low", "High Bonus", "Medium Penalty", "", "Bleed for 6 body damage every 4.0 sec for 35 seconds", "0,737");
Styles[iStylePT++] = BuildStylePT("Thrust", "34", "Liontooth", "Wolftooth", "Bleed", "Low", "Low", "Medium Bonus", "Low Bonus", "", "Bleed for 9 body damage every 4.0 sec for 40 seconds.", "0,874");
Styles[iStylePT++] = BuildStylePT("Thrust", "39", "Basiliskfang", "To side of target", "Slowed", "Medium", "Low", "Low Bonus", "Low Bonus", "", "Target's attack speed reduced by 34% for 20 seconds.", "0,781");
Styles[iStylePT++] = BuildStylePT("Thrust", "44", "Wyvernfang", "Tranquilize", "Snare", "Low", "Low", "Medium Bonus", "No Bonus", "", "Target moves 60% slower for 27 seconds.", "0,876");
Styles[iStylePT++] = BuildStylePT("Thrust", "50", "Dragonfang", "You Evade", "Stun", "Low", "Low", "High Bonus", "Low Penalty", "", "Target cannot move or take any other action for 9 seconds.", "0,874");
Styles[iStylePT++] = BuildStylePT("Polearm", "2", "Impale", "Any", "", "High", "Very Low", "No Bonus", "No Bonus", "", "", "0,036");
Styles[iStylePT++] = BuildStylePT("Polearm", "4", "Defender's Cross", "To side of target", "Snare", "Medium", "Medium", "Medium Bonus", "No Bonus", "Disabler", "Target moves 60% slower for 11 seconds.", "0,595");
Styles[iStylePT++] = BuildStylePT("Polearm", "6", "Deflect", "Any", "Detaunt", "Medium", "None", "No Bonus", "High Bonus", "", "Decreases your threat to monster by 19 damage.", "0,000");
Styles[iStylePT++] = BuildStylePT("Polearm", "8", "Defender's Faith", "Any", "Bleed", "High", "Medium", "Low Bonus", "Low Penalty", "Defender's Courage", "Bleed for 4 body damage every 4.0 sec for 25 seconds.", "0,341");
Styles[iStylePT++] = BuildStylePT("Polearm", "10", "Executioner", "You Parry", "Slowed", "Medium", "High", "Low Bonus", "No Bonus", "", "Target's attack speed reduced by 16% for 20 seconds.", "0,876");
Styles[iStylePT++] = BuildStylePT("Polearm", "12", "Distract", "Any", "Taunt", "Medium", "Low", "Low Bonus", "Medium Penalty", "", "Increase your threat to monster targets by 17 damage.", "0,095");
Styles[iStylePT++] = BuildStylePT("Polearm", "15", "Defender's Courage", "Defender's Faith", "Slowed", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "Target's attack speed reduced by 19% for 20 seconds", "0,640");
Styles[iStylePT++] = BuildStylePT("Polearm", "18", "Crippling Blow", "Any", "Snare", "Medium", "Medium", "Medium Bonus", "No Bonus", "Mangle", "Target moves 60% slower for 12 seconds.", "0,536");
Styles[iStylePT++] = BuildStylePT("Polearm", "21", "Disabler", "Defender's Cross", "Slowed", "Low", "Medium", "Medium Bonus", "No Bonus", "", "Target's attack speed reduced by 21% for 20 seconds.", "0,681");
Styles[iStylePT++] = BuildStylePT("Polearm", "25", "Phalanx", "Behind target", "", "Medium", "Low", "Medium Bonus", "No Bonus", "Defender's Revenge, Defender's Aegis", "", "0,790");
Styles[iStylePT++] = BuildStylePT("Polearm", "29", "Mangle", "Crippling Blow", "", "Medium", "High", "No Bonus", "No Bonus", "Poleaxe", "", "0,767");
Styles[iStylePT++] = BuildStylePT("Polearm", "34", "Defender's Rage", "Target Style", "Bleed", "Low", "High", "High Bonus", "No Bonus", "", "Bleed for 9 body damage every 4.0 sec for 40 seconds.", "1,399");
Styles[iStylePT++] = BuildStylePT("Polearm", "39", "Poleaxe", "Defender's Rage", "", "High", "High", "High Bonus", "No Bonus", "", "", "0,644");
Styles[iStylePT++] = BuildStylePT("Polearm", "44", "Defender's Revenge", "Phalanx", "Stun", "Medium", "Very High", "Very High Bonus", "No Bonus", "", "Target cannot move or take any other action for 9 seconds.", "1,158");
Styles[iStylePT++] = BuildStylePT("Polearm", "50", "Defender's Aegis", "Phalanx", "Snare", "Medium", "High", "High Bonus", "Low Bonus", "", "Target moves 60% slower for 31 seconds.", "0,908");
Styles[iStylePT++] = BuildStylePT("2-Hand", "2", "Half Moon", "Any", "", "High", "Very Low", "No Bonus", "No Bonus", "", "", "0,038");
Styles[iStylePT++] = BuildStylePT("2-Hand", "4", "Double Back", "Behind target", "Stun", "Medium", "Medium", "Medium Bonus", "No Bonus", "Two fists", "Target cannot move or take any other action for 2 seconds.", "0,593");
Styles[iStylePT++] = BuildStylePT("2-Hand", "6", "Rile", "Any", "Taunt", "Medium", "Low", "Low Bonus", "Medium Penalty", "", "Increases your target threat to monster targets by 17 damage.", "0,574");
Styles[iStylePT++] = BuildStylePT("2-Hand", "8", "Pacify", "Any", "Detaunt", "Medium", "None", "No Bonus", "High Bonus", "", "Decreases your target threat to monster targets by 19 damage.", "0,000");
Styles[iStylePT++] = BuildStylePT("2-Hand", "10", "Two fists", "Double Back", "Bleed", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "Bleed for 4 body damage every 4.0 sec for 25 seconds.", "0,858");
Styles[iStylePT++] = BuildStylePT("2-Hand", "12", "Bone Bruiser", "Any", "Slowed", "Medium", "Medium", "Low Bonus", "No Bonus", "Bone Splitter", "Target's attack speed reduced by 18% for 20 seconds.", "0,398");
Styles[iStylePT++] = BuildStylePT("2-Hand", "15", "Onslaught", "To side of target", "Snare", "Medium", "Medium", "Medium Bonus", "No Bonus", "Two Moons", "Target moves 60% slower for 14 seconds.", "0,858");
Styles[iStylePT++] = BuildStylePT("2-Hand", "18", "Fury", "You Parry", "Bleed", "Low", "Medium", "Medium Bonus", "High Penalty", "Recenter, Obfuscate", "Bleed for 4 body damage every 4.0 sec for 20 seconds.", "0,846");
Styles[iStylePT++] = BuildStylePT("2-Hand", "21", "Bone Splitter", "Bone Bruiser", "Snare", "Medium", "Medium", "Low Bonus", "No Bonus", "Bone Breaker", "Target moves 60% slower for 11 seconds.", "0,674");
Styles[iStylePT++] = BuildStylePT("2-Hand", "25", "Recenter", "Fury", "", "Low", "Medium", "Low Bonus", "High Bonus", "", "", "0,846");
Styles[iStylePT++] = BuildStylePT("2-Hand", "29", "Bone Breaker", "Bone Splitter", "Bleed", "Medium", "High", "Low Bonus", "No Bonus", "", "Bleed for 4 body damage every 4.0 sec for 20 seconds.", "0,877");
Styles[iStylePT++] = BuildStylePT("2-Hand", "34", "Obfuscate", "Fury", "Slowed", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "Target's attack speed reduced by 30% for 20 seconds.", "0,846");
Styles[iStylePT++] = BuildStylePT("2-Hand", "39", "Doubler", "Behind target", "Snare", "High", "High", "Low Bonus", "No Bonus", "Sun and Moon", "Target moves 60% slower for 12 seconds.", "0,720");
Styles[iStylePT++] = BuildStylePT("2-Hand", "44", "Two Moons", "Onslaught", "Stun", "Low", "Medium", "High Bonus", "No Bonus", "", "Target cannot move or take any other action for 9 seconds.", "0,858");
Styles[iStylePT++] = BuildStylePT("2-Hand", "50", "Sun and Moon", "Doubler", "Stun", "Medium", "High", "Low Bonus", "No Bonus", "", "Target cannot move or take any other action for 7 seconds.", "0,957");
Styles[iStylePT++] = BuildStylePT("Dual Wield", "2", "Twin Spikes", "Any", "", "Medium", "Very Low", "No Bonus", "No Bonus", "", "", "0,048");
Styles[iStylePT++] = BuildStylePT("Dual Wield", "4", "Twin Return", "You Evade", "Bleed", "Low", "Low", "Medium Bonus", "Low Bonus", "Orbit", "Bleed for 3 body damage every 4.0 sec for 20 seconds.", "0,859");
Styles[iStylePT++] = BuildStylePT("Dual Wield", "6", "Shadow's Edge", "Behind target", "", "Medium", "Low", "Medium Bonus", "No Bonus", "Eclipse, Penumbra", "", "0,630");
Styles[iStylePT++] = BuildStylePT("Dual Wield", "8", "Inflame", "Any", "Taunt", "Medium", "Low", "No Bonus", "Medium Penalty", "", "Increases your target threat to monster targets by 17 damage.", "0,571");
Styles[iStylePT++] = BuildStylePT("Dual Wield", "10", "Orbit", "Twin Return", "Snare", "Medium", "Low", "Medium Bonus", "No Bonus", "", "Target moves 60% slower for 12 seconds.", "0,859");
Styles[iStylePT++] = BuildStylePT("Dual Wield", "12", "Eclipse", "Shadow's Edge", "Slowed", "Medium", "Low", "Medium Bonus", "No Bonus", "", "Target's attack speed reduced by 18% for 20 seconds.", "0,875");
Styles[iStylePT++] = BuildStylePT("Dual Wield", "15", "Misty Gloom", "Any", "", "High", "Very Low", "Low Bonus", "No Bonus", "", "", "0,427");
Styles[iStylePT++] = BuildStylePT("Dual Wield", "18", "Obscure", "Any", "Detaunt", "Medium", "None", "No Bonus", "High Bonus", "", "Decreases your target threat to monster targets by 19 damage.", "0,000");
Styles[iStylePT++] = BuildStylePT("Dual Wield", "21", "Penumbra", "Shadow's Edge", "", "Medium", "Low", "High Bonus", "No Bonus", "", "", "0,886");
Styles[iStylePT++] = BuildStylePT("Dual Wield", "25", "Reflection", "You Parry", "", "Low", "Low", "Low Bonus", "Low Bonus", "Hypnotic Darkness", "", "0,859");
Styles[iStylePT++] = BuildStylePT("Dual Wield", "29", "Flank", "To side of target", "Snare", "Medium", "Low", "No Bonus", "Medium Bonus", "Shadow's Rain", "Target moves 60% slower for 12 seconds", "0,859");
Styles[iStylePT++] = BuildStylePT("Dual Wield", "34", "Dark Tendrils", "You Parry", "Bleed", "Low", "Low", "Medium Bonus", "No Bonus", "", "Bleed for 15 body damage every 4.0 sec for 40 seconds.", "0,859");
Styles[iStylePT++] = BuildStylePT("Dual Wield", "39", "Shadow's Rain", "Flank", "Slowed", "Medium", "Medium", "Medium Bonus", "Low Bonus", "", "Target's attack speed reduced by 34% for 20 seconds.", "1,024");
Styles[iStylePT++] = BuildStylePT("Dual Wield", "44", "Hypnotic Darkness", "Reflection", "Stun", "Medium", "Low", "High Bonus", "No Bonus", "", "Target cannot move or take any other action for 7 seconds.", "0,859");
Styles[iStylePT++] = BuildStylePT("Dual Wield", "50", "Dual Shadows", "In front of target", "Bleed", "Medium", "Low", "Medium Bonus", "Medium Penalty", "", "Bleed for 25 body damage every 4.0 sec for 40 seconds.", "0,790");
Styles[iStylePT++] = BuildStylePT("Staff", "2", "Spinning Staff", "Any", "", "Medium", "Very Low", "No Bonus", "Low Bonus", "", "", "0,000");
Styles[iStylePT++] = BuildStylePT("Staff", "4", "Figure Eight", "You Evade", "", "Low", "High", "Medium Bonus", "Low Bonus", "Friar's Ally, Double Strike", "", "0,856");
Styles[iStylePT++] = BuildStylePT("Staff", "6", "Friar's Ally", "Figure Eight", "Stun", "Medium", "Medium", "High Bonus", "No Bonus", "", "Target cannot move or take any other action for 3 seconds.", "0,856");
Styles[iStylePT++] = BuildStylePT("Staff", "8", "Defender's Fury", "Any", "Slowed", "Medium", "High", "Low Bonus", "No Bonus", "Quick Strike", "Target's attack speed reduced by 19% for 20 seconds.", "0,370");
Styles[iStylePT++] = BuildStylePT("Staff", "10", "Quick Strike", "Defender's Fury", "", "Medium", "Medium", "No Bonus", "No Bonus", "", "", "0,610");
Styles[iStylePT++] = BuildStylePT("Staff", "12", "Friar's Redress", "Any", "Detaunt", "Medium", "None", "No Bonus", "Very High Bonus", "", "Decreases your threat to monster targets by 19 damage.", "0,000");
Styles[iStylePT++] = BuildStylePT("Staff", "15", "Double Strike", "Figure Eight", "Bleed", "Low", "Medium", "Medium Bonus", "Low Bonus", "", "Bleed for 4 body damage every 4.0 sec for 25 seconds.", "0,856");
Styles[iStylePT++] = BuildStylePT("Staff", "18", "Friar's Friend", "To side of target", "Snare", "High", "High", "Medium Bonus", "No Bonus", "Banish", "Target moves 60% slower for 27 seconds.", "0,679");
Styles[iStylePT++] = BuildStylePT("Staff", "21", "Counter Evade", "You Evade", "Snare", "Low", "High", "Low Bonus", "Medium Bonus", "Friar's Fury", "Target moves 60% slower for 14 seconds.", "0,916");
Styles[iStylePT++] = BuildStylePT("Staff", "25", "Banish", "Friar's Friend", "", "Low", "High", "Medium Bonus", "Medium Bonus", "Stunning Wrath", "", "0,946");
Styles[iStylePT++] = BuildStylePT("Staff", "29", "Friar's Boon", "Any", "Taunt", "Medium", "High", "Medium Bonus", "No Bonus", "", "Increases your target threat to monster targets by 17 damage.", "0,679");
Styles[iStylePT++] = BuildStylePT("Staff", "34", "Holy Staff", "Any", "", "High", "Medium", "Low Bonus", "No Bonus", "", "", "0,593");
Styles[iStylePT++] = BuildStylePT("Staff", "39", "Friar's Fury", "Counter Evade", "Bleed", "Low", "Medium", "Medium Bonus", "Low Bonus", "", "Bleed for 6 body damage every 4.0 sec for 35 seconds.", "0,856");
Styles[iStylePT++] = BuildStylePT("Staff", "44", "Stunning Wrath", "Banish", "Stun", "Medium", "Medium", "High Bonus", "Medium Bonus", "", "Target cannot move or take any other action for 8 seconds.", "0,856");
Styles[iStylePT++] = BuildStylePT("Staff", "50", "Excommunicate", "You Parry", "", "Medium", "High", "Medium Bonus", "Low Bonus", "", "", "0,894");
Styles[iStylePT++] = BuildStylePT("Flexible", "2", "Blacksnake", "Any", "", "Medium", "Very Low", "No Bonus", "No Bonus", "", "", "0,047");
Styles[iStylePT++] = BuildStylePT("Flexible", "4", "Kingsnake", "You Parry", "Bleed", "Low", "High", "Medium Bonus", "Low Bonus", "Tigersnake", "Bleed for 3 body damage every 4.0 sec for 20 seconds.", "0,876");
Styles[iStylePT++] = BuildStylePT("Flexible", "6", "Diamondback", "Any", "Taunt", "Medium", "Low", "No Bonus", "Medium Penalty", "", "Increases your target threat to monster targets by 17 damage.", "0,574");
Styles[iStylePT++] = BuildStylePT("Flexible", "8", "Asp", "Behind target", "Long range", "High", "Medium", "Medium Bonus", "No Bonus", "", "Hits target up to 268 units away", "0,847");
Styles[iStylePT++] = BuildStylePT("Flexible", "10", "Viper", "You Block", "Stun", "Low", "High", "Medium Bonus", "Low Bonus", "Copperhead", "Target cannot move or take any other action for 5 seconds.", "0,876");
Styles[iStylePT++] = BuildStylePT("Flexible", "12", "Copperhead", "Viper", "Slowed", "Low", "High", "Medium Bonus", "Medium Bonus", "Taipan", "Target's attack speed reduced by 21% for 20 seconds.", "0,876");
Styles[iStylePT++] = BuildStylePT("Flexible", "15", "Tigersnake", "Kingsnake", "", "Low", "High", "High Bonus", "No Bonus", "Anaconda", "", "0,876");
Styles[iStylePT++] = BuildStylePT("Flexible", "18", "Indigosnake", "To side of target", "Drain life", "Medium", "Medium", "Medium Bonus", "No Bonus", "Constrictor", "The target takes 58 spirit damage and the attacker is healed for 60% of the damage dealt.", "0,610");
Styles[iStylePT++] = BuildStylePT("Flexible", "21", "Boomslang", "Any", "Detaunt", "Medium", "None", "No Bonus", "Very High Bonus", "", "Decreases your threat to monster targets by 19 damage.", "0,000");
Styles[iStylePT++] = BuildStylePT("Flexible", "25", "Python", "Any", "Debuff STR", "Very High", "Low", "Low Bonus", "Low Bonus", "", "Decreases the target's strength by 30 for 30 seconds. Radius: 250", "0,231");
Styles[iStylePT++] = BuildStylePT("Flexible", "29", "Taipan", "Copperhead", "", "Low", "High", "High Bonus", "No Bonus", "Cobra", "", "0,923");
Styles[iStylePT++] = BuildStylePT("Flexible", "34", "Constrictor", "Indigosnake", "Snare", "Low", "High", "Very High Bonus", "No Bonus", "", "Target moves 60% slower for 27 seconds.", "1,160");
Styles[iStylePT++] = BuildStylePT("Flexible", "39", "Anaconda", "Tigersnake", "Stun", "Medium", "High", "High Bonus", "Low Bonus", "", "Target cannot move or take any other action for 9 seconds.", "0,996");
Styles[iStylePT++] = BuildStylePT("Flexible", "44", "Cobra", "Taipan", "Drain", "Low", "High", "High Bonus", "No Bonus", "", "The target takes 153 spirit damage and the attacker is healed for 100% of the damage dealt.", "0,923");
Styles[iStylePT++] = BuildStylePT("Flexible", "50", "Leviathan", "Behind target", "DD", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "Does 153 cold damage to the target.", "0,805");

//-- Hibernia Styles -- //
Styles[iStylePT++] = BuildStylePT("Blades", "2", "Shining Blade", "Any", "", "High", "Very Low", "No Bonus", "No Bonus", "", "", "0,036");
Styles[iStylePT++] = BuildStylePT("Blades", "4", "Return Blade", "You Parry", "Slowed", "Low", "Medium", "Medium Bonus", "No Bonus", "Lunging Blade", "Target's attack speed reduced by 16% for 20 seconds.", "0,859");
Styles[iStylePT++] = BuildStylePT("Blades", "6", "Taunting Blade", "Any", "Taunt", "Medium", "Low", "Medium Bonus", "Medium Penalty", "", "Increases your threat to monster targets by 17 damage.", "0,571");
Styles[iStylePT++] = BuildStylePT("Blades", "8", "Enervating Blade", "Any", "Detaunt", "Medium", "None", "No Bonus", "Medium Bonus", "", "Decreases your threat to monster targets by 19 damage", "0,000");
Styles[iStylePT++] = BuildStylePT("Blades", "10", "Glowing Blade", "To side of target", "Snare", "Medium", "Medium", "Medium Bonus", "No Bonus", "Auroric Blade", "Target moves 60% slower for 14 seconds.", "0,626");
Styles[iStylePT++] = BuildStylePT("Blades", "12", "Lunging Blade", "Return Blade", "Bleed", "Medium", "Medium", "Medium Bonus", "Low Bonus", "Kinetic Blade", "Bleed for 5 body damage every 4.0 sec for 30 seconds.", "0,844");
Styles[iStylePT++] = BuildStylePT("Blades", "15", "Auroric Blade", "Glowing Blade", "Slowed", "Low", "Medium", "Medium Bonus", "No Bonus", "", "Target's attack speed reduced by 19% for 20 seconds.", "0,850");
Styles[iStylePT++] = BuildStylePT("Blades", "18", "Fire Blade", "Any", "None", "High", "Medium", "Low Bonus", "Low Penalty", "Spectrum Blade", "", "0,456");
Styles[iStylePT++] = BuildStylePT("Blades", "21", "Horizon Blade", "You Block", "Stun", "Low", "High", "Medium Bonus", "Low Bonus", "Dancing Blade", "Target cannot move or take any other action for 4 seconds.", "0,867");
Styles[iStylePT++] = BuildStylePT("Blades", "25", "Kinetic Blade", "Lunging Blade", "", "Medium", "High", "Medium Bonus", "No Bonus", "", "", "0,905");
Styles[iStylePT++] = BuildStylePT("Blades", "29", "Dancing Blade", "Horizon Blade", "Bleed", "Low", "Medium", "High Bonus", "No Bonus", "Prismatic Blade", "Bleed for 8 body damage every 4.0 sec for 40 seconds.", "0,859");
Styles[iStylePT++] = BuildStylePT("Blades", "34", "Revenging Blade", "Behind Target", "", "Medium", "Medium", "Medium Bonus", "Medium Penalty", "Brilliant Blade", "", "0,729");
Styles[iStylePT++] = BuildStylePT("Blades", "39", "Spectrum Blade", "Fire Blade", "Slowed", "Medium", "Medium", "Low Bonus", "Medium Bonus", "", "Target's attack speed reduced by 30% for 20 seconds.", "0,759");
Styles[iStylePT++] = BuildStylePT("Blades", "44", "Prismatic Blade", "Dancing Blade", "", "Low", "High", "Medium Bonus", "No Bonus", "", "", "0,912");
Styles[iStylePT++] = BuildStylePT("Blades", "50", "Brilliant Blade", "Revenging Blade", "", "Medium", "High", "Very High Bonus", "No Bonus", "", "", "0,972");
Styles[iStylePT++] = BuildStylePT("Blunt", "2", "Contusions", "Any", "", "High", "Very Low", "No Bonus", "No Bonus", "", "None", "0,039");
Styles[iStylePT++] = BuildStylePT("Blunt", "4", "Bruiser", "You Block", "Stun", "Low", "Medium", "Medium Bonus", "No Bonus", "", "2 sec stun", "0,880");
Styles[iStylePT++] = BuildStylePT("Blunt", "6", "Blunt Trauma", "Any", "Detaunt", "Medium", "None", "No Bonus", "Medium Bonus", "Impact", "19 dmg detaunt", "0,000");
Styles[iStylePT++] = BuildStylePT("Blunt", "8", "Slam", "Any", "Taunt", "Medium", "Low", "Medium Bonus", "Medium Penalty", "", "17 dmg taunt", "0,575");
Styles[iStylePT++] = BuildStylePT("Blunt", "10", "Side Bash", "To side of target", "Slowed", "Medium", "Medium", "Low Bonus", "No Bonus", "", "reduce atk speed 19% 20 sec", "0,604");
Styles[iStylePT++] = BuildStylePT("Blunt", "12", "Impact", "Bruiser", "Bleed", "Low", "Medium", "Medium bonus", "Low Penalty", "Unstoppable Force", "bleed 4 body dmg every 4 sec for 20 sec", "0,880");
Styles[iStylePT++] = BuildStylePT("Blunt", "15", "Windfall", "Impact", "Slowed", "Low", "Medium", "High Bonus", "Low Bonus", "Windfall", "reduce atk speed 22% for 20 sec", "0,880");
Styles[iStylePT++] = BuildStylePT("Blunt", "18", "Force of Might", "Any", "", "High", "Medium", "Low Bonus", "No Bonus", "Bonecrusher", "none", "0,448");
Styles[iStylePT++] = BuildStylePT("Blunt", "21", "Unstoppable Force", "Sidebash", "Snare", "Medium", "Medium", "Medium Bonus", "Low Bonus", "", "Snare 60% for 19 sec", "0,838");
Styles[iStylePT++] = BuildStylePT("Blunt", "25", "Back Crush", "Behind Target", "None", "Medium", "High", "Medium Bonus", "Medium Penalty", "Mauler", "None", "0,721");
Styles[iStylePT++] = BuildStylePT("Blunt", "29", "Bonecrusher", "Windfall", "Bleed", "Low", "Medium", "Medium Bonus", "Low Bonus", "Crushing Blow", "Bleed 7 body dmg every 4 sec for 40 sec", "0,880");
Styles[iStylePT++] = BuildStylePT("Blunt", "34", "Mauler", "Unstoppable Force", "", "Medium", "High", "Medium Bonus", "Medium Bonus", "", "None", "0,877");
Styles[iStylePT++] = BuildStylePT("Blunt", "39", "Stunning Blow", "Parry", "Slowed", "Low", "Medium", "Medium Bonus", "Low Bonus", "Devastating Blow", "Reduce atk spd 30% for 20 sec", "0,880");
Styles[iStylePT++] = BuildStylePT("Blunt", "44", "Crushing Blow", "Back Crush", "", "Medium", "Medium", "Very High Bonus", "Low Bonus", "", "None", "0,838");
Styles[iStylePT++] = BuildStylePT("Blunt", "50", "Devastating Blow", "Stunning Blow", "Stun", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "Target cannot move or take any other action for 10 seconds.", "0,880");
//Styles[iStylePT++]=BuildStylePT("Shield", "3", "Numb", "Any", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 2 seconds.", "0,047");
//Styles[iStylePT++]=BuildStylePT("Shield", "8", "Stun", "You Block", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 3 seconds.", "0,840");
//Styles[iStylePT++]=BuildStylePT("Shield", "13", "Disable", "To side of target", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 4 seconds.", "0,645");
//Styles[iStylePT++]=BuildStylePT("Shield", "18", "Incapacitate", "You Block", "Stun", "Very High", "Low", "No Bonus", "Medium Bonus", "", "Target cannot move or take any other action for 5 seconds.", "0,859");
//Styles[iStylePT++]=BuildStylePT("Shield", "23", "Paralyze", "Behind target", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 6 seconds.", "0,683");
//Styles[iStylePT++]=BuildStylePT("Shield", "29", "Bash", "You Block", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 7 seconds.", "0,850");
//Styles[iStylePT++]=BuildStylePT("Shield", "35", "Mangle", "To side of target", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 8 seconds.", "0,730");
//Styles[iStylePT++]=BuildStylePT("Shield", "42", "Slam", "Any", "Stun", "Very High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 9 seconds.", "0,759");
//Styles[iStylePT++]=BuildStylePT("Shield", "50", "Brutalize", "You Block", "Stun", "Medium", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 10 seconds.", "0,850");
Styles[iStylePT++] = BuildStylePT("Pierce", "2", "Dragonfly", "Any", "", "High", "Very Low", "No Bonus", "No Bonus", "", "None", "0,035");
Styles[iStylePT++] = BuildStylePT("Pierce", "4", "Wasps Sting", "Behind", "Bleed", "Low", "Medium", "Medium Bonus", "No Bonus", "Hornet's Sting", "Bleed 3 body dmg every 4 sec for 20 sec", "0,586");
Styles[iStylePT++] = BuildStylePT("Pierce", "6", "Bumblebees Sting", "Any", "Taunt", "Medium", "Low", "Medium Bonus", "High Penalty", "", "Taunt 17 damage", "0,572");
Styles[iStylePT++] = BuildStylePT("Pierce", "8", "Hornets Sting", "Wasp's Sting", "Slowed", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "Slow Atk Spd 18% for 20sec", "0,858");
Styles[iStylePT++] = BuildStylePT("Pierce", "10", "Scorpion", "Any", "Detaunt", "Medium", "None", "No Bonus", "Medium Bonus", "", "Detaunt 19 dmg", "0,000");
Styles[iStylePT++] = BuildStylePT("Pierce", "12", "Black Widow", "Any", "", "High", "Medium", "Low Bonus", "Low Penalty", "Sidewinder", "", "0,391");
Styles[iStylePT++] = BuildStylePT("Pierce", "15", "Tarantula", "Block", "Bleed", "Low", "Medium", "Medium Bonus", "Low Bonus", "Viper's Bite", "Bleed 6 body dmg every 4 sec for 35 sec", "0,880");
Styles[iStylePT++] = BuildStylePT("Pierce", "18", "Sidewinder", "Black Widow", "", "Medium", "High", "Medium Bonus", "No Bonus", "Asp's Bite", "", "0,670");
Styles[iStylePT++] = BuildStylePT("Pierce", "21", "Copperhead", "Side", "Snare", "Medium", "Medium", "Medium Bonus", "Low Penalty", "Cobra's Bite", "Snare 60% for 15 sec", "0,663");
Styles[iStylePT++] = BuildStylePT("Pierce", "25", "Diamondback", "Evade", "Stun", "Low", "Medium", "Medium Bonus", "Medium Bonus", "Dragonspider", "5 sec stun", "0,880");
Styles[iStylePT++] = BuildStylePT("Pierce", "29", "Viper's Bite", "Tarantula", "", "Medium", "High", "Medium Bonus", "Medium Bonus", "", "", "0,940");
Styles[iStylePT++] = BuildStylePT("Pierce", "34", "Asp's Bite", "Sidewinder", "Slowed", "Low", "Medium", "Very High Bonus", "Medium Bonus", "", "Slow atk spd 22% for 20 sec", "0,858");
Styles[iStylePT++] = BuildStylePT("Pierce", "39", "Cobra's Bite", "Copperhead", "", "Low", "High", "High Bonus", "Low Bonus", "", "", "0,914");
Styles[iStylePT++] = BuildStylePT("Pierce", "44", "Dragonspider", "Diamondback", "Bleed", "Medium", "Medium", "Medium Bonus", "No Bonus", "Wyrven's Bite", "Bleed 10 body dmg every 4 sec for 40 sec", "0,880");
Styles[iStylePT++] = BuildStylePT("Pierce", "50", "Wyrven's Bite", "Dragonspider", "Bleed", "Medium", "High", "High Bonus", "Low Bonus", "", "Bleed 11 body dmg every 4 sec for 40 sec", "0,980");
Styles[iStylePT++] = BuildStylePT("Celtic Spear", "2", "Hunter's Spear", "Any", "", "High", "Very low", "No Bonus", "No Bonus", "", "None", "0,037");
Styles[iStylePT++] = BuildStylePT("Celtic Spear", "4", "Entrap", "Evade", "Bleed", "Low", "Medium", "Medium Bonus", "No Bonus", "Hunters Largess", "bleed 3 body dmg every 4 sec for 20 sec", "0,880");
Styles[iStylePT++] = BuildStylePT("Celtic Spear", "6", "Hunters Boon", "Behind target", "Snare", "Medium", "Medium", "Medium Bonus", "Medium Penalty", "Javelin", "snare 60% for 11 sec", "0,606");
Styles[iStylePT++] = BuildStylePT("Celtic Spear", "8", "Hunters Barb", "Any", "Detaunt", "Medium", "None", "No Bonus", "High Bonus", "", "Detaunt 19 dmg", "0,000");
Styles[iStylePT++] = BuildStylePT("Celtic Spear", "10", "Forest Spear", "Any", "Taunt", "Medium", "Low", "Medium Bonus", "Medium Penalty", "", "Increases your threat to monster targets by 17 damage.", "0,576");
Styles[iStylePT++] = BuildStylePT("Celtic Spear", "12", "Hunters Largess", "Entrap", "Slowed", "Medium", "Medium", "Medium Bonus", "Low Penalty", "", "slow atk spd 21% for 20 sec", "0,880");
Styles[iStylePT++] = BuildStylePT("Celtic Spear", "15", "Hunters Lance", "Any", "", "High", "Medium", "Medium Bonus", "Medium Penalty", "", "", "0,437");
Styles[iStylePT++] = BuildStylePT("Celtic Spear", "18", "Javelin", "Hunters Boon", "Bleed", "Medium", "High", "Medium Bonus", "No Bonus", "Hunters Gift", "Bleed 7 body dmg every 4 sec for 40 sec", "0,867");
Styles[iStylePT++] = BuildStylePT("Celtic Spear", "21", "Tracking Spear", "Parry", "Stun", "Low", "Medium", "Medium Bonus", "Low Bonus", "Hawks Talon", "5 sec stun", "0,890");
Styles[iStylePT++] = BuildStylePT("Celtic Spear", "25", "Hunters Gift", "Javelin", "Slowed", "Medium", "Medium", "High Bonus", "Low Bonus", "", "slow atk spd 22% for 20 sec", "0,859");
Styles[iStylePT++] = BuildStylePT("Celtic Spear", "29", "Hawks Talon", "Tracking Spear", "", "Medium", "High", "Low Bonus", "Low Bonus", "Wyrvens Talon", "", "0,944");
Styles[iStylePT++] = BuildStylePT("Celtic Spear", "34", "Eagle Talon", "Any", "", "High", "Medium", "Low Bonus", "No Bonus", "", "", "0,635");
Styles[iStylePT++] = BuildStylePT("Celtic Spear", "39", "Wyrven Talon", "Hawks Talon", "Bleed", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "Bleed 9 body dmg every 4 sec for 40 sec", "0,880");
Styles[iStylePT++] = BuildStylePT("Celtic Spear", "44", "Dragon Talon", "Side", "", "Medium", "Medium", "Medium Bonus", "No Bonus", "Cuchulain's Revenge", "", "0,749");
Styles[iStylePT++] = BuildStylePT("Celtic Spear", "50", "Cuchulain's Revenge", "Dragons Talon", "Bleed", "Medium", "Medium", "High Bonus", "No Bonus", "", "Bleed 11 body dmg every 4 sec for 40 sec", "0,859");
Styles[iStylePT++] = BuildStylePT("Celtic Dual", "2", "Misty Gloom", "Any", "", "High", "Very low", "No Bonus", "No Bonus", "", "", "0,035");
Styles[iStylePT++] = BuildStylePT("Celtic Dual", "4", "Blinding Rain", "You Evade", "Bleed", "Low", "Medium", "Medium Bonus", "No Bonus", "Blizzard", "Bleed for 3 body damage every 4.0 sec for 20 seconds.", "0,875");
Styles[iStylePT++] = BuildStylePT("Celtic Dual", "6", "Squall", "Any", "Taunt", "Medium", "Low", "Low Bonus", "Medium Penalty", "", "Increases your threat to monster targets by 17 damage.", "0,574");
Styles[iStylePT++] = BuildStylePT("Celtic Dual", "8", "Snow Shower", "Behind target", "Snare", "Medium", "High", "Medium Bonus", "No Bonus", "Gale, Thunderstorm", "Target moves 60% slower for 12 seconds.", "0,644");
Styles[iStylePT++] = BuildStylePT("Celtic Dual", "10", "Gale", "Snow Shower", "Bleed", "Low", "Medium", "Medium Bonus", "Low Penalty", "", "Bleed for 5 body damage every 4.0 sec for 30 seconds.", "0,875");
Styles[iStylePT++] = BuildStylePT("Celtic Dual", "12", "Blizzard", "Blinding Rain", "Slowed", "Low", "High", "Medium Bonus", "No Bonus", "", "Target's attack speed reduced by 21% for 20 seconds.", "0,910");
Styles[iStylePT++] = BuildStylePT("Celtic Dual", "15", "Thunderstorm", "Snow Shower", "Detaunt", "Low", "Medium", "Medium Bonus", "High Bonus", "", "Decreases your threat to monster targets by 19 damage", "0,875");
Styles[iStylePT++] = BuildStylePT("Celtic Dual", "18", "Ice Storm", "To side of target", "Stun", "Medium", "High", "Medium Bonus", "No Bonus", "Tempest", "Target cannot move or take any other action for 4 seconds.", "0,763");
Styles[iStylePT++] = BuildStylePT("Celtic Dual", "21", "Hurricane", "Any", "", "High", "Medium", "Low Bonus", "Medium Penalty", "Solar Flare", "", "0,483");
Styles[iStylePT++] = BuildStylePT("Celtic Dual", "25", "Tornado", "You Parry", "Snare", "Low", "Medium", "High Bonus", "Medium Bonus", "Meteor Shower", "Target moves 60% slower for 23 seconds.", "0,875");
Styles[iStylePT++] = BuildStylePT("Celtic Dual", "29", "Tempest", "Ice Storm", "Bleed", "None", "High", "Medium Bonus", "No Bonus", "Supernova", "Bleed for 15 body damage every 4.0 sec for 40 seconds.", "0,973");
Styles[iStylePT++] = BuildStylePT("Celtic Dual", "34", "Meteor Shower", "Tornado", "", "Low", "Medium", "Medium Bonus", "No Bonus", "Twin Star", "", "0,875");
Styles[iStylePT++] = BuildStylePT("Celtic Dual", "39", "Solar Flare", "Hurricane", "", "Medium", "High", "Low Bonus", "Low Bonus", "", "", "0,812");
Styles[iStylePT++] = BuildStylePT("Celtic Dual", "44", "Twin Star", "Metero Shower", "Bleed", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "Bleed for 25 body damage every 4.0 sec for 40 seconds.", "0,875");
Styles[iStylePT++] = BuildStylePT("Celtic Dual", "50", "Supernova", "Tempest", "Slowed", "Medium", "High", "High Bonus", "Low Bonus", "", "Target's attack speed reduced by 34% for 20 seconds.", "1,267");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "2", "Backstab", "Behind target, stealthed", "Stun", "Medium", "Very Low", "Medium Bonus", "Medium Penalty", "Eviscerate", "Target cannot move or take any other action for 2 seconds.", "N/A");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "4", "Eviscerate", "Backstab", "Slowed", "Medium", "High", "Low Bonus", "Low Penalty", "Kidney Rupture", "Target's attack speed reduced by 16% for 20 seconds.", "0,617");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "6", "Kidney Rupture", "Eviscerate", "Bleed", "Low", "High", "Low Bonus", "Medium Penalty", "", "Bleed for 4 body damage every 4.0 sec for 25 seconds.", "0,669");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "8", "Pincer", "To side of target", "", "Medium", "High", "High Bonus", "High Penalty", "", "", "0,877");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "10", "Backstab II", "Behind target, stealthed", "Stun", "High", "High", "High Bonus", "Medium Penalty", "Thigh Cut", "Target cannot move or take any other action for 3 seconds.", "N/A");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "12", "Hamstring", "You Evade", "Bleed", "Low", "High", "Medium Bonus", "Medium Bonus", "Leaper", "Bleed for 5 body damage every 4.0 sec for 30 seconds.", "1,100");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "15", "Thigh Cut", "Backstab II", "", "Medium", "High", "Medium Bonus", "Low Penalty", "", "", "1,040");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "18", "Garrote", "Any", "Snare", "High", "High", "Medium Bonus", "Medium Penalty", "Achille Heel", "Target moves 60% slower for 12 seconds.", "0,721");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "21", "Perforate Artery", "In front of target, stealthed", "Bleed", "Medium", "High", "High Bonus", "Medium Penalty", "Creeping Death", "Bleed for 7 body damage every 4.0 sec for 40 seconds.", "N/A");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "25", "Achilles Heel", "Garrote", "Slowed", "Medium", "High", "Medium Bonus", "No Bonus", "", "Target's attack speed reduced by 22% for 20 seconds.", "1,003");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "29", "Leaper", "Harmstring", "Bleed", "Medium", "High", "High Bonus", "Low Bonus", "Rib Separation", "Bleed for 7 body damage every 4.0 sec for 40 seconds.", "1,306");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "34", "Creeping Death", "Perforate Artery", "Stun", "Low", "High", "High Bonus", "No Bonus", "Stunning Stab", "Target cannot move or take any other action for 7 seconds.", "1,070");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "39", "Stunning Stab", "Creeping Death", "Bleed", "Low", "High", "Very High Bonus", "Low Bonus", "", "Bleed for 10 body damage every 4.0 sec for 40 seconds.", "1,204");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "44", "Rib Separation", "Leaper", "Snare", "Low", "High", "High Bonus", "No Bonus", "Ripper", "Target moves 60% slower for 27 seconds.", "1,289");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "50", "Ripper", "Rib Separation", "Bleed", "Low", "High", "High Bonus", "Low Bonus", "", "Bleed for 11 body damage every 4.0 sec for 40 seconds.", "1,072");
Styles[iStylePT++] = BuildStylePT("Large Weapons", "2", "Celtic Might", "Any", "", "High", "", "No Bonus", "No Bonus", "", "", "0,034");
Styles[iStylePT++] = BuildStylePT("Large Weapons", "4", "Celtic Rage", "You Parry", "", "Low", "", "Medium Bonus", "Low Bonus", "Hibernian Vigor", "", "0,898");
Styles[iStylePT++] = BuildStylePT("Large Weapons", "6", "Celtic Fury", "Any", "Taunt", "Medium", "", "Medium Bonus", "Medium Penalty", "", "Increases your threat to monster targets by 17 damage.", "0,586");
Styles[iStylePT++] = BuildStylePT("Large Weapons", "8", "Hibernian Wrath", "Any", "Detaunt", "Medium", "", "No Bonus", "High Bonus", "", "Decreases your threat to monster targets by 19 damage", "0,000");
Styles[iStylePT++] = BuildStylePT("Large Weapons", "10", "Hibernian Force", "To side of target", "Bleed", "Medium", "", "Medium Bonus", "Low Penalty", "Obliteration", "Bleed for 4 body damage every 4.0 sec for 25 seconds.", "0,637");
Styles[iStylePT++] = BuildStylePT("Large Weapons", "12", "Hibernian Vigor", "Celtic Rage", "Stun", "Medium", "", "Medium Bonus", "Low Bonus", "Gigantic Blow", "Target cannot move or take any other action for 2 seconds.", "0,883");
Styles[iStylePT++] = BuildStylePT("Large Weapons", "15", "Domination", "Any", "Slowed", "High", "", "Low Bonus", "Low Penalty", "", "Target's attack speed reduced by 22% for 20 seconds.", "0,429");
Styles[iStylePT++] = BuildStylePT("Large Weapons", "18", "Obliteration", "Hibernian Force", "Snare", "Medium", "", "Medium Bonus", "No Bonus", "Demolish", "Target moves 60% slower for 12 seconds.", "0,883");
Styles[iStylePT++] = BuildStylePT("Large Weapons", "21", "Frontal Assault", "In front of target", "", "High", "", "Medium Bonus", "No Bonus", "", "", "0,681");
Styles[iStylePT++] = BuildStylePT("Large Weapons", "25", "Gigantic Blow", "Hibernian Vigor", "", "Low", "", "High Bonus", "No Bonus", "", "", "0,971");
Styles[iStylePT++] = BuildStylePT("Large Weapons", "29", "Ultimate Recovery", "Target parried", "Stun", "Medium", "", "Medium Bonus", "Low Penalty", "Devastate", "Target cannot move or take any other action for 6 seconds.", "0,917");
Styles[iStylePT++] = BuildStylePT("Large Weapons", "34", "Demolish", "Obliteration", "", "Medium", "", "High Bonus", "Medium Bonus", "", "", "0,883");
Styles[iStylePT++] = BuildStylePT("Large Weapons", "39", "Shatter", "Target blocked", "", "Medium", "", "Medium Bonus", "Low Bonus", "", "Bleed for 8 body damage every 4.0 sec for 40 seconds.", "0,883");
Styles[iStylePT++] = BuildStylePT("Large Weapons", "44", "Devastate", "Ultimate Recovery", "", "Low", "", "Medium Bonus", "High Bonus", "", "Target's attack speed reduced by 34% for 20 seconds.", "0,883");
Styles[iStylePT++] = BuildStylePT("Large Weapons", "50", "Annihiliation", "Behind target", "", "Medium", "", "Very High Bonus", "Medium Penalty", "", "Target cannot move or take any other action for 9 seconds.", "0,883");
Styles[iStylePT++] = BuildStylePT("Scythe", "2", "Reaper", "Any", "", "H", "Very Low", "No Bonus", "No Bonus", "", "", "0,055");
Styles[iStylePT++] = BuildStylePT("Scythe", "4", "Sawgrass", "You parry", "Pierce Armor", "L", "High", "Low Bonus", "No Bonus", "Thorny Shield", "Reduce slash resistance of target by 15% for 20 sec", "0,907");
Styles[iStylePT++] = BuildStylePT("Scythe", "6", "Taunting Scythe", "Any", "Taunt", "M", "Low", "No Bonus", "Medium Penalty", "", "Increases your threat to monster targets by 17 damage.", "0,592");
Styles[iStylePT++] = BuildStylePT("Scythe", "8", "Arboreal Fire", "You evade", "Add damage", "L", "Medium", "Medium Bonus", "No Bonus", "Foxfire", "Scythe of Flame gives the Valewalker an additional 2 DPS 30 sec", "0,890");
Styles[iStylePT++] = BuildStylePT("Scythe", "10", "Stunning Blade", "To side of target", "Stun", "M", "Medium", "Medium Bonus", "No Bonus", "Winter's Scythe", "Target cannot move or take any other action for 5 seconds.", "0,890");
Styles[iStylePT++] = BuildStylePT("Scythe", "12", "Foxfire", "Arboreal Fire", "DoT", "L", "High", "High Bonus", "No Bonus", "Flaming Scythe", "Flickering Flame casts a DOT (Damage-over-time) on the target for 18 damage every 4.0 sec for 20 seconds.", "0,945");
Styles[iStylePT++] = BuildStylePT("Scythe", "15", "Thorny Shield", "Sawgrass", "Damage shield", "L", "High", "Low Bonus", "H", "Grasping Roots", "Thornsprout casts a damage shield proc 4 dps 30 sec", "1,184");
Styles[iStylePT++] = BuildStylePT("Scythe", "18", "Winter's Scythe", "Stunning Blade", "Add damage", "L", "Medium", "Low Bonus", "No Bonus", "Blizzard Blade", "Scythe of Ice adds 4 DPS to every swing for 30 sec", "0,890");
Styles[iStylePT++] = BuildStylePT("Scythe", "21", "Grasping Roots", "Thorny Shield", "AoE DD", "VL", "High", "Medium Bonus", "H", "", "Spray of Needles (AOE) casts a direct damage spell with an area of 350 on the target for 33 damage.", "1,310");
Styles[iStylePT++] = BuildStylePT("Scythe", "25", "Nature's Shield", "Any", "Block ranged", "M", "None", "No Bonus", "No Bonus", "", "Block ranged attack until another style is used.", "0,000");
Styles[iStylePT++] = BuildStylePT("Scythe", "29", "Blizzard Blade", "Winter's Scythe", "AoE DD", "L", "Medium", "Medium Bonus", "No Bonus", "", "Frigid Mists (AOE) casts a direct damage spell with an area of 350 upon the target for 198 damage", "0,897");
Styles[iStylePT++] = BuildStylePT("Scythe", "34", "Arboreal Shield", "Any", "Detaunt", "M", "None", "No Bonus", "M", "Conflagration", "Decreases your threat to monster targets by 19 damage", "0,000");
Styles[iStylePT++] = BuildStylePT("Scythe", "39", "Flaming Scythe", "Foxfire", "AoE DD", "VL", "High", "High Bonus", "No Bonus", "", "Immolating Sphere (AOE) casts a direct damage spell with an area of 350 upon the target for 57 damage.", "1,193");
Styles[iStylePT++] = BuildStylePT("Scythe", "44", "Damaging Grasp", "Behind target", "Stun", "VL", "High", "Medium Bonus", "No Bonus", "", "Target cannot move or take any other action for 8 seconds.", "1,024");
Styles[iStylePT++] = BuildStylePT("Scythe", "50", "Conflagration", "Arboreal Shield", "DD", "H", "High", "Medium Bonus", "Medium Penalty", "", "Conflagaration casts a direct damage spell with heat damage upon the target for 95 damage.", "1,300");

//-- Midgard Styles --//
Styles[iStylePT++] = BuildStylePT("HandToHand", "2", "Kelgor's Bane", "Any", "", "Low", "Very Low", "No Bonus", "No Bonus", "", "", "0,037");
Styles[iStylePT++] = BuildStylePT("HandToHand", "4", "Tribal Rage", "You Parry", "", "Low", "High", "Low Bonus", "No Bonus", "Tribal Assaut", "", "1,164");
Styles[iStylePT++] = BuildStylePT("HandToHand", "6", "Wild Call", "Any", "Taunt", "Medium", "High", "No Bonus", "Medium Penalty", "", "Increases your target threat to monster targets by 17 damage.", "0,866");
Styles[iStylePT++] = BuildStylePT("HandToHand", "8", "Clan's Call", "Behind target", "Stun", "Low", "High", "Medium Bonus", "No Bonus", "Clan's Might", "Target cannot move or take any other action for 4 seconds.", "1,177");
Styles[iStylePT++] = BuildStylePT("HandToHand", "10", "Tribal Assault", "Tribal Rage", "Hit 2 targets", "Low", "High", "Low Bonus", "Low Penalty", "Tribal Wrath", "Hits up to 1 additional targets within melee range.", "1,195");
Styles[iStylePT++] = BuildStylePT("HandToHand", "12", "Kelgor's Might", "Any", "AE slowed", "High", "None", "No Bonus", "No Bonus", "", "Target's attack speed reduced by 7% for 20 seconds. Radius: 350.", "0,000");
Styles[iStylePT++] = BuildStylePT("HandToHand", "15", "Taunting Call", "Any", "Detaunt", "Medium", "None", "No Bonus", "High Bonus", "", "Decreases your threat to monster targets by 19 damage.", "0,000");
Styles[iStylePT++] = BuildStylePT("HandToHand", "18", "Clan's Might", "Clan's Call", "Hit 2 targets", "Low", "High", "No Bonus", "No Bonus", "", "Hits up to 1 additional targets within melee range.", "1,451");
Styles[iStylePT++] = BuildStylePT("HandToHand", "21", "Totemic Fear", "You Evade", "Snare", "Low", "High", "High Bonus", "No Bonus", "Totemic Wrath", "Target moves 60% slower for 19 seconds.", "1,207");
Styles[iStylePT++] = BuildStylePT("HandToHand", "25", "Totemic Wrath", "Totemic Fear", "Hit 3 targets", "Low", "High", "Medium Bonus", "No Bonus", "Totemic Sacrifice", "Hits up to 2 additional targets within melee range.", "1,451");
Styles[iStylePT++] = BuildStylePT("HandToHand", "29", "Kelgor's Claw", "Any", "Increase evade chance", "Medium", "None", "No Bonus", "No Bonus", "", "Increases your chance to evade by 15%.", "0,000");
Styles[iStylePT++] = BuildStylePT("HandToHand", "34", "Tribal Wrath", "Tribal Assault", "Increase parrychance", "Low", "High", "High Bonus", "Medium Bonus", "", "Increases your chance to evade by 25%.", "1,467");
Styles[iStylePT++] = BuildStylePT("HandToHand", "39", "Kelgor's Fist", "To side of target", "", "Low", "High", "Medium Bonus", "No Bonus", "Kelgor's Wrath", "", "1,244");
Styles[iStylePT++] = BuildStylePT("HandToHand", "44", "Kelgor's Wrath", "Kelgor's Fist", "Stun", "Low", "High", "High Bonus", "No Bonus", "", "Target cannot move or take any other action for 8 seconds.", "1,451");
Styles[iStylePT++] = BuildStylePT("HandToHand", "50", "Totemic Sacrifice", "Totemic Wrath", "Hit 4 targets", "None", "High", "Very High Bonus", "No Bonus", "", "Hits up to 3 additional targets within melee range.", "1,451");
Styles[iStylePT++] = BuildStylePT("Sword", "2", "Whirling Blade", "Any", "", "High", "Very Low", "No Bonus", "No Bonus", "", "", "0,039");
Styles[iStylePT++] = BuildStylePT("Sword", "4", "Frost Cut", "You Block", "Bleed", "Low", "Medium", "Low Bonus", "No Bonus", "Niord's Fury", "Bleed for 4 body damage every 4.0 sec for 25 seconds.", "0,865");
Styles[iStylePT++] = BuildStylePT("Sword", "6", "Draw Out", "Any", "Taunt", "Medium", "Low", "High Bonus", "Medium Penalty", "", "Increases your target threat to monster targets by 17 damage.", "0,574");
Styles[iStylePT++] = BuildStylePT("Sword", "8", "Northern Lights", "To side of target", "Slowed", "Medium", "Medium", "Low Bonus", "No Bonus", "Aurora", "Target's attack speed reduced by 19% for 20 seconds.", "0,613");
Styles[iStylePT++] = BuildStylePT("Sword", "10", "Assault", "Any", "", "Medium", "Medium", "Medium Bonus", "No Bonus", "Baldur's Fury", "", "0,379");
Styles[iStylePT++] = BuildStylePT("Sword", "12", "Temper", "Any", "Detaunt", "Medium", "None", "No Bonus", "Medium Bonus", "", "Decreases your threat to monster targets by 19 damage.", "0,000");
Styles[iStylePT++] = BuildStylePT("Sword", "15", "Aurora", "Northern Lights", "Snare", "Medium", "High", "Medium Bonus", "No Bonus", "", "Taget moves 60% slower for 15 seconds.", "0,886");
Styles[iStylePT++] = BuildStylePT("Sword", "18", "Baldur's Fury", "Assault", "Snare", "High", "Medium", "Medium Bonus", "No Bonus", "", "Taget moves 60% slower for 9 seconds.", "0,642");
Styles[iStylePT++] = BuildStylePT("Sword", "21", "Reinforcement", "You Parry", "Bleed", "Low", "Medium", "Medium Bonus", "Low Penalty", "Rush", "Bleed for 7 body damage every 4.0 sec for 40 seconds.", "0,865");
Styles[iStylePT++] = BuildStylePT("Sword", "25", "Ice Storm", "You Evade", "", "Medium", "High", "Medium Bonus", "No Bonus", "Sif's Revenge", "", "0,904");
Styles[iStylePT++] = BuildStylePT("Sword", "29", "Rush", "Reinforcement", "Slowed", "Low", "High", "No Bonus", "Medium Penalty", "", "Target's attack speed reduced by 21% for 20 seconds.", "0,893");
Styles[iStylePT++] = BuildStylePT("Sword", "34", "Polar Rift", "Any", "", "High", "Medium", "Low Bonus", "No Bonus", "", "", "0,603");
Styles[iStylePT++] = BuildStylePT("Sword", "39", "Niord's Fury", "Frost Cut", "Stun", "Low", "High", "Medium Bonus", "No Bonus", "", "Target cannot move or take any other action for 7 seconds.", "0,880");
Styles[iStylePT++] = BuildStylePT("Sword", "44", "Sif's Revenge", "Ice Storm", "Bleed", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "Bleed for 10 body damage every 4.0 sec for 40 seconds.", "0,880");
Styles[iStylePT++] = BuildStylePT("Sword", "50", "Ragnarok", "Behind target", "Slowed", "Medium", "Medium", "Medium Bonus", "Low Penalty", "", "Target's attack speed reduced by 30% for 20 seconds.", "0,865");
Styles[iStylePT++] = BuildStylePT("Axe", "2", "Splitter", "Any", "", "High", "Very Low", "No Bonus", "No Bonus", "", "", "0,036");
Styles[iStylePT++] = BuildStylePT("Axe", "4", "Cleave", "You Parry", "Slowed", "Low", "Medium", "Medium Bonus", "No Bonus", "Thrym's Strength", "Target's attack speed reduced by16% for 20 seconds.", "0,868");
Styles[iStylePT++] = BuildStylePT("Axe", "6", "Plague", "Any", "Taunt", "Medium", "High", "Medium Bonus", "Medium Penalty", "", "Increases your target threat to monster targets by 17 damage.", "0,572");
Styles[iStylePT++] = BuildStylePT("Axe", "8", "Thrym's Strength", "Cleave", "", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "", "0,891");
Styles[iStylePT++] = BuildStylePT("Axe", "10", "Pillager", "Any", "Slowed", "High", "Medium", "Low Bonus", "No Bonus", "Plunderer", "Target's attack speed reduced by 21% for 20 seconds.", "0,377");
Styles[iStylePT++] = BuildStylePT("Axe", "12", "Hoarfrost", "Any", "Detaunt", "Medium", "None", "Low Bonus", "Medium Bonus", "", "Decreases your threat to monster targets by 19 damage.", "0,000");
Styles[iStylePT++] = BuildStylePT("Axe", "15", "Evernight", "Behind target", "Bleed", "Low", "Medium", "Medium Bonus", "No Bonus", "Arctic Rift", "Bleed for 6 body damage every 4.0 sec for 35 seconds.", "0,595");
Styles[iStylePT++] = BuildStylePT("Axe", "18", "Plunderer", "Pillager", "Snare", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "Taget moves 60% slower for 11 seconds.", "0,640");
Styles[iStylePT++] = BuildStylePT("Axe", "21", "Valkyrie's Shield", "You Block", "", "Low", "Medium", "No Bonus", "Medium Bonus", "Midnight Sun", "", "0,891");
Styles[iStylePT++] = BuildStylePT("Axe", "25", "Raider", "You Evade", "Bleed", "Low", "High", "No Bonus", "No Bonus", "", "Bleed for 7 body damage every 4.0 sec for 40 seconds.", "0,954");
Styles[iStylePT++] = BuildStylePT("Axe", "29", "Havoc", "In front of target", "", "Medium", "High", "Low Bonus", "Low Penalty", "", "", "0,722");
Styles[iStylePT++] = BuildStylePT("Axe", "34", "Midnight Sun", "Valkyrie's Shield", "Stun", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "Target cannot move or take any other action for 6 seconds.", "0,868");
Styles[iStylePT++] = BuildStylePT("Axe", "39", "Glacial Movement", "To side of target", "Slowed", "Medium", "Medium", "Medium Bonus", "Low Penalty", "", "", "0,749");
Styles[iStylePT++] = BuildStylePT("Axe", "44", "Arctic Rift", "Evernight", "", "Low", "High", "Medium Bonus", "No Bonus", "", "", "0,945");
Styles[iStylePT++] = BuildStylePT("Axe", "50", "Tyr's Fury", "Havoc", "Bleed", "Medium", "High", "High Bonus", "No Bonus", "", "Bleed for 9 body damage every 4.0 sec for 40 seconds.", "0,904");
Styles[iStylePT++] = BuildStylePT("Hammer", "2", "Thor's Anvil", "Any", "", "High", "Very Low", "No Bonus", "No Bonus", "", "", "0,037");
Styles[iStylePT++] = BuildStylePT("Hammer", "4", "Crushing Blow", "You Parry", "Stun", "Low", "Medium", "Medium Bonus", "No Bonus", "Slam", "Target cannot move or take any other action for 2 seconds.", "0,857");
Styles[iStylePT++] = BuildStylePT("Hammer", "6", "Placate", "Any", "Detaunt", "Medium", "None", "No Bonus", "Medium Bonus", "", "Decreases your threat to monster targets by 19 damage.", "0,000");
Styles[iStylePT++] = BuildStylePT("Hammer", "8", "Slam", "Crushing Blow", "Bleed", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "Bleed for 3 body damage every 4.0 sec for 20 seconds.", "0,857");
Styles[iStylePT++] = BuildStylePT("Hammer", "10", "Ruiner", "Any", "", "Medium", "High", "Low Bonus", "No Bonus", "Crumble", "", "0,399");
Styles[iStylePT++] = BuildStylePT("Hammer", "12", "Frost Hammer", "To side of target", "Snare", "Medium", "High", "Medium Bonus", "No Bonus", "Demolish", "Taget moves 60% slower for 15 seconds.", "0,671");
Styles[iStylePT++] = BuildStylePT("Hammer", "15", "Provoke", "Any", "Taunt", "Low", "Low", "Medium Bonus", "Medium Penalty", "", "Increases your target threat to monster targets by 17 damage.", "0,575");
Styles[iStylePT++] = BuildStylePT("Hammer", "18", "Demolish", "Frost Hammer", "Stun", "High", "Medium", "Low Bonus", "No Bonus", "", "Target cannot move or take any other action for 2 seconds.", "0,644");
Styles[iStylePT++] = BuildStylePT("Hammer", "21", "Revenge", "You Block", "Slowed", "Low", "Medium", "Medium Bonus", "Low Penalty", "Thor's Answer", "Target's attack speed reduced by 21% for 20 seconds.", "0,857");
Styles[iStylePT++] = BuildStylePT("Hammer", "25", "Crumble", "Ruiner", "", "Medium", "High", "Medium Bonus", "No Bonus", "", "", "0,740");
Styles[iStylePT++] = BuildStylePT("Hammer", "29", "Conquer", "Behind target", "Snare", "Low", "High", "No Bonus", "High Penalty", "Sledgehammer", "Taget moves 60% slower for 23 seconds.", "0,719");
Styles[iStylePT++] = BuildStylePT("Hammer", "34", "Thor's Answer", "Revenge", "Stun", "Medium", "Medium", "Medium Bonus", "No Bonus", "", "Target cannot move or take any other action for 7 seconds.", "0,857");
Styles[iStylePT++] = BuildStylePT("Hammer", "39", "Lambast", "You Parry", "Bleed", "Low", "Medium", "Medium Bonus", "Low Bonus", "Mjolnir's Fury", "Bleed for 9 body damage every 4.0 sec for 40 seconds.", "0,857");
Styles[iStylePT++] = BuildStylePT("Hammer", "44", "Sledgehammer", "Conquer", "", "Medium", "High", "High Bonus", "No Bonus", "", "", "0,916");
Styles[iStylePT++] = BuildStylePT("Hammer", "50", "Mjolnir's Fury", "Lambast", "Slowed", "Medium", "High", "Low Bonus", "Medium Penalty", "", "Target's attack speed reduced by 34% for 20 seconds.", "0,905");
Styles[iStylePT++] = BuildStylePT("Left Axe", "2", "Counter Slash", "Any", "", "High", "Very Low", "No Bonus", "No Bonus", "", "", "0,037");
Styles[iStylePT++] = BuildStylePT("Left Axe", "4", "Doubler", "Behind target", "Bleed", "Medium", "Low", "Low Bonus", "Low Penalty", "", "Bleed for 3 body damage every 4.0 sec for 20 seconds.", "0,603");
Styles[iStylePT++] = BuildStylePT("Left Axe", "6", "Ravager", "Any", "", "Medium", "Low", "Low Bonus", "No Bonus", "Atrophy", "", "0,351");
Styles[iStylePT++] = BuildStylePT("Left Axe", "8", "Polar Light", "You Parry", "Slowed", "Low", "Low", "High Bonus", "Low Bonus", "Frost Shadow", "Target's attack speed reduced by 19% for 20 seconds.", "0,874");
Styles[iStylePT++] = BuildStylePT("Left Axe", "10", "Snowblind", "Any", "Taunt", "Medium", "Low", "Low Bonus", "Medium Penalty", "", "Increases your target threat to monster targets by 17 damage.", "0,572");
Styles[iStylePT++] = BuildStylePT("Left Axe", "12", "Atrophy", "Ravager", "Snare", "Medium", "Low", "Low Bonus", "No Bonus", "Scathing Blade, Decaying Rage", "Taget moves 60% slower for 12 seconds.", "0,658");
Styles[iStylePT++] = BuildStylePT("Left Axe", "15", "Frost Shadow", "Polar Light", "", "Medium", "Low", "Medium Bonus", "Low Bonus", "", "", "0,923");
Styles[iStylePT++] = BuildStylePT("Left Axe", "18", "Comeback", "You Evade", "", "Low", "Low", "Medium Bonus", "No Bonus", "Frosty Gaze", "", "0,917");
Styles[iStylePT++] = BuildStylePT("Left Axe", "21", "Scathing Blade", "Atrophy", "Slowed", "Medium", "Medium", "Medium Bonus", "Medium Penalty", "", "Target's attack speed reduced by 21% for 20 seconds.", "0,972");
Styles[iStylePT++] = BuildStylePT("Left Axe", "25", "Decaying Rage", "Atrophy", "Detaunt", "Low", "Low", "Medium Bonus", "High Bonus", "", "Decreases your threat to monster targets by 19 damage.", "0,923");
Styles[iStylePT++] = BuildStylePT("Left Axe", "29", "Snowsquall", "Behind target", "", "Medium", "Medium", "Medium Bonus", "No Bonus", "Icy Brillance", "", "0,972");
Styles[iStylePT++] = BuildStylePT("Left Axe", "34", "Doublefrost", "Any", "", "High", "Low", "Low Bonus", "No Bonus", "", "", "0,720");
Styles[iStylePT++] = BuildStylePT("Left Axe", "39", "Frosty Gaze", "Comeback", "Stun", "Medium", "Low", "Medium Bonus", "No Bonus", "", "Target cannot move or take any other action for 7 seconds.", "0,935");
Styles[iStylePT++] = BuildStylePT("Left Axe", "44", "Icy Brillance", "Snowsquall", "Bleed", "Medium", "Medium", "High Bonus", "No Bonus", "", "Bleed for 9 body damage every 4.0 sec for 40 seconds.", "1,101");
Styles[iStylePT++] = BuildStylePT("Left Axe", "50", "Aurora Borealis", "Target parried", "Slowed", "Low", "High", "High Bonus", "No Bonus", "", "Decreases the target\'s combat speed for 20 seconds. ", "1,267");
//Styles[iStylePT++]=BuildStylePT("Shield", "3", "Numb", "Any", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 2 seconds.", "0,047");
//Styles[iStylePT++]=BuildStylePT("Shield", "8", "Stun", "You Block", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 3 seconds.", "0,840");
//Styles[iStylePT++]=BuildStylePT("Shield", "13", "Disable", "To side of target", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 4 seconds.", "0,645");
//Styles[iStylePT++]=BuildStylePT("Shield", "18", "Incapacitate", "You Block", "Stun", "Very High", "Low", "No Bonus", "Medium Bonus", "", "Target cannot move or take any other action for 5 seconds.", "0,859");
//Styles[iStylePT++]=BuildStylePT("Shield", "23", "Paralyze", "Behind target", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 6 seconds.", "0,683");
//Styles[iStylePT++]=BuildStylePT("Shield", "29", "Bash", "You Block", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 7 seconds.", "0,850");
//Styles[iStylePT++]=BuildStylePT("Shield", "35", "Mangle", "To side of target", "Stun", "High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 8 seconds.", "0,730");
//Styles[iStylePT++]=BuildStylePT("Shield", "42", "Slam", "Any", "Stun", "Very High", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 9 seconds.", "0,759");
//Styles[iStylePT++]=BuildStylePT("Shield", "50", "Brutalize", "You Block", "Stun", "Medium", "Low", "No Bonus", "No Bonus", "", "Target cannot move or take any other action for 10 seconds.", "0,850");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "2", "Backstab", "Behind target, stealthed", "Stun", "Medium", "Very Low", "Medium Bonus", "Medium Penalty", "Eviscerate", "Target cannot move or take any other action for 2 seconds.", "0,000");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "4", "Eviscerate", "Backstab", "Slowed", "Medium", "High", "Low Bonus", "Low Penalty", "Kidney Rupture", "Target's attack speed reduced by 16% for 20 seconds.", "0,617");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "6", "Kidney Rupture", "Eviscerate", "Bleed", "Low", "High", "Low Bonus", "Medium Penalty", "", "Bleed for 4 body damage every 4.0 sec for 25 seconds.", "0,669");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "8", "Pincer", "To side of target", "", "Medium", "High", "High Bonus", "High Penalty", "", "", "0,877");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "10", "Backstab II", "Behind target, stealthed", "Stun", "High", "High", "High Bonus", "Medium Penalty", "Thigh Cut", "Target cannot move or take any other action for 3 seconds.", "0,000");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "12", "Hamstring", "You Evade", "Bleed", "Low", "High", "Medium Bonus", "Medium Bonus", "Leaper", "Bleed for 5 body damage every 4.0 sec for 30 seconds.", "1,100");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "15", "Thigh Cut", "Backstab II", "", "Medium", "High", "Medium Bonus", "Low Penalty", "", "", "1,040");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "18", "Garrote", "Any", "Snare", "High", "High", "Medium Bonus", "Medium Penalty", "Achille Heel", "Target moves 60% slower for 12 seconds.", "0,721");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "21", "Perforate Artery", "In front of target, stealthed", "Bleed", "Medium", "High", "High Bonus", "Medium Penalty", "Creeping Death", "Bleed for 7 body damage every 4.0 sec for 40 seconds.", "0,000");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "25", "Achilles Heel", "Garrote", "Slowed", "Medium", "High", "Medium Bonus", "No Bonus", "", "Target's attack speed reduced by 22% for 20 seconds.", "1,003");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "29", "Leaper", "Harmstring", "Bleed", "Medium", "High", "High Bonus", "Low Bonus", "Rib Separation", "Bleed for 7 body damage every 4.0 sec for 40 seconds.", "1,306");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "34", "Creeping Death", "Perforate Artery", "Stun", "Low", "High", "High Bonus", "No Bonus", "Stunning Stab", "Target cannot move or take any other action for 7 seconds.", "1,070");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "39", "Stunning Stab", "Creeping Death", "Bleed", "Low", "High", "Very High Bonus", "Low Bonus", "", "Bleed for 10 body damage every 4.0 sec for 40 seconds.", "1,204");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "44", "Rib Separation", "Leaper", "Snare", "Low", "High", "High Bonus", "No Bonus", "Ripper", "Target moves 60% slower for 27 seconds.", "1,289");
//Styles[iStylePT++]=BuildStylePT("Crit Strike", "50", "Ripper", "Rib Separation", "Bleed", "Low", "High", "High Bonus", "Low Bonus", "", "Bleed for 11 body damage every 4.0 sec for 40 seconds.", "1,072");
Styles[iStylePT++] = BuildStylePT("Spear", "2", "Dazzling Spear", "Any", "", "High", "Very Low", "No Bonus", "No Bonus", "", "", "0,048");
Styles[iStylePT++] = BuildStylePT("Spear", "4", "Return Thrust", "You Evade", "Bleed", "Low", "Medium", "Medium Bonus", "No Bonus", "Extend Reach", "Bleed for 3 body damage every 4.0 sec for 20 seconds.", "0,856");
Styles[iStylePT++] = BuildStylePT("Spear", "6", "Engage", "Any", "Taunt", "Medium", "Low", "Medium Bonus", "Medium Penalty", "Wounding Thrust", "Increases your target threat to monster targets by 17 damage.", "0,575");
Styles[iStylePT++] = BuildStylePT("Spear", "8", "Extend Reach", "Return Thrust", "Slowed", "Low", "Medium", "Low Bonus", "No Bonus", "", "Target's attack speed reduced by 18% for 20 seconds.", "0,856");
Styles[iStylePT++] = BuildStylePT("Spear", "10", "Lancer", "Any", "", "Medium", "Medium", "Medium Bonus", "Low Penalty", "Stab, Lunging Thrust", "", "0,398");
Styles[iStylePT++] = BuildStylePT("Spear", "12", "Dismissal", "Any", "Detaunt", "Medium", "None", "No Bonus", "High Bonus", "", "Decreases your threat to monster targets by 19 damage.", "0,117");
Styles[iStylePT++] = BuildStylePT("Spear", "15", "Wounding Thrust", "Engage", "Snare", "Medium", "Medium", "Low Bonus", "No Bonus", "", "Taget moves 60% slower for 14 seconds.", "0,856");
Styles[iStylePT++] = BuildStylePT("Spear", "18", "Stab", "Lancer", "Bleed", "Low", "None", "Medium Bonus", "No Bonus", "Raze", "Bleed for 5 body damage every 4.0 sec for 30 seconds.", "0,370");
Styles[iStylePT++] = BuildStylePT("Spear", "21", "Perforate", "To side of target", "Slowed", "Medium", "Medium", "No Bonus", "Medium Penalty", "Gungnir's Fury", "Target's attack speed reduced by 22% for 20 seconds.", "0,679");
Styles[iStylePT++] = BuildStylePT("Spear", "25", "Lunging Thrust", "Lancer", "", "Medium", "High", "Medium Bonus", "No Bonus", "", "", "0,816");
Styles[iStylePT++] = BuildStylePT("Spear", "29", "Raze", "Stab", "Bleed", "Medium", "Low", "Medium Bonus", "No Bonus", "", "Bleed for 7 body damage every 4.0 sec for 40 seconds.", "0,679");
Styles[iStylePT++] = BuildStylePT("Spear", "34", "Whirling Spear", "Any", "", "High", "Medium", "Low Bonus", "Low Penalty", "", "", "0,663");
Styles[iStylePT++] = BuildStylePT("Spear", "39", "Razor Edge", "Behind target", "Stun", "Medium", "Medium", "Medium Bonus", "Low Penalty", "Odin's Wrath", "Target cannot move or take any other action for 5 seconds.", "0,788");
Styles[iStylePT++] = BuildStylePT("Spear", "44", "Odin's Wrath", "Razor Edge", "", "Low", "High", "High Bonus", "Low Bonus", "", "", "0,905");
Styles[iStylePT++] = BuildStylePT("Spear", "50", "Grungnir's Fury", "Perforate", "Bleed", "Medium", "High", "Medium Bonus", "No Bonus", "", "Bleed for 11 body damage every 4.0 sec for 40 seconds.", "0,828");

Styles[iStylePT++] = new stylePT(129, "Critical Shot I", 3, "Increased Damage", "", "", "2x Normal", "", "", "", 0, "")
Styles[iStylePT++] = new stylePT(129, "Critical Shot II", 6, "Increased Damage", "", "", "1.9x Normal", "", "", "", 0, "")
Styles[iStylePT++] = new stylePT(129, "Critical Shot III", 9, "Increased Damage", "", "", "1.8x Normal", "", "", "", 0, "")
Styles[iStylePT++] = new stylePT(129, "Critical Shot IV", 12, "Increased Damage", "", "", "1.7x Normal", "", "", "", 0, "")
Styles[iStylePT++] = new stylePT(129, "Critical Shot V", 15, "Increased Damage", "", "", "1.6x Normal", "", "", "", 0, "")
Styles[iStylePT++] = new stylePT(129, "Critical Shot VI", 18, "Increased Damage", "", "", "1.5x Normal", "", "", "", 0, "")
Styles[iStylePT++] = new stylePT(129, "Critical Shot VII", 21, "Increased Damage", "", "", "1.4x Normal", "", "", "", 0, "")
Styles[iStylePT++] = new stylePT(129, "Critical Shot VIII", 24, "Increased Damage", "", "", "1.3x Normal", "", "", "", 0, "")
Styles[iStylePT++] = new stylePT(129, "Critical Shot IX", 27, "Increased Damage", "", "", "1.2x Normal", "", "", "", 0, "")
Styles[iStylePT++] = new stylePT(129, "Penetrating Arrow I", 30, "Chance to penetrate bladeturn for 50% damage", "", "", "Normal", "", "", "", 0, "");
Styles[iStylePT++] = new stylePT(129, "Rapid Fire I", 35, "Release shot early; Damage % equal to Timer %", "", "", "Timer-based", "", "", "", 0, "");
Styles[iStylePT++] = new stylePT(129, "Penetrating Arrow II", 40, "Chance to penetrate bladeturn for 75% damage", "", "", "Normal", "", "", "", 0, "");
Styles[iStylePT++] = new stylePT(129, "Rapid Fire II", 45, "Release shot early; Damage % equal to Timer %", "", "", "Timer-based", "", "", "", 0, "");
Styles[iStylePT++] = new stylePT(129, "Penetrating Arrow III", 50, "Chance to penetrate bladeturn for 100% damage", "", "", "Normal", "", "", "", 0, "");