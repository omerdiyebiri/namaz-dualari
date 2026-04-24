import os
import glob

directory = "/Users/omer/Desktop/Developer/NamazDuaları/src"
for filepath in glob.glob(directory + "/**/*.tsx", recursive=True) + glob.glob(directory + "/**/*.ts", recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'namazdualari.com' in content:
        content = content.replace('namazdualari.com', 'namazdualari.org')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
