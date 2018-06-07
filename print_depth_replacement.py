import urllib

base_url = "http://navigator.oceansdata.ca/api/depth/"
dataset = 'giops_day'
variables = ['votemper', 'vosaline', 'vozocrtx', 'vomecrty']

for variable in variables:
	url = ('{}?dataset={}&variable={}'.format(base_url, dataset, variable))
	f = urllib.urlopen(url)
	output = f.read()
	print(output)
