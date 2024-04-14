import requests
import json
from bs4 import BeautifulSoup

url = "https://ind.nl/en/public-register-recognised-sponsors/public-register-regular-labour-and-highly-skilled-migrants"
response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")

table = soup.find("table")

table_data = {}
for row in table.find_all("tr"):
    for cell in row.find_all("th"):
        cell_text = cell.get_text().replace(" B.V.", "").strip().lower()
        first_letter = cell_text[0]
        if first_letter not in table_data:
            table_data[first_letter] = []
        table_data[first_letter].append(cell_text)
        

print(table_data)



with open("data/data.json", "w") as f:
    json.dump( table_data, f)
