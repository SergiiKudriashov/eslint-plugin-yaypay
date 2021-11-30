# eslint-plugin-yaypay
###ESlint plugin with yaypay rules

`npm install --save-dev eslint-config-yaypay`

## Rule 1: test-starts-with-should
    every jest test case should start with word 'should'

// Correct
```
it('should calculate value', () => {})
```

// Incorrect
```
it('checks value calculation', () => {})
```

## Rule 2: newline-after-describe-and-it-blocks
    every jest test case should be separated from other with empty line
    
// Correct
```
it('should calculate value', () => {})

it('should validate value', () => {})`
```
// Incorrect
```
it('should calculate value', () => {})
it('should validate value', () => {})`
```
