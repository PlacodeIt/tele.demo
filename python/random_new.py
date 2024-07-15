import pandas as pd
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import time # for testing

# Step 1: Connect to MongoDB and load the data
client = MongoClient('mongodb://localhost:27017/')
db = client.telegram_messages

# Load training data
train_data_cursor = db.all_train_data.find()
train_data = pd.DataFrame(list(train_data_cursor))

# Check training data
print("Train Data Columns:", train_data.columns) 
print("First few rows of Train Data:\n", train_data.head())

# Load test data
test_data_cursor = db.messages.find() #need to rename to test_data
test_data = pd.DataFrame(list(test_data_cursor))

# Check test data
print("Test Data Columns:", test_data.columns)
print("First few rows of Test Data:\n", test_data.head())

# Step 2: Clean the data
# Ensure that 'message_text' column contains only text data
train_data['message_text'] = train_data['message_text'].astype(str)
test_data['message_text'] = test_data['message_text'].astype(str)

# Ensure 'label' columns are not empty
train_data = train_data.dropna(subset=['label', 'message_text'])
test_data = test_data.dropna(subset=['label', 'message_text'])

# Check for NaN values
print("Train Data NaN values:\n", train_data.isna().sum())
print("Test Data NaN values:\n", test_data.isna().sum())

# Check dataset size
print(f"Training data size: {train_data.shape}")
print(f"Test data size: {test_data.shape}")

# Optional: Reduce dataset size for testing
train_data_sample = train_data.sample(n=1000, random_state=42)

# Use all the available test data since it's already small
test_data_sample = test_data

# Step 3: Preprocess the text
vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
X_train = vectorizer.fit_transform(train_data_sample['message_text'])
y_train = train_data_sample['label']
X_test = vectorizer.transform(test_data_sample['message_text'])
y_test = test_data_sample['label']

# Verify shapes of transformed data
print("Shape of X_train:", X_train.shape)
print("Shape of y_train:", y_train.shape)
print("Shape of X_test:", X_test.shape)
print("Shape of y_test:", y_test.shape)

# Step 4: Build and train the random forest model
model = RandomForestClassifier(n_estimators=100, random_state=42, verbose=1)

# Measure time taken to fit the model
start_time = time.time()
model.fit(X_train, y_train)
end_time = time.time()
print(f"Model training time: {end_time - start_time} seconds")

# Step 5: Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print(f'Accuracy: {accuracy}')
print('Classification Report:')
print(report)
