import json

import tweepy


def load_configuration():
    with open("twitter_credentials.json", "r") as file:
        credentials = json.load(file)
    return credentials


def get_api():
    credentials = load_configuration()

    auth = tweepy.OAuthHandler(credentials['CONSUMER_KEY'], credentials['CONSUMER_SECRET'])
    auth.set_access_token(credentials['ACCESS_TOKEN'], credentials['ACCESS_SECRET'])

    api = tweepy.API(auth)

    # public_tweets = api.home_timeline()
    # for tweet in public_tweets:
    #     print(tweet.text)
    return api


# Get the User object for tweepy_connection.py...
def get_user(api):
    user = api.get_user('LBalcerowicz')
    print_data(user)
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
    # sync listen tag
    # myStream.filter(track=['Epic'])
    # sync listen user feed
    # myStream.filter(follow=["LBalcerowicz"])
    # async listen tag
    myStream.filter(track=['bitcoin'], is_async=True)


def printer(data_in):
    for a in data_in:
        # To get full text
        # print(api.get_status(a.id, tweet_mode='extended')._json['full_text'])
        # To get original user ID
        print(api.get_status(a.id, tweet_mode='extended')._json['user']['id'])
        # print full data
        # print(a)


def search_word(api, text):
    search_results = api.search(q=text, tweet_mode='extended', count=3)
    for a in search_results:
        uid = api.get_status(a.id, tweet_mode='extended')._json['user']['id']
        search_user = api.get_user(user_id=uid)
        upo = api.user_timeline(user_id=uid, count=4)
        tweets_for_csv = [tweet.text for tweet in upo]
        c = 0
        for b in tweets_for_csv:
            c += 1
            print(c, '. ', b)
    printer(search_results)
    return search_results


if __name__ == "__main__":
    api = get_api()

    # user = user_object(api)

    # listener(api)

    search_word(api, "cześć")
