-- Seed data for camping gear distribution
-- Run after 001_schema.sql

-- Insert categories
INSERT INTO categories (id, name, icon, sort_order) VALUES
  ('cat-tent',    '帳篷', '⛺', 1),
  ('cat-tarp',    '天幕', '🏕️', 2),
  ('cat-cook',    '炊具', '🔥', 3),
  ('cat-kitchen', '廚具', '🍳', 4),
  ('cat-table',   '桌椅', '🪑', 5),
  ('cat-tools',   '工具', '🔦', 6),
  ('cat-clean',   '清潔', '🧹', 7),
  ('cat-fun',     '娛樂', '🎵', 8),
  ('cat-car',     '車位', '🚗', 9);

-- Insert items
INSERT INTO items (id, category_id, name, slot_limit, note, sort_order) VALUES
  -- 帳篷
  ('item-tent4',     'cat-tent',    '四人帳篷',         2,    NULL, 1),
  -- 天幕
  ('item-tarp',      'cat-tarp',    '天幕',             1,    NULL, 1),
  ('item-pole',      'cat-tarp',    '營柱',             1,    NULL, 2),
  ('item-rope',      'cat-tarp',    '營繩',             1,    NULL, 3),
  -- 炊具
  ('item-stove',     'cat-cook',    '瓦斯爐（含瓦斯罐）', 3,  NULL, 1),
  -- 廚具
  ('item-pan',       'cat-kitchen', '煎鍋',             2,    NULL, 1),
  ('item-pot',       'cat-kitchen', '湯鍋',             2,    NULL, 2),
  ('item-knife',     'cat-kitchen', '刀',               2,    NULL, 3),
  ('item-iron',      'cat-kitchen', '鐵盤',             2,    NULL, 4),
  ('item-board',     'cat-kitchen', '沾板',             NULL, NULL, 5),
  ('item-ladle',     'cat-kitchen', '湯勺',             NULL, NULL, 6),
  ('item-tongs',     'cat-kitchen', '夾子',             NULL, NULL, 7),
  ('item-cooler',    'cat-kitchen', '保冷袋',           NULL, NULL, 8),
  -- 桌椅
  ('item-chair',     'cat-table',   '椅子（各自準備）', NULL, '請自備', 1),
  ('item-smalltbl',  'cat-table',   '小桌子',           2,    NULL, 2),
  ('item-bigtbl',    'cat-table',   '大桌子（炊事）',   1,    NULL, 3),
  -- 工具
  ('item-lamp',      'cat-tools',   '營燈',             5,    NULL, 1),
  -- 清潔
  ('item-tissue',    'cat-clean',   '衛生紙',           NULL, NULL, 1),
  ('item-wetwipe',   'cat-clean',   '濕紙巾',           NULL, NULL, 2),
  ('item-sponge',    'cat-clean',   '菜瓜布',           NULL, NULL, 3),
  ('item-soap',      'cat-clean',   '洗碗精',           NULL, NULL, 4),
  ('item-trash',     'cat-clean',   '垃圾袋',           NULL, NULL, 5),
  -- 娛樂
  ('item-speaker',   'cat-fun',     '藍芽喇叭',         NULL, NULL, 1),
  ('item-drone',     'cat-fun',     '空拍機',           NULL, NULL, 2),
  -- 車位
  ('item-taipei',    'cat-car',     '台北出發',         NULL, NULL, 1),
  ('item-taoyuan',   'cat-car',     '桃園出發',         NULL, NULL, 2);

-- Seed assignments (pre-assigned)
INSERT INTO assignments (item_id, user_name, custom_note) VALUES
  -- 帳篷
  ('item-tent4',   '瑞',   NULL),
  -- 天幕
  ('item-tarp',    '阿緯', NULL),
  ('item-pole',    '阿緯', NULL),
  ('item-rope',    '阿緯', NULL),
  -- 炊具
  ('item-stove',   '豪豪', NULL),
  ('item-stove',   '彥安', NULL),
  -- 廚具
  ('item-pot',     '瑞',   NULL),
  ('item-pot',     '彥安', NULL),
  ('item-knife',   '玉米', '水果刀'),
  ('item-knife',   '阿緯', '菜刀'),
  ('item-iron',    '彥安', NULL),
  ('item-board',   '玉米', NULL),
  ('item-board',   '阿緯', NULL),
  ('item-board',   '彥安', NULL),
  ('item-ladle',   '玉米', NULL),
  ('item-ladle',   '瑞',   NULL),
  ('item-ladle',   '彥安', NULL),
  ('item-tongs',   '玉米', NULL),
  ('item-tongs',   '彥安', NULL),
  ('item-cooler',  '玉米', NULL),
  ('item-cooler',  '彥安', NULL),
  -- 桌椅
  ('item-smalltbl','豪豪', NULL),
  ('item-bigtbl',  '阿緯', '貝殼桌'),
  -- 工具
  ('item-lamp',    '豪豪', NULL),
  ('item-lamp',    '玉米', '燈串'),
  ('item-lamp',    '阿緯', '10m燈條'),
  -- 清潔
  ('item-tissue',  '玉米', NULL),
  ('item-wetwipe', '玉米', NULL),
  ('item-sponge',  '玉米', NULL),
  -- 娛樂
  ('item-speaker', '豪豪', NULL),
  ('item-speaker', '豪豪', NULL),
  ('item-drone',   '豪豪', NULL),
  -- 車位
  ('item-taipei',  '豪豪', NULL),
  ('item-taipei',  '彥安', NULL);
