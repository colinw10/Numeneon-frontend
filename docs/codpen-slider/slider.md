- [21, 74, 57, 71, 41].forEach(c => {
	input(type='range' value=c style=`--val: ${c}`)
- })

@use 'sass:math';

$theme-u: .375em;
$theme-g: 
	repeating-conic-gradient(
			hsla(0, 0%, 0%, .235) 0% 25%, 
			transparent 0% 50%)
		0 0/ #{$theme-u $theme-u};

@function tstar($n: 10, $d: 3px) {
	$m: 2*$n;
	$ba: 360deg/$m;
	$vx: ();
	
	@for $i from 0 to $m {
		$ca: $i*$ba;
		$x: 50%*(1 + math.cos($ca));
		$y: 50%*(1 + math.sin($ca));
		
		@if $i%2 == 0 {
			$x: calc(50% + (50% - #{$d})*#{math.cos($ca)});
			$y: calc(50% + (50% - #{$d})*#{math.sin($ca)});
		}
		
		$vx: $vx, $x $y
	}
	
	@return $vx
}

@mixin track($f: 0) {
	margin: var(--input-p);
	height: var(--track-h);
	border-radius: var(--track-h);
	box-shadow: inset 0 0 0 2px #000;
	background: #000;
	
	@if $f > 0 {
		background: 
			var(--track-e), 
			$theme-g, 
			var(--track-g) 
				0/ calc(var(--js, 0)*var(--pos)) 100% 
				no-repeat #000
	}
}

@mixin thumb() {
	box-sizing: border-box;
	border: 
		solid var(--thumb-b, 2px) var(--thumb-c, transparent);
	width: var(--thumb-w, var(--thumb-h));
	height: var(--thumb-h);
	border-radius: var(--thumb-r, 50%);
	box-shadow: 0 -1px #000,
		inset 0 -1px #8a8a8a;
	background: 
		conic-gradient(#fefefe, #ebebeb, #989898 25%, 
				#808080 0%, #797979, #b3b3b3 50%, #bdbdbd 0%, 
				#d3d3d3, #989898, #d8d8d8, #fefefe) 
			padding-box, 
		linear-gradient(#f9f9f9, #8d8d8c) border-box;
	clip-path: var(--thumb-p, inset(0));
	cursor: ew-resize
}

html, body { display: grid }

html { height: 100% }

.js { --js: 1 }

body {
	--input-w: min(100vw - 1.25em, 23em);
	grid-gap: 2.5em;
	place-content: center;
	background: 
		radial-gradient(at 50% 0, 
				transparent, #080808), 
		$theme-g #3b3b3b
}

input[type='range'] {
	&, &::-webkit-slider-runnable-track, 
  &::-webkit-slider-thumb { -webkit-appearance: none }
	
	--min: 0;
	--max: 100;
	--rng: calc(var(--max) - var(--min));
	--pos: calc((var(--val) - var(--min))/var(--rng)*100%);
	--input-p: .5em;
	--input-h: 
		calc(var(--track-h) + 2*var(--input-p));
	--track-w: 
		calc(var(--input-w) - 2*var(--input-p));
	--track-h: .875em;
	--track-r: calc(.5*var(--track-h));
	--track-e: 
		radial-gradient(circle farthest-side at 100%, 
				transparent calc(100% - 2px), #000 calc(100% - 1px)) 
			0/ var(--track-r) no-repeat;
	--track-c1: #e34f1e;
	--track-g: 
		linear-gradient(90deg, 
				var(--track-c0, #dcb004), var(--track-c1));
	--thumb-h: 1.75em;
	outline-offset: .75em;
	width: var(--input-w);
	height: var(--input-h);
	border-radius: var(--input-h);
	box-shadow: 
		0 1px 1px hsla(0, 0%, 100%, .1), 
		inset 0 1px 0 2px #0d0d0d;
	background: 
		linear-gradient(#0a0a0a, #111 15%, #272727, #1d1d1d);
	font: inherit;
	transition: .3s;
	cursor: pointer;
	
	&::-webkit-slider-container {
		-webkit-user-modify: read-write;
		@include track(1)
	}
	
	&::-webkit-slider-runnable-track {
		margin: 0 calc(-1*var(--input-p));
		height: var(--thumb-h);
		filter: 
			drop-shadow(0 4px 3px hsla(0, 0%, 0%, .9))
	}
	
	&::-moz-range-track { @include track }
	
	&::-moz-range-progress {
		height: var(--track-h);
		border: solid var(--input-p) transparent;
		border-right-width: 0;
		border-radius: var(--input-h) 0 0 var(--input-h);
		box-shadow: inset 0 0 0 2px #000;
		background: 
			var(--track-e), 
			$theme-g, 
			var(--track-g);
		background-clip: padding-box;
		mask: 
			radial-gradient(closest-side at var(--track-r), 
					red calc(100% - 1px), transparent), 
			linear-gradient(red 0 0) var(--track-r) no-repeat;
		mask-clip: padding-box;
		mask-size: calc(var(--track-w) - var(--track-h))
	}
	
	&::-webkit-slider-thumb { @include thumb }
	&::-moz-range-thumb { @include thumb }
	
	&:hover, &:focus { outline: solid 2px var(--track-c1) }
	
	&:nth-child(1) { --thumb-p: polygon(#{tstar()}) }
	
	&:nth-child(2) { 
		--track-c0: #0010d5;
		--track-c1: #00d1de
	}
	
	&:nth-child(3) {
		--thumb-r: 5px;
		--track-c0: #cc040d;
		--track-c1: #d44dbf
	}
	
	&:nth-child(4) {
		--thumb-w: 2em;
		--thumb-h: 1.125em;
		--thumb-r: var(--thumb-h);
		--track-c0: #08c300;
		--track-c1: #aaca00
	}
	
	&:nth-child(5) {
		--thumb-w: 1.25em;
		--thumb-h: 2em;
		--track-c0: #0f0f0f;
		--track-c1: #737373
	}
}

document.documentElement.classList.add('js');

addEventListener('input', e => {
	let _t = e.target;
	
	_t.style.setProperty('--val', +_t.value)
})