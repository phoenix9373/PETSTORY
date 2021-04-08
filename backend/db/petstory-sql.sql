-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema petstory
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema petstory
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `petstory` DEFAULT CHARACTER SET utf8 ;
USE `petstory` ;

-- -----------------------------------------------------
-- Table `petstory`.`members`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `petstory`.`members` ;

CREATE TABLE IF NOT EXISTS `petstory`.`members` (
  `member_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `passward` VARCHAR(45) NOT NULL,
  `member_name` VARCHAR(45) NOT NULL,
  `is_banned` TINYINT NULL,
  PRIMARY KEY (`member_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petstory`.`relations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `petstory`.`relations` ;

CREATE TABLE IF NOT EXISTS `petstory`.`relations` (
  `relation_id` INT NOT NULL AUTO_INCREMENT,
  `follower_id` INT NULL,
  `followee_id` INT NULL,
  PRIMARY KEY (`relation_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petstory`.`profiles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `petstory`.`profiles` ;

CREATE TABLE IF NOT EXISTS `petstory`.`profiles` (
  `profile_id` INT NOT NULL AUTO_INCREMENT,
  `nickname` VARCHAR(45) NOT NULL,
  `rank` VARCHAR(45) NULL,
  `follwer_num` INT NOT NULL,
  `followee_num` INT NOT NULL,
  `profile_state` INT NOT NULL,
  `member_id` INT NOT NULL,
  `relation_id` INT NOT NULL,
  PRIMARY KEY (`profile_id`),
  INDEX `fk_member_profiles_idx` (`member_id` ASC) VISIBLE,
  INDEX `fk_relations_profiles_idx` (`relation_id` ASC) VISIBLE,
  CONSTRAINT `fk_members_profiles`
    FOREIGN KEY (`member_id`)
    REFERENCES `petstory`.`members` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_relations_profiles`
    FOREIGN KEY (`relation_id`)
    REFERENCES `petstory`.`relations` (`relation_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petstory`.`boards`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `petstory`.`boards` ;

CREATE TABLE IF NOT EXISTS `petstory`.`boards` (
  `board_id` INT NOT NULL AUTO_INCREMENT,
  `board_title` VARCHAR(45) NULL,
  `board_context` VARCHAR(45) NULL,
  `board_date` DATE NOT NULL,
  `like_num` INT NULL,
  `report_num` INT NULL,
  `hashtag_id` INT NULL,
  `profile_id` INT NULL,
  PRIMARY KEY (`board_id`),
  INDEX `fk_profiles_boards_idx` (`profile_id` ASC) VISIBLE,
  CONSTRAINT `fk_profiles_boards`
    FOREIGN KEY (`profile_id`)
    REFERENCES `petstory`.`profiles` (`profile_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petstory`.`images`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `petstory`.`images` ;

CREATE TABLE IF NOT EXISTS `petstory`.`images` (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `image` MEDIUMBLOB NOT NULL,
  `board_id` INT NOT NULL,
  PRIMARY KEY (`image_id`),
  INDEX `board_id_idx` (`board_id` ASC) VISIBLE,
  CONSTRAINT `fk_boards_images`
    FOREIGN KEY (`board_id`)
    REFERENCES `petstory`.`boards` (`board_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petstory`.`hashtags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `petstory`.`hashtags` ;

CREATE TABLE IF NOT EXISTS `petstory`.`hashtags` (
  `hashtag_id` INT NOT NULL AUTO_INCREMENT,
  `hashtag_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`hashtag_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petstory`.`boards_hashtags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `petstory`.`boards_hashtags` ;

CREATE TABLE IF NOT EXISTS `petstory`.`boards_hashtags` (
  `board_hashtag_id` INT NOT NULL AUTO_INCREMENT,
  `board_id` INT NULL,
  `hashtag_id` INT NULL,
  PRIMARY KEY (`board_hashtag_id`),
  INDEX `fk_boards_boardhashtags_idx` (`board_id` ASC) VISIBLE,
  CONSTRAINT `fk_boards_boardhashtags`
    FOREIGN KEY (`board_id`)
    REFERENCES `petstory`.`boards` (`board_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_hashtags_boardhashtags`
    FOREIGN KEY (`hashtag_id`)
    REFERENCES `petstory`.`hashtags` (`hashtag_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petstory`.`coments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `petstory`.`coments` ;

CREATE TABLE IF NOT EXISTS `petstory`.`coments` (
  `coment_id` INT NOT NULL,
  `coment` VARCHAR(45) NULL,
  `board_id` INT NULL,
  `profile_id` INT NULL,
  PRIMARY KEY (`coment_id`),
  INDEX `fk_boards_coments_idx` (`board_id` ASC) VISIBLE,
  CONSTRAINT `fk_boards_coments`
    FOREIGN KEY (`board_id`)
    REFERENCES `petstory`.`boards` (`board_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petstory`.`postlists`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `petstory`.`postlists` ;

CREATE TABLE IF NOT EXISTS `petstory`.`postlists` (
  `postlist_id` INT NOT NULL,
  `postlist_name` VARCHAR(45) NOT NULL,
  `board_id` INT NULL,
  `member_id` INT NOT NULL,
  PRIMARY KEY (`postlist_id`),
  INDEX `fk_members_postlists_idx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `fk_members_postlists`
    FOREIGN KEY (`member_id`)
    REFERENCES `petstory`.`members` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
