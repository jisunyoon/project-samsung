
if($('.slides').length >= 1){
	
	//Main_Slides
	var mainSlide = $('.slides').bxSlider({
		controls:false,
		pager:true,
		pagerSelector:'.slider .pager',
		auto:true,
		pause:30000
	});


	//innovation counter number animation
	var counterUl = $('.counter_list');
	var counterOST = $('.counter_list').offset().top -700;
	var counterNum = $('.counter_list li p > span');
	//console.log(counterOST);
	$(window).scroll(function(){
		if($(this).scrollTop() >= counterOST){
			if(!counterUl.hasClass('active')){
				counterAni();
			}
		}
	});

function counterAni(){
	counterNum.each(function(){
		var targetNum = $(this).attr('data-count');
		var item = $(this);
		$({counters:0}).animate({counters:targetNum},{
			duration:900,
			progress:function(){
				var now = this.counters;
				console.log(now);
				item.text(Math.floor(now));
			}
		});
	});
	counterUl.addClass('active');
}

//go to top
var topBtn = $('.back_to_top');

$(window).scroll(function(){
	if($(this).scrollTop() > 1500){
		topBtn.fadeIn();
	}else{
		topBtn.fadeOut();
	}
});

topBtn.click(function(e){
	e.preventDefault();
	$('html,body').animate({scrollTop:0},600);
});

//services slides
var servIcon = $('.service_list li');
var servSlides = $('section .services_Ul');
var servSlide = $('section .services_Ul > div');
var currentIdx= 0;

servSlide.each(function(i){
	$(this).css({left:i*100 + '%'});
});

servIcon.click(function(e){
	e.preventDefault();

	var target = $(this);
	var i = target.index();

	servSlides.eq(i);
	servSlides.stop().animate({left:i*-100 + '%'},500);
});

//popup
var popup = $('.popup');
var checkbox = $('#popup');
var popupClose = $('.popup .close');

//쿠키생성
function setCookie(name, value, day){
	var date = new Date();
	date.setDate(date.getDate() + day);

	var mycookie = '';
	mycookie += name + '=' + value + ';';
	mycookie += 'Expires=' + date.toUTCString();
	document.cookie = mycookie;

}
// setCookie('samsungcorp','main',1); 쿠키생성은 닫기 버튼 누르면 



//쿠키 삭제
function delCookie(name){
	var date = new Date();
	date.setDate(date.getDate() -1);

	var setCookie = '';
	setCookie += name + '=main;';
	setCookie += 'Expires=' + date.toUTCString();
	document.cookie = setCookie;

}//delcookie


//쿠키확인
function getCookie(name){
	var cookies = document.cookie.split(';');
	console.log(cookies);
	var visited = false; 

	for(var c in cookies){
		if(cookies[c].indexOf(name) > -1){
			visited = true;
			console.log(visited);
		}
	}
	
	if(visited){
		popup.hide();
	}else{
		popup.show();
	}
	
}
getCookie('samsungcorp');


popupClose.click(function(){
	if(checkbox.prop('checked')){
		setCookie('samsungcorp','main',1);
		popup.hide();
	}else{
		popup.hide();
		delCookie('samsungcorp');
	}
});
}//////////////////////////////////index.page////////////////////////////////////



//HEADER 고정
var header = $('header');
var headerOST = header.offset().top;

$(window).scroll(function(){
	if($(this).scrollTop() > headerOST){
		header.addClass('fixed');
	}else{
		header.removeClass('fixed');
	}
});


$(window).resize(function() { 
	var headerMenu = $('header');
	var nav = $('nav .main-menu');
	var subMenu = $('nav ul ul');
	var subHgt = 0;
	var headerHgt = headerMenu.outerHeight();

	if($(window).width() >= 1465) { 
		
		subMenu.each(function(){
			if($(this).outerHeight() > subHgt){
				subHgt = $(this).outerHeight();
			}
		});
		var totalHgt = headerHgt + subHgt;

		nav.mouseover(function(){
			headerMenu.css({height:totalHgt + 'px'});
		});
		nav.mouseout(function(){
			headerMenu.css({height:headerHgt + 'px'});
		});

	}else{
		var totalHgt = headerHgt + subHgt;
		nav.mouseover(function(){
			headerMenu.css({height:totalHgt + 'px'});
		});
		nav.mouseout(function(){
			headerMenu.css({height:headerHgt + 'px'});
		});
	}
});

