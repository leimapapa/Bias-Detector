//Bias detector

//Created with guidance from https://web.stanford.edu/~jurafsky/pubs/neutrality.pdf



//Framing Bias
/* 

The first, framing bias, is realized by subjective
words or phrases linked with a particular
point of view.
 
(1) 
a. Usually, smaller cottage-style houses have been demolished
to make way for these **McMansions**.
b. Usually, smaller cottage-style houses have been demolished
to make way for these **homes**.

In (1), the term McMansion, unlike
homes, appeals to a negative attitude toward largeand pretentious houses. 
*/



//Epistemological Bias
 
/*
The second class, epistemological
bias, is related to linguistic features that
subtly (often via presupposition) focus on the believabilityrof a proposition. 

(2) 
a. Kuypers **claimed** that the mainstream press in America
tends to favor liberal viewpoints.
eb. Kuypers **stated** that the mainstream press in America
tends to favor liberal viewpoints.

In (2), the assertive **stated** removes the bias introduced by **claimed**,
which casts doubt on Kuypers’ statement.


Epistemological bias is bidirectional, that is,
bias can occur because doubt is cast on a proposition
commonly assumed to be true, or because
ua presupposition or implication is made about a
proposition commonly assumed to be false
*/
/*Percent of bias seen on Wikipedia by subtype.

	This will be used as a strength so as to assign a certain amount of 
	'forgiveness' to certain types of bias.


Bias Subtype %

A. Epistemological bias 43
- Factive verbs 3 -- 7%
- Entailments 25 -- 58%
- Assertives 11 -- 26%
- Hedges 4 -- 9%

B. Framing bias 57
- Intensifiers 19 -- 33.3%
- One-sided terms 38 -- 66.6*/

var biasWords = [];

//Epistemological bias - arrays of biased language


//Factive predicate = a predicate which entails or presupposes the truth of one of its arguments.
var factivePredicates = ["realized", "revealed"];


//Entailments = directional relations that hold whenever the truth of one word or phrase follows from another, //e.g., murder entails kill because there cannot be murdering without killing 
var entailments = ["murder", "slay","was coerced into"];


//Assertives - those verbs whose complement clauses assert a proposition
var assertives = ["pointed out", "clearly states"];


//Hedges - used to reduce one’s commitment to the truth of a proposition, thus avoiding any bold predictions
var hedges = ["will","certainly","undoubtedly"];


//Framing bias - arrays of biased language

//Intensifiers - adjectives or adverbs that ADD (subjective) force to the meaning of a phrase or proposition.
var intensifiers = ["fantastic","outrageous","outstanding", "hatred", "love", "vile", "disgusting", "so", "sick", "phenomenally", "too", "moderately", "uncommonly", "very", "wicked", "outrageously", "really", "fantastically", "awful", "awful good" "rather", "mightily", "bloody", "somewhat", "supremely", "dead", "dead wrong", "fully", "dreadfully", "-ass", "a sweet-ass ride" "insanely", "extremely", "super", "strikingly", "fucking", "veritable", "extraordinarily", "hella", "crazy", "amazingly", "most", "terrifically", "radically", "precious", "precious little", "surpassingly", "unusually", "quite", "excessively", "exceptionally", "loony", "real nice", "colossally", "incredibly", "remarkably", "frightfully", "totally", "terribly", "astoundingly", "especially","desperately","wisely","indecently","vulgarly","incomparably","odious","utmost","self-proclaimed"];

var posIntensifiers = ["as hell", "fiercely", "hugely", "absolutely", "completely", "extremely", "highly", "rather", "really", "totally", "utterly", "very", "awful", "deucedly", "emphatically", "excellently", "fabulously", "fantastically", "genuinely", "gloriously", "immensely", "incredibly", "insanely", "keenly", "madly", "magnificently", "marvelously", "splendidly", "supremely", "terrifically", "truly", "unquestionably", "wonderfully","devestatingly","in sharp contrast","deservedly","exactly right"];

var negIntensifiers = ["savagely","insane","crazy","dreadfully","colossally", "especially", "exceptionally", "excessively", "extremely", "extraordinarily", "fantastically", "frightfully","overly","meager","abysmal","hard to imagine","overwhelmingly","frighteningly","fantastical","cripplingly","troublingly","horrific","irredeemable","inflammatory"];

//Minimizers - adjectives or adverbs that REMOVE (subjective) force from the meaning of a phrase or proposition.
var minimizers = ["just"];


//One-sided Terms - reflect only one of the sides of a contentious issue.
var oneSidedTerms = ["pro-choice","pro-life","liberated","captured","terrorist","paramilitary","captured","recorded"];

