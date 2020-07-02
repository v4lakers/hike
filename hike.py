import folium
from geopy.geocoders import Nominatim
import pandas as pd
import datetime
import pgeocode
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive




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


    geolocator = Nominatim()
    nomi = pgeocode.Nominatim('fr')

    map = folium.Map(
        location=[34.9, -118.8863],
        tiles='cartodbpositron',
        zoom_start=6,
    )

    for index, row in data_visited.iterrows():
        loc = geolocator.geocode(row["Location"]+", "+row["Zip"])
        text = row["Name"] + "\t" + "Date: " + str(row["Date"]) + "\t" + "Length: " + str(row["Length"])
        folium.Marker(location=[loc.latitude, loc.longitude],
                      icon=folium.Icon(color='blue'),
                      popup=folium.Popup(text, max_width=100)
                      ).add_to(map)

    
    for index, row in data_yet_to_visit.iterrows():
        loc = geolocator.geocode(row["Location"]+", "+row["Zip"])
        text = row["Name"] + "\t" + "Length: " + str(row["Length"])
        folium.Marker(location=[loc.latitude, loc.longitude],
                      icon=folium.Icon(color='red'),
                      popup=folium.Popup(text, max_width=100)
                      ).add_to(map)

    map.save("index.html")


def main():
    data_visited, data_yet_to_visit = getData()
    map(data_visited, data_yet_to_visit)




main()
