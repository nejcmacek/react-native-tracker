export default function urlify(url) {
	if (/^(\d+.){4}:\d+\//.test(url))
		return url
	if (/^https?:\/\//.test(url))
		return url;
	if (/^[\w\d_-]+\.[\w\d_-]+$/i.test(url))
		return "http://" + url;
	return `https://www.google.com/search?q=${encodeURIComponent(url)}`;
}