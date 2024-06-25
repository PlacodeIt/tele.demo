from pymongo import MongoClient
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Step 1: Connect to MongoDB and load the data
client = MongoClient('mongodb://localhost:27017/')
db = client.telegram_messages

'''
#modify messages collecion - test data
db.messages.update_many({}, {'$set': {'label': 1}})  # or 0
print("added label column to messages collecion successfully")
'''

# Load training data
train_data_cursor = db.all_train_data.find()
train_data = pd.DataFrame(list(train_data_cursor))
# Check
print("Train Data Columns:", train_data.columns)

# Load test data
test_data_cursor = db.messages.find()
test_data = pd.DataFrame(list(test_data_cursor))
# Check
print("Test Data Columns:", test_data.columns)

# Step 2: Clean the data
# Ensure that 'message_text' column contains only text data
train_data['message_text'] = train_data['message_text'].astype(str)
test_data['message_text'] = test_data['message_text'].astype(str)

# Ensure 'label' columns are not empty
train_data = train_data.dropna(subset=['label', 'message_text'])
test_data = test_data.dropna(subset=['label', 'message_text'])

# Step 3: Preprocess the text
vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
X_train = vectorizer.fit_transform(train_data['message_text'])
y_train = train_data['label']
X_test = vectorizer.transform(test_data['message_text'])
y_test = test_data['label']

# Step 4: Build and train the random forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 5: Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print(f'Accuracy: {accuracy}')
print('Classification Report:')
print(report)
