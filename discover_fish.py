#!/usr/bin/env python3
import sys, json, urllib.parse, urllib.request

SALT_WKT = "POLYGON((-74 40, -68 40, -68 44, -74 44, -74 40))"

def get_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": "anglercast-discover/1.0"})
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.load(r)

def obis(n, taxon):
    aphia = {"actinopterygii": 10194, "elasmobranchii": 10193}.get(taxon.lower(), 10194)
    try:
        t = get_json("https://api.obis.org/v3/taxon/" + urllib.parse.quote(taxon))
        aphia = t["results"][0]["taxonID"]
    except Exception:
        pass
    rows = []
    skip = 0
    while True:
        url = ("https://api.obis.org/v3/checklist?taxonid=%d&geometry=%s&size=500&skip=%d"
               % (aphia, urllib.parse.quote(SALT_WKT), skip))
        data = get_json(url)
        results = data.get("results", [])
        if not results:
            break
        for r in results:
            if str(r.get("taxonRank", "")).lower() != "species":
                continue
            rows.append((r.get("records", 0) or 0, r.get("scientificName", "?")))
        if len(results) < 500:
            break
        skip += 500
    rows.sort(reverse=True)
    print("\n  SALTWATER  |  OBIS  |  %s  |  NE-US Atlantic\n" % taxon)
    print("  %4s  %9s  %s" % ("rank", "records", "species"))
    print("  " + "-"*60)
    for i, (cnt, name) in enumerate(rows[:n], 1):
        print("  %4d  %9d  %s" % (i, cnt, name))
    print("\n  %d species found.\n" % len(rows))

if __name__ == "__main__":
    n = int(sys.argv[2]) if len(sys.argv) > 2 else 40
    group = sys.argv[3] if len(sys.argv) > 3 else "Actinopterygii"
    obis(n, group)
