import sqlite3
import csv

with sqlite3.connect("libraryapp.db") as connection:
    csvWriter = csv.writer(open("libraryapp.csv", "w"))
    c = connection.cursor()
    c.execute("SELECT * FROM book;")
    rows = c.fetchall()
    csvWriter.writerow(['book'])
    csvWriter.writerow(rows)
    csvWriter.writerow(['user'])
    c.execute("SELECT * FROM user;")
    rows2 = c.fetchall()
    csvWriter.writerow(rows2)
