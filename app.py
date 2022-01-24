from sqlite3 import Date
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import requests
import json
import random

# mehrabad
nationl_url = 'https://www.flightsfrom.com/THR/departures?dateMethod=day&dateFrom=2022-01-23&dateTo=2022-01-30'

# IKA
internationl_url = 'https://www.flightsfrom.com/IKA/departures?dateMethod=day&dateFrom=2022-01-23&dateTo=2022-01-30'


def get_html(url):
    r = requests.get(url)
    return r.text


def get_data(url, origin, origin_city, price_range):
    soup = BeautifulSoup(get_html(url), 'lxml')

    date = datetime(2022, 6, 23)

    data = []
    # find element with id airport-departure-list
    departure_list = soup.select('#airport-departure-list li')[:-1]

    for i in departure_list:
        [hour, minute] = i.select_one(
            '.airport-departure-list-item').text.strip().split(':')
        complete_date = date.replace(hour=int(hour), minute=int(minute))

        air_line = i.select_one('span.airport-hide-mobile').text.strip()

        city = i.select('div')[3].select_one('span').text
        air_port = i.select('div')[3].text.strip().split(' ')[-1]
        flightnumber = i.select_one('.departures-15').text.strip()

        data.append({
            'date': complete_date.strftime('%Y-%m-%d %H:%M'),
            'air_line': air_line,
            'origin_air_port': origin,
            'destination_air_port': air_port,
            'origin_city': origin_city,
            'destination_city': city,
            'flightnumber': flightnumber,
            'price': random.randint(price_range[0], price_range[1])
        })
    return data


with open('nationl_url.json', 'w') as f:
    json.dump(get_data(nationl_url, 'Mehrabad', 'Tehran', [15, 50]), f)

with open('internationl_url.json', 'w') as f:
    json.dump(get_data(internationl_url, 'IKA', 'Tehran', [500, 1500]), f)
