/**
 * Blockly Apps: Code
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for Blockly's Code application.
 * @author fraser@google.com (Neil Fraser)
 */

// Supported languages.
BlocklyApps.LANGUAGES =
    ['ace', 'ar', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'fa', 'fr', 'he',
     'hrx', 'hu', 'is', 'it', 'ko', 'mg', 'ms', 'nl', 'pl', 'pms', 'pt-br',
     'ro', 'ru', 'sco', 'sr', 'sv', 'th', 'tlh', 'tr', 'uk', 'vi', 'zh-hans',
     'zh-hant'];
BlocklyApps.LANG = BlocklyApps.getLang();

document.write('<script type="text/javascript" src="generated/' +
               BlocklyApps.LANG + '.js"></script>\n');

/**
 * Create a namespace for the application.
 */
var Code = {};

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['blocks', 'python'];

Code.selected = 'blocks';

Code.webSocketURL = "http://" + window.location.hostname + "/robot_control";
Code.socket = new SockJS( Code.webSocketURL );

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Code.tabClick = function(clickedName) {
  // Deselect all tabs and hide all panes.
  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.visibility = 'hidden';
  }

  // Select the active tab.
  Code.selected = clickedName;
  document.getElementById('tab_' + clickedName).className = 'tabon';
  // Show the selected pane.
  document.getElementById('content_' + clickedName).style.visibility =
      'visible';
  Code.renderContent();
  Blockly.fireUiEvent(window, 'resize');
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function() {
  var content = document.getElementById('content_' + Code.selected);
  // Initialize the pane.
  if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  } else if (content.id == 'content_javascript') {
    var code = Blockly.JavaScript.workspaceToCode();
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
      code = content.innerHTML;
      code = prettyPrintOne(code, 'js');
      content.innerHTML = code;
    }
  } else if (content.id == 'content_python') {
    code = Blockly.Python.workspaceToCode();
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
      code = content.innerHTML;
      code = prettyPrintOne(code, 'py');
      content.innerHTML = code;
    }
  } else if (content.id == 'content_dart') {
    code = Blockly.Dart.workspaceToCode();
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
      code = content.innerHTML;
      code = prettyPrintOne(code, 'dart');
      content.innerHTML = code;
    }
  }
};

/**
 * Initialize Blockly.  Called on page load.
 */
