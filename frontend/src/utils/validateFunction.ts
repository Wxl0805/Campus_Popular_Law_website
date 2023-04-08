// 账号校验
export const validateUserName = (rule, value, callback) => {
  if (value === null || value.trim() === '') {
    callback('请输入账号')
  } else if (value.trim().includes(' ') || !(/^[A-Za-z]\w*/.test(value))) {
    callback(new Error('请输入正确的账号格式'))
  } else {
    callback()
  }
}

// 姓名校验
export const validateName = (rule, value, callback) => {
  if (value === null || value.trim() === '') {
    callback('请输入姓名')
  } else if (value.trim().includes(' ')) {
    callback(new Error('请输入正确的姓名格式'))
  } else {
    callback()
  }
}

// 新密码校验
export const validatePass = (rule, value, callback) => {
  if (value === null || value.trim() === '') {
    callback('请输入密码')
  } else if (value.length < 6 || value.length > 22) {
    callback(new Error('密码长度必须为6-22字符'))
  } else if ((/\s/.test(value)) || !(/^[A-Za-z]*/.test(value))) {
    callback(new Error('请输入密码的正确格式!'))
  } else {
    callback()
  }
}

// 手机号校验
export const validatePhone = (rule, value, callback) => {
  if (value && !(/^1[3456789]\d{9}$/.test(value))) {
    callback(new Error('请输入正确的手机号!'))
  } else {
    callback()
  }
}

// 校验邮箱
export const validateEmail = (rule, value, callback) => {
  if (value !== null && value.length > 0 && !(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))) {
    callback(new Error('请输入正确的邮箱!'))
  } else {
    callback()
  }
}

// 校验身份证号
export const validateIdcard = (rule, value, callback) => {
  if (value === null || value.trim() === '') {
    callback('请输入身份证号')
  } else if(value !== null && value.length > 0 && !(/^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d{3}[0-9xX]$/.test(value))) {
    callback(new Error('请输入正确的身份证号!'))
  } else {
    callback()
  }
}