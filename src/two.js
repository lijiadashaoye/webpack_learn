import twoCss from './two.scss';

const two = {
    fn: () => {
        let num = 4;
        for (let i = 0; i < num; i++) {
            let h2 = document.createElement('button');
            h2.style.marginRight = "10px";
            h2.innerHTML = `fn${i}`;
            h2.onclick = () => {
                two[`fn${i}`]()
            }
            document.body.appendChild(h2)
        }
    },
    fn0: () => {
        let h2 = document.createElement('h2');
        h2.className = twoCss['isH2']
        h2.innerHTML = 'two h 3'
        document.body.appendChild(h2)
    },
    fn1: () => { // 实现预加载,指示浏览器在空闲时间预取three.js文件。
        import( /* webpackPrefetch: true */ './three').then(({
            default: res
        }) => {
            res.three()
        })
    },
    fn2: () => {
        let kk = _.compact([0, 1, false, 2, '', 3]);
        console.log(kk)
        let isp = $('#isP')[0];
        console.log(isp)
    },
    fn3: () => {



    }
}
export default two