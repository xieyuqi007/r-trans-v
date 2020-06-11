// 文件处理文档   https://blog.csdn.net/qq_34803821/article/details/84785093

'use strict'
const child_process = require('child_process');
const execSync = child_process.execSync;
const co = require('co');
const fs = require('fs');

// import transTemplate from "t_template";

// module.exports = () => {

	// step1 转译
	// co(function* () {
	// 	let cmdTransNormalVue = `rtv -o demo.vue demo.js`;
	// 	execSync(cmdTransNormalVue, (error, stdout, stderr) => {
	// 		if (error) {
	// 			console.log(error);
	// 			process.exit();
	// 		}
	// 		console.log(chalk.green('\n √ react trans vue completed!!!'));
	// 	})
	// })

	// step2把template摘出来
	// fs.readFile('./demo.vue', (err, data) => {
	// 	if (err) throw err;
	// 	const sHtml = data.toString(),
	// 		start = sHtml.indexOf("return(");

	// 	const returnModule = sHtml.substring(start);
	// 	const rStart = returnModule.indexOf("(") + 1;
	// 	const rEnd = returnModule.lastIndexOf(")");
	// 	fs.writeFileSync('template.js', '<template>' + returnModule.substring(rStart, rEnd) + '</template>');
	// 	transformTemplate();
	// });

	// step3 处理template
	// transformTemplate();
	// function transformTemplate() {
	// 	co(function* () {
	// 		let cmdTransTemp = `jscodeshift -t ./transformer/t_template.js template.js --dry --print`;
	// 		execSync(cmdTransTemp, (error, stdout, stderr) => {
	// 			if (error) {
	// 				console.log(error);
	// 				process.exit();
	// 			}
	// 			console.log(chalk.green('\n √ templateTrans complete!!!'));
	// 		})
	// 	})
	// }

	// step4 处理script脚本
	// transformScript();
	// function transformScript() {
	// 	co(function* () {
	// 		let cmdTransTemp = `jscodeshift -t ./transformer/t_script.js demo.vue --dry --print`;
	// 		execSync(cmdTransTemp, (error, stdout, stderr) => {
	// 			if (error) {
	// 				console.log(error);
	// 				process.exit();
	// 			}
	// 			console.log(chalk.green('\n √ templateTrans complete!!!'));
	// 		})
	// 	})
	// }

	// last-step 文件合并
	separationCode();
	function separationCode() {
		let tempCont = fs.readFileSync('./template.js').toString();
		let scriptCont = '\n<script>\n' + fs.readFileSync('./demo.vue').toString() + '</script>';

		fs.writeFile('success.vue', tempCont + scriptCont, 'utf8', function (error) {
			if (error) {
				console.log(error);
				return false;
			}
			console.log('写入成功');
		})
	}
// }