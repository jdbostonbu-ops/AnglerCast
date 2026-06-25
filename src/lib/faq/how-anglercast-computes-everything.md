# How AnglerCast Computes Everything

AnglerCast is built on an honest-data thesis: real public data computes the facts, and AI explains those facts in plain English. The AI never invents a location, a species, a season, or a count. It assembles what the data already says.

## Where the numbers come from

Species occurrences come from GBIF (the Global Biodiversity Information Facility), a global aggregator of real observation records contributed by museums, surveys, and citizen scientists. When you search for striped bass in a given area, AnglerCast queries GBIF for occurrence records of that species and counts how many fall inside the search area. That count is the sighting rate — it is not a probability that a fish is there right now.

Marine conditions (wave height, swell direction, ocean current) come from Open-Meteo Marine. Wind and weather come from Open-Meteo Forecast. Freshwater conditions (streamflow, gage height, water temperature) come from USGS gauges near your destination. Tide predictions for saltwater locations come from NOAA CO-OPS, the National Oceanic and Atmospheric Administration's tide service.

## Where AI fits in

The AI (OpenAI's gpt-4o-mini) is the explanation layer. It takes the numbers AnglerCast's code has already computed and phrases them as readable sentences. For travel time, the AI is allowed to estimate an ETA from the computed distance, the boat speed you entered, and the live conditions — that one estimate is the AI's own judgement, guarded by a sanity check.

For everything else — sighting rates, occurrence counts, peak months, tide predictions — the AI does not compute the answer. It reads the result and explains it.

## What AnglerCast will not do

AnglerCast will not fabricate a "catch probability." Fish move; a historical record is not a promise. Every sighting rate is shown with a sample size and a confidence flag so you can judge the result for yourself. Where the data is thin, the confidence flag will say so.