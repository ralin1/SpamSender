import json
import pandas as pd
from twython import Twython
from collections import Counter
import ast
from twython import TwythonStreamer
import csv


# https://stackabuse.com/accessing-the-twitter-api-with-python/

# Enter your keys/secrets as strings in the following fields


def read_csv():
    tweets = pd.read_csv("saved_tweets.csv")
    return tweets


# Save the credentials object to file
def write_configuration(credentials):
    with open("../twitter_credentials.json", "w") as file:
        json.dump(credentials, file)


def load_configuration():
    with open("../twitter_credentials.json", "r") as file:
        credentials = json.load(file)
    return credentials


# Instantiate an object
def instantiate(credentials):
    python_tweets = Twython(credentials['CONSUMER_KEY'], credentials['CONSUMER_SECRET'])
    return python_tweets


# Create our query
def create_query():
    query = {'q': 'learn python',
             'result_type': 'popular',
             'count': 10,
             'lang': 'en',
             }
    return query


# Search tweets
def search_tweet():
    python_tweets = instantiate()
    query = create_query()
    dict_ = {'user': [], 'date': [], 'text': [], 'favorite_count': []}
    for status in python_tweets.search(**query)['statuses']:
        dict_['user'].append(status['user']['screen_name'])
        dict_['date'].append(status['created_at'])
        dict_['text'].append(status['text'])
        dict_['favorite_count'].append(status['favorite_count'])
    return dict_


# Structure data in a pandas DataFrame for easier manipulation
def structure_data():
    dict_ = search_tweet()
    df = pd.DataFrame(dict_)
    df.sort_values(by='favorite_count', inplace=True, ascending=False)
    df.head(5)


# Extract hashtags and put them in a list
def hashtag_to_list():
    tweets = read_csv()
    list_hashtag_strings = [entry for entry in tweets.hashtags]
    list_hashtag_lists = ast.literal_eval(','.join(list_hashtag_strings))
    hashtag_list = [ht.lower() for list_ in list_hashtag_lists for ht in list_]
    return hashtag_list


# Count most common hashtags
def common_hashtag():
    hashtag_list = hashtag_to_list()
    counter_hashtags = Counter(hashtag_list)
    counter_hashtags.most_common(20)


# Filter out unwanted data
def process_tweet(tweet):
    d = {}
    d['hashtags'] = [hashtag['text'] for hashtag in tweet['entities']['hashtags']]
    d['text'] = tweet['text']
    d['user'] = tweet['user']['screen_name']
    d['user_loc'] = tweet['user']['location']
    return d


def beginning():
    credentials = load_configuration()
    # Instantiate from our streaming class
    stream = MyStreamer(credentials['CONSUMER_KEY'], credentials['CONSUMER_SECRET'],
                        credentials['ACCESS_TOKEN'], credentials['ACCESS_SECRET'])
    # Start the stream
    stream.statuses.filter(track='python')

    structure_data()
    common_hashtag()


# Create a class that inherits TwythonStreamer
class MyStreamer(TwythonStreamer):

    # Received data
    def on_success(self, data):
        # Only collect tweets in English
        if data['lang'] == 'en':
            tweet_data = process_tweet(data)
            self.save_to_csv(tweet_data)

    # Problem with the API
    def on_error(self, status_code, data):
        print(status_code, data)
        self.disconnect()

    # Save each tweet to csv file
    def save_to_csv(self, tweet):
        with open(r'saved_tweets.csv', 'a') as file:
            writer = csv.writer(file)
            writer.writerow(list(tweet.values()))


if __name__ == "__main__":
    beginning()