Code.init = function() {
  BlocklyApps.init();

  var rtl = BlocklyApps.isRtl();
  var container = document.getElementById('content_area');
  var onresize = function(e) {
    var bBox = BlocklyApps.getBBox_(container);
    for (var i = 0; i < Code.TABS_.length; i++) {
      var el = document.getElementById('content_' + Code.TABS_[i]);
      el.style.top = bBox.y + 'px';
      el.style.left = bBox.x + 'px';
      // Height and width need to be set, read back, then set again to
      // compensate for scrollbars.
      el.style.height = bBox.height + 'px';
      el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
      el.style.width = bBox.width + 'px';
      el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
    }
    // Make the 'Blocks' tab line up with the toolbox.
    if (Blockly.Toolbox.width) {
      document.getElementById('tab_blocks').style.minWidth =
          (Blockly.Toolbox.width - 38) + 'px';
          // Account for the 19 pixel margin and on each side.
    }
  };
  window.addEventListener('resize', onresize, false);

  var toolbox = document.getElementById('toolbox');
  Blockly.inject(document.getElementById('content_blocks'),
      {path: '../../',
       rtl: rtl,
       toolbox: toolbox});

Blockly.JavaScript.addReservedWords('code');

Blockly.Blocks['pibot_line_follow'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Run Line Follower");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['pibot_line_follow'] = function(block) {
  var code = 'os.system("sudo python /home/pi/line_follower.py") \n';
  return code;
};

Blockly.Blocks['pibot_wait'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendValueInput("NAME")
        .appendField("Wait Time");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['pibot_wait'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_NONE);
  var code = 'time.sleep( ' + value_name + ') \n';
  return code;
};
  
Blockly.Blocks['pibot_moveforward'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Move Forwards");
    this.appendValueInput("TIME")
        .setCheck("Number")
        .appendField("Time");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['pibot_moveforward'] = function(block) {
  var value_time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_NONE);
  var code = 'servos.moveForward(' + value_time + ' ) \n';
  //var code = 'os.system("sudo python /home/pi/raspberry_pi_camera_bot/run_motors.py") \n';
  return code;
};

Blockly.Blocks['pibot_movebackward'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Move Backwards");
    this.appendValueInput("TIME")
        .setCheck("Number")
        .appendField("Time");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['pibot_movebackward'] = function(block) {
  var value_time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_NONE);
  var code = 'servos.moveBackward(' + value_time + ' ) \n';
  return code;
};

Blockly.Blocks['pibot_turnleft'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Turn Left");
    this.appendValueInput("TIME")
        .setCheck("Number")
        .appendField("Time");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['pibot_turnleft'] = function(block) {
  var value_time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_NONE);
  var code = 'servos.turnLeft(' + value_time + ' ) \n';
  return code;
};

Blockly.Blocks['pibot_turnright'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Turn Right");
    this.appendValueInput("TIME")
        .setCheck("Number")
        .appendField("Time");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['pibot_turnright'] = function(block) {
  var value_time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_NONE);
  var code = 'servos.turnRight(' + value_time + ' ) \n';
  return code;
};

Blockly.Blocks['pibot_setled'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(65);
    this.appendDummyInput()
        .appendField("Set LED");
    this.appendValueInput("LEDNUM")
        .setCheck("Number")
        .appendField("LED Number");
    this.appendValueInput("LEDCOLOUR")
        .setCheck("")
        .appendField("Colour");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

Blockly.Python['pibot_setled'] = function(block) {
  var value_lednum = Blockly.Python.valueToCode(block, 'LEDNUM', Blockly.Python.ORDER_ATOMIC);
  var value_ledcolour = Blockly.Python.valueToCode(block, 'LEDCOLOUR', Blockly.Python.ORDER_ATOMIC);
  value_ledcolour = value_ledcolour.replace("'",'');
  var code = 'pi_robot.setNeoPixelColour(' + value_lednum + ',' + hexToR(value_ledcolour) + ',' + hexToG(value_ledcolour) + ',' + hexToB(value_ledcolour) + ') \n';
  return code;
};

Blockly.Blocks['pibot_linesensor'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Light Sensor On?");
    this.setOutput(true);
    this.setTooltip('');
  }
};

Blockly.Python['pibot_linesensor'] = function(block) {
  var code = 'GPIO.input(line_sensor) == GPIO.LOW';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['pibot_camera_angle'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("Set Camera Tilt");
    this.appendValueInput("ANGLE")
        .setCheck("Number")
        .appendField("Angle");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['pibot_camera_angle'] = function(block) {
  var value_angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC);
  var code = 'pi_robot.setServoAngle(' + value_angle + ') \n';
  return code;
};

  BlocklyApps.loadBlocks('');

  if ('BlocklyStorage' in window) {
    // Hook a save function onto unload.
    BlocklyStorage.backupOnUnload();
  }

  Code.tabClick(Code.selected);
  Blockly.fireUiEvent(window, 'resize');

  BlocklyApps.bindClick('trashButton',
      function() {Code.discard(); Code.renderContent();});
  BlocklyApps.bindClick('runButton', Code.runPython);

  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    BlocklyApps.bindClick('tab_' + name,
        function(name_) {return function() {Code.tabClick(name_);};}(name));
  }

  // Lazy-load the syntax-highlighting.
  window.setTimeout(BlocklyApps.importPrettify, 1);
};

if (window.location.pathname.match(/readonly.html$/)) {
  window.addEventListener('load', BlocklyApps.initReadonly);
} else {
  window.addEventListener('load', Code.init);
}

/**
 * Execute the user's code.
 * Send it over socketJS to Python back-end
 */
Code.runPython = function() {
    code = Blockly.Python.workspaceToCode();
    Code.socket.send( "Code \n" + code );
}

/**
 * Discard all blocks from the workspace.
 */
Code.discard = function() {
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (count < 2 ||
      window.confirm(BlocklyApps.getMsg('Code_discard').replace('%1', count))) {
    Blockly.mainWorkspace.clear();
    window.location.hash = '';
  }
};
