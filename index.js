/** @format */

class react_umami {
	constructor(websiteId, hostname, umamiUrl) {
		this.websiteId = websiteId;
		this.hostname = hostname;
		this.umamiUrl = umamiUrl.replace("umami.js", "api/collect");
	}

	trackView(url) {
		const payload = {
			website: this.websiteId,
			hostname: this.hostname,
			screen: window.innerWidth + "x" + window.innerHeight,
			language: navigator.language,
			cache: null,
			url: url,
			referrer: "",
		};
		fetch(this.umamiUrl, {
			credentials: "omit",
			headers: {
				"User-Agent": navigator.userAgent,
				Accept: "*/*",
				"Accept-Language": window.navigator.userLanguage,
				"Content-Type": "text/plain",
				"Sec-Fetch-Dest": "empty",
				"Sec-Fetch-Mode": "cors",
				"Sec-Fetch-Site": "cross-site",
				"Cache-Control": "max-age=0",
			},
			referrer: window.location
				.toString()
				.substring(0, window.location.toString().indexOf("/", 9)),
			body:
				'{"type":"pageview","payload":' + JSON.stringify(payload) + "}",
			method: "POST",
			mode: "cors",
		});
	}

	trackEvent(eventType, eventValue, url) {
		const payload = {
			website: this.websiteId,
			hostname: this.hostname,
			screen: window.innerWidth + "x" + window.innerHeight,
			language: navigator.language,
			cache: null,
			url: url,
			event_type: eventType,
			event_value: eventValue,
		};
		fetch(this.umamiUrl, {
			credentials: "omit",
			headers: {
				"User-Agent": navigator.userAgent,
				Accept: "*/*",
				"Accept-Language": window.navigator.userLanguage,
				"Content-Type": "text/plain",
				"Sec-Fetch-Dest": "empty",
				"Sec-Fetch-Mode": "cors",
				"Sec-Fetch-Site": "cross-site",
			},
			referrer: window.location
				.toString()
				.substring(0, window.location.toString().indexOf("/", 9)),
			body: '{"type":"event","payload":' + JSON.stringify(payload) + "}",
			method: "POST",
			mode: "cors",
		});
	}
}
module.exports = { react_umami };
