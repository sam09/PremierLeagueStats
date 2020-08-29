from utils import write_to_json, read_json, ALL_PLAYERS_FILE_PATH, PLAYER_STATS_FILE_PATH, fetch_player_stats


def main():
    players = read_json(ALL_PLAYERS_FILE_PATH)
    stat_list = []
    for player in players:
        print("Fetching player {}".format(player['name']['display']))
        stats = fetch_player_stats(int(player['id']))
        item_dict = {
            'player': player,
            'stats': stats
        }
        stat_list.append(item_dict)
    write_to_json(stat_list, PLAYER_STATS_FILE_PATH)


if __name__ == "__main__":
    main()
