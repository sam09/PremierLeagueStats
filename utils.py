import json
import requests


def send_pl_api_request(url):
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://www.premierleague.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
    }
    with requests.Session() as s:
        response = s.get(url=url, headers=headers).json()
    return response


def read_json(file_name):
    with open(file_name) as json_file:
        data = json.load(json_file)
    return data


def write_to_json(data, file_name):
    with open(file_name, "w") as json_file:
        json.dump(data, json_file)


def fetch_player_stats(player_id):
    url = "https://footballapi.pulselive.com/football/stats/player/{}?comps=1&compSeasons=274".format(player_id)
    response = send_pl_api_request(url=url)
    stats = response['stats']
    stat_dict = {}
    for stat in stats:
        stat_dict[stat['name']] = stat['value']
    return stat_dict


PLAYER_STATS_FILE_PATH = "data/stats.json"
ALL_PLAYERS_FILE_PATH = "data/players_info.json"
