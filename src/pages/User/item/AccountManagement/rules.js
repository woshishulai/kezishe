export const userInfoRules = {
    RealName: [
        {
            required: true,
            message: '请输入您的姓名',
            trigger: 'change'
        },
        {
            min: 1,
            max: 20,
            message: '用户名长度1-20位',
            trigger: 'change'
        }
    ],
    Gender: [
        {
            required: true,
            message: '请选择您的性别',
            trigger: 'change'
        },
        {
            validator: (_, value) => {
                if (value == 0) {
                    return Promise.reject(new Error('请选择您的性别'));
                }
                return Promise.resolve();
            },
            trigger: 'change'
        }
    ],
    Birthday: [
        {
            required: true,
            message: '请完善您的出生日期',
            trigger: 'change'
        }
    ],
    IdType: [
        {
            required: true,
            message: '请选择您的身份类型',
            trigger: 'change'
        }
    ],
    IdImage: [
        {
            required: true,
            message: '请上传您的身份证件',
            trigger: 'change'
        }
    ],
    IdNumbers: [
        {
            required: true,
            message: '证件号码不能为空',
            trigger: 'change'
        },
        {
            pattern: /^[a-zA-Z0-9]+$/,
            message: '证件号码暂不支持中文或空格',
            trigger: 'change'
        }
    ]
};
export const changeUserInfoCallRules = {
    Mobile: [
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
    code: [
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
    email: [
        { required: true, message: '邮箱不能为空', trigger: 'blur' },
        { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] }
    ],
    emailCode: [
        {
            required: true,
            message: '请输入邮箱验证码',
            trigger: 'change'
        },
        {
            min: 4,
            max: 6,
            message: '请输入长度为4-6位数的邮箱验证码',
            trigger: 'change'
        },
        {
            pattern: /^[0-9]+$/,
            message: '只能输入数字',
            trigger: 'change'
        }
    ],
    TelPhone: [
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
    ]
};
