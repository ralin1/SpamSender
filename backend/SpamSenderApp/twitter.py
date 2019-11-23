import csv
import json
import keyword

import pandas as pd
import tweepy
import pandas


def load_configuration():
    with open("twitter_credentials.json", "r") as file:
        credentials = json.load(file)
    return credentials


def hello_tweepy():
    credentials = load_configuration()

    auth = tweepy.OAuthHandler(credentials['CONSUMER_KEY'], credentials['CONSUMER_SECRET'])
    auth.set_access_token(credentials['ACCESS_TOKEN'], credentials['ACCESS_SECRET'])

    api = tweepy.API(auth)

    # public_tweets = api.home_timeline()
    # for tweet in public_tweets:
    #     print(tweet.text)
    return api


# Get the User object for twitter.py...
def user_object(api):
    user = api.get_user('LBalcerowicz')
    return user


def print_data(user):
    print(user.screen_name)
    print(user.followers_count)
    for friend in user.friends():
        print(friend.screen_name)


# override tweepy.StreamListener to add logic to on_status
class MyStreamListener(tweepy.StreamListener):

    def on_status(self, status):
        print(status.text)

    def on_error(self, status_code):
        if status_code == 420:
            # returning False in on_error disconnects the stream
            return False
        # returning non-False reconnects the stream, with backoff.


def listener(api):
    my_steam_listener = MyStreamListener()
    myStream = tweepy.Stream(auth=api.auth, listener=my_steam_listener)
    # myStream.filter(track=['Epic'])
    # myStream.filter(follow=["LBalcerowicz"])
    myStream.filter(track=['bitcoin'], is_async=True)


if __name__ == "__main__":
    api = hello_tweepy()
    # user = user_object(api)
    # print_data(user)

    # listener(api)

    # public_tweets = api.trends_available()
    # for a in public_tweets:
    #     print(a['name'])

    search_results = api.search(q="hello", tweet_mode='extended', count=1000)
    for a in search_results:
        print(api.get_status(a.id, tweet_mode='extended')._json['full_text'])

    # with open('some.csv', 'w') as acsv:
    #     w = csv.writer(acsv)
    #     w.writerow(('Keyword', 'Tweet'))
    #     for tweet in search_results:
    #         lat, lon = tweet.geo if tweet.geo else ('', '')
    #         w.writerow((keyword, tweet.text, lat, lon))
