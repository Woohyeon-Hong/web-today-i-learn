## 문제 1
### 1. attendance 테이블은 중복된 데이터가 쌓이는 구조이다. 중복된 데이터는 어떤 컬럼인가?

crew_id와 nickname이 중복된다.

### 2. attendance 테이블에서 중복을 제거하기 위해 crew 테이블을 만들려고 한다. 어떻게 구성해 볼 수 있을까?

```mysql
CREATE TABLE `crew` (
    `crew_id` INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,
    `nickname` VARCHAR(50) NOT NULL
);
```

### 3. crew 테이블에 들어가야 할 크루들의 정보는 어떻게 추출할까? (hint: DISTINCT)

```mysql
SELECT DISTINCT `nickname`
FROM `attendance`
```

### 4. 최종적으로 crew 테이블 생성:

```mysql
CREATE TABLE `crew` (
    `crew_id` INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,
    `nickname` VARCHAR(50) NOT NULL
);
```

### 5. attendance 테이블에서 크루 정보를 추출해서 crew 테이블에 삽입하기:

```mysql
INSERT INTO `crew` (`nickname`)
  SELECT DISTINCT `nickname`
  FROM `attendance`;
```

## 문제 2

### 1. crew 테이블을 만들고 중복을 제거했다. attendance에서 불필요해지는 컬럼은?
nickname이 불필요해졌다.

### 2. 컬럼을 삭제하려면 어떻게 해야 하는가?

```mysql
ALTER TABLE `attendance`
DROP COLUMN `nickname`;
```

## 문제 3: 외래키 설정하기

```mysql
ALTER TABLE `attendance`
ADD CONSTRAINT FOREIGN KEY (`crew_id`) REFERENCES `crew`(`crew_id`)
ON DELETE CASCADE;
```

## 문제 4

```mysql
ALTER TABLE `crew`
ADD CONSTRAINT `unique_nickname` UNIQUE (`nickname`);
```

## 문제 5

```mysql

SELECT `nickname`
FROM `crew`
WHERE `nickname` LIKE '디%';
```

## 문제 6

```mysql
SELECT * 
FROM `attendance` AS a
INNER JOIN `crew` AS c ON a.crew_id = c.crew_id
WHERE `nickname` = '어셔' 
AND `attendance_date` = '2025-03-06';
```

## 문제 7

```mysql
INSERT INTO `crew`(`nickname`)
VALUES('어셔');

INSERT INTO `attendance`(`crew_id`, `attendance_date`, `start_time`, `end_time`)
VALUES (
    (SELECT `crew_id` FROM `crew` WHERE `nickname` = '어셔'), 
    '2025-03-06', 
    '09:31',
    '18:01'
);
```

## 문제 8

```mysql
UPDATE `attendance`
SET `start_time` = '10:00'
WHERE `crew_id` = (
    SELECT `crew_id`
    FROM `crew`
    WHERE `nickname` = '주니'
)
AND `attendance_date` = '2025-03-12';
```

## 문제 9

```mysql
DELETE FROM `attendance`
WHERE `crew_id` = (
    SELECT `crew_id`
    FROM `crew`
    WHERE `nickname` = '아론'
)
AND `attendance_date` = '2025-03-12';
```

## 문제 10

```mysql
SELECT 
    c.`nickname`,
    a.`attendance_date`,
    a.`start_time`,
    a.`end_time`
FROM `attendance` AS a
INNER JOIN `crew` AS c ON a.`crew_id` = c.`crew_id`;
```

## 문제 11

```mysql
SELECT *
FROM `attendance`
WHERE `crew_id` = (
    SELECT `crew_id`
    FROM `crew`
    WHERE `nickname` = '어셔'
);
```

## 문제 12

```mysql
SELECT 
    c.`nickname`,
    a.`end_time`
FROM `attendance` AS a
INNER JOIN `crew` AS c ON a.`crew_id` = c.`crew_id`
WHERE a.`attendance_date` = '2025-03-05'
ORDER BY a.`end_time` DESC
LIMIT 1;
```


## 문제 13

```mysql
SELECT 
    c.`nickname`,
    COUNT(a.`attendance_date`) AS `recorded_date_count`
FROM `attendance` AS a
INNER JOIN `crew` AS c ON a.`crew_id` = c.`crew_id`
GROUP BY c.`crew_id`, c.`nickname`;
```

## 문제 14

```mysql
SELECT 
    c.`nickname`,
    COUNT(a.`attendance_date`) AS `attendance_count`
FROM `attendance` AS a
INNER JOIN `crew` AS c ON a.`crew_id` = c.`crew_id`
WHERE a.`start_time` IS NOT NULL
GROUP BY c.`crew_id`, c.`nickname`;
```

## 문제 15

```mysql
SELECT 
    `attendance_date`,
    COUNT(*) AS `crew_count`
FROM `attendance`
WHERE `start_time` IS NOT NULL
GROUP BY `attendance_date`;
```

## 문제 16
```mysql
SELECT 
    c.`nickname`,
    MIN(a.`start_time`) AS `earliest_start_time`,
    MAX(a.`start_time`) AS `latest_start_time`
FROM `attendance` AS a
INNER JOIN `crew` AS c ON a.`crew_id` = c.`crew_id`
WHERE a.`start_time` IS NOT NULL
GROUP BY c.`crew_id`, c.`nickname`;
```