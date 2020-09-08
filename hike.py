def adjust():
    with open("script.js", "r") as infile:
        data = infile.readlines()

    with open("test.js", "w") as outfile:
        counter = 0
        locations = []
        for line in data:
            if "// ChartActionHere" in line:
                locations.append(counter+1)
            counter = counter + 1

import json
import random
import folium
import zipcodes
import pandas as pd
import gspread
import matplotlib.pyplot as plt
from oauth2client.service_account import ServiceAccountCredentials
import requests


def getData():
    # Get Data
    scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name('hikeanalytics-3fed276449ce.json', scope)
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
    # geolocator = Nominatim(timeout=30)
    zips = pd.read_csv("zips.csv")
    zip = []
    counties = []

    map = folium.Map(
        location=[34.9, -118.8863],
        tiles='Stamen Terrain',
        zoom_start=6,
        zoom_control=True
    )

    for index, row in data_visited.iterrows():
        country = row["Location"].split(", ")[-1].lower()

        epsilon = 0
        if row["Zip"] not in zip:
            zip.append(row["Zip"])
            if zipcodes.matching(row["Zip"])[0]['county'] not in counties:
                counties.append(zipcodes.matching(row["Zip"])[0]['county'])
        else:
            epsilon = epsilon + random.uniform(0, 1) / 100

        if country == "us":
            info = zips.loc[zips["Zip"] == int(row["Zip"])]
            lat = info["Latitude"] + epsilon
            lon = info["Longitude"] + epsilon

        else:
            # loc = geolocator.geocode(row["Location"] + ", " + row["Zip"])
            # lat = loc.latitude
            # lon = loc.longitude
            pass

        text = row["Name"] + "\t" + "Date: " + str(row["Date"]) + "\t" + "Length: " + str(row["Length"])
        folium.Marker(location=[lat, lon],
                      icon=folium.Icon(color='lightred'),
                      popup=folium.Popup(text, max_width=100)
                      ).add_to(map)



    map.save("temp.html")

    with open("map.html", "w") as infile:

        with open("htmls/header.html", "r") as outfile1:
            for line in outfile1:
                infile.write(line)

        with open("htmls/temp.html", "r") as outfile2:
            for line in outfile2:
                infile.write(line)

    infile.close()
    outfile1.close()
    outfile2.close()



def line_graph(metric, metric_name):
    values = []
    dates = []

    for row in metric.iterrows():
        temp = str(row[1]).split("\n")
        values.append(float(temp[0].split(" ")[-1]))
        dates.append(row[0].strftime('%b-%Y'))

    if metric_name == "Miles":
        with open("script.js", "r") as infile:
            data = infile.readlines()
        infile.close()

        with open("script.js", "w") as outfile:
            counter = 0
            for i in range(len(data)):
                if "var labels2 =" in data[i]:
                    data[counter] = "var labels2 = "+str(dates)+"\n"

                if "var data2 = " in data[i]:
                    data[counter] = "var data2 = "+str(values)+"\n"

                outfile.write(data[i])
                counter = counter + 1
        outfile.close()


def trailing(data):
    data['Date'] = pd.to_datetime(data['Date'])
    data["Length"] = pd.to_numeric(data["Length"])
    data["Elevation_Gain"] = pd.to_numeric(data["Elevation_Gain"])
    data["Time"] = pd.to_numeric(data["Time"])

    miles  = data.groupby(data['Date'].dt.to_period("M"))['Length'].sum().to_frame()
    elev = data.groupby(data['Date'].dt.to_period("M"))['Elevation_Gain'].sum().to_frame()
    time = data.groupby(data['Date'].dt.to_period("M"))['Time'].sum().to_frame()

    line_graph(miles, "Miles")
    line_graph(elev, "Elevation_Gain")
    line_graph(time, "Time")

def sums(data):
    miles = round(pd.to_numeric(data["Length"]).sum(), 1)
    elevation = round(pd.to_numeric(data["Elevation_Gain"]).sum(), 1)
    minutes = round(pd.to_numeric(data["Time"]).sum(), 1)
    hikes = len(data.index)

    with open("index.html", "r") as infile:
        data = infile.readlines()
    infile.close()

    with open("index.html", "w") as outfile:
        for i in range(len(data)-1):
            if ">Miles</p>" in data[i+1]:
                data[i] = "<h3>"+str(miles)+"</h3>"+"\n"
            if ">Elevation Gain</p>" in data[i+1]:
                data[i] = "<h3>"+str(elevation)+"</h3>"+"\n"
            if ">Minutes</p>" in data[i+1]:
                data[i] = "<h3>"+str(minutes)+"</h3>"+"\n"
            if ">Hikes</p>" in data[i+1]:
                data[i] = "<h3>"+str(hikes)+"</h3>"+"\n"

            outfile.write(data[i])
        outfile.write(data[len(data)-1])


    outfile.close()








def main():
    data_visited, data_yet_to_visit = getData()
    map(data_visited, data_yet_to_visit)
    trailing(data_visited)
    sums(data_visited)


main()

