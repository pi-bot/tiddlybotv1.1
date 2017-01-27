Blockly.Blocks['pibot_wait'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(290);
    this.appendDummyInput()
        .appendField("Wait Time");
    this.appendValueInput("TIME");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['pibot_wait'] = function(block) {
  var value_time = Blockly.Python.valueToCode(block, 'TIME', Blockly.Python.ORDER_NONE);
  // TODO: Assemble Python into code variable.
  var code = 'time.sleep(' + value_time + ' ) \n';
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
  var code = 'robot.forward() \n';
  code += 'time.sleep(' + value_time + ' ) \n';
  code += 'robot.stop() \n';
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
  var code = 'robot.backward() \n';
  code += 'time.sleep(' + value_time + ' ) \n';
  code += 'robot.stop() \n';
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
  var code = 'robot.turn_left() \n';
  code += 'time.sleep(' + value_time + ' ) \n';
  code += 'robot.stop() \n';
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
  var code = 'robot.turn_right() \n';
  code += 'time.sleep(' + value_time + ' ) \n';
  code += 'robot.stop() \n';
  return code;
};

//////////////////////////////////////////////////////////////////////////////////////

Blockly.Blocks['discovery_move'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendDummyInput()
        .appendField("Move Robot");
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("Time (s)");
    this.appendDummyInput()
	.appendField("Direction")
        .appendField(new Blockly.FieldDropdown([["Forward", "FORWARD"], ["Back", "BACK"], ["Left", "LEFT"], ["Right", "RIGHT"]]), "TYPE");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['discovery_move'] = function(block) {
  var value_time = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  var dropdown_type = block.getFieldValue('TYPE');
  // TODO: Assemble Python into code variable.

  var code = '';

  switch(dropdown_type) {
    case 'FORWARD':
        code = 'robot.forward()\n';
        break;
    case 'BACK':
        code = 'robot.backward()\n';
        break;
    case 'LEFT':
	code = 'robot.turn_left()\n';
	break;
    case 'RIGHT':
	code = 'robot.turn_right()\n';
	break;
  }


  code += 'time.sleep(' + value_time + ' ) \n';
  code += 'robot.stop() \n';

  return code;
};

Blockly.Blocks['discovery_leds'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(65);
    this.appendDummyInput()
        .appendField("Set LED");
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("Time (s)");
    this.appendDummyInput()
        .appendField("Colour")
        .appendField(new Blockly.FieldDropdown([["Red", "RED"], ["Blue", "BLUE"], ["Green", "GREEN"]]), "TYPE");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['discovery_leds'] = function(block) {
  var value_time = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  var dropdown_type = block.getFieldValue('TYPE');
  // TODO: Assemble Python into code variable.
  var code = '';

  switch(dropdown_type) {
    case 'RED':
        code = 'red.on()\n';
	code += 'time.sleep(' + value_time + ' ) \n';
  	code += 'red.off() \n';
        break;
    case 'BLUE':
        code = 'blue.on()\n';
	code += 'time.sleep(' + value_time + ' ) \n';
  	code += 'blue.off() \n';
        break;
    case 'GREEN':
	code = 'green.on()\n';
	code += 'time.sleep(' + value_time + ' ) \n';
  	code += 'green.off() \n';
	break;

  }


  code += 'time.sleep(' + value_time + ' ) \n';
  code += 'red.off() \n';

  return code;
};

Blockly.Blocks['discovery_buzzer'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(65);
    this.appendDummyInput()
        .appendField("Buzzer On!");
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("Time (s)");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['discovery_buzzer'] = function(block) {
  var value_time = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'buzzer.on();\n';
  code += 'time.sleep(' + value_time + ' ) \n';
  code += 'buzzer.off() \n';
  return code;
};

Blockly.Blocks['discovery_button'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendDummyInput()
        .appendField("Button Pressed");
    this.appendStatementInput("TRIGGER");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['discovery_button'] = function(block) {
  var statements_trigger = Blockly.Python.statementToCode(block, 'TRIGGER');
  // TODO: Assemble Python into code variable.
  var code = 'if b.button_pressed():\n';
  code += statements_trigger;
  return code;
};

Blockly.Blocks['discovery_usound'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendValueInput("NAME")
        .appendField("If distance")
        .appendField(new Blockly.FieldDropdown([[">=", "GREATER"], ["=<", "LESS"]]), "OPERATOR");
    this.appendStatementInput("TRIGGER");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['discovery_usound'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  var statements_trigger = Blockly.Python.statementToCode(block, 'TRIGGER');
  var dropdown_operator = block.getFieldValue('OPERATOR');
  // TODO: Assemble Python into code variable.
  if (dropdown_operator == 'GREATER') {
      symbol = '>=';
  }
  else {
      symbol = '=<';
  }

  var code = 'if (usound.read_normalized() ' + symbol + ' ' + value_name + '):';
  code += statements_trigger;
  return code;
};
