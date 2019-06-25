(function(doc, win) {
    window.bdTongji = {
        apply:function(url){
            var tjTimmer;
            try{
                var hm = doc.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?XXXXXX";
                var s = doc.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
                tjTimmer = setInterval(function(){
                    if(window._hmt ){
                      var _path = url;
                      window._hmt.push(['_trackPageview', _path]);
                      clearInterval(tjTimmer)
                  }
                },500)
          }catch(e){
              clearInterval(tjTimmer)
          }
        }
    }
})(document, window);

export default window