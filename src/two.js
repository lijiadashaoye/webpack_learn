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


        class P {
            constructor(c) {
                this.age = c;
                console.log(this) // this指向 K
            }
            P_fn() {
                console.log('P 的动态方法P_fn')
                console.log('P：'+super.constructor.name)
            }
            static fn1() {
                console.log('P：'+super.constructor.name)
                console.log('P 的静态方法fn1')
            }

        }
        class K extends P {
            constructor(j) {
                super(j);
                console.log(this) // this指向 K
            }
            K_fn() {
                console.log('K 的动态方法K_fn')
                console.log('K：'+super.constructor.name)
            }
            static fn2() {
                console.log('K：'+typeof super.constructor)
                console.log('K 的静态方法fn2')
            }

        }
        let kk = new K('li');
        kk.K_fn(); // 动态方法可以通过实例访问
        K.fn2(); // 静态方法可以通过父类 K 访问

        kk.P_fn(); // 动态方法可以通过实例访问
        P.fn1(); // 静态方法可以通过父类 K 访问
        K.fn1();
        console.log(kk) // 由 new K(j) 生成的实例对象 
        console.log(P) // 构造函数 function P(c){ this.age=c }
        console.log(K) // 构造函数 function K(j){}
        


    }
}
export default two