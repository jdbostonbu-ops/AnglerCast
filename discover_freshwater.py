#!/usr/bin/env python3
"""
discover_freshwater.py
Rank freshwater fish by GBIF record count in an inland Northeast-US polygon.
GBIF is used (not OBIS) because OBIS is marine. You curate the game fish
from the ranked list; record count != "commonly fished."

Usage:
  python3 discover_freshwater.py            # top 60
  python3 discover_freshwater.py 80         # top 80
"""
import sys
import json
import urllib.parse
import urllib.request

# Inland NE-US polygon, counterclockwise (GBIF treats clockwise WKT as a hole).
# Covers upstate NY / VT / NH interior: Lake Champlain, Finger Lakes, Adirondacks.
WKT = "POLYGON((-77 42,-72 42,-72 45,-77 45,-77 42))"

NON_FISH_CLASSES = {"Aves", "Mammalia", "Amphibia", "Reptilia", "Squamata", "Testudines"}


def get_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": "anglercast-fw/1.0"})
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.load(r)


def main(n):
    # taxonKey=44 is GBIF's phylum Chordata; the WKT geometry does the geo filtering.
    url = ("https://api.gbif.org/v1/occurrence/search?geometry=%s"
           "&taxonKey=44&hasCoordinate=true"
           "&facet=speciesKey&speciesKey.facetLimit=%d&limit=0"
           % (urllib.parse.quote(WKT), max(n * 4, 200)))
    data = get_json(url)
    print("  total records in polygon:", data.get("count"))

    counts = []
    for f in data.get("facets", []):
        if str(f.get("field", "")).lower() in ("species_key", "specieskey"):
            counts = f.get("counts", [])

    print("\n  FRESHWATER | GBIF | NE-US inland (curate to fish)\n")
    print("  %4s  %9s  %s" % ("rank", "records", "species  /  common name"))
    print("  " + "-" * 72)
    shown = 0
    for c in counts:
        if shown >= n:
            break
        skey, cnt = c["name"], c["count"]
        try:
            sp = get_json("https://api.gbif.org/v1/species/%s" % skey)
            sci = sp.get("canonicalName") or sp.get("scientificName") or str(skey)
            cls = sp.get("class", "")
        except Exception:
            sci, cls = str(skey), ""
        if cls in NON_FISH_CLASSES:
            continue
        common = ""
        try:
            vn = get_json("https://api.gbif.org/v1/species/%s/vernacularNames" % skey)
            for v in vn.get("results", []):
                if v.get("language") == "eng" and v.get("vernacularName"):
                    common = v["vernacularName"]
                    break
        except Exception:
            pass
        shown += 1
        label = sci + (("  -  " + common) if common else "")
        print("  %4d  %9d  %s" % (shown, cnt, label))
    print("\n  (%d fish shown)\n" % shown)


if __name__ == "__main__":
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 60
    main(n)
