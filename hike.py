import random

import folium
from geopy.geocoders import Nominatim
import pandas as pd
import gspread
from oauth2client.service_account import ServiceAccountCredentials



def getData():
    # Get Data
    scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name('HikeAnalytics-037073e9d447.json', scope)
    gc = gspread.authorize(creds)

    # Visited
    wks1 = gc.open('Hikes').worksheet('Visited')
    visited = wks1.get_all_values()
    headers = visited.pop(0)
    data_visited = pd.DataFrame(visited, columns=headers)

    # Yet to Visit
    wks2 = gc.open('Hikes').worksheet('YetToVisit')
    yet_to_visit = wks2.get_all_values()
    headers = yet_to_visit.pop(0)
    data_yet_to_visit = pd.DataFrame(yet_to_visit, columns=headers)

    return data_visited, data_yet_to_visit


def map(data_visited, data_yet_to_visit):
    #geolocator = Nominatim(timeout=30)
    zips = pd.read_csv("zips.csv")
    zip = []

    map = folium.Map(
        location=[34.9, -118.8863],
        tiles='cartodbpositron',
        zoom_start=6,
    )

    for index, row in data_visited.iterrows():
        country = row["Location"].split(", ")[-1].lower()

        epsilon = 0
        if row["Zip"] not in zip:
            zip.append(row["Zip"])
        else:
            epsilon = epsilon + random.uniform(0, 1) / 10

        if country == "us":
            info = zips.loc[zips["Zip"] == int(row["Zip"])]
            lat = info["Latitude"] + epsilon
            lon = info["Longitude"] + epsilon

        else:
            #loc = geolocator.geocode(row["Location"] + ", " + row["Zip"])
            #lat = loc.latitude
            #lon = loc.longitude
            pass

        text = row["Name"] + "\t" + "Date: " + str(row["Date"]) + "\t" + "Length: " + str(row["Length"])
        folium.Marker(location=[lat, lon],
                      icon=folium.Icon(color='blue'),
                      popup=folium.Popup(text, max_width=100)
                      ).add_to(map)

    for index, row in data_yet_to_visit.iterrows():
        country = row["Location"].split(", ")[-1].lower()

        epsilon = 0
        if row["Zip"] not in zip:
            zip.append(row["Zip"])
        else:
            epsilon = epsilon + random.uniform(0, 1) / 1000

        if country == "us":
            info = zips.loc[zips["Zip"] == int(row["Zip"])]
            lat = info["Latitude"] + epsilon
            lon = info["Longitude"] + epsilon

        else:
            #loc = geolocator.geocode(row["Location"] + ", " + row["Zip"])
            #lat = loc.latitude
            #lon = loc.longitude
            pass

        text = row["Name"] + "\t" + "Length: " + str(row["Length"])
        folium.Marker(location=[lat, lon],
                      icon=folium.Icon(color='red'),
                      popup=folium.Popup(text, max_width=100)
                      ).add_to(map)

    map.save("index.html")


def main():
    data_visited, data_yet_to_visit = getData()
    map(data_visited, data_yet_to_visit)


main()
