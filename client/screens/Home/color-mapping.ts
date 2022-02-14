interface ColorTable {
	[key: string]: string
}

const swatches = [
	"#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"
]

const increment = 5

export default class ColorMapping {

	table: ColorTable = {}
	i = 0

	static getExtFromUri(uri: string) {
	return uri.match(/\/\/[^\/]+(\.\w+)/)[1] || "???"
	}

	fromUri(uri: string) {
		return this.get(ColorMapping.getExtFromUri(uri))
	}

	get(ext: string) {
		ext = ext.toLowerCase()
		if (ext in this.table)
			return this.table[ext]
		const color = swatches[this.i]
		this.table[ext] = color
		this.i = (this.i + increment) % swatches.length
		return color
	}

	clear() {
		this.table = {}
		this.i = 0
	}

}