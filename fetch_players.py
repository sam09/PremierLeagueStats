from utils import write_to_json, send_pl_api_request, ALL_PLAYERS_FILE_PATH


def fetch_all_players():
	url = "https://footballapi.pulselive.com/football/players?pageSize=990&compSeasons=274&altIds=true&page=0&type=player&id=-1&compSeasonId=274"
	response = send_pl_api_request(url=url)
	return response['content']


def clean_player_data(contents):
	item_list = []
	for content in contents:
		item_dict = {'info': content['info'], 'name': content['name'], 'id': content['id']}
		item_list.append(item_dict)
	return item_list


def main():
	print("Fetching data from API")
	contents = fetch_all_players()
	print("Cleaning data")
	data = clean_player_data(contents)
	print("Writing to json")
	write_to_json(data, ALL_PLAYERS_FILE_PATH)


if __name__ == "__main__":
	main()
