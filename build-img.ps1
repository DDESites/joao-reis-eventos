# Gera imagens de galeria (placeholder SVG) para o site da João Reis Eventos
$dir = 'C:\Users\Bruno\Desktop\joao-reis-eventos\img'

$imagens = @(
  @{ arquivo = 'galeria-1.svg'; cat = 'mesas'; rotulo = 'Mesas montadas'; cena = 'mesas' },
  @{ arquivo = 'galeria-2.svg'; cat = 'mesas'; rotulo = 'Cadeiras';       cena = 'cadeiras' },
  @{ arquivo = 'galeria-3.svg'; cat = 'camas';  rotulo = 'Cama elastica'; cena = 'camas' },
  @{ arquivo = 'galeria-4.svg'; cat = 'eventos';rotulo = 'Aniversario';   cena = 'festa' },
  @{ arquivo = 'galeria-5.svg'; cat = 'eventos';rotulo = 'Casamento';     cena = 'mesas' },
  @{ arquivo = 'galeria-6.svg'; cat = 'camas';  rotulo = 'Area infantil'; cena = 'camas' }
)

function Cena-Mesas {
  param($rotulo)
  return @"
  <ellipse cx="260" cy="300" rx="130" ry="30" fill="#f4f4f6"/>
  <path d="M130 300 L150 420 h220 L390 300 Z" fill="#e2e2e7"/>
  <rect x="252" y="330" width="14" height="100" fill="#8f8f99"/>
  <ellipse cx="259" cy="432" rx="44" ry="10" fill="#8f8f99"/>
  <rect x="248" y="262" width="16" height="30" rx="6" fill="#ffd21f"/>
  <circle cx="256" cy="250" r="12" fill="#fff" opacity="0.9"/>
  <g fill="#2e2e36" stroke="#3d3d46" stroke-width="3">
    <g transform="translate(430 300)"><rect y="-64" width="52" height="56" rx="10"/><rect x="-5" y="-8" width="62" height="12" rx="6"/><rect width="8" height="42"/><rect x="44" width="8" height="42"/></g>
    <g transform="translate(520 330)"><rect y="-64" width="52" height="56" rx="10"/><rect x="-5" y="-8" width="62" height="12" rx="6"/><rect width="8" height="42"/><rect x="44" width="8" height="42"/></g>
  </g>
  <path d="M90 480 q260 30 520 -6" stroke="#ffd21f" stroke-width="9" fill="none" stroke-linecap="round" opacity="0.8"/>
  <text x="400" y="120" text-anchor="middle" font-family="Archivo, Arial, sans-serif" font-weight="800" font-size="30" fill="#ffd21f" opacity="0.9">$rotulo</text>
"@
}

function Cena-Cadeiras {
  param($rotulo)
  $cadeiras = ''
  $posicoes = @( @(140,240), @(320,240), @(500,240), @(230,360), @(410,360) )
  foreach ($p in $posicoes) {
    $cadeiras += "`n  <g transform=`"translate($($p[0]) $($p[1]))`" fill=`"#2e2e36`" stroke=`"#3d3d46`" stroke-width=`"3`">"
    $cadeiras += "<rect width=`"90`" height=`"110`" rx=`"14`"/><rect x=`"-8`" y=`"104`" width=`"106`" height=`"16`" rx=`"8`"/>"
    $cadeiras += "<rect x=`"4`" y=`"120`" width=`"10`" height=`"60`"/><rect x=`"76`" y=`"120`" width=`"10`" height=`"60`"/></g>"
  }
  return @"
$cadeiras
  <path d="M100 560 q300 26 600 -8" stroke="#ffd21f" stroke-width="9" fill="none" stroke-linecap="round" opacity="0.8"/>
  <text x="400" y="140" text-anchor="middle" font-family="Archivo, Arial, sans-serif" font-weight="800" font-size="30" fill="#ffd21f" opacity="0.9">$rotulo</text>
"@
}

