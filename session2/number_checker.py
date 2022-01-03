import numpy as np

difficulty = 0x0ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
test_value = 113273161884148482148009770206688250151427137188213376577822905004309468975555

if test_value < difficulty:
    print("Successful block")
else:
    print("Too large hash value")

# print(difficulty)
