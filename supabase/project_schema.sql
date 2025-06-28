CREATE TABLE IF NOT EXISTS vip_numbers (
  id SERIAL PRIMARY KEY,
  mobile_number VARCHAR(20) NOT NULL CHECK (char_length(mobile_number) = 10),
  price NUMERIC,
  discounted_price NUMERIC
);

CREATE OR REPLACE VIEW vip_number_flags AS
SELECT
  *,
  -- Check if the number is a palindrome
  mobile_number = REVERSE(mobile_number) AS is_mirror,
  
  -- Check if the first 5 digits are the mirror of the last 5 digits
  LEFT(mobile_number, 5) = REVERSE(RIGHT(mobile_number, 5)) AS is_semi_mirror,

  -- Two/Three Digit Repeats
  mobile_number ~ '^(\\d)\\1{4}(\\d)\\2{4}$' AS is_two_digit,
  mobile_number ~ '^(\\d)\\1{2}(\\d)\\2{2}(\\d)\\3{2}$' AS is_three_digit,

  -- Counting (any known counting substring)
  mobile_number ~ '(012|123|234|345|456|567|678|789|890)' AS is_counting,

  -- Contains 786 or 108
  POSITION('786' IN mobile_number) > 0 AS is_786,
  POSITION('108' IN mobile_number) > 0 AS is_108,

  -- Doubling (any repeated digit)
  mobile_number ~ '(\\d)\\1' AS is_doubling,

  -- ABABXYXY (e.g., 12124343)
  mobile_number ~ '^(.)(.)(\\1)(\\2)(.)(.)\\5\\6$' AS is_ababxyxy,

  -- ABABAB (e.g., 121212)
  mobile_number ~ '^(.)(.)(\\1)(\\2)(\\1)(\\2)$' AS is_ababab,

  -- ABAB at start/middle/end
  LEFT(mobile_number, 4) ~ '^(.)(.)\\1\\2$' AS is_start_abab,
  SUBSTRING(mobile_number FROM 4 FOR 4) ~ '^(.)(.)\\1\\2$' AS is_middle_abab,
  RIGHT(mobile_number, 4) ~ '^(.)(.)\\1\\2$' AS is_end_abab,

  -- ABCABCABC, ABCABC
  mobile_number ~ '^(.)(.)(.)\\1\\2\\3\\1\\2\\3$' AS is_abcabcabc,
  mobile_number ~ '^(.)(.)(.)\\1\\2\\3$' AS is_abcabc,

  -- AAABBB
  mobile_number ~ '^([0-9])\\1\\1([0-9])\\2\\2$' AS is_aaabbb,

  -- Repeated patterns
  mobile_number ~ '(\\d)\\1{2}' AS is_triple,
  mobile_number ~ '(\\d)\\1{3}' AS is_tetra,
  mobile_number ~ '(\\d)\\1{4}' AS is_penta,
  mobile_number ~ '(\\d)\\1{5}' AS is_hexa,
  mobile_number ~ '(\\d)\\1{6}' AS is_septa,
  mobile_number ~ '(\\d)\\1{7}' AS is_octa,

  -- Unique (10 different digits) - Alternative implementation without lookahead
  (
    SELECT COUNT(DISTINCT SUBSTRING(mobile_number, i, 1))
    FROM generate_series(1, LENGTH(mobile_number)) AS i
  ) = 10 AS is_unique,

  -- Without 2, 4, or 8
  mobile_number !~ '[248]' AS is_without_248

FROM vip_numbers;
