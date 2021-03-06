!function(){function getStyles(config){ return "<style>" + config.selector + "{width:90px;height:20px}" + config.selector + " [class*=entypo-]:before{font-family:entypo,sans-serif}" + config.selector + " label{font-size:16px;cursor:pointer;margin:0;padding:5px 10px;border-radius:5px;background:" + config.button_background + ";color:" + config.button_color + ";-webkit-transition:all .3s ease;transition:all .3s ease}" + config.selector + " label:hover{opacity:.8}" + config.selector + " label span{text-transform:uppercase;font-size:.85em;font-family:Lato,sans-serif;font-weight:900;-webkit-font-smoothing:antialiased;padding-left:6px}" + config.selector + " .social{-webkit-transform-origin:50% 0;-ms-transform-origin:50% 0;transform-origin:50% 0;-webkit-transform:scale(0) translateY(-190px);-ms-transform:scale(0) translateY(-190px);transform:scale(0) translateY(-190px);opacity:0;-webkit-transition:all .4s ease;transition:all .4s ease;margin-left:-15px}" + config.selector + " .social.active{opacity:1;-webkit-transform:scale(1) translateY(-90px);-ms-transform:scale(1) translateY(-90px);transform:scale(1) translateY(-90px);-webkit-transition:all .4s ease;transition:all .4s ease;margin-left:-45px}" + config.selector + " ul{position:relative;left:0;right:0;width:240px;height:46px;color:#fff;background:#3b5998;margin:auto;padding:0;list-style:none;border-radius:10px}" + config.selector + " ul li{font-size:20px;cursor:pointer;width:60px;margin:0;padding:12px 0;text-align:center;float:left;display:block;height:22px;position:relative;z-index:2;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-transition:all .3s ease;transition:all .3s ease}" + config.selector + " ul li:hover{color:rgba(0,0,0,.5)}" + config.selector + " ul:after{content:'';display:block;width:0;height:0;position:absolute;left:-60px;right:0;margin:35px auto;border-left:20px solid transparent;border-right:20px solid transparent;border-top:20px solid #C6565D}" + config.selector + " li[class*=twitter]{border-radius:10px 0 0 10px;background:#6cdfea;padding:12px 0}" + config.selector + " li[class*=gplus]{border-radius:0 10px 10px 0;background:#e34429;padding:12px 0}" + config.selector + " li[class*=pinterest]{background:#C6565D;padding:12px 0}</style>"};var $;

$ = jQuery;

$.fn.share = function(opts) {
  var $body, $head;
  if ($(this).length === 0) {
    console.log("Share Button: No elements found.");
    return;
  }
  $head = $('head');
  $body = $('body');
  var absoultePath = function(href) {
    var link = document.createElement("a");
    link.href = href;
    return (link.protocol+"//"+link.host+link.pathname+link.search+link.hash);
  }
  return $(this).each(function(i, el) {
    var $sharer, bubble, bubbles, click_link, close, config, open, parent, paths, set_opt, toggle,
      _this = this;
    $sharer = $(this);
    $sharer.addClass("sharer-" + i);
    $sharer.hide();
    if (opts == null) {
      opts = {};
    }
    config = {};
    config.url = opts.url || window.location.href;
    config.text = opts.text || $('meta[name=description]').attr('content') || '';
    config.app_id = opts.app_id;
    config.title = opts.title;
    config.imgclass = function (){if (opts.imgclass) { return absoultePath($("img[class=" + opts.imgclass + "]").attr("src"))} else {return ""}};
    config.image = opts.image || config.imgclass() || '';
    config.flyout = opts.flyout || 'top center';
    config.button_color = opts.color || '#333';
    config.button_background = opts.background || '#e1e1e1';
    config.button_icon = opts.icon || 'export';
    config.button_text = typeof opts.button_text === 'string' ? opts.button_text : 'Share';
    set_opt = function(base, ext) {
      if (opts[base]) {
        return opts[base][ext] || config[ext];
      } else {
        return config[ext];
      }
    };
    config.twitter_url = set_opt('twitter', 'url');
    config.twitter_text = set_opt('twitter', 'text');
    config.pinterest_text = set_opt("pinterest","text");
    config.pinterest_image = set_opt("pinterest","image");
    config.pinterest_url = set_opt("pinterest", 'url');
    config.fb_url = set_opt('facebook', 'url');
    config.fb_title = set_opt('facebook', 'title');
    config.fb_caption = set_opt('facebook', 'caption');
    config.fb_text = set_opt('facebook', 'text');
    config.fb_image = set_opt('facebook', 'image');
    config.gplus_url = set_opt('gplus', 'url');
    config.selector = "." + ($sharer.attr('class').split(" ").join("."));
    config.twitter_text = encodeURIComponent(config.twitter_text);
    if (typeof config.app_id === 'integer') {
      config.app_id = config.app_id.toString();
    }
    config.protocol = opts.protocol || (['http', 'https'].indexOf(window.location.href.split(':')[0]) === -1 ? 'https://' : '//');
    if (!$('link[href="https://www.sharebutton.co/fonts/entypo.min.css"]').length) {
      $("<link />").attr({
        rel: "stylesheet",
        href: "https://www.sharebutton.co/fonts/entypo.min.css"
      }).appendTo($("head"));
    }
    if (!$('link[href="' + config.protocol + 'fonts.googleapis.com/css?family=Lato:900"]').length) {
      $("<link />").attr({
        rel: "stylesheet",
        href: "" + config.protocol + "fonts.googleapis.com/css?family=Lato:900&text=" + config.button_text
      }).appendTo($("head"));
    }
    if (!$("meta[name='sharer" + config.selector + "']").length) {
      $('head').append(getStyles(config)).append("<meta name='sharer" + config.selector + "'>");
    }
    $(this).html("<label class='entypo-" + config.button_icon + "'><span>" + config.button_text + "</span></label><div class='social " + config.flyout + "'><ul><li class='entypo-twitter' data-network='twitter'></li><li class='entypo-pinterest' data-network='pinterest'></li><li class='entypo-facebook' data-network='facebook'></li><li class='entypo-gplus' data-network='gplus'></li></ul></div>");
    if (!window.FB && config.app_id && ($('#fb-root').length === 0)) {
      $body.append("<div id='fb-root'></div><script>(function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src='" + config.protocol + "connect.facebook.net/en_US/all.js#xfbml=1&appId=" + config.app_id + "',e.parentNode.insertBefore(d,e))})(document,'script','facebook-jssdk');</script>");
    }
    paths = {
      twitter: "http://twitter.com/intent/tweet?text=" + config.twitter_text + "&url=" + config.twitter_url,
      facebook: "https://www.facebook.com/sharer/sharer.php?u=" + config.fb_url,
      gplus: "https://plus.google.com/share?url=" + config.gplus_url,
      pinterest: "http://pinterest.com/pin/create/link/?url=" +config.pinterest_url + "&media=" +config.pinterest_image + "&description=" +config.pinterest_text
    };
    parent = $sharer.parent();
    bubbles = parent.find(".social");
    bubble = parent.find("" + config.selector + " .social");
    toggle = function(e) {
      e.stopPropagation();
      return bubble.toggleClass('active');
    };
    open = function() {
      return bubble.addClass('active');
    };
    close = function() {
      return bubble.removeClass('active');
    };
    click_link = function() {
      var link, popup;
      link = paths[$(this).data('network')];
      if (($(this).data('network') === 'facebook') && config.app_id) {
        if (!window.FB) {
          console.log("The Facebook JS SDK hasn't loaded yet.");
          return;
        }
        window.FB.ui({
          method: 'feed',
          name: config.fb_title,
          link: config.fb_url,
          picture: config.fb_image,
          caption: config.fb_caption,
          description: config.fb_text
        });
      } else {
        popup = {
          width: 500,
          height: 350
        };
        popup.top = (screen.height / 2) - (popup.height / 2);
        popup.left = (screen.width / 2) - (popup.width / 2);
        window.open(link, 'targetWindow', "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=" + popup.left + ",top=" + popup.top + ",width=" + popup.width + ",height=" + popup.height);
      }
      return false;
    };
    $sharer.find('label').on('click', toggle);
    $sharer.find('li').on('click', click_link);
    $body.on('click', function() {
      return bubbles.removeClass('active');
    });
    setTimeout((function() {
      return $sharer.show();
    }), 250);
    return {
      toggle: toggle.bind(this),
      open: open.bind(this),
      close: close.bind(this),
      options: config,
      self: this
    };
  });
};
}.call(this)