const EXPRESSIONS_TYPES = {
    EXPRESSION_STATEMENT: 'ExpressionStatement',
    BLOCK_STATEMENT: 'BlockStatement'
};
const IT_EXPRESSION = 'it';
const DESCRIBE_EXPRESSION = 'describe';
const AVAILABLE_LINE_DIFF = 2;

const getLineDifference = (node, nextNode) => {
    if (!nextNode) return AVAILABLE_LINE_DIFF;
    return nextNode.loc.start.line - node.loc.end.line;
};

const getCalleeName = node => {
    if (!node) return '';
    if (node.callee) return node.callee.name;
    if (node.expression && node.expression.callee) return node.expression.callee.name;
    return '';
};

const isItExpression = node => {
    return getCalleeName(node) === IT_EXPRESSION;
};

const isDescribeExpression = node => {
    return getCalleeName(node) === DESCRIBE_EXPRESSION;
};

const getParentExpressionNode = node => {
    if (!node) return node;
    if ((node.parent && node.parent.type) === EXPRESSIONS_TYPES.BLOCK_STATEMENT) {
        return node.parent;
    }
    return node.parent ? getParentExpressionNode(node.parent) : node;
};

const getNextNode = node => {
    const parent = getParentExpressionNode(node);
    const nodePosition = parent.body && parent.body.indexOf(node.parent);

    return (parent.body || [])[nodePosition + 1];
};

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'expected new line after "it" or "describe"',
            category: 'Layout & Formatting',
            recommended: false
        },
        fixable: 'code',
        schema: []
    },
    create(context) {
        const checkExpression = nodeExp => isItExpression(nodeExp) || isDescribeExpression(nodeExp);

        return {
            CallExpression(node) {
                if (!checkExpression(node)) {
                    return;
                }
                const nextNode = getNextNode(node);

                const lineDiff = getLineDifference(node, nextNode);

                if (!checkExpression(nextNode) || lineDiff === AVAILABLE_LINE_DIFF) {
                    return;
                }

                if (lineDiff > AVAILABLE_LINE_DIFF) {
                    return;
                }
                context.report({
                    node,
                    message: 'expected new line after expression',
                    *fix(fixer) {
                        yield fixer.insertTextAfter(node.parent, '\n');
                    }
                });
            }
        };
    }
};
