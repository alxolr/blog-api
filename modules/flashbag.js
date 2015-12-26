/**
 * Flashbag for bootstrap 3
 * @type {Object}
 */
module.exports = {
	/**
	 * Bag messages
	 * @type {Object}
	 */
	bag: {
		success: [],
		info: [],
		primary: [],
		warning: [],
		error: []
	},
	/**
	 * Push a specific message into the flashbag
	 * @param  {String} type    Bootstrap message type
	 * @param  {String} message Actual message
	 */
	pushMessage: function(type, message) {
		if (this.bag.hasOwnProperty(type)) {
			this.bag[type].push(message);
		}
	},
	/**
	 * Get the message for a boostrap type
	 * @param  {String} type
	 * @return {Array}
	 */
	popMessagesFor: function(type) {
		if (this.bag.hasOwnProperty(type)) {
			var messages = this.bag[type];

			this.bag[type] = [];
			return messages;
		}

		return [];
	},
	getMessages: function () {
		return {
			success: this.popMessagesFor('success'),
			info: this.popMessagesFor('info'),
			warning: this.popMessagesFor('warning'),
			primary: this.popMessagesFor('primary'),
			error: this.popMessagesFor('error')
		}
	}
};