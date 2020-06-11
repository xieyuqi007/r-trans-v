'use strict'
const child_process = require('child_process');
const exec = child_process.exec;
const execSync = child_process.execSync;
const co = require('co');
const prompt = require('co-prompt');
const fs = require('fs');
const chalk = require('chalk');
const babylon = require('babylon');
const babelTraverse = require('babel-traverse').default;
const transformerXbox = require('transformer-xbox');

import jscodeshift from 'jscodeshift';

// module.exports = () => {
	co(function* () {
		let cmdStr = `rtv -o test.vue test.js`;
		execSync(cmdStr, (error, stdout, stderr) => {
			if (error) {
				console.log(error);
				process.exit();
			}
			// console.log(chalk.green('\n √ react trans vue completed!!!'));
			
		})

		resetCode();
		function resetCode() {
			// jscodeshift
			// transformerXbox('./test.vue', )
			//  参考 http://www.yanwenbo.cn/topic/5e1fff9090bb687be43ae2fe
			// https://github.com/facebook/jscodeshift
			// https://cloud.tencent.com/developer/article/1548735
			// https://blog.csdn.net/dfpbut5000/article/details/102123396
			// api https://npmdoc.github.io/node-npmdoc-jscodeshift/build/apidoc.html
			//demolist https://github.com/facebook/jscodeshift#readme
			// demo1 https://github.com/reactjs/react-codemod/tree/master/transforms
			//demo https://github.com/jhgg/js-transforms
			//demo2 https://github.com/cpojer/js-codemod/tree/master/transforms
			// no-vars https://github.com/cpojer/js-codemod/blob/master/transforms/no-vars.js
			// let cmdStr = `jscodeshift -t transform.js ./src/demo.js --dry --print`;
			execSync(cmdStr, (error, stdout, stderr) => {
				if (error) {
					console.log(error);
					process.exit();
				}
				// console.log(chalk.green('\n √ react trans vue completed!!!'));

			})

			// read file
			// let fileContent = fs.readFileSync('./test.vue');
			// fileContent = fileContent.toString();
			// hard code
			// fileContent = removeBadCode(fileContent);
			// console.log(fileContent, "filecontent====")

			// parse module
			// let ast = babylon.parse(fileContent, {
			// 	sourceType: 'module',
			// 	plugins: ["typescript", "classProperties", "jsx", "trailingFunctionCommas", "asyncFunctions", "exponentiationOperator", "asyncGenerators", "objectRestSpread", "decorators"]
			// })

			// fix trailingComments issues with hard code 
			// babelTraverse(ast, {
			// 	BlockStatement(path) {
			// 		path.node.body.forEach((item) => {
			// 			// TODO: 干嘛用的？？？？？===
			// 			// if (item.trailingComments && fileContent.charCodeAt([item.end]) === 10) {
			// 			// 	delete item.trailingComments
			// 			// }
			// 		})
			// 	}
			// })

			
		}


		// utils类函数
		// function removeBadCode(con) {
		// 	return con.replace(/\.\.\.(\w+),\n/, function (a, v) { return '...' + v + '\n' })
		// }

		// vue格式文件代码重构
		// function transform() {

		}
	})

// }