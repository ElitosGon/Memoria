module.exports = {
	microsoftAzure: {
		textAnalytics: require('./language/textAnalytics'),
		linguisticAnalysis: require('./language/linguisticAnalysis'),
		textTranslate: require('./language/textTranslate'),
		bingSpellCheck: require('./language/bingSpellCheck'),
		webLanguageModel: require('./language/webLanguageModel'),
	}
}