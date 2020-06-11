//template模板中的语法转换 step1

const DEPRECATED_APIS = Object.create(null);
DEPRECATED_APIS.autoTime = ':autoTime';

const FUN_APIS = Object.create(null);
FUN_APIS.onClick = '@click';
FUN_APIS.onChange = '@change';

function transformer(file, api, options) {
	const j = api.jscodeshift

	const root = j(file.source);

	const printOptions = options.printOptions || {
		quote: 'single',
		trailingComma: true
	};
	let hasModifications = false;

	const reNameAttribute = path => {
		const name = path.node.name.name;
		if (DEPRECATED_APIS[name]) {
			path.node.name.name = DEPRECATED_APIS[name];
			hasModifications = true;
			// if (path.node.value)
			// j(path, { type: "JSXExpressionContainer" }).forEach(p => {
			// 	// j(p).replaceWith(j.stringLiteral("ii9oioioi"))

			// })
		}
	}

	const reWriteFuncKey = path => {
		const name = path.node.name;

		if (FUN_APIS[name]) {
			path.node.name = FUN_APIS[name];
			hasModifications = true;
		}
	}

	const reWriteFuncVal = path => {
		root.find(j.JSXExpressionContainer).forEach(p => {
			if (p.node.expression.type === "MemberExpression") {
				j(p).replaceWith(j.stringLiteral(p.node.expression.property.name))
			}
		});
	}

	const reWriteMapToFor = path => {
		// console.log(j(path).find(j.JSXElement), "0-0-0-0-")
		// let param = j(path).find(j.ReturnStatement);
		// console.log(path.value.expression.arguments[0].body.body[0].arguments, 123123)
		// console.log(path.value.expression.callee.property, 123123)
		const _jsxElement = path.value.expression.arguments[0].body.body[0].argument;

		j(path).replaceWith(
			_jsxElement
		)
	}

	const rebuildAttrribute = path => {
		if (path.node.value.type === "JSXExpressionContainer" && path.node.name.name.indexOf('@') === -1) {
			path.node.name.name = ":" + path.node.name.name;

			if (path.node.value.expression.name) {
				j(path).find(j.JSXExpressionContainer).replaceWith(
					j.stringLiteral(path.node.value.expression.name)
				)
			}

			// console.log(path.node.value.expression.name, 123123123)
			// path.node.value.expression.name &&  j(path).find(j.JSXExpressionContainer).replaceWith(
			// 	j.stringLiteral(path.node.value.expression)
			// )
		}
		if (path.node.name.name.indexOf('@') > -1) {
			const value = path.node.value.value;

			if (!value) {
				const _val = path.node.value.expression.callee.object.property.name;
				// const arg = path.node.value.expression.arguments[0];

				// 如果是对象类FUN指针 == TODO
				// console.log(path.node.value.expression.arguments[0].object, "111pbje")
				// console.log(path.node.value.expression.arguments[0].property.name, "111pbje")

				if (path.node.value.expression.arguments[0].type === "MemberExpression") {

					// path.node.value.expression.arguments[0]
				}
				j(path).find(j.JSXExpressionContainer).forEach(p => {
					j(p).replaceWith(j.stringLiteral(_val));
				})
			}
		}
	}

	const rebuildConditionalExpression = path => {
		const _Cexpression = path.node.expression;
		_Cexpression.consequent.openingElement.attributes.push(
			j.jsxAttribute(j.jsxIdentifier("v-if"), j.literal(_Cexpression.test.property.name))
		)
		_Cexpression.alternate.openingElement.attributes.push(
			j.jsxAttribute(j.jsxIdentifier("v-else"))
		)
		j(path).insertBefore(
			j.jsxElement(_Cexpression.consequent.openingElement, _Cexpression.consequent.closingElement, _Cexpression.consequent.children));
		j(path).insertBefore(
			j.jsxElement(_Cexpression.alternate.openingElement, _Cexpression.alternate.closingElement, _Cexpression.alternate.children));
		j(path).replaceWith();
	}


	// 改变事件写法  onclick => @click
	root.find(j.JSXIdentifier).forEach(reWriteFuncKey);
	// 改变函数写法 {this.handleClickFun} => "handleClickFun"
	root.find(j.JSXExpressionContainer).forEach(reWriteFuncVal);
	// 改变map写法 map => for
	root.find(j.JSXExpressionContainer,
		{ expression: { callee: { property: { name: "map" } } } }).forEach(reWriteMapToFor);
	//把{}去掉，key上加上：
	root.find(j.JSXAttribute).forEach(rebuildAttrribute);
	// 改变指定的小程序属性从react写法改成带:的写法   key => :key
	root.find(j.JSXAttribute).forEach(reNameAttribute);
	//三元表达式
	root.find(j.JSXExpressionContainer, { expression: { type: "ConditionalExpression" } })
		.forEach(rebuildConditionalExpression);

	return hasModifications ? root.toSource(printOptions) : null;

}

module.exports = transformer