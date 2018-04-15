import yaml

url = input("Url:")
sname = input("shortname:")
name = input(f'name[{sname}]:')
if not name:
    name = sname
logo_url = input('logo url:')
description = input('description:')
lic = input("License:")

import os
os.mkdir(f'public/ecosystem/{sname}')

if logo_url:
    import requests
    res = requests.get(logo_url)
    with open(f'public/ecosystem/{sname}/logo.png', 'wb') as f:
        f.write(res.content)

import yaml

vv = {
 "name":name,
 "license":lic,
 "description":description,
 "url":url,
}
with open(f'public/ecosystem/{sname}/data.yaml', 'w') as f:
    f.write(yaml.dump(vv,default_flow_style=False))


