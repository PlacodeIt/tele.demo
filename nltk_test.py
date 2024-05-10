import nltk
from textblob import TextBlob
# import VEDAR
from nltk.sentiment import SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()
# VADER is a lexicon-based sentiment analyzer
# that uses a dictionary of words and phrases
# AND also takes into account the context and modifiers of the words,
# such as negations, intensifiers and emojis

# NLTK data
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('vader_lexicon')

# sample texts
messages = [
 "dear @verizonsupport your service is straight 💩 in dallas.. been with y'all over a decade and this is all time low for y'all. i'm talking no internet at all.",
 "@verizonsupport I sent you a dm",
 "thanks to michelle et al at @verizonsupport who helped push my no-show-phone problem along. Order canceled successfully, and I ordered this for pickup today at the Apple store in the mall."
 ]

# sentiment analysis using TextBlob
for telegram_msg in messages:
  blob = TextBlob(telegram_msg)
  print(blob.sentiment)

# sentiment analysis using VEDAR
for telegram_msg in messages:
  scores = sia.polarity_scores(telegram_msg)
  print(scores)
