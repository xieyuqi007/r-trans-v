// step1;
export default function transformer(file, api) {
	const j = api.jscodeshift;
	const root = j(file.source);

	// const getFirstNode = () => root.find(j.Program).get('body', 0).node;
	// const getRenderNode = () => root.find(j.JSXElement).get('name', 'view');
	// const firstNode = getFirstNode();
	// const { comments } = firstNode;

	root.find(j.ImportDeclaration).insertBefore(
		j(`
<template>
  <h1>Hello, world!</h1>
  <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
  {}
  <Radio key="123" value="234" checked="true">
  <div>这是文本</div>
  </Radio>
  </template>
`).find(j.ExpressionStatement).__paths[0].value

	)
	// If the first node has been modified or deleted, reattach the comments
	// const firstNode2 = getFirstNode();
	// if (firstNode2 !== firstNode) {
	// 	firstNode2.comments = comments;
	// }

	return root.toSource();


};