const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZćčšžđĆČŠŽĐ1234567890'+!\"#$%&/()=?*~ˇ^˘°˛`˙´˝¨¸,.-;:_<>\\|€÷×[]łŁß¤@{}§"
const length = abc.length
if (abc.length !== 121)
	console.error("ABC PASSSWORD PROTECTION MISMATCH") // reset abc to "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZćčšžđĆČŠŽĐ1234567890'+!\"#$%&/()=?*~ˇ^˘°˛`˙´˝¨¸,.-;:_<>\\|€÷×[]łŁß¤@{}§"

const indent = (Math.abs(Math.sin(((345 / Math.LN2) / Math.E) / Math.PI)) * 67) >>> 0

function encryptIndexTransform(i: number) {
	return (i + indent) % length
}

function decryptIndexTransform(i: number) {
	return (i - indent + length) % length
}

function encryptChar(char: string) {
	const i = abc.indexOf(char)
	if (i < 0)
		return char
	else
		return abc.charAt(encryptIndexTransform(i))
}

function decryptChar(char: string) {
	const i = abc.indexOf(char)
	if (i < 0)
		return char
	else
		return abc.charAt(decryptIndexTransform(i))
}

export default function encryptPassword(password: string) {
	let enc = ""
	for (const char of password)
		enc += encryptChar(char)
	return enc
}

function decryptPassword(enc: string) {
	let password = ""
	for (const char of enc)
		password += decryptChar(char)
	return password
}
