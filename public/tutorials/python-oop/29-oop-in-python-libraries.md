# Chapter 29: OOP in Python – Python Libraries


### Requests: Simple HTTP
Requests is an elegant HTTP library for sending HTTP requests. Install it using:
```bash
pip install requests
```

#### GET and POST Requests
```python
import requests
import json

# GET request
req = requests.get('http://pokeapi.co/api/v2/pokemon/1/')
print(req.status_code)
json_response = req.json()

# POST request passing payload data
req_post = requests.post('http://api/user', data={'key': 'value'}, json=None)
```

### Pandas: High-Performance Data Munging
Pandas is a data-science library built on NumPy. Its primary data structure is the tabular `DataFrame` (rows of observations and columns of variables).

```python
import pandas as pd

# Creating DataFrame from a dictionary
dict_data = {
    "Bric_country": ["Brazil", "Russia", "India"],
    "Brics_capital": ["Brasília", "Moscow", "New Delhi"]
}
brics = pd.DataFrame(dict_data)

# Custom Indexing
brics.index = ['BR', 'RU', 'IN']

# Reading standard CSV files
stocks = pd.read_csv('stocks_list.csv', index_col=0)
print(stocks['ISIN']) # Prints a Series
print(stocks[['ISIN', 'TOTALTRADES']]) # Prints a subset DataFrame
```

### Pygame: Multimedia and Game Development
Pygame is a cross-platform multimedia library used to build games using specialized graphics and sound modules.

#### Pygame Steps
1. Import and initialize: `pygame.init()`
2. Set display window size: `screen = pygame.display.set_mode((560, 480))`
3. Initialize objects, sound channels, and assets.
4. Run the main Game Loop (continuous frame processing capturing event inputs).

```python
import pygame
import sys

pygame.init()
screen = pygame.display.set_mode((560, 480))
pygame.display.set_caption("Moving Box")

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
    screen.fill((0, 0, 0)) # Fills background black
    pygame.draw.rect(screen, (255, 255, 255), (300, 250, 25, 25))
    pygame.display.flip() # Refreshes display
```

### Beautiful Soup: Web Scraping
Beautiful Soup pulls structured data out of HTML or XML documents. Install using:
```bash
pip install beautifulsoup4
```

#### Parsing and Navigating HTML
```python
from bs4 import BeautifulSoup
from urllib.request import urlopen

r = urlopen('https://en.wikipedia.org/wiki/List_of_countries_by_foreign-exchange_reserves_(excluding_gold)').read()
soup = BeautifulSoup(r, 'html.parser')

# Parsing elements
print(soup.title.string) # Retrieves page title
print(soup.p)            # Retrieves first paragraph tag

# Extracting all URLs on a page
for link in soup.find_all('a'):
    print(link.get('href'))

# Extracting page text
print(soup.get_text())
```
