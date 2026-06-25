# How Sighting Rate Works

The sighting rate tells you what share of recorded sightings for a species near your location happened in the month you selected. It is a percentage of real records, not a probability of catching a fish.

## How the number is computed

AnglerCast queries GBIF for occurrence records of the species near the coordinates you entered. Each record has an event date, so AnglerCast can group the records by month. The sighting rate is calculated as the number of records in the selected month divided by the total number of records returned for that species in that area.

For example, if GBIF returns 200 striped bass records near your coordinates, and 60 of them happened in May, the May sighting rate is 30%. That means 30% of the historical records for striped bass in this area happened in May. It does not mean there is a 30% chance of catching one today.

## Sample size and confidence

The sighting rate is only as good as the underlying data. AnglerCast always shows you the sample size (the total record count) and a confidence flag — low, moderate, or high — alongside the percentage.

A high sighting rate based on 5 records is weaker than a moderate rate based on 500 records. Trust the confidence flag, not just the percentage. When the confidence is low, the data is too thin to draw a real conclusion — treat the result as a hint, not a recommendation.

## How to read the rate

The sighting rate is not a catch probability. It does not account for water temperature, tide stage, weather, or what the fish are actually doing right now. It is a historical pattern, drawn from real records, that tells you when this species has shown up in this area in the past.

Use it alongside the live conditions on the Explore page and your own knowledge of the water.