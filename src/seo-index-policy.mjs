/** Safe, explicit index policy: never expose every generated number by accident. */
export function resolveNumericIndexMode(mode='curated',confirmation=''){
 const selected=String(mode??'curated').trim();
 if(!['curated','all'].includes(selected))throw new RangeError('NUMERIC_INDEX_MODE must be curated or all.');
 if(selected==='all'&&confirmation!=='REVIEWED_ALL_92')
  throw new RangeError('Full numeric indexing requires NUMERIC_INDEX_CONFIRMATION=REVIEWED_ALL_92 after page-by-page editorial review.');
 return selected;
}
