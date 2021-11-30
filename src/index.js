const testStartsWithShould = require('./rules/test-starts-with-should');
const newlineAfterDescribeAndItBlocks = require('./rules/newline-after-describe-and-it-blocks');

module.exports = {
    rules: {
        'test-starts-with-should': testStartsWithShould,
        'newline-after-describe-and-it-blocks': newlineAfterDescribeAndItBlocks
    }
};
