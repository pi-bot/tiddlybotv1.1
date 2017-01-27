// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">vizuálne programovacie prostredie</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Prezrieť vygenerovaný javascriptový kód.</span><span id="linkTooltip">Uložiť a zdieľať odkaz na tento program.</span><span id="runTooltip">Spustiť program, zložený z dielcov na pracovnej ploche.</span><span id="runProgram">Spustiť program</span><span id="resetProgram">Odznova</span><span id="dialogOk">OK</span><span id="dialogCancel">Zrušiť</span><span id="catLogic">Logika</span><span id="catLoops">Cykly</span><span id="catMath">Matematické</span><span id="catText">Text</span><span id="catLists">Zoznamy</span><span id="catColour">Farby</span><span id="catVariables">Premenné</span><span id="catProcedures">Funkcie</span><span id="httpRequestError">Problém so spracovaním požiadavky.</span><span id="linkAlert">Zdieľať tento program skopírovaním odkazu\n\n%1</span><span id="hashError">Prepáč, \'%1\' nie je meno žiadnemu uloženému programu.</span><span id="xmlError">Nebolo možné načítať uložený súbor. Možno bol vytvorený v inej verzii Blocky.</span><span id="listVariable">zoznam</span><span id="textVariable">text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof codepage == 'undefined') { var codepage = {}; }


codepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Code_badXml">Chyba pri parsovaní XML:\n%1\n\nStlačte \'OK\' ak chcete zrušiť zmeny alebo \'Zrušiť\' pre pokračovanie v úpravách XML.</span><span id="Code_badCode">Chyba v programe:\n%1</span><span id="Code_timeout">Bol prekročený maximálny počet opakovaní.</span><span id="Code_discard">Zmazať všetkých %1 dielcov?</span></div>';
};


codepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return codepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../blocks_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../python_compressed.js"><\/script><script type="text/javascript" src="../../dart_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><table width="100%" height="100%"><tr><td><h1><span id="title"><a href="../index.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">Blockly</a> : Kód</span></h1></td><td class="farSide"><select id="languageMenu"></select></td></tr><tr><td colspan=2><table width="100%"><tr id="tabRow" height="1em"><td id="tab_blocks" class="tabon">Bloky</td><td class="tabmin">&nbsp;</td><td id="tab_python" class="taboff">Python</td><td class="tabmin">&nbsp;</td><td class="tabmax"><button id="trashButton" class="notext" title="Zahodiť všetky dielce."><img src=\'../../media/1x1.gif\' class="trash icon21"></button> <button id="linkButton" class="notext" title="Uložiť a zdieľať odkaz na tento program."><img src=\'../../media/1x1.gif\' class="link icon21"></button> <button id="runButton" class="notext primary" title="Spustiť program, zložený z dielcov na pracovnej ploche."><img src=\'../../media/1x1.gif\' class="run icon21"></button></td></tr></table></td></tr><tr><td height="99%" colspan=2 id="content_area">' + codepage.toolbox(null, null, opt_ijData) + '</td></tr></table><div id="content_blocks" class="content"></div><pre id="content_javascript" class="content"></pre><pre id="content_python" class="content"></pre><pre id="content_dart" class="content"></pre><textarea id="content_xml" class="content" wrap="off"></textarea>' + apps.dialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData);
};


codepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><category name="Movement"><block type="pibot_setmotorspeed"></block></category><category name="Logika"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_null"></block><block type="logic_ternary"></block></category><category name="Cykly"><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">10</field></block></value></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value><value name="TO"><block type="math_number"><field name="NUM">10</field></block></value><value name="BY"><block type="math_number"><field name="NUM">1</field></block></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category><category name="Matematické"><block type="math_number"></block><block type="math_arithmetic"></block><block type="math_single"></block><block type="math_trig"></block><block type="math_constant"></block><block type="math_number_property"></block><block type="math_change"><value name="DELTA"><block type="math_number"><field name="NUM">1</field></block></value></block><block type="math_round"></block><block type="math_on_list"></block><block type="math_modulo"></block><block type="math_constrain"><value name="LOW"><block type="math_number"><field name="NUM">1</field></block></value><value name="HIGH"><block type="math_number"><field name="NUM">100</field></block></value></block><block type="math_random_int"><value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value><value name="TO"><block type="math_number"><field name="NUM">100</field></block></value></block><block type="math_random_float"></block></category><category name="Text"><block type="text"></block><block type="text_join"></block><block type="text_append"><value name="TEXT"><block type="text"></block></value></block><block type="text_length"></block><block type="text_isEmpty"></block><block type="text_indexOf"><value name="VALUE"><block type="variables_get"><field name="VAR">text</field></block></value></block><block type="text_charAt"><value name="VALUE"><block type="variables_get"><field name="VAR">text</field></block></value></block><block type="text_getSubstring"><value name="STRING"><block type="variables_get"><field name="VAR">text</field></block></value></block><block type="text_changeCase"></block><block type="text_trim"></block><block type="text_print"></block><block type="text_prompt"></block></category><category name="Zoznamy"><block type="lists_create_empty"></block><block type="lists_create_with"></block><block type="lists_repeat"><value name="NUM"><block type="math_number"><field name="NUM">5</field></block></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><value name="VALUE"><block type="variables_get"><field name="VAR">zoznam</field></block></value></block><block type="lists_getIndex"><value name="VALUE"><block type="variables_get"><field name="VAR">zoznam</field></block></value></block><block type="lists_setIndex"><value name="LIST"><block type="variables_get"><field name="VAR">zoznam</field></block></value></block><block type="lists_getSublist"><value name="LIST"><block type="variables_get"><field name="VAR">zoznam</field></block></value></block></category><category name="Farby"><block type="colour_picker"></block><block type="colour_random"></block><block type="colour_rgb"></block><block type="colour_blend"></block></category><category name="Premenné" custom="VARIABLE"></category><category name="Funkcie" custom="PROCEDURE"></category></xml>';
};


codepage.readonly = function(opt_data, opt_ignored, opt_ijData) {
  return codepage.messages(null, null, opt_ijData) + '<script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../blocks_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><div id="blockly"></div>';
};
