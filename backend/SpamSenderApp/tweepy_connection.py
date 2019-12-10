import json
import tweepy


# Load file with credentials
def load_configuration():
    with open("twitter_credentials.json", "r") as file:
        credentials = json.load(file)
    return credentials


# returns api key for methods
def get_api():
    credentials = load_configuration()
    auth = tweepy.OAuthHandler(credentials['CONSUMER_KEY'], credentials['CONSUMER_SECRET'])
    auth.set_access_token(credentials['ACCESS_TOKEN'], credentials['ACCESS_SECRET'])
    api = tweepy.API(auth)
    return api


# in: api ref, text to search, result: list of user data [(user_id, screen_name, name, location), (user_id, screen_name, name, location), ...]
# the best, should be used
# All data received that we need to prepare messages to send
def search_users_data(text):
    api = get_api()
    search_results = api.search(q=text, tweet_mode='extended', count=3, lang="en")  # limit 1000
    result = {}
    for single in search_results:
        user_id = api.get_status(single.id, tweet_mode='extended')._json['user']['id']
        result[user_id] = (api.get_user(user_id, tweet_mode='extended')._json['screen_name'],
                       api.get_user(user_id, tweet_mode='extended')._json['name'],
                       api.get_user(user_id, tweet_mode='extended')._json['location'])
    print(result)
    return result


# in use, should be replaced
def find_users(tag):
    names = {}
    for tweet in tweepy.Cursor(get_api().search, q=tag,
                               lang="en").items(5):
        names[tweet.user.name] = tweet.user.screen_name
    return names


# Send for each x send texts[x] message to receiver_ids[x] user
# To serio wysyla wiadomosci na tweeterze, lepiej nie spamujcie
def direct_message(receiver_ids, texts):
    api = get_api()
    for a in range(len(receiver_ids)):
        api.send_direct_message(receiver_ids[a], texts[a])
        # print(receiver_ids, texts)

# if __name__ == "__main__":
# # Gets api, required
# api = get_api()
# # Search users wrote about text
#     result = search_users_data("#test")
# # Just to test
# result = api.me()
# # Just for test, send message to us
# direct_message(api, ['1185922124034314240'], ['testujemy'])
# # Some like this for send, read docs above
# direct_message(api, ids, prepared_texts)
