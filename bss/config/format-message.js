const os = require("os");
const codeFrame = require("babel-code-frame");
const chalk = require("chalk");
const fs = require("fs-extra");

module.exports = function formatMessage(message, useColors) {
  const colors = new chalk.default.constructor({ enabled: useColors });
  const messageColor = message.isWarningSeverity()
    ? colors.bold.yellow
    : colors.bold.red;
  const positionColor = colors.dim;
  const file = message.file;

  const source = file && fs.existsSync(file) && fs.readFileSync(file, 'utf-8');
  let frame = '';
  if (source) {
    frame = codeFrame(source, message.line, // Assertion: `codeFrame` allows passing undefined, typings are incorrect
      message.character, Object.assign({}/* , options || {} */, { highlightCode: useColors }))
      .split('\n')
      .map(str => '  ' + str)
      .join(os.EOL);
  }
  return (messageColor(message.severity.toUpperCase() + ' in ' + message.file) +
    ':' +
    positionColor(message.line + ':' + message.character) +
    os.EOL +
    message.content +
    (frame ? os.EOL + frame : ''));
}