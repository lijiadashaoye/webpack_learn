! function (a) {
    var t, n = '<svg><symbol id="iconwenjianjia" viewBox="0 0 1024 1024"><path d="M848.2 234.3H373.7l-7.5-20.3c-8.5-23.3-30.7-38.7-55.5-38.7h-136c-32.6 0-59.1 26.4-59.1 59.1v602.5h791.5V293.4c0.2-32.7-26.2-59.1-58.9-59.1z" fill="#ED9520" ></path><path d="M174.9 494.2c-6.5 0-11.8-5.3-11.8-11.8V234.3c0-6.5 5.3-11.8 11.8-11.8h76.9c6.5 0 11.8 5.3 11.8 11.8 0 6.5-5.3 11.8-11.8 11.8h-65.1v236.3c0 6.5-5.3 11.8-11.8 11.8z" fill="#FFFFFF" ></path><path d="M310.7 234.3m-11.8 0a11.8 11.8 0 1 0 23.6 0 11.8 11.8 0 1 0-23.6 0Z" fill="#FFFFFF" ></path><path d="M848.2 234.3h-59.1c32.6 0 59.1 26.4 59.1 59.1v484.4H115.8v59.1h791.5V293.4c0-32.7-26.4-59.1-59.1-59.1z" fill="#D1791A" ></path><path d="M848.2 216.6H386.1l-3.2-8.7c-11.1-30.1-40-50.3-72.1-50.3h-136c-42.3 0-76.8 34.4-76.8 76.8v602.5c0 9.8 7.9 17.7 17.7 17.7h791.5c9.8 0 17.7-7.9 17.7-17.7V293.4c0.1-42.4-34.3-76.8-76.7-76.8z m0 35.4c22.8 0 41.3 18.6 41.3 41.3v53.5c-12-7.7-26.1-12.2-41.3-12.2H458.3c-17.3 0-32.9-10.9-38.8-27.1L399.1 252h449.1zM133.5 819.1v-70.9h490.3c9.8 0 17.7-7.9 17.7-17.7s-7.9-17.7-17.7-17.7H133.5V234.3c0-22.8 18.6-41.3 41.3-41.3h136c17.3 0 32.9 10.9 38.8 27.1l36.6 99.8c11.1 30.1 40 50.3 72.1 50.3h389.9c22.8 0 41.3 18.6 41.3 41.3v301.3H741.9c-9.8 0-17.7 7.9-17.7 17.7s7.9 17.7 17.7 17.7h147.7v70.9H133.5z" fill="#2D3742" ></path></symbol></svg>',
        e = (t = document.getElementsByTagName("script"))[t.length - 1].getAttribute("data-injectcss");
    if (e && !a.__iconfont__svg__cssinject__) {
        a.__iconfont__svg__cssinject__ = !0;
        try {
            document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
        } catch (t) {
            console && console.log(t)
        }
    }! function (t) {
        if (document.addEventListener)
            if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) setTimeout(t, 0);
            else {
                var e = function () {
                    document.removeEventListener("DOMContentLoaded", e, !1), t()
                };
                document.addEventListener("DOMContentLoaded", e, !1)
            }
        else document.attachEvent && (c = t, i = a.document, o = !1, (l = function () {
            try {
                i.documentElement.doScroll("left")
            } catch (t) {
                return void setTimeout(l, 50)
            }
            n()
        })(), i.onreadystatechange = function () {
            "complete" == i.readyState && (i.onreadystatechange = null, n())
        });

        function n() {
            o || (o = !0, c())
        }
        var c, i, o, l
    }(function () {
        var t, e;
        (t = document.createElement("div")).innerHTML = n, n = null, (e = t.getElementsByTagName("svg")[0]) && (e.setAttribute("aria-hidden", "true"), e.style.position = "absolute", e.style.width = 0, e.style.height = 0, e.style.overflow = "hidden", function (t, e) {
            e.firstChild ? function (t, e) {
                e.parentNode.insertBefore(t, e)
            }(t, e.firstChild) : e.appendChild(t)
        }(e, document.body))
    })
}(window);