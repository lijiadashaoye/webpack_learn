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
    fn1: () => {
        console.log(1);
        new Promise(res => {
            console.log(4);
            res()
        }).then(() => {
            console.log(2);
        });
        console.log(3);
    },
    fn2: () => {


    }
}
export default two