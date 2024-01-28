companies = ["Amazon", "Youtube", "Yahoo"]
search = input("Enter company information: ")
for company in companies:
    if search in companies:
        print(search, company)