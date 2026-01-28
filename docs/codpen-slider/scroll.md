  <div id="main-wrap" class="outer-wrap">
    <div class="cool-scrollbar sb-default" id="scrollbar-default">
      <div class="set-height"></div>
    </div>

    <div class="cool-scrollbar sb-1" id="scrollbar-1">
      <div class="set-height"></div>
    </div>

    <div class="cool-scrollbar sb-2" id="scrollbar-2">
      <div class="set-height"></div>
    </div>

    <div class="cool-scrollbar sb-3" id="scrollbar-3">
      <div class="set-height"></div>
    </div>

    <div class="cool-scrollbar sb-4" id="scrollbar-4">
      <div class="set-height"></div>
    </div>

    <div class="cool-scrollbar sb-5" id="scrollbar-5">
      <div class="set-height"></div>
    </div>

    <div class="cool-scrollbar sb-6" id="scrollbar-6">
      <div class="set-height"></div>
    </div>

    <div class="cool-scrollbar sb-7" id="scrollbar-7">
      <div class="set-height"></div>
    </div>

    <div class="cool-scrollbar sb-8" id="scrollbar-8">
      <div class="set-height"></div>
    </div>

    <div class="cool-scrollbar sb-9" id="scrollbar-9">
      <div class="set-height"></div>
    </div>

    <div class="cool-scrollbar sb-10" id="scrollbar-10">
      <div class="set-height"></div>
    </div>

    <div class="cool-scrollbar sb-11" id="scrollbar-11">
      <div class="set-height"></div>
    </div>

    <div class="cool-scrollbar sb-12" id="style-12">
      <div class="set-height"></div>
    </div>

    <div class="cool-scrollbar sb-13 " id="scrollbar-13">
      <div class="set-height"></div>
    </div>

    <div class="cool-scrollbar sb-14" id="scrollbar-14">
      <div class="set-height"></div>
    </div>
    
     <div class="cool-scrollbar sb-15 " id="scrollbar-13">
      <div class="set-height"></div>
    </div>

    <div class="cool-scrollbar sb-16" id="scrollbar-14">
      <div class="set-height"></div>
    </div>

    .outer-wrap
{
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
	width: 100%;
  max-width:100%;
  padding: 50px;
	margin: auto;
  box-sizing:border-box;
}

.set-height
{
	min-height: 450px;
}

.cool-scrollbar
{
  display: flex;
  margin: 2%;
	height: 300px;
  flex-basis:7%;
  justify-content: center;
	overflow-y: scroll;
}


/*
 *  STYLE 1
 */

.sb-1::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

.sb-1::-webkit-scrollbar
{
	width: 12px;
	background-color: #F5F5F5;
}

