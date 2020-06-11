//script模板中的语法转换 step1
const DEPRECATED_APIS = Object.create(null);
DEPRECATED_APIS.onShow = 'mounted';
DEPRECATED_APIS.mounted = 'onHide';
DEPRECATED_APIS.onUnload = 'onUnload';

function transformer(file, api, options) {
	const j = api.jscodeshift
	const printOptions = options.printOptions || {
		quote: 'single',
		trailingComma: true
	};

	const root = j(file.source);
	let hasModifications = false;

	const renameDeprecatedApis = path => {
		const name = path.node.key.name;

		if (DEPRECATED_APIS[name]) {
			path.value.key.name = DEPRECATED_APIS[name];
			hasModifications = true;
		}
	};

	const renameDeprecatedCallExpressions = path => {
		const name = path.node.property.name;

		if (DEPRECATED_APIS[name]) {
			path.node.property.name = DEPRECATED_APIS[name];
			hasModifications = true;
		}
	};

	const removeRender = path => {
		j(path).remove();
	}

	// Class methods
	root.find(j.MethodDefinition).forEach(renameDeprecatedApis);
	// Class methods - typescript
	root.find(j.ClassMethod).forEach(renameDeprecatedApis);

	// Arrow functions
	root.find(j.ClassProperty).forEach(renameDeprecatedApis);

	// createReactClass and mixins
	root.find(j.Property).forEach(renameDeprecatedApis);
	// Function calls
	root.find(j.MemberExpression).forEach(renameDeprecatedCallExpressions);
	
	root.find(j.Property, { key: { name: "render" } }).forEach(removeRender);
	
	return hasModifications ? root.toSource(printOptions) : null;

}

module.exports = transformer