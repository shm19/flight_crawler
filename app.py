from bs4 import BeautifulSoup
import requests


# html = 'https://www.digikala.com/'
html = 'https://www.momondo.com/explore/IKA-anywhere/20220213,20220220/'


def get_html(url):
    r = requests.get(url)
    return r.text


soup = BeautifulSoup(get_html(html), 'lxml')
# find element with id WhDQ-destinations

mydivs = soup.find_all("div", {"class": "Explore-GridViewItem"})
print(mydivs)
