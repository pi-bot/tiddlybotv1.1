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
  var code = 'servos.moveForward(' + value_time + ' ) \n';
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
    this.setColour(260);
    this.appendDummyInput()
        .appendField("Set LED Color");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["WHITE", "WHITE"], ["RED", "RED"], ["GREEN", "GREEN"], ["BLUE", "BLUE"], ["LIGHT_BLUE", "LIGHT_BLUE"], ["YELLOW", "YELLOW"], ["BLACK", "BLACK"]]), "LEDS");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['pibot_setled'] = function(block) {
  //var color = "WHITE";
  color = block.getFieldValue('LEDS');
  var code = 'color.led_color(TiddlyBotColors.' + color + ' ) \n';
  console.log(color);
  return code;
};

Blockly.Blocks['pibot_camera_angle'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(330);
    this.appendDummyInput()
        .appendField("Set Camera Angle");
    this.appendValueInput("ANGLE")
        .setCheck("Number")
        .appendField("Angle");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Python['pibot_camera_angle'] = function(block) {
  var value_angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_NONE);
  var code = 'servos.setCameraAngle(' + value_angle + ' ) \n';
  return code;
};
