import twoCss from './two.scss';
import _ from 'lodash';


const two = {
    fn1: () => {
        let h2 = document.createElement('h2');
        h2.className = twoCss['isH2']
        h2.innerHTML = 'two h 3'
        document.body.appendChild(h2)
    },
    fn2: () => {
        let h2 = document.createElement('button');
        h2.innerHTML = '按钮1';
        h2.onclick = () => {
            two.fn1()
        }
        document.body.appendChild(h2)
        let h21 = document.createElement('button');
        h21.innerHTML = '按钮2';
        h21.onclick = () => {
            two.fn3()
        }
        document.body.appendChild(h21)
    },
    fn3: () => {

    }
}
export default two