function Cena-Camas {
  param($rotulo)
  return @"
  <path d="M150 300 a250 100 0 0 1 500 0" fill="none" stroke="#ffd21f" stroke-width="24" stroke-linecap="round"/>
  <path d="M162 314 a238 88 0 0 1 476 0" fill="none" stroke="#25d366" stroke-width="9" opacity="0.75"/>
  <g stroke="#3d3d46" stroke-width="11" stroke-linecap="round">
    <line x1="196" y1="326" x2="176" y2="430"/>
    <line x1="604" y1="326" x2="624" y2="430"/>
    <line x1="330" y1="384" x2="324" y2="440"/>
    <line x1="470" y1="384" x2="476" y2="440"/>
  </g>
  <circle cx="400" cy="180" r="20" fill="#ffd21f"/>
  <rect x="386" y="200" width="28" height="40" rx="13" fill="#f4f4f6"/>
  <rect y="440" width="800" height="160" fill="#0d0d0f"/>
  <path d="M150 440 h500" stroke="#ffd21f" stroke-width="4" opacity="0.4"/>
  <text x="400" y="120" text-anchor="middle" font-family="Archivo, Arial, sans-serif" font-weight="800" font-size="30" fill="#ffd21f" opacity="0.9">$rotulo</text>
"@
}

function Cena-Festa {
  param($rotulo)
  return @"
  <path d="M0 120 Q200 200 400 130 T800 120" stroke="#3a3a42" stroke-width="3" fill="none"/>
  <g fill="#ffd21f"><circle cx="100" cy="152" r="7"/><circle cx="250" cy="172" r="7"/><circle cx="400" cy="133" r="7"/><circle cx="550" cy="140" r="7"/><circle cx="700" cy="127" r="7"/></g>
  <ellipse cx="240" cy="320" rx="24" ry="32" fill="#ffd21f"/>
  <path d="M240 352 q-6 26 4 50" stroke="#3d3d46" stroke-width="3" fill="none"/>
  <ellipse cx="320" cy="360" rx="20" ry="27" fill="#f4f4f6" opacity="0.85"/>
  <path d="M320 387 q6 22 -2 42" stroke="#3d3d46" stroke-width="3" fill="none"/>
  <ellipse cx="170" cy="372" rx="19" ry="25" fill="#25d366" opacity="0.8"/>
  <path d="M170 397 q-5 20 3 38" stroke="#3d3d46" stroke-width="3" fill="none"/>
  <rect x="480" y="240" width="220" height="130" rx="12" fill="#2e2e36" stroke="#3d3d46" stroke-width="3"/>
  <text x="590" y="318" text-anchor="middle" font-family="Archivo, Arial, sans-serif" font-weight="800" font-size="42" fill="#ffd21f">FESTA</text>
  <path d="M120 520 q280 34 560 -8" stroke="#ffd21f" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.85"/>
  <text x="400" y="596" text-anchor="middle" font-family="Archivo, Arial, sans-serif" font-weight="800" font-size="28" fill="#ffd21f" opacity="0.9">$rotulo</text>
"@
}

foreach ($img in $imagens) {
  switch ($img.cena) {
    'mesas'     { $corpo = Cena-Mesas -rotulo $img.rotulo }
    'cadeiras'  { $corpo = Cena-Cadeiras -rotulo $img.rotulo }
    'camas'     { $corpo = Cena-Camas -rotulo $img.rotulo }
    'festa'     { $corpo = Cena-Festa -rotulo $img.rotulo }
  }

  $svg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="$($img.rotulo)">
  <defs>
    <linearGradient id="fundo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#26262c"/>
      <stop offset="1" stop-color="#131316"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#fundo)"/>
  <circle cx="400" cy="300" r="250" fill="#ffd21f" opacity="0.05"/>
$corpo
</svg>
"@

  Set-Content -Path (Join-Path $dir $img.arquivo) -Value $svg -Encoding utf8
  Write-Host "Gerado: $($img.arquivo)"
}

Write-Host 'Pronto.'
