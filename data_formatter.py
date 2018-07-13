import csv

with open("phonebook.tsv") as fin, open("phonebook.csv", 'w') as fout:
    o = csv.writer(fout)
    for line in fin:
        o.writerow(line.split("\t"))
if __name__ == '__main__':
    pass
