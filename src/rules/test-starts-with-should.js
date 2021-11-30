const IT_EXPRESSION = 'it';

const getCalleeName = node => {
    if (!node) return '';
    if (node.callee) return node.callee.name;
    if (node.expression && node.expression.callee) return node.expression.callee.name;
    return '';
};

const isItExpression = node => {
    return getCalleeName(node) === IT_EXPRESSION;
};

const isStartsWithShould = node => {
    return node.arguments[0] && node.arguments[0].value.startsWith('should');
};

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'expected test case to start with should word',
            category: 'Layout & Formatting',
            recommended: false
        },
        fixable: null,
        schema: []
    },
    create(context) {
        const checkExpression = nodeExp => isItExpression(nodeExp);

        return {
            CallExpression(node) {
                if (!checkExpression(node) || isStartsWithShould(node)) {
                    return;
                }
                context.report({
                    node,
                    message: 'expected test case to start with should word'
                });
            }
        };
    }
};
