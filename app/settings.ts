export class Settings {
	private static config = {
		"application_settings": {
			"uneditable": [
				"startover",
				"twitterImage",
				"twitterTitle",
				"backtoresults"
			],
			"displayNames": {
				"apptitle": "Application title",
				"appdescription": "Application description",
				"previous": "'Previous' text",
				"next": "'Next' text",
				"results": "'Results' text",
				"msrp": "'msrp' text",
				"oneLastStep": "'One last step' text",
				"moreInfo": "'More info' text",
				"print": "'Print' text",
				"email": "'Email' text",
				"colourPreference": "'Colour preference' text",
				"yourBestMatch": "'Your best match' text",
				"otherSuggestion": "'Other suggestion' text",
				"resultsPage": "'Results page' text",
				"model": "'Model' text",
				"changeYourAnswer": "'Change your answer' text",
				"submit": "'Submit' text",
				"close": "'Close' text",
				"goBack": "'Go back' text",
				"emailModalTitle": "Email popup title",
				"emailNameTitle": "Email popup 'to'",
				"emailNamePlaceholder": "Email popup name placeholder",
				"emailAddressTitle": "Email popup 'from'",
				"emailAddressPlaceholder": "Email popup address placeholder",
				"emailSubject": "Email popup subject",
				"emailMessage": "Email popup message",
				"emailMessagePlaceholder": "Email popup message placeholder",
				"emailMessageSent": "Email popup sent text",
				"emailMessageError": "Email popup error text",
				"emailFakeLink": "Email popup placeholder link",
				"nextQuestionAlt": "Next question text",
				"previousQuestionAlt": "Previous question text",
				"facebookTitle": "Facebook share title",
				"facebookDesc": "Facebook share description",
				"twitterTitle": "Twitter share title",
				"twitterDesc": "Twitter share description",
				"yes": "'Yes' text",
				"no": "'No' text",
				"restoreSession": "Restore session popup message"
			}
		}
	}

	static get() {
		return this.config
	}
}

export class DisplayNameTranslator {
	private settings = Settings.get()

	public getApplicationSetting(val: string) {
		if (val in this.settings['application_settings'].displayNames) {
			return this.settings['application_settings'].displayNames[val]
		}
		return val
	}
}