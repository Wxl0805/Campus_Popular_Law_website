/*
 Navicat MySQL Data Transfer

 Source Server         : projectbase1
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : management

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 23/02/2022 14:34:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for authorities
-- ----------------------------
DROP TABLE IF EXISTS `authorities`;
CREATE TABLE `authorities`  (
  `authorityId` int NOT NULL AUTO_INCREMENT,
  `authorityUrl` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `authorityName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`authorityId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2021 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of authorities
-- ----------------------------
INSERT INTO `authorities` VALUES (2001, 'GET:/api/user/query', 'id查询用户');
INSERT INTO `authorities` VALUES (2002, 'GET:/api/user/queryAll', '查询所有用户');
INSERT INTO `authorities` VALUES (2003, 'POST:/api/user/page', '分页查询用户');
INSERT INTO `authorities` VALUES (2004, 'POST:/api/user/create', '新增用户');
INSERT INTO `authorities` VALUES (2005, 'POST:/api/user/modify', '修改用户');
INSERT INTO `authorities` VALUES (2006, 'DELETE:/api/user/delete', '删除用户');
INSERT INTO `authorities` VALUES (2007, 'POST:/api/user/password/modify', '修改用户密码');
INSERT INTO `authorities` VALUES (2008, 'GET:/api/user/status/modify', '修改用户状态');
INSERT INTO `authorities` VALUES (2009, 'POST:/api/user/upload', '上传用户头像');
INSERT INTO `authorities` VALUES (2010, 'GET:/api/role/queryAll', '查询所有角色');
INSERT INTO `authorities` VALUES (2011, 'POST:/api/role/create', '新增角色');
INSERT INTO `authorities` VALUES (2012, 'POST:/api/role/modify', '修改角色');
INSERT INTO `authorities` VALUES (2013, 'DELETE:/api/role/delete', '删除角色');
INSERT INTO `authorities` VALUES (2014, 'GET:/api/role/authority/query', '查询角色权限');
INSERT INTO `authorities` VALUES (2015, 'POST:/api/role/authority/modify', '修改角色权限');
INSERT INTO `authorities` VALUES (2016, 'GET:/api/department/queryAll', '查询所有部门');
INSERT INTO `authorities` VALUES (2017, 'POST:/api/department/page', '分页查询部门');
INSERT INTO `authorities` VALUES (2018, 'POST:/api/department/create', '新增部门');
INSERT INTO `authorities` VALUES (2019, 'POST:/api/department/modify', '修改部门');
INSERT INTO `authorities` VALUES (2020, 'DELETE:/api/department/delete', '删除部门');

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments`  (
  `departmentId` int NOT NULL AUTO_INCREMENT,
  `departmentName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `director` int NULL DEFAULT NULL,
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `departmentDesc` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `member` int NULL DEFAULT 0,
  PRIMARY KEY (`departmentId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4005 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of departments
-- ----------------------------
INSERT INTO `departments` VALUES (4001, 'Root', 1001, '11111111@qq.com', '职权部', 2);
INSERT INTO `departments` VALUES (4002, '软件研发部', 1001, '2222222@qq.com', '一群it人员组成的', 2);
INSERT INTO `departments` VALUES (4003, '市场部', 1002, '333333333@qq.com', '做产品推广的', 2);
INSERT INTO `departments` VALUES (4004, '财务部', 1003, '213214124@qq.com', '管理公司财政大权', 2);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `roleDesc` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `authorities` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`roleId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3005 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (3001, '超级管理员', '拥有所有权限', '2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020');
INSERT INTO `roles` VALUES (3002, '前端开发工程师', '拥有部分权限', '2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2014,2016,2017,2018,2020,2019,2011,2012,2013');
INSERT INTO `roles` VALUES (3003, '新媒体运营', '拥有部分权限', '2001,2002,2003,2005,2007,2009,2010,2016,2017,2014');
INSERT INTO `roles` VALUES (3004, '农民', '拥有最少权限,11111111', '2001,2002,2003,2014,2005,2009,2010,2016');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `userId` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mobile` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `roleId` int NULL DEFAULT NULL,
  `departmentId` int NULL DEFAULT NULL,
  `status` int NULL DEFAULT 2,
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10009 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1001, 'wzy', '38d0e0b8e0f0ac2652eef412f7c03e31', 'http://127.0.0.1:3000/useravatar/wzy.jpg', '吴志远', '18779434489', '1983389791@qq.com', 3001, 4001, 1);
INSERT INTO `users` VALUES (1002, 'pss', '4db9e88891ba2c46979bb4c4abd69599', 'http://127.0.0.1:3000/useravatar/pss.jpg', '潘珊珊', '', '', 3001, 4003, 1);
INSERT INTO `users` VALUES (1003, 'zs', 'e13060259caa27f9c06453c3e666399d', 'http://127.0.0.1:3000/useravatar/u55.png', '张三', '', '', 3002, 4002, 1);
INSERT INTO `users` VALUES (1004, 'ls', '99f66e61a1ab49ef5aa4997f1e3e40b4', 'http://127.0.0.1:3000/useravatar/u54.png', '李四', '', '', 3003, 4001, 1);
INSERT INTO `users` VALUES (1005, 'ww', 'e9013fc84b7afc936747383b7b2d3674', 'http://127.0.0.1:3000/useravatar/QQ图片20210113150100.jpg', '王五', '', '', 3001, 4003, 1);
INSERT INTO `users` VALUES (1006, 'ml', '0d7aa1f86861f7b2e2c12b5bb0ca86ac', '', '马六', '', '', 3002, 4002, 1);
INSERT INTO `users` VALUES (1007, 'zq', '6c87498bd8e62566cde0522a812c821c', 'http://127.0.0.1:3000/useravatar/gg.jpg', '赵启', '', '66666666@168.com', 3004, 4004, 2);
INSERT INTO `users` VALUES (1008, 'zql', 'd35f0c4e2d40c361bd85e2f2842d910a', '', '张起灵', '19866784521', '', 3004, 4004, 2);

SET FOREIGN_KEY_CHECKS = 1;
