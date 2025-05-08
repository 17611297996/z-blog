
export default {
    plugins: {
        'postcss-preset-env': {
            autoprefixer: true,
        },
        'postcss-pxtorem': {
            rootValue: 16, // 基准字体大小
            unitPrecision: 5, // 转换后的rem保留小数点位数
            propList: ['*'], // 要转换的属性，默认转换所有属性
        },
    },
};

