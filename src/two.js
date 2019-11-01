import twoCss from './two.scss';

export default function () {
    let h2 = document.createElement('h2');
    h2.className = twoCss['isH2']
    h2.innerHTML = 'two h2'
    document.body.appendChild(h2)
}

// https://github.com/TheLarkInn/angular2-template-loader
// https://webpack.js.org/loaders/css-loader/
// https://webpack.js.org/loaders/style-loader/
// https://webpack.js.org/loaders/html-loader/
// https://github.com/TypeStrong/ts-loader
// https://github.com/jupl/traceur-loader
// https://github.com/webpack-contrib/eslint-loader
// https://github.com/sairion/buble-loader