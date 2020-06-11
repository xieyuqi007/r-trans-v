//step2
export default function transformer(file, api) {
	const j = api.jscodeshift;

	var toView = j(file.source)
		.find(j.Property, { key: { name: "render" } })
		.forEach(path => {
			j(path).remove()
		})

	return toView.toSource();
}
