/** Pure deterministic conversion engine shared by build, browser, and tests. No external API. */
export const dimensions = {
 mass:{label:'Weight & mass', description:'Mass measures the amount of matter. US customary pounds and international kilograms are common.'},
 length:{label:'Length',description:'Length uses exact definitions for the international foot and inch.'},
 volume:{label:'Volume & cooking',description:'US customary volume measures are different from UK imperial measures. Fluid ounces measure volume, not mass.'},
 temperature:{label:'Temperature',description:'Temperature scales require an offset as well as a scale factor.'},
 pressure:{label:'Pressure',description:'Pressure is force per unit area. Bar, psi, kPa and atmospheres are not units of force.'},
 torque:{label:'Torque',description:'Torque is the turning effect of a force. Pound-force foot (ft·lbf) is distinct from mass pounds.'},
 time:{label:'Time',description:'Convert precise durations between milliseconds, seconds, minutes, hours and days.'},
 speed:{label:'Speed',description:'Speed represents distance traveled per unit time.'},
 area:{label:'Area',description:'Square units measure two-dimensional area, not linear length.'},
 force:{label:'Force',description:'Pound-force (lbf) is force and should not be confused with pound mass (lb).'},
 storage:{label:'Digital storage',description:'Decimal GB = 1,000 MB, whereas binary GiB = 1,024 MiB.'},
 density:{label:'Density',description:'Density relates mass to volume. Converting mass to volume additionally requires a known density.'},
 power:{label:'Power',description:'Power expresses the rate at which work is done.'},
 acceleration:{label:'Acceleration',description:'Acceleration is the rate of change of speed over time.'},
 fuel:{label:'Fuel economy',description:'US MPG and liters per 100 km are reciprocal measures; zero requires special handling.'},
 flow:{label:'Flow rate',description:'Volumetric flow is a volume passing per unit time.'}
};

