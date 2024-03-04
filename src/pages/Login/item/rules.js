const accountRules = {
    username: [
        {
            required: true,
            message: '请输入您的用户名',
            trigger: 'change'
        },
        {
            min: 6,
            max: 13,
            message: '用户名长度6-13位',
            trigger: 'change'
        },
        {
            pattern: /^[a-zA-Z0-9]+$/,
            message: '账号密码暂不支持中文或空格',
            trigger: 'change'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入您的密码',
            trigger: 'change'
        },
        {
            min: 6,
            max: 13,
            message: '密码长度6-13位',
            trigger: 'change'
        },
        {
            pattern: /^[a-zA-Z0-9]+$/,
            message: '账号密码暂不支持中文或空格',
            trigger: 'change'
        }
    ],
    code: [
        {
            required: true,
            message: '请输入验证码',
            trigger: 'change'
        },
        {
            min: 1,
            max: 3,
            message: '请输入长度为4位数的验证码',
            trigger: 'change'
        },
        {
            pattern: /^[0-9]+$/,
            message: '只能输入数字',
            trigger: 'change'
        }
    ]
};
const codeRules = {
    phone: [
        {
            required: true,
            message: '请输入手机号',
            trigger: 'change'
        },
        {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号格式',
            trigger: 'change'
        }
    ],
    phoneCode: [
        {
            required: true,
            message: '请输入短信验证码',
            trigger: 'change'
        },
        {
            min: 4,
            max: 6,
            message: '请输入长度为4-6位数的验证码',
            trigger: 'change'
        },
        {
            pattern: /^[0-9]+$/,
            message: '只能输入数字',
            trigger: 'change'
        }
    ],
    code: [
        {
            required: true,
            message: '请输入验证码',
            trigger: 'change'
        },
        {
            min: 4,
            max: 4,
            message: '请输入长度为4位数的验证码',
            trigger: 'change'
        },
        {
            pattern: /^[0-9]+$/,
            message: '只能输入数字',
            trigger: 'change'
        }
    ]
};

export { accountRules, codeRules };
