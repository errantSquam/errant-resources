import os

f = open(os.getcwd() + "/proust_cn_og.md", "r", encoding = "utf-8").readlines()

newfile = ""
for line in f:
    print(line)
    if line != "\n":
        newfile += line + "\n\n"
    else:
        newfile += "&nbsp;\n\n"


with open(os.getcwd() + "/proust_cn.md", "w", encoding = "utf-8") as f:
  f.write(newfile) 
    
