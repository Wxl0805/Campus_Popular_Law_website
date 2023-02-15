/*
 * @Author: 志远
 * @Date: 2021-10-27 16:50:20
 * @LastEditTime: 2021-10-28 11:14:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_admin\src\utils\validateFunction.ts
 */
// 账号校验
export const validateUserName = (rule, value, callback) => {
  if (value === null || value.trim() === '') {
    callback('请输入账号');
  } else if (value.trim().includes(' ') || !(/^[A-Za-z]\w*/.test(value))) {
    callback(new Error("请输入正确的账号格式"));
  } else {
    callback();
  }
};

// 姓名校验
export const validateName = (rule, value, callback) => {
  if(value === null || value.trim() === '') {
    callback('请输入姓名');
  } else if (value.trim().includes(' ')) {
    callback(new Error("请输入正确的姓名格式"));
  } else {
    callback();
  }
};

// 新密码校验
export const validatePass = (rule, value, callback) => {
  if (value === null || value.trim() === '') {
    callback('请输入密码');
  }else if(value.length < 6 || value.length > 22) {
    callback(new Error("密码长度必须为6-22字符"));
  } else if ((/\s/.test(value)) || !(/^[A-Za-z]\w*/.test(value))) {
    callback(new Error("请输入密码的正确格式!"));
  } else {
    callback();
  }
};

// 手机号校验
export const validatePhone = (rule, value, callback) => {
  if (value && !(/^1[3456789]\d{9}$/.test(value))) {
    callback(new Error("请输入正确的手机号!"));
  } else {
    callback();
  }
};

// 校验邮箱
export const validateEmail = (rule, value, callback) => {
  if (value !== null && value.length > 0 && !(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))) {
    callback(new Error("请输入正确的邮箱!"));
  } else {
    callback();
  }
};
