// Literal strings and concatenated literal strings.
// Slightly modfied from `warning-and-invariant-args`.
const getLiteralString = function(node) {
  if (node.type === 'Literal' && typeof node.value === 'string') {
    return node.value;
  } else if (node.type === 'BinaryExpression' && node.operator === '+') {
    const l = getLiteralString(node.left) || null;
    const r = getLiteralString(node.right) || null;
    if (l !== null && r !== null) {
      return `${l}${r}`;
    }
  } else if (node.type === 'TemplateLiteral') {
    // Hacky support for template strings.
    return node.quasis.reduce((a, b) => {
      return `${a}${b.value.cooked}`;
    });
  }
  return null;
};

module.exports = {
  getLiteralString,
};
