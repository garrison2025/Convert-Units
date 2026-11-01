import re,json, pathlib,shutil
ROOT=pathlib.Path(__file__).resolve().parents[1]
md=pathlib.Path('/mnt/data/Convert_Units_一次性完整开发与SEO关键词方案_V2_20261101.md').read_text()
pair_body=md.split('## 4. **一次性开发完成的全部定向核心工具页**')[1].split('## 5.')[0]
seed_body=md.split('## 5. **一次性创建的数值SEO页面及逐页真实数据**')[1].split('## 6.')[0]
pairs=[]
for line in pair_body.splitlines():
 if re.match(r'^\|\s*\d+\s*\|',line):
  vals=[x.strip() for x in line.strip('|').split('|')]
  if len(vals)<5:continue
  i,category,url,title=vals[:4]; url=url.strip("`")
  m=re.fullmatch(r'/convert/([a-z0-9-]+)-to-([a-z0-9-]+)/',url)
  if not m:raise ValueError(('pair',vals))
  pairs.append({'id':len(pairs)+1,'category':category,'slug':f'{m[1]}-to-{m[2]}','from':m[1],'to':m[2],'url':url,'title':title})
seeds=[]
for line in seed_body.splitlines():
 if re.match(r'^\|\s*\d+\s*\|',line):
  vals=[x.strip().strip('`') for x in line.strip('|').split('|')]
  if len(vals)<8:continue
  n,url,keyword,volume,kd,rank,traffic,competitor=vals[:8]
  m=re.fullmatch(r'/convert/([a-z0-9-]+)-to-([a-z0-9-]+)/([0-9.]+)/',url)
  if not m:raise ValueError(('seed', vals))
  seeds.append({'id':int(n),'slug':f'{m[1]}-to-{m[2]}','value':float(m[3]),'valueText':m[3],'keyword':keyword,'volumeUS':int(volume.replace(',','')),'kd':int(kd),'rank':int(rank),'trafficEstimate':int(traffic),'competitorURL':competitor, 'url':url})
assert len(pairs)==37,(len(pairs),pairs[-1]);assert len(seeds)==92,len(seeds)
assert len({x['url'] for x in seeds})==92

# V2 includes /convert/seconds-to-hours/{n}/ seeds although the 37-tool list omitted its parent.
# Add its parent tool so every published numeric page has a functional canonical tool.
if 'seconds-to-hours' in {s['slug'] for s in seeds} and 'seconds-to-hours' not in {p['slug'] for p in pairs}: 
 pairs.append({'id':38,'category':'时间','slug':'seconds-to-hours','from':'seconds','to':'hours','url':'/convert/seconds-to-hours/','title':'Seconds to Hours'})
assert set(x['slug'] for x in seeds)<=set(x['slug'] for x in pairs),set(x['slug'] for x in seeds)-set(x['slug'] for x in pairs)
(ROOT/'src/data/pairs.json').write_text(json.dumps(pairs,ensure_ascii=False,indent=2))
(ROOT/'src/data/seeds.json').write_text(json.dumps(seeds,ensure_ascii=False,indent=2))
shutil.copy2('/mnt/data/Convert_Units_一次性完整开发与SEO关键词方案_V2_20261101.md',ROOT/'research/SEO-PLAN-V2.md')
shutil.copy2('/mnt/data/Convert_Units_600关键词_一次性交付页面矩阵_V2_20261101.xlsx',ROOT/'research/KEYWORDS-600.xlsx')
print('Extracted tools',len(pairs),'seeds',len(seeds),'non-weight',len([s for s in seeds if s['slug'] not in ['lbs-to-kg','kg-to-lbs']]))