// factor converts to the category's SI-like base. Exact SI definitions where applicable.
export const units = {
 kg:{name:'Kilograms',symbol:'kg',dimension:'mass',factor:1},
 lbs:{name:'Pounds',symbol:'lb',dimension:'mass',factor:0.45359237},
 g:{name:'Grams',symbol:'g',dimension:'mass',factor:0.001},
 oz:{name:'Ounces (mass)',symbol:'oz',dimension:'mass',factor:0.028349523125},
 mg:{name:'Milligrams',symbol:'mg',dimension:'mass',factor:1e-6},
 tonne:{name:'Metric tonnes',symbol:'t',dimension:'mass',factor:1000},
 m:{name:'Meters',symbol:'m',dimension:'length',factor:1},
 ft:{name:'Feet',symbol:'ft',dimension:'length',factor:0.3048},
 cm:{name:'Centimeters',symbol:'cm',dimension:'length',factor:0.01},
 in:{name:'Inches',symbol:'in',dimension:'length',factor:0.0254},
 mm:{name:'Millimeters',symbol:'mm',dimension:'length',factor:0.001},
 km:{name:'Kilometers',symbol:'km',dimension:'length',factor:1000},
 mi:{name:'Miles',symbol:'mi',dimension:'length',factor:1609.344},
 ml:{name:'Milliliters',symbol:'mL',dimension:'volume',factor:0.001},
 l:{name:'Liters',symbol:'L',dimension:'volume',factor:1},
 'us-fl-oz':{name:'US fluid ounces',symbol:'US fl oz',dimension:'volume',factor:3.785411784/128},
 'us-gal':{name:'US gallons',symbol:'US gal',dimension:'volume',factor:3.785411784},
 'imp-gal':{name:'Imperial gallons',symbol:'imp gal',dimension:'volume',factor:4.54609},
 'us-cup':{name:'US cups',symbol:'US cup',dimension:'volume',factor:3.785411784/16},
 'us-tbsp':{name:'US tablespoons',symbol:'US tbsp',dimension:'volume',factor:(3.785411784/128)/2},
 'us-tsp':{name:'US teaspoons',symbol:'US tsp',dimension:'volume',factor:(3.785411784/128)/6},
 celsius:{name:'Celsius',symbol:'°C',dimension:'temperature'},
 fahrenheit:{name:'Fahrenheit',symbol:'°F',dimension:'temperature'},
 kelvin:{name:'Kelvin',symbol:'K',dimension:'temperature'},
 bar:{name:'Bar',symbol:'bar',dimension:'pressure',factor:100000},
 psi:{name:'Pounds per square inch',symbol:'psi',dimension:'pressure',factor:6894.757293168},
 kpa:{name:'Kilopascals',symbol:'kPa',dimension:'pressure',factor:1000},
 atm:{name:'Standard atmospheres',symbol:'atm',dimension:'pressure',factor:101325},
 pa:{name:'Pascals',symbol:'Pa',dimension:'pressure',factor:1},
 'ft-lbf':{name:'Pound-force feet',symbol:'ft·lbf',dimension:'torque',factor:1.3558179483314004},
 nm:{name:'Newton-meters',symbol:'N·m',dimension:'torque',factor:1},
 minutes:{name:'Minutes',symbol:'min',dimension:'time',factor:60},
 seconds:{name:'Seconds',symbol:'s',dimension:'time',factor:1},
 milliseconds:{name:'Milliseconds',symbol:'ms',dimension:'time',factor:0.001},
 hours:{name:'Hours',symbol:'hr',dimension:'time',factor:3600},
 days:{name:'Days',symbol:'day',dimension:'time',factor:86400},
 kmh:{name:'Kilometers per hour',symbol:'km/h',dimension:'speed',factor:1/3.6},
 mph:{name:'Miles per hour',symbol:'mph',dimension:'speed',factor:0.44704},
 'm-s':{name:'Meters per second',symbol:'m/s',dimension:'speed',factor:1},
 knot:{name:'Knots',symbol:'kn',dimension:'speed',factor:1852/3600},
 m2:{name:'Square meters',symbol:'m²',dimension:'area',factor:1},
 ft2:{name:'Square feet',symbol:'ft²',dimension:'area',factor:0.09290304},
 'km2':{name:'Square kilometers',symbol:'km²',dimension:'area',factor:1e6},
 acres:{name:'Acres',symbol:'acre',dimension:'area',factor:4046.8564224},
 kn:{name:'Kilonewtons',symbol:'kN',dimension:'force',factor:1000},
 lbf:{name:'Pound-force',symbol:'lbf',dimension:'force',factor:4.4482216152605},
 newton:{name:'Newtons',symbol:'N',dimension:'force',factor:1},
 gb:{name:'Gigabytes (decimal)',symbol:'GB',dimension:'storage',factor:1e9},
 mb:{name:'Megabytes (decimal)',symbol:'MB',dimension:'storage',factor:1e6},
 gib:{name:'Gibibytes (binary)',symbol:'GiB',dimension:'storage',factor:1073741824},
 mib:{name:'Mebibytes (binary)',symbol:'MiB',dimension:'storage',factor:1048576},
 'kg-m3':{name:'Kilograms per cubic meter',symbol:'kg/m³',dimension:'density',factor:1},
 'g-cm3':{name:'Grams per cubic centimeter',symbol:'g/cm³',dimension:'density',factor:1000},
 kw:{name:'Kilowatts',symbol:'kW',dimension:'power',factor:1000},
 hp:{name:'Mechanical horsepower',symbol:'hp',dimension:'power',factor:745.6998715822702},
 ms2:{name:'Meters per second squared',symbol:'m/s²',dimension:'acceleration',factor:1},
 fts2:{name:'Feet per second squared',symbol:'ft/s²',dimension:'acceleration',factor:0.3048},
 'mpg-us':{name:'US miles per gallon',symbol:'US mpg',dimension:'fuel'},
 'l-100km':{name:'Liters per 100 km',symbol:'L/100 km',dimension:'fuel'},
 'l-min':{name:'Liters per minute',symbol:'L/min',dimension:'flow',factor:1},
 'm3-h':{name:'Cubic meters per hour',symbol:'m³/h',dimension:'flow',factor:1000/60}
};

