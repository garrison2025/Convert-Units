/**
 * Independent per-URL approval of the 15 candidate numeric pages on a public domain.
 * Official-domain approval alone must not publish a large numeric page collection.
 * A URL must be in the fixed candidate list AND explicitly approved.
 * All branch and pages.dev previews remain unindexable regardless of inherited env.
 */
export function resolveNumericPilotPublication({
 isProduction=false,site=null,mode='curated',pilotUrls=[],approval='',approvedHost='',approvedUrls=''
}={}){
 const empty={publishedUrls:[],reason:'preview-only-noindex'};
 if(!isProduction)return empty;
 if(mode!=='curated')throw new RangeError('Public numeric indexing is limited to the curated 15 pilot candidates; NUMERIC_INDEX_MODE=all is forbidden on production.');
 const raw=String(approvedUrls??'').trim(),token=String(approval??'').trim(),host=String(approvedHost??'').trim().toLowerCase();
 if(!raw&&!token&&!host)return {publishedUrls:[],reason:'numeric-review-not-approved'};
 if(token!=='I_APPROVE_SELECTED_NUMERIC_URLS')throw new RangeError('SEO_NUMERIC_INDEX_APPROVED requires I_APPROVE_SELECTED_NUMERIC_URLS.');
 if(!site||host!==new URL(site).hostname.toLowerCase())throw new RangeError('SEO_NUMERIC_PUBLIC_HOST must exactly match the approved public domain.');
 if(!raw)throw new RangeError('SEO_NUMERIC_APPROVED_URLS must explicitly list reviewed numeric pilot URLs.');
 const requested=raw.split(',').map(x=>x.trim());
 const pilot=new Set(pilotUrls);
 if(requested.some(x=>!x)||requested.length!==new Set(requested).size)throw new RangeError('Empty or duplicate URL in SEO_NUMERIC_APPROVED_URLS.');
 for(const url of requested)if(!pilot.has(url))throw new RangeError('Unreviewed/non-pilot numeric URL cannot be published: '+url);
 return {publishedUrls:requested,reason:'explicit-per-url-numeric-approval'};
}
