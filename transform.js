const babel = require("@babel/core");
const types = require("babel-types");

const arrowCodeString = `const add = (a, b) => a + b;`;

// AST遍历器，针对指定类型节点处理
const visitor = {
  ArrowFunctionExpression(path) {
    console.log(path);
    const params = path.node.params;
    // 偷懒写法，其实应该是遍历节点内容，然后逐条转换
    const blockStatement = types.blockStatement([
      types.returnStatement(
        types.binaryExpression(
          "+",
          types.identifier("a"),
          types.identifier("b")
        )
      ),
    ]);

    const func = types.functionExpression(
      null,
      params,
      blockStatement,
      false,
      false
    );

    path.replaceWith(func);
  },
};

const result = babel.transform(arrowCodeString, {
  plugins: [
    {
      visitor,
    },
  ],
});
// result.code
console.log(result.code);
