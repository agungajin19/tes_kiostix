# 1. Cari nilai minimum dan maksimum dari suatu array
def minmax(array):
    minimum = float('inf')
    maximum = float('-inf')
    for each in array:
        if each > maximum:
            maximum = each
        if each < minimum:
            minimum = each
    return minimum, maximum

print(minmax([1,5,8,0,9,7,4,3,2]))

# 2. Buat fungsi KiosTix dengan range input 0-100
def kiostix(number):
    if number >= 0 or number <=100:
        if number%25 == 0:
            return 'KI'
        if number%40 == 0:
            return 'OS'
        if number%60 == 0:
            return 'TIK'
        if number%99 == 0:
            return 'KIOSTIX'
    else:
        return 'Input diluar range atau tidak valid'

print(kiostix(99))

# 3. Membuat fungsi  untuk cek kata palindrom
def palindrom(word):
    result = True
    for i in range(len(word)/2):
        if word[i] != word[(-1*i)-1]:
            result = False
            break
    return result

print(palindrom('malam'))