.sb-1::-webkit-scrollbar-thumb
{
	border-radius: 10px;
/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#feccb1+0,f17432+50,ea5507+51,fb955e+100;Red+Gloss+%232 */
background: #feccb1; /* Old browsers */
background: -moz-linear-gradient(left,  #feccb1 0%, #f17432 50%, #ea5507 51%, #fb955e 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(left,  #feccb1 0%,#f17432 50%,#ea5507 51%,#fb955e 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to right,  #feccb1 0%,#f17432 50%,#ea5507 51%,#fb955e 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#feccb1', endColorstr='#fb955e',GradientType=1 ); /* IE6-9 */


}

/*
 *  STYLE 2
 */

.sb-2::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

.sb-2::-webkit-scrollbar
{
	width: 12px;
	background-color: #F5F5F5;
}

.sb-2::-webkit-scrollbar-thumb
{
	border-radius: 10px;
/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#4c4c4c+0,595959+12,666666+25,474747+39,2c2c2c+50,000000+51,111111+60,2b2b2b+76,1c1c1c+91,131313+100;Black+Gloss+%231 */
background: #4c4c4c; /* Old browsers */
background: -moz-linear-gradient(left,  #4c4c4c 0%, #595959 12%, #666666 25%, #474747 39%, #2c2c2c 50%, #000000 51%, #111111 60%, #2b2b2b 76%, #1c1c1c 91%, #131313 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(left,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to right,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4c4c4c', endColorstr='#131313',GradientType=1 ); /* IE6-9 */

}

/*
 *  STYLE 3
 */

.sb-3::-webkit-scrollbar-track
{
  background-color: #00000014;
  border-radius: 50px;
  box-shadow: 0 0 0px 18px inset white;
}

.sb-3::-webkit-scrollbar
{
  width: 50px;
  min-width: 8px;
  border-radius: 50px;
  background-color: black;
  background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgba(255,0,0,1)), color-stop(100%, rgba(0,0,0,1)));
    background: -webkit-radial-gradient(center, ellipse cover, rgba(0,0,0,1) 33%, rgba(255,0,0,1) 100%);
    background: -o-radial-gradient(center, ellipse cover, rgba(0,0,0,1) 33%, rgba(255,0,0,1) 100%);
    background: -ms-radial-gradient(center, ellipse cover, rgba(0,0,0,1) 33%, rgba(255,0,0,1) 100%);
    background: radial-gradient(ellipse at center, rgba(0,0,0,1) 33%, rgba(255,0,0,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0000', endColorstr='#000000',GradientType=1 );
}

.sb-3::-webkit-scrollbar-thumb
{
    background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgba(255,0,0,1)), color-stop(100%, rgba(0,0,0,1)));
    background: -webkit-radial-gradient(center, ellipse cover, rgba(255,0,0,1) 0%, rgba(0,0,0,1) 100%);
    background: -o-radial-gradient(center, ellipse cover, rgba(255,0,0,1) 0%, rgba(0,0,0,1) 100%);
    background: -ms-radial-gradient(center, ellipse cover, rgba(255,0,0,1) 0%, rgba(0,0,0,1) 100%);
    background: radial-gradient(ellipse at center, rgba(255,0,0,1) 0%, rgba(0,0,0,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0000', endColorstr='#000000',GradientType=1 );
    border-radius: 50px;

}

/*
 *  STYLE 4
 */

.sb-4::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
	background-color: #F5F5F5;
}

.sb-4::-webkit-scrollbar
{
	width: 14px;
	background-color: #F5F5F5;
}

.sb-4::-webkit-scrollbar-thumb
{
  border-radius: 10px;
/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#cedbe9+0,aac5de+17,6199c7+27,3a84c3+51,419ad6+59,4bb8f0+71,3a8bc2+84,26558b+100 */
background: rgb(34,193,195);
background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
}

/*
 *  STYLE 5
 */

.sb-5::-webkit-scrollbar-track
{
  background-color: #00000014;
  border-radius: 50px;
  box-shadow: 0 0 11px 0px inset white;
}

.sb-5::-webkit-scrollbar
{
    width: 50px;
    min-width: 8px;
    background-color: black;
    border-radius: 50px;
}

.sb-5::-webkit-scrollbar-thumb
{
    background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgba(255,0,0,1)), color-stop(100%, rgba(0,0,0,1)));
    background: -webkit-radial-gradient(center, ellipse cover, rgba(255,0,0,1) 0%, rgba(0,0,0,1) 100%);
    background: -o-radial-gradient(center, ellipse cover, rgba(255,0,0,1) 0%, rgba(0,0,0,1) 100%);
    background: -ms-radial-gradient(center, ellipse cover, rgba(255,0,0,1) 0%, rgba(0,0,0,1) 100%);
    background: radial-gradient(ellipse at center, rgba(255,0,0,1) 0%, rgba(0,0,0,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0000', endColorstr='#000000',GradientType=1 );
    border-radius: 50px;
}


/*
 *  STYLE 6
 */

.sb-6::-webkit-scrollbar-track
{
  background-color: #2c2c2c;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 inset #ffffff;
  border: 1px solid #969494;
}

.sb-6::-webkit-scrollbar
{
    width: 50px;
    background-color: black;
    border-radius: 10px;
}

.sb-6::-webkit-scrollbar-thumb
{
background: linear-gradient(red, transparent), linear-gradient(to top left, lime, transparent), linear-gradient(to top right, blue, transparent);
    background-blend-mode: screen;
    box-shadow: 0 0 10px 0 inset #ffffff;
    border-radius: 10px;

}


/*
 *  STYLE 7
 */

.sb-7::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: white;
	border-radius: 10px;
}

