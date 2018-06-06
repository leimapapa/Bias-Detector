# Bias-Detector
The intent is to use scientific papers on bias in writing to identify ways to detect and measure bias on a scale.

## Sources
The main source so far is this research paper from Stanford, located here:
```
[Neutrality study](https://web.stanford.edu/~jurafsky/pubs/neutrality.pdf)
```

### Dependencies

TensorFlow.js
* [TensorFlow.js](https://js.tensorflow.org/) - To be used to train an AI to recognize bias. Parameterized cues will be passed into the tensors.
* [NLTK](http://www.nltk.org/) - Natural Language Toolkit - To be used to parse out the various words (bag of words).
* [RITA.js](https://rednoise.org/rita/) - RITA.js language library. Useful to tokenize sentences and words from user input in JavaScript based on an untrained model.
