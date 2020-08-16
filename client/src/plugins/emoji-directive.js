import Vue from "vue";
const emojiList = require("../assets/emojies.json")

const emojiPattern = /[^:](\w+)(?=:)/g;
const replaceEmojiPattern = /:(\w+):/g;

Vue.directive("emoji", {
	bind: (el, binding, vnode) => {
		const emojies = el.textContent.match(emojiPattern);
		if (!!emojies) {
			for (let emoji of emojies) {
				el.innerHTML = !!emojiList[emoji]
					? el.innerHTML.replace(replaceEmojiPattern, emojiList[emoji])
					: el.innerHTML;
			}
		}
	},
});
