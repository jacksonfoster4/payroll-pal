import os
from redis import Redis

# this script checks if the pickled objects in /tmp belong to active sessions 
# and deletes the inactive ones.
# if an id is in Redis, it is active

r = Redis()

root = os.path.abspath(os.path.dirname(__file__))
directory = "{}/tmp".format(root)

for filename in os.listdir(directory):
    pp_id = filename.split('-')[0]
    if not r.get(pp_id):
        os.remove(filename)