USE lotus;

CREATE TABLE user (
user_id bigint AUTO_INCREMENT,
activated bit(1),
auth varchar(50),
character_name varchar(50),
email varchar(50) NOT NULL,
nickname varchar(50),
password varchar(100),
profile_image LONGTEXT,
provider varchar(10),
stove_no varchar(15),

PRIMARY KEY(user_id)
);

INSERT INTO user(email, password, nickname, activated, auth, provider)
VALUES('admin', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'admin', 1, 'ROLE_ADMIN', 'LOCAL'),
('user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'user', 1, 'ROLE_USER', 'LOCAL');


CREATE TABLE `friend` (
  `user_id` BIGINT NOT NULL,
  `request_time` LONGTEXT NULL,
  `request_list` LONGTEXT NULL,
  `friend_list` LONGTEXT NULL,
  `black_list` LONGTEXT NULL,
  PRIMARY KEY (`user_id`),
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

/* 오류나면 root계정으로 로그인 후
set global log_bin_trust_function_creators=1; 실행해주기 */
    
/* 안쓰는거
DELIMITER $$
    CREATE TRIGGER insert_friend
    AFTER INSERT
    ON user
    FOR EACH ROW
    
BEGIN
INSERT INTO friend(user_id, request_time, request_list, friend_list, black_list)
VALUES(new.user_id, "[]", "[]", "[]", "[]");
END$$
*/

INSERT INTO friend(user_id, request_time, request_list, friend_list, black_list)
VALUES(1, '[]','[]','[]','[]');
INSERT INTO friend(user_id, request_time, request_list, friend_list, black_list)
VALUES(2, '[]','[]','[]','[]')
