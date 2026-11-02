/**
 * Public indexing is an explicit release action, not a side effect of SITE_URL.
 * Cloudflare's generated *.pages.dev names and non-main branch deployments
 * always remain unindexable, even when production variables are inherited.
 *
 * This does not verify DNS or the domain's connection to Cloudflare:
 * the publisher must do that before entering the approval variables.
 */
export function resolveSitePublication({
  siteUrl='',approvedHost='',approval='',pagesBranch=''
}={}){
  const raw=String(siteUrl??'').trim();
  const origin=raw.replace(/\/+$/,'');
  if(origin&&!/^https:\/\/[^/?#]+$/.test(origin))
    throw new RangeError('SITE_URL must be a bare HTTPS origin without a path, port, query or fragment.');
  let host='';
  if(origin){
    const url=new URL(origin);
    if(url.username||url.password||url.port||url.hostname!==url.hostname.toLowerCase())
      throw new RangeError('SITE_URL must not contain credentials, a non-default port or a mixed-case hostname.');
    host=url.hostname.toLowerCase();
  }
  const previewHost=host==='pages.dev'||host.endsWith('.pages.dev');
  const approved=String(approvedHost??'').trim().toLowerCase();
  const token=String(approval??'').trim();
  const branch=String(pagesBranch??'').trim();
  const allowedToken='I_APPROVE_PUBLIC_INDEXING';
  if(token&&token!==allowedToken)
    throw new RangeError('SEO_INDEX_APPROVED requires the exact I_APPROVE_PUBLIC_INDEXING confirmation.');
  if(token&&(!origin||previewHost))
    throw new RangeError('Public indexing cannot be approved without a real HTTPS custom domain.');
  if(token&&approved!==host)
    throw new RangeError('SEO_PUBLIC_HOST must exactly match the SITE_URL hostname.');
  if(approved&& !token)
    throw new RangeError('SEO_PUBLIC_HOST needs explicit SEO_INDEX_APPROVED approval.');
  const isBranchPreview=Boolean(branch&&branch!=='main');
  const isProduction=Boolean(origin&&!previewHost&&approved===host&&token===allowedToken&&!isBranchPreview);
  return {isProduction,site:isProduction?origin:null,
    configuredOrigin:origin||null,configuredHost:host||null,
    launchApproved:Boolean(approved===host&&token===allowedToken),
    reason:isProduction?'approved-custom-domain':isBranchPreview?'cloudflare-branch-preview':previewHost?'pages-dev-preview':!origin?'missing-site-url':'awaiting-public-indexing-approval'};
}
