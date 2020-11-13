from flask import Flask, request

COUNT_FILE = "count.txt"

app = Flask(__name__)

@app.route('/increment', methods=['POST'])
def result():
    print("Increment") # should display 'bar'
    return increment() # response to your request.


def increment():
    # Open count file for writing
    file = open(COUNT_FILE, "wt")
    # Increment count
    # Read count and convert to int
    count = int(file.read())
    print(count)
    # Update display

    # Close count file
    file.close()

def reset():
    # Open count file for reading
    file = open(COUNT_FILE, "rt")
    # Read count as int
    count = int(file.read())
    # Update display

    # Close count file
    file.close()
