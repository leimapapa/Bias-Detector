# Bias.js
Using scientific papers on bias in writing to identify ways to detect and measure bias.

## Sources
The main source so far is this research paper on neutrality in writing from Stanford.

* [Neutrality study](https://web.stanford.edu/~jurafsky/pubs/neutrality.pdf)


## Dependencies

* [TensorFlow.js](https://js.tensorflow.org/) - To be used to train an AI to recognize bias. Parameterized cues will be passed into the tensors.
* [RITA.js](https://rednoise.org/rita/) - RITA.js language library. Useful to tokenize sentences and words from user input in JavaScript based on an untrained model.
* [NLTK](http://www.nltk.org/) - Natural Language Toolkit - (Python) To be used to parse out the various words (bag of words) and run analytics on the server-side.


## Usage

```javascript
bias.totalBiasWords("This is terrible"); // 1 bias word

bias.percentBias("This is terrible");  // 1 bias word out of 1 meaningful words = 100%
```
