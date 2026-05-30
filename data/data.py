import json
import re
from pathlib import Path
from urllib.request import Request, urlopen

from bs4 import BeautifulSoup

URL = (
    "https://ind.nl/en/public-register-recognised-sponsors/"
    "public-register-regular-labour-and-highly-skilled-migrants"
)
DATA_DIR = Path(__file__).resolve().parent


def fetch_sponsor_table():
    request = Request(URL, headers={"User-Agent": "dutch-sponsorship-highlighter/1.0"})
    with urlopen(request, timeout=60) as response:
        html = response.read()

    soup = BeautifulSoup(html, "html.parser")
    table = soup.find("table")
    if table is None:
        raise RuntimeError("Could not find sponsor table on IND page")

    table_data = {}
    for row in table.find_all("tr"):
        # Organisation name is in <th>; KvK number is in <td>
        name_cell = row.find("th")
        if not name_cell:
            continue
        cell_text = name_cell.get_text().replace(" B.V.", "").strip().lower()
        if not cell_text:
            continue
        first_letter = cell_text[0]
        table_data.setdefault(first_letter, []).append(cell_text)

    return table_data


def js_object_key(key: str) -> str:
    if re.fullmatch(r"[A-Za-z_$][\w$]*", key):
        return key
    return json.dumps(key, ensure_ascii=False)


def write_data_js(table_data: dict, path: Path) -> None:
    lines = ["const data = {"]
    for key in sorted(table_data.keys(), key=lambda k: (not k.isalnum(), k.lower())):
        lines.append(f"  {js_object_key(key)}: [")
        for name in table_data[key]:
            lines.append(f"    {json.dumps(name, ensure_ascii=False)},")
        lines.append("  ],")
    lines.append("};")
    lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


def main():
    table_data = fetch_sponsor_table()
    total = sum(len(names) for names in table_data.values())

    json_path = DATA_DIR / "data.json"
    js_path = DATA_DIR / "data.js"

    json_path.write_text(
        json.dumps(table_data, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    write_data_js(table_data, js_path)

    print(f"Wrote {total} sponsors to {json_path.name} and {js_path.name}")


if __name__ == "__main__":
    main()
