import urllib


dataset = 'giops_day'
variables = ['votemper', 'vosaline', 'vozocrtx', 'vomecrty']

for variable in variables:
	url = "http://navigator.oceansdata.ca/api/depth/?dataset=" + dataset + "&variable=" + variable
	print(url)
	f = urllib.urlopen(url)
	output = f.read()
	print(output)
