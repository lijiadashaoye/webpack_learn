import twoCss from './two.scss';

const two = {
    fn: () => {
        let num = 4;
        for (let i = 0; i < num; i++) {
            let h2 = document.createElement('button');
            h2.style.marginRight = "10px";
            h2.style.marginTop = "20px";
            h2.style.padding = "3px 8px";
            h2.innerHTML = `fn${i}`;
            h2.onclick = (e) => {
                two[`fn${i}`](e)
            }
            document.getElementById('rongqi').appendChild(h2)
        }
    },
    fn0: () => {
        let h2 = document.createElement('h2');
        h2.className = twoCss['isH2']
        h2.innerHTML = 'two h 3'
        document.getElementById('rongqi').appendChild(h2)
    },
    fn1: () => { // 实现预加载,指示浏览器在空闲时间预取three.js文件，像vue那样用link标签。
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
    fn3: (e) => {

        let cav = document.querySelector('canvas');

        cav.style = 'border:1px solid;margin:10px;'
        cav.width = 500;
        cav.height = 400;
        let con = cav.getContext('2d');
        con.fillStyle = 'red';
        con.fillRect(20, 20, 400, 300);
        con.clearRect(22, 22, 50, 40);

        con.beginPath();
        con.moveTo(100, 25); // 定义画图起点
        con.lineTo(150, 25); // 画第一条线
        con.lineTo(80, 100); // 画第二条线
        con.closePath(); // 自动闭合起点和终点
        con.strokeStyle = 'black';
        con.stroke()

        con.beginPath();
        con.arc(180, 75, 50, 0, Math.PI * 2, true); // 绘制
        con.moveTo(210, 75);
        con.arc(180, 75, 30, 0, Math.PI, false); // 口(顺时针)
        con.moveTo(165, 65);
        con.arc(160, 65, 5, 0, Math.PI * 2, true); // 左眼
        con.moveTo(205, 65);
        con.arc(200, 65, 5, 0, Math.PI * 2, true); // 右眼

        con.stroke()



    }
}
export default two