$(window).trigger('resize');

//반응형 메뉴
var menuToggleBtn = $('.menu_toggle'),
mobileMenu = $('.main-menu');

menuToggleBtn.click(function(e){
	e.preventDefault();
	$(this).toggleClass('active');
	mobileMenu.toggleClass('active');

});



//Recruit pagination
var rowsperPage = 5,
	  rows = $('.recruit_table tbody tr'),
	  rowsCount = rows.length,
	  pageCount = Math.ceil(rowsCount/rowsperPage);


for(var i = 1; i <= pageCount; i++){
	$('.numbers').append('<li><a href="">' +i+ '</a></li>');
}

function displayRows(idx){
	var start = idx*rowsperPage - rowsperPage;
	var end = start + rowsperPage;
	
	rows.hide();
	rows.slice(start, end).show();
}
displayRows(1);

$('.numbers li a').click(function(e){
    e.preventDefault();
    var targetNum = $(this).text();
    displayRows(targetNum);
});

//project mixitup
if($('.mix-wrapper').length > 0){
	var mixer = mixitup ('.mix-wrapper',{
		"animation": {
			"duration": 800,
			"easing": 'ease-in-out',
		}
	  });
}


//business svg circle animation
var points = $('.main_point_flex');
if($(points).length > 0){
	var pointOST = points.offset().top;
	
	
	$(window).scroll(function(){
		if($(this).scrollTop() >= pointOST -400){
			points.addClass('active');
		}
	});
}


//faq 더보기 버튼
var faqContainer = $('.question');
var faqBtn = $('.faq > .faqBtn');
var addItemCount = 8; // 클릭할 때 한번에 추가할 리스트 수
var added = 0; //클릭해서 화면에 표시된 리스트 수 확인(지금 몇개가 로드됐는지 확인할 것 처음에는 0)
var allData = []; //json 파일에 있는 데이터 모두


$.getJSON('data/content.json', initGallery);

function initGallery(data){
	allData = data;
	console.log(allData);

	addItems();

	//faq accordian
	var faq = $('.faq_question');


	faq.click(function(){
		$(this).find('div:last-child').slideToggle();
		$(this).siblings('div').find('div:last-child').slideUp();
		$(this).toggleClass('active');
		$(this).siblings().removeClass('active');
	});

}//initGallery

	faqBtn.click(function(){
		addItems();
	});

function addItems(){
	var itemHTML = '';
	var slicedData = allData.slice(added, added + addItemCount);
	console.log(slicedData);

	$.each(slicedData,function(i,item){
	/*
	<div class="faq_question">
		<div class="faq_head">
		   <span>Q</span> 지원서 접수 마감일 이후에 취득한 어학 성적도 인정이 되나요?
			<i class="fas fa-sort-up"></i>
		</div>
		<div class="faq_body">
			<p>
				지원서 접수 마감일 기준으로 2년간 성적을 인정합니다. 접수 마감일 이후에 취득할 예정인 어학 성적은 인정되지 않습니다.
			</p>
		</div>
	</div>
	*/
		itemHTML = itemHTML + 
		'<div class="faq_question">' +
			'<div class="faq_head">'+
				'<span>Q</span>' + item.faq.question +
				'<i class="' + item.faq.icon+'"></i>' +
			'</div>'+
			'<div class="faq_body">'+
				'<p>'+
					item.answer +
				'</p>'+
			'</div>'+
		'</div>';

	});
	console.log(itemHTML);

	added = added + addItemCount;

	faqContainer.append(itemHTML);
	console.log(added);

}


