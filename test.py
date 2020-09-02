import zipcodes

print(zipcodes.matching('95135')[0]['county'])

df = pd.read_csv(county_data, na_values=[' '])
for index, row in df.iterrows():
    if row['FIPS_Code'] not in counties:
        df.drop(index, inplace=True)
