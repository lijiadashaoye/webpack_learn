import twoCss from './two.scss';


const two = {
    fn1: () => {
        let h2 = document.createElement('h2');
        h2.className = twoCss['isH2']
        h2.innerHTML = 'two h 3'
        document.body.appendChild(h2)
    },
    fn2: () => {
        let h2 = document.createElement('button');
        h2.innerHTML = '按钮';
        h2.onclick = () => {
            two.fn1()
        }
        document.body.appendChild(h2)
    }

}
export default two