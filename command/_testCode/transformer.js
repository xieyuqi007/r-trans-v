const j = require('jscodeshift');

const transformer = (file, api) => {
	const j = api.jscodeshift;
	const root = j(file.source);
	root
		.find(j.MemberExpression)
		.filter(path => {
			const cObject = path.node.object;
			const cProperty = path.node.property;
			if (cObject, cProperty) {
				return cObject.type === 'Identifier' &&
					cObject.name === 'React' &&
					cProperty.type === 'Identifier' &&
					cProperty.name === 'createClass';
			} else {
				return false;
			}
		})
		.forEach(path => {
			j(path).replaceWith(j.identifier('createReactClass'));
		});
	return root.toSource({ quote: 'single' });
}

module.exports = transformer;