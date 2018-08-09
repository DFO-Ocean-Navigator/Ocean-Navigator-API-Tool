#!env python
from contextlib import closing
from PIL import Image
import json
import urllib

#####################################################################



query = {
    "scale": "-1.6,5",
    "depth_limit": False,
    "colormap": "default",
    "dataset": "glorys3",
    "showmap": True,
    "variable": "votemper",
    "surfacevariable": "none",
    "time": 207,
    "quantum": "month",
    "path": [[47.649768922115356, -52.60316173355579], [45.227624722564485, -48.53822032730579]],
    "type": "transect",
    "linearthresh": 200,
}


# Iterate through the range, with frame set to the index and t set to the value
# In this example t will be set to 10,11,12,13,14,15,16,17,18,19
# frame will be set to 0,1,2,3,4,5,6,7,8,9
for t in range(0, 10):
    print t
    # Set the 'time' portion of the query to t
    query['time'] = t
    url = "http://navigator.oceansdata.ca/plot/?" + urllib.urlencode({
        "query": json.dumps(query),
        "dpi": "72",
        "size": "10x7",
    })
    with closing(urllib.urlopen(url)) as f:
        img = Image.open(f)
	img.save("image" + str(t) + ".png", "PNG")
        