.sb-7::-webkit-scrollbar
{
	width: 20px;
	background-color: transparent;
}

.sb-7::-webkit-scrollbar-thumb
{
	border-radius: 10px;
/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#f3c5bd+0,e86c57+50,ea2803+51,ff6600+75,c72200+100;Red+Gloss */
background: #f3c5bd; /* Old browsers */
background: -moz-linear-gradient(left,  #f3c5bd 0%, #e86c57 50%, #ea2803 51%, #ff6600 75%, #c72200 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(left,  #f3c5bd 0%,#e86c57 50%,#ea2803 51%,#ff6600 75%,#c72200 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to right,  #f3c5bd 0%,#e86c57 50%,#ea2803 51%,#ff6600 75%,#c72200 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f3c5bd', endColorstr='#c72200',GradientType=1 ); /* IE6-9 */

}

/*
 *  STYLE 8
 */

.sb-8::-webkit-scrollbar-track
{
/* 	border: 1px inset lightgray; */
	background-color: transparent;
  border-radius: 25%;
}

.sb-8::-webkit-scrollbar
{
	width: 10px;
	background-color: transparent;
  border-radius: 50%;
}

.sb-8::-webkit-scrollbar-thumb
{
  border-radius: 50%;	
	/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#e0f3fa+0,d8f0fc+50,b8e2f6+51,b6dffd+100;Shape+2+Style */
background: #e0f3fa; /* Old browsers */
background: -moz-linear-gradient(left,  #e0f3fa 0%, #d8f0fc 50%, #b8e2f6 51%, #b6dffd 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(left,  #e0f3fa 0%,#d8f0fc 50%,#b8e2f6 51%,#b6dffd 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to right,  #e0f3fa 0%,#d8f0fc 50%,#b8e2f6 51%,#b6dffd 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e0f3fa', endColorstr='#b6dffd',GradientType=1 ); /* IE6-9 */

}


/*
 *  STYLE 9
 */

.sb-9::-webkit-scrollbar-track
{
/* 	border: 1px inset lightgray; */
	background-color: white;
  border-radius: 50%;
  padding: 3px;
  box-shadow: inset 5px 5px 1px -3px lightgray
}

.sb-9::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
  border-radius: 50%;
}

.sb-9::-webkit-scrollbar-thumb
{
  border-radius: 50%;	
	/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#e0f3fa+0,d8f0fc+50,b8e2f6+51,b6dffd+100;Shape+2+Style */
background: #e0f3fa; /* Old browsers */
background: -moz-linear-gradient(left,  #e0f3fa 0%, #d8f0fc 50%, #b8e2f6 51%, #b6dffd 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(left,  #e0f3fa 0%,#d8f0fc 50%,#b8e2f6 51%,#b6dffd 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to right,  #e0f3fa 0%,#d8f0fc 50%,#b8e2f6 51%,#b6dffd 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e0f3fa', endColorstr='#b6dffd',GradientType=1 ); /* IE6-9 */

}


/*
 *  STYLE 10
 */

.sb-10::-webkit-scrollbar-track
{
  width: 1px;
  overflow: 
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #09325E;
	border-radius: 10px;
  box-shadow: inset 0 0 1px 4px white;
}

.sb-10::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

.sb-10::-webkit-scrollbar-thumb
{
  width: 10px;
	background-color: #AAA;
	border-radius: 10px;
/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#1e5799+20,2989d8+50,1e5799+80&0+0,0.8+15,1+19,1+81,0.8+85,0+100;Blue+Two+Sided+Transparent */
background: -moz-linear-gradient(left,  rgba(30,87,153,0) 0%, rgba(30,87,153,0.8) 15%, rgba(30,87,153,1) 19%, rgba(30,87,153,1) 20%, rgba(41,137,216,1) 50%, rgba(30,87,153,1) 80%, rgba(30,87,153,1) 81%, rgba(30,87,153,0.8) 85%, rgba(30,87,153,0) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(left,  rgba(30,87,153,0) 0%,rgba(30,87,153,0.8) 15%,rgba(30,87,153,1) 19%,rgba(30,87,153,1) 20%,rgba(41,137,216,1) 50%,rgba(30,87,153,1) 80%,rgba(30,87,153,1) 81%,rgba(30,87,153,0.8) 85%,rgba(30,87,153,0) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to right,  rgba(30,87,153,0) 0%,rgba(30,87,153,0.8) 15%,rgba(30,87,153,1) 19%,rgba(30,87,153,1) 20%,rgba(41,137,216,1) 50%,rgba(30,87,153,1) 80%,rgba(30,87,153,1) 81%,rgba(30,87,153,0.8) 85%,rgba(30,87,153,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#001e5799', endColorstr='#001e5799',GradientType=1 ); /* IE6-9 */

}


/*
 *  STYLE 11
 */

.sb-11::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: white;
	border-radius: 10px;
  vcccccccccccc
} 

.sb-11::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

.sb-11::-webkit-scrollbar-thumb
{
/*   border:1px outset lightgray; */
  box-shadow: 1px 1px 7px -1px rgba(0, 0, 0, 0.5);
	background-color: #3366FF;
	border-radius: 10px;
/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#fefefe+0,d1d1d1+49,dbdbdb+50,e2e2e2+100 */
background: rgb(254,254,254); /* Old browsers */
background: -moz-linear-gradient(left,  rgba(254,254,254,1) 0%, rgba(209,209,209,1) 49%, rgba(219,219,219,1) 50%, rgba(226,226,226,1) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(left,  rgba(254,254,254,1) 0%,rgba(209,209,209,1) 49%,rgba(219,219,219,1) 50%,rgba(226,226,226,1) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to right,  rgba(254,254,254,1) 0%,rgba(209,209,209,1) 49%,rgba(219,219,219,1) 50%,rgba(226,226,226,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fefefe', endColorstr='#e2e2e2',GradientType=1 ); /* IE6-9 */

}

/*
 *  STYLE 12
 */

.sb-12::-webkit-scrollbar-track
{
  width: 1px;
  overflow: 
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: darkgray;
	border-radius: 10px;
  box-shadow: inset 0 0 1px 4px white;
}

.sb-12::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

.sb-12::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#000000+20,d6d6d6+50,000000+80&0+10,0.8+15,1+19,1+81,0.8+85,0+90 */
background: -moz-linear-gradient(left,  rgba(0,0,0,0) 10%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,1) 19%, rgba(0,0,0,1) 20%, rgba(214,214,214,1) 50%, rgba(0,0,0,1) 80%, rgba(0,0,0,1) 81%, rgba(0,0,0,0.8) 85%, rgba(0,0,0,0) 90%); /* FF3.6-15 */
background: -webkit-linear-gradient(left,  rgba(0,0,0,0) 10%,rgba(0,0,0,0.8) 15%,rgba(0,0,0,1) 19%,rgba(0,0,0,1) 20%,rgba(214,214,214,1) 50%,rgba(0,0,0,1) 80%,rgba(0,0,0,1) 81%,rgba(0,0,0,0.8) 85%,rgba(0,0,0,0) 90%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to right,  rgba(0,0,0,0) 10%,rgba(0,0,0,0.8) 15%,rgba(0,0,0,1) 19%,rgba(0,0,0,1) 20%,rgba(214,214,214,1) 50%,rgba(0,0,0,1) 80%,rgba(0,0,0,1) 81%,rgba(0,0,0,0.8) 85%,rgba(0,0,0,0) 90%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#00000000',GradientType=1 ); /* IE6-9 */

}

/*
 *  STYLE 13
 */

.sb-13::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.9);
	border-radius: 10px;
	background-color: #CCCCCC;
}

.sb-13::-webkit-scrollbar
{
	width: 12px;
	background-color: #F5F5F5;
}

.sb-13::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	background-color: #D62929;
	background-image: -webkit-linear-gradient(90deg,
											  transparent,
											  rgba(0, 0, 0, 0.4) 50%,
											  transparent,
											  transparent)
}

/*
 *  STYLE 14
 */

.sb-14::-webkit-scrollbar-track
{
/* 	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.6); */
	background-color: white;
}

.sb-14::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}

.sb-14::-webkit-scrollbar-thumb
{
	background-color: #FFF;
  border-radius: 50px;
	background-image: -webkit-linear-gradient(90deg,
	                                          rgba(0, 0, 0, 1) 0%,
											  rgba(0, 0, 0, 0.5) 10%,
											  transparent 100%,
											  rgba(0, 0, 0, 0.5) 50%,
											  transparent)
}

/*
 *  STYLE 15
 */

.sb-15::-webkit-scrollbar-track
{
  border-radius: 50px;
  border: none;
/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#f6f8f9+0,e5ebee+50,d7dee3+51,f5f7f9+100;White+Gloss */
background: rgb(246,248,249); /* Old browsers */
background: -moz-linear-gradient(top,  rgba(246,248,249,1) 0%, rgba(229,235,238,1) 50%, rgba(215,222,227,1) 51%, rgba(245,247,249,1) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top,  rgba(246,248,249,1) 0%,rgba(229,235,238,1) 50%,rgba(215,222,227,1) 51%,rgba(245,247,249,1) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom,  rgba(246,248,249,1) 0%,rgba(229,235,238,1) 50%,rgba(215,222,227,1) 51%,rgba(245,247,249,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f6f8f9', endColorstr='#f5f7f9',GradientType=0 ); /* IE6-9 */



	border-radius: 50px;
}

.sb-15::-webkit-scrollbar
{
	width: 20px;
  border-radius: 50px;
	background-color: #F5F5F5;
}

.sb-15::-webkit-scrollbar-thumb
{
	border-radius: 50px;
  width: 20px;
  margin: 5px;
  box-shadow: 0 0 20px 0 inset white;
/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#a9e4f7+0,0fb4e7+100;Ble+3D+%235 */
background: rgb(169,228,247); /* Old browsers */
background: -moz-linear-gradient(top,  rgba(169,228,247,1) 0%, rgba(15,180,231,1) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top,  rgba(169,228,247,1) 0%,rgba(15,180,231,1) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom,  rgba(169,228,247,1) 0%,rgba(15,180,231,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a9e4f7', endColorstr='#0fb4e7',GradientType=0 ); /* IE6-9 */

}


/*
 *  STYLE 16
 */
.sb-16::-webkit-scrollbar-track
{
  border-radius: 50px;
  border: none;
/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#f6f8f9+0,e5ebee+50,d7dee3+51,f5f7f9+100;White+Gloss */
background: rgb(246,248,249); /* Old browsers */
background: -moz-linear-gradient(top,  rgba(246,248,249,1) 0%, rgba(229,235,238,1) 50%, rgba(215,222,227,1) 51%, rgba(245,247,249,1) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top,  rgba(246,248,249,1) 0%,rgba(229,235,238,1) 50%,rgba(215,222,227,1) 51%,rgba(245,247,249,1) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom,  rgba(246,248,249,1) 0%,rgba(229,235,238,1) 50%,rgba(215,222,227,1) 51%,rgba(245,247,249,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f6f8f9', endColorstr='#f5f7f9',GradientType=0 ); /* IE6-9 */



	border-radius: 50px;
}

.sb-16::-webkit-scrollbar
{
	width: 20px;
  border-radius: 50px;
	background-color: #F5F5F5;
}

.sb-16::-webkit-scrollbar-thumb
{
	border-radius: 50px;
  width: 20px;
/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#a9e4f7+0,0fb4e7+50,a9e4f7+100&0+0,1+50,0+100 */
background: -moz-linear-gradient(top,  rgba(169,228,247,0) 0%, rgba(15,180,231,1) 50%, rgba(169,228,247,0) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top,  rgba(169,228,247,0) 0%,rgba(15,180,231,1) 50%,rgba(169,228,247,0) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom,  rgba(169,228,247,0) 0%,rgba(15,180,231,1) 50%,rgba(169,228,247,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00a9e4f7', endColorstr='#00a9e4f7',GradientType=0 ); /* IE6-9 */


}