export function validateValue(value){
  // Accept decimal/scientific measurements only. Number('0x10'), Number(true) and
  // Number([]) silently produce plausible but incorrect unit-conversion inputs.
  const decimal=/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;
  if(typeof value!=='number' && typeof value!=='string')throw new RangeError('Enter a valid number between −1e18 and 1e18.');
  const source=typeof value==='string'?value.trim():'';
  if(typeof value==='string'&&!decimal.test(source))throw new RangeError('Enter a valid number between −1e18 and 1e18.');
  const n=typeof value==='number'?value:Number(source);
  if(!Number.isFinite(n)||Math.abs(n)>1e18)throw new RangeError('Enter a valid number between −1e18 and 1e18.');
  return n;
}
function toBase(n,id){
  if(id==='celsius')return n+273.15;
  if(id==='fahrenheit')return (n-32)*5/9+273.15;
  if(id==='kelvin')return n;
  if(id==='mpg-us')return n*1.609344/3.785411784; // base km/L
  if(id==='l-100km')return 100/n;
  return n*units[id].factor;
}
function fromBase(n,id){
  if(id==='celsius')return n-273.15;
  if(id==='fahrenheit')return (n-273.15)*9/5+32;
  if(id==='kelvin')return n;
  if(id==='mpg-us')return n*3.785411784/1.609344;
  if(id==='l-100km')return 100/n;
  return n/units[id].factor;
}
export function convert(value,from,to){
 const n=validateValue(value),a=units[from],b=units[to];
 if(!a||!b)throw new RangeError('Unknown unit.');
 if(a.dimension!==b.dimension)throw new RangeError('Choose two units of the same physical dimension.');
 if(a.dimension==='fuel' && n<=0)throw new RangeError('Fuel economy must be greater than zero.');
 const result=fromBase(toBase(n,from),to);
 if(!Number.isFinite(result) || Math.abs(result)>1e24)throw new RangeError('Result is outside the supported numerical range.');
 // Temperature below 0 K is not physically valid for absolute thermodynamic temperature.
 if(a.dimension==='temperature' && toBase(n,from)<-1e-9)throw new RangeError('Temperature cannot be below absolute zero (0 K).');
 return result;
}
export function formatNumber(value,digits=6){
 const n=Number(value); if(!Number.isFinite(n)||Math.abs(n)>1e24) throw new RangeError('Result cannot be formatted safely.'); const d=Math.min(12,Math.max(0,Number(digits)||0));
 if(n!==0&&(Math.abs(n)<1e-6||Math.abs(n)>=1e13))return n.toExponential(Math.min(d,9)).replace(/\.?0+e/,'e');
 return new Intl.NumberFormat('en-US',{maximumFractionDigits:d,minimumFractionDigits:0,useGrouping:true}).format(n);
}
export function formula(from,to){
 const a=units[from],b=units[to];
 if(!a||!b)return '';
 if(from===to)return 'The value remains unchanged because both units are the same.';
 if(from==='celsius'&&to==='fahrenheit')return '°F = (°C × 9/5) + 32';
 if(from==='fahrenheit'&&to==='celsius')return '°C = (°F − 32) × 5/9';
 if(a.dimension==='temperature')return 'Convert through Kelvin: K = °C + 273.15 = (°F − 32) × 5/9 + 273.15.';
 if(a.dimension==='fuel')return 'L/100 km = 235.214583 ÷ US mpg (and vice versa).';
 const x=convert(1,from,to);
 // Prefer an exact division rule for recurring decimal factors (e.g. seconds/hour).
 const inverse=1/x,nearest=Math.round(inverse);
 if(inverse>=2 && inverse<=1e12 && Math.abs(inverse-nearest)<=1e-12*Math.max(1,Math.abs(inverse)))return `Divide ${a.symbol} by ${formatNumber(nearest,0)} to get ${b.symbol}.`;
 const displayed=formatNumber(x,9);
 const exact=Number(displayed.replaceAll(',',''))===x;
 return `Multiply ${a.symbol} by ${exact?'':'approximately '}${displayed} to get ${b.symbol}.`;
}
export function dimensionUnits(dim){return Object.entries(units).filter(([,u])=>u.dimension===dim).map(([id,u])=>({id,...u}));}
export function safeValueText(n){return String(n).replace(/,/g,'');}

// Parse a CSV first column without accidentally treating quoted thousands as two cells.
export function parseBatchFirstCell(line){
 const s=String(line).replace(/^\uFEFF/,'').trim();
 let cell;
 if(s.startsWith('"')){
  const match=/^"((?:[^"]|"")*)"(?:,|$)/.exec(s);
  if(!match)throw new RangeError('Malformed quoted CSV cell.');
  cell=match[1].replace(/""/g,'"').trim();
 }else cell=s.split(',')[0].trim();
 if(/^[+-]?\d{1,3}(,\d{3})+(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(cell))cell=cell.replaceAll(',','');
 return cell;
}


/** Pure CSV row selection: optional first-column header, malformed rows retained for per-row errors. */
export function parseBatchLines(input,maxRows=1000){
  const lines=String(input??'').split(/\r?\n/).filter(line=>line.trim());
  if(!lines.length)return [];
  let header=false;
  try{header=/^(?:value|input|amount|number)$/i.test(parseBatchFirstCell(lines[0]));}
  catch{ /* A malformed first CSV row must not crash the whole batch. */ }
  const data=header?lines.slice(1):lines;
  if(data.length>maxRows)throw new RangeError('Maximum '+maxRows+' data rows per batch.');
  return data;
}
