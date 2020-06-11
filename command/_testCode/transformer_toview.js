export default function transformer(file, api) {
	const j = api.jscodeshift;

	var toView = j(file.source)
		.find(j.JSXElement)
		.forEach(path => {
			if (path.node.closingElement.name.name !== 'radio') {
				path.node.openingElement.name.name = "view";
				path.node.closingElement.name.name = "view"
			}
		})

	return toView.toSource();
}



// export default function transformer(file, api) {
// 	const j = api.jscodeshift;

// 	return j(file.source)
// 		.find(j.VariableDeclaration, {kind: 'init'})
// 		.forEach(path => {
// 			const letStatement = j.variableDeclaration('let', path.node.declarations)
// 			j(path).replaceWith(letStatement)
// 			//const letStatement = j.variableDeclaration('let', path.node.declarations)
// 			//j(path).replaceWith(letStatement)
// 		})
// 		.toSource();
// }

// const transformer_xbox =(file, api) => {
// 	const j = api.jscodeshift;
// 	const root = j(file.source);
// 	console.log(root);
// 	// root
// 	// 	.find(j.MemberExpression)
// 	// 	.filter(path => {
// 	// 		const cObject = path.node.object;
// 	// 		const cProperty = path.node.property;
// 	// 		if (cObject, cProperty) {
// 	// 			return cObject.type === 'Identifier' &&
// 	// 				cObject.name === 'React' &&
// 	// 				cProperty.type === 'Identifier' &&
// 	// 				cProperty.name === 'createClass';
// 	// 		} else {
// 	// 			return false;
// 	// 		}
// 	// 	})
// 	// 	.forEach(path => {
// 	// 		j(path).replaceWith(j.identifier('createReactClass'));
// 	// 	});
// 	// return root.toSource({ quote: 'single' });
// }

// module.exports = transformer_xbox ;



// Press ctrl+space for code completion
// export default function transformer(file, api) {
// 	const j = api.jscodeshift;

// 	//return j(file.source)
// 	//.find(j.Identifier)
// 	//.forEach(path => {
// 	//j(path).replaceWith(
// 	//j.identifier(path.node.name.split('').reverse().join(''))
// 	//);
// 	// })
// 	//.toSource();
// 	var renderNode = j(file.source).find(j.Property, { kind: "init", name: "render" });
// 	// console.log(renderNode, 123123)
// 	return j(file.source)
// 		.find(j.ExportDefaultDeclaration)
// 		.forEach(path => {
// 			console.log(path, 1231238888)
// 			// const letStatement = j.variableDeclaration('let', path.node.declarations)
// 			j(path).insertBefore(
// 				// renderNode.__paths[0].value
// 				// render
// 				// j(`console.log('123123')`).find(j.ExpressionStatement).__paths[0].value
// 			)
// 		})
// 		.toSource();
// }



// Press ctrl+space for code completion
// export default function transformer(file, api) {
// 	const j = api.jscodeshift;


	// var renderNode = j(file.source)
	// 	.find(j.Property, { kind: "init", name: "render" })
	// 	.forEach(path => {
			// console.log(path, "90909")
			//j.expressionStatement({
			// path.value.params,  
			//path.value.body, 
			//false  
			//})
		// })



	//j.expressionStatement()
	// var render = j(file.source).find(j.Property, { kind: "init", name: "render" });
	// console.log(render, 123123)

// 	return j(file.source)
// 		.find(j.ExportDefaultDeclaration)
// 		.forEach(path => {
// 			console.log(path)
// 			// const letStatement = j.variableDeclaration('let', path.node.declarations)
// 			// j(path).insertBefore(

// 				// renderNode.__paths[0].value
// 				// render
// 				// j(`console.log('123123')`).find(j.ExpressionStatement).__paths[0].value
// 			// )
// 		})
// 		.toSource();


// }