//Flip-side of each term should be listed in the same index
var posOneSidedTerms = ["pro-choice","pro-life","liberated","paramilitary","gender confirmation surgery","called out","takedown","earned","call out","witch hunt","pushed back","refused","landslide","undocumented migrant","demand"];
var negOneSidedTerms = ["pro-abortion","anti-choice","captured","terrorist","gender reassignment surgery","assailed","rant","unfairly received","attack","investigation","disagreed","declined","wide margin","illegal immigrant","request"];


//Unprovable assertions about another human's thought process/includes oft-misused inflamatory language
/*
politically-specific sources: 
https://www.vice.com/en_us/article/mg9pvx/every-insult-the-right-uses-to-troll-liberals-explained - conservative
https://libertynewsnow.com/a-guide-to-21-liberal-buzzwords/article5004 - liberal
*/
var buzzwords = ["-phobic","-phobia","racist","classist","sexist","misogynist","bigot","anti-semitic","hypocrisy","gun-grabber","climate-denier","shill","fat-shame","white privilege","mansplain","problematic","politically correct","raise awareness","create a dialog","deepen the conversation","empower","safe space","social justice","tolerance","snowflake","meltdown","feminazi","-tard","libtard","conservitard","cuck","cuckservative","SJW","triggered","gender-neutral","extremist","gatekeeper","gaslight","puppet","trolled","liberal media","conservative media","authoritarianism","intolerance","hate speech","offensive"];


//Stop words - words so common that you should ignore them completely (taken from Python NLTK)
var stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]


//put suspect words and phrases HERE. (debatable bias, lack of classification, etc.)
//*************
/*
"targeted for harassment"
"blasted an email"
"went viral"
"viral tweet"
"broke the internet"
"off the rails"
"in solidarity with"
"could spell disaster"
"smash hit"
"squelch"
"quite the opposite"
"brain dead"
"imposing"
"come back and bite"
"torches"
"basket case"
"effectively nukes"
"sowing division"
"fight back"
"demagoguery"
"backtracking"
"tore apart"
"dehumanize"
*/
//*************

var bias = {

//RiTa trim function - Howe, D. C. (2015). RiTa [Computer software]. Retrieved from http://rednoise.org/rita
trim: function(str) {

    return trim(str); // delegate to private

},
SPLIT_CONTRACTIONS: false,
//RiTa tokenize function - Howe, D. C. (2015). RiTa [Computer software]. Retrieved from http://rednoise.org/rita 
tokenize: function(words, regex) {
	
    if (!is(words,S)) return [];

    if (regex) return words.split(regex);
	
    words = trim(words);

    words = words.replace(/([\\?!\"\u201C\\.,;:@#$%&])/g, " $1 ");

    words = words.replace(/\\.\\.\\./g, " ... ");

    words = words.replace(/\\s+/g, SP);

    words = words.replace(/,([^0-9])/g, " , $1");

    words = words.replace(/([^.])([.])([\])}>\"'’]*)\\s*$/g, "$1 $2$3 ");

    words = words.replace(/([\[\](){}<>])/g, " $1 ");

    words = words.replace(/--/g, " -- ");

    words = words.replace(/$/g, SP);

    words = words.replace(/^/g, SP);

    words = words.replace(/([^'])' | '/g, "$1 ' ");
    words = words.replace(/ \u2018/g, " \u2018 ");

    words = words.replace(/'([SMD]) /g, " '$1 ");



    if (bias.SPLIT_CONTRACTIONS) {

      words = words.replace(/([Cc])an['’]t/g, "$1an not");

      words = words.replace(/([Dd])idn['’]t/g, "$1id not");

      words = words.replace(/([CcWw])ouldn['’]t/g, "$1ould not");

      words = words.replace(/([Ss])houldn['’]t/g, "$1hould not");

      words = words.replace(/ ([Ii])t['’]s/g, " $1t is");

      words = words.replace(/n['’]t /g, " not ");

      words = words.replace(/['’]ve /g, " have ");

      words = words.replace(/['’]re /g, " are ");
    }
	
    // "Nicole I. Kidman" gets tokenized as "Nicole I . Kidman"

    words = words.replace(/ ([A-Z]) \\./g, " $1. ");

    words = words.replace(/\\s+/g, SP);

    words = words.replace(/^\\s+/g, E);



    return trim(words).split(/\s+/);

  },

//framing bias
framing: function(userInput){
	
},


//epistemological bias
epistemological:function(userInput){
	
},
	


//total percent bias: number of biased words / total number of words
percentBias:function(userInput){
	var allBiasWords = biasWords.concat(buzzwords).concat(intensifiers).concat(oneSidedTerms);
	
	var userTokens = bias.tokenize(userInput);
	
	var totalWords = userTokens.length
	
}
//**no comment after last function

},
//END bias
    
    
