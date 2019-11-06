import tupian from 'assets/images/5.jpg';
import oneCss from 'src/one.scss';

const one = {
    fn1: () => {
        let num = 4,
            arr = []
        for (let tar = num; tar--;) {
            let div = document.createElement('div');
            div.className = oneCss[`div${tar}`]
            arr.push(div)
        }

        let span = document.createElement('span');
        span.style.fontSize = "50px";
        span.className = oneCss['iconfont'];
        span.innerHTML = '&#xe635;';

        let p = document.createElement('p');
        let span2 = document.createElement('span');
        span2.innerHTML = 'transform span'
        p.appendChild(span2)

        let image = new Image();
        // image.src = '../assets/images/4.jpg';  // 这样写的话，打包后无法使用
        image.src = require('../assets/images/4.jpg')
        image.style.width = '100px';


        let image2 = new Image();
        image2.src = tupian;
        image2.style.width = '100px';

        let h2 = document.createElement('h2');
        h2.innerHTML = 'one h2';
        h2.className = oneCss['isH2']

        one.appends(...arr, span, p, image, image2, h2)
    },
    appends: (...tar) => {
        tar.forEach(k => document.body.appendChild(k));
    }
}
export default one;