import twoCss from './two.scss';
import _ from 'lodash';


const two = {
    fn: () => {
        let num = 3;
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
    fn1: () => { // 实现预加载
        import( /* webpackPrefetch: true */ './three').then(({
            default: res
        }) => {
            res.three()
        })
    },
    fn2: () => {


    }
}
export default two