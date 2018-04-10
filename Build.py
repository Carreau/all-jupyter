import os
from pathlib import Path
ld = os.listdir('public/ecosystem')

p = Path('public/ecosystem')

import yaml
data =[]
for sub in p.iterdir():
    if not sub.is_dir():
        continue
    y = (sub / 'data.yaml')
    if not y.exists():
        raise ValueError(f'{y} should exists')
    with y.open() as f:
        dt = yaml.safe_load(f.read())
    dt['path'] = sub.parts[-1]

    if (sub / 'logo.svg').exists():
        dt['logo'] = 'svg'
    elif (sub / 'logo.png').exists():
        dt['logo'] = 'png'
    elif (sub / 'logo.jpg').exists():
        dt['logo'] = 'jpg'
    data.append(dt)

tpl= """
export var data = {};

export default data;
"""

import json


with open('src/data.js', 'w') as f:
    f.write(tpl.format(json.dumps(data, indent=2)))