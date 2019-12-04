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


# deprecated
def printer(data_in):
    for a in data_in:
        # To get full text
        # print(api.get_status(a.id, tweet_mode='extended')._json['full_text'])
        # To get original user ID
        print(api.get_status(a.id, tweet_mode='extended')._json['user']['id'])
        # print full data
        # print(a)


# in: api ref, text to search, result: list of users tweet lists => result[user[tweet, tweet, tweet],...,user[tweet,...,tweet]]
def search_word(api, text):
    search_results = api.search(q=text, tweet_mode='extended', count=3, lang="en")  # limit 1000
    result = []
    for a in search_results:
        user_id = api.get_status(a.id, tweet_mode='extended')._json['user']['id']
        # search_user = api.get_user(user_id=user_id)
        user_posts = api.user_timeline(user_id=user_id, count=10)  # limit 200
        result.append([tweet.text for tweet in user_posts])
    # print(result)
    return result


def search_users(api, text):
    search_results = api.search(q=text, tweet_mode='extended', count=3, lang="en")  # limit 1000
    result = []
    for a in search_results:
        user_id = api.get_status(a.id, tweet_mode='extended')._json['user']['id']
        result.append(user_id)
    # print(result)
    return result

def find_users(tag):
    names = {}
    for tweet in tweepy.Cursor(get_api().search, q=tag,
                               lang="en").items(5):
        names[tweet.user.name] = tweet.user.screen_name
    return names


# if __name__ == "__main__":
#     find_users("#sport")
#     api = get_api()
#
#     user = get_user(api)
#     print_data(user)
#     # listener(api)
#
#
#     res = search_word(api, "#sport")
#     print(